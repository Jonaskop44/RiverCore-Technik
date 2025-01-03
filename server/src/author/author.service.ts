import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/author.dto';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async createAuthor(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) throw new Error('User not found');

    return await this.prisma.author.create({
      data: {
        userId: user.id,
      },
    });
  }

  async createReview(dto: CreateReviewDto, request) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: request.user.email,
      },
    });

    if (!user) throw new ConflictException('User not found');

    const author = await this.prisma.author.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!author) throw new ConflictException('Author not found');

    if (dto.rating < 0 || dto.rating > 5 || dto.rating % 0.5 !== 0)
      throw new ConflictException(
        'Rating must be between 0 and 5, in increments of 0.5',
      );

    if (author.blocked) return;

    // Convert content to a single line string without paragraphs
    const sanitizedContent = dto.content.replace(/(\r\n|\n|\r)/gm, ' ').trim();

    const review = await this.prisma.review.create({
      data: {
        title: dto.title,
        rating: dto.rating,
        content: sanitizedContent,
        authorId: author.id,
      },
    });

    const { status, ...reviewData } = review;

    return reviewData;
  }

  async getAllAcceptedReviews() {
    const reviews = await this.prisma.review.findMany({
      where: {
        status: 'ACCEPTED',
      },
      include: {
        author: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                designation: true,
                companyName: true,
                profilePicture: true,
              },
            },
          },
        },
      },
    });

    //Check if the author is blocked
    reviews.forEach(async (review) => {
      const author = await this.prisma.author.findUnique({
        where: {
          id: review.authorId,
        },
      });

      if (author.blocked) {
        await this.prisma.review.update({
          where: {
            id: review.id,
          },
          data: {
            status: 'REJECTED',
          },
        });
      }
    });

    return reviews;
  }
}
