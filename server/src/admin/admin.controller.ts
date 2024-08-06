import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles, RolesGuard } from 'src/guards/roles.guard';
import { Role } from '@prisma/client';
import { UpdateUserDto } from './dto/admin.dto';

@UseGuards(RolesGuard)
@Controller('api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

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
}
