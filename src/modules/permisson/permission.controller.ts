import { Controller, Get, Req, Post, Put, Body, Delete } from '@nestjs/common';
import { Request } from 'express';
import { PermissionService } from './permission.service';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('list')
  async getPermissionList(@Req() req: Request) {
    return this.permissionService.getPermissionList(req.user.id);
  }

  @Post('create')
  async createPermission(@Body() permission: CreatePermissionDto) {
    return this.permissionService.createPermission(permission);
  }

  @Put('update')
  async updatePermission(@Body() permission: UpdatePermissionDto) {
    return this.permissionService.updatePermission(permission);
  }

  @Delete('delete')
  async deletePermission(@Body('id') id: number) {
    return this.permissionService.deletePermission(id);
  }
}
