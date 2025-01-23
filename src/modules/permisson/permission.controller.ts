import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('list')
  async getPermissionList(@Req() req: Request) {
    return this.permissionService.getPermissionList(req.user.id);
  }
}
