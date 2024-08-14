import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateReviewDto, UpadateReviewDto } from './dto/author.dto';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('api/v1/author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Patch('update/:id')
  async updateAuthor(@Param('id') id: number) {
    return this.authorService.updateAuthor(id);
  }

  @UseGuards(JwtGuard)
  @Post('review/create')
  async createReview(@Body() dto: CreateReviewDto, @Request() request) {
    return this.authorService.createReview(dto, request);
  }

  @Patch('review/update/:id')
  async updateReview(@Param('id') id: number, @Body() dto: UpadateReviewDto) {
    return this.authorService.updateReview(id, dto);
  }
}
