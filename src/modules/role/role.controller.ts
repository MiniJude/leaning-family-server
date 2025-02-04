import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { Role } from '@prisma/client';
import { ParseIntPipe } from '@nestjs/common';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(createRoleDto);
  }

  @Put()
  async updateRole(@Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.roleService.updateRole(updateRoleDto);
  }

  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.roleService.deleteRole(id);
  }

  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  async getRoleById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Role | null> {
    return this.roleService.getRoleById(id);
  }
}
