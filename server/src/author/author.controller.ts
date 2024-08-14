import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateReviewDto } from './dto/author.dto';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('api/v1/author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @UseGuards(JwtGuard)
  @Post('review/create')
  async createReview(@Body() dto: CreateReviewDto, @Request() request) {
    return this.authorService.createReview(dto, request);
  }

  @Get('reviews')
  async getAllAcceptedReviews() {
    return this.authorService.getAllAcceptedReviews();
  }
}
