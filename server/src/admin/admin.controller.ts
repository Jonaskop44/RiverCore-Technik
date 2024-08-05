import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles, RolesGuard } from 'src/guards/roles.guard';
import { Role } from '@prisma/client';

@Controller('api/v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }
}
