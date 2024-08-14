import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto, UpadateReviewDto } from './dto/author.dto';
import { Request } from 'express';

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

  async updateAuthor(id: number) {
    const author = await this.prisma.author.findUnique({
      where: {
        id: id,
      },
    });

    if (!author) throw new Error('Author not found');

    return await this.prisma.author.update({
      where: {
        id: author.id,
      },
      data: {
        blocked: !author.blocked,
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
        id: user.id,
      },
    });

    if (!author) throw new ConflictException('Author not found');

    if (dto.rating < 0 || dto.rating > 5 || dto.rating % 0.5 !== 0)
      throw new ConflictException(
        'Rating must be between 0 and 5, in increments of 0.5',
      );

    return await this.prisma.review.create({
      data: {
        title: dto.title,
        rating: dto.rating,
        body: dto.body,
        authorId: author.id,
      },
    });
  }

  async updateReview(id: number, dto: UpadateReviewDto) {
    const review = await this.prisma.review.findUnique({
      where: {
        id: id,
      },
    });

    if (!review) throw new ConflictException('Review not found');

    return await this.prisma.review.update({
      where: {
        id: review.id,
      },
      data: {
        status: dto.status,
      },
    });
  }
}
