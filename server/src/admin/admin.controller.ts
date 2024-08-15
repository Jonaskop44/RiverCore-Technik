import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles, RolesGuard } from 'src/guards/roles.guard';
import { Role } from '@prisma/client';
import { UpadateReviewDto, UpdateUserDto } from './dto/admin.dto';
import { SendNewsletterDto } from 'src/mail/dto/mail.dto';
import { MailService } from 'src/mail/mail.service';

@UseGuards(RolesGuard)
@Controller('api/v1/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private mailService: MailService,
  ) {}

  @Roles(Role.ADMIN)
  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Roles(Role.ADMIN)
  @Delete('user/delete/:id')
  async deleteUser(@Param('id') id: number) {
    return this.adminService.deleteUser(id);
  }

  @Roles(Role.ADMIN)
  @Patch('user/update/:id')
  async updateUser(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.adminService.updateUser(id, data);
  }

  @Roles(Role.ADMIN)
  @Get('reviews')
  async getAllReviews() {
    return this.adminService.getAllReviews();
  }

  @Roles(Role.ADMIN)
  @Patch('author/update/:id')
  async updateAuthor(@Param('id') id: number) {
    return this.adminService.updateAuthor(id);
  }

  @Roles(Role.ADMIN)
  @Patch('review/update/:id')
  async updateReview(@Param('id') id: number, @Body() dto: UpadateReviewDto) {
    return this.adminService.updateReview(id, dto);
  }

  @Roles(Role.ADMIN)
  @Post('newsletter/send')
  async sendNewsletter(@Body() dto: SendNewsletterDto) {
    return this.mailService.sendNewsletter(dto.email, dto.subject, dto.content);
  }

  @Roles(Role.ADMIN)
  @Get('newsletter/subscribers')
  async getAllNewsletterSubscribers() {
    return this.mailService.getAllNewsletterSubscribers();
  }
}
