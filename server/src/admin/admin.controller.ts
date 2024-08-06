import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles, RolesGuard } from 'src/guards/roles.guard';
import { Role } from '@prisma/client';

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
}
