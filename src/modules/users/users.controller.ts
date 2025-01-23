import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  findAll() {
    return this.usersService.findAll({});
  }

  @Get('info/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id });
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.usersService.update({ where: { id: +id }, data });
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id: +id });
  }
}
