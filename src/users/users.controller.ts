import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import CreateUserDto from './dto/create-user.dto';
import LoginUserDto from './dto/login-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll({});
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id });
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.usersService.update({ where: { id: +id }, data });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id: +id });
  }
}
