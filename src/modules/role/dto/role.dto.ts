import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: '角色名称不能为空' })
  name: string;

  @IsOptional()
  menuIds?: number[]; // 角色所拥有的菜单 ID 列表
}

export class UpdateRoleDto {
  @IsNotEmpty({ message: '角色ID不能为空' })
  id: number;

  @IsNotEmpty({ message: '角色名称不能为空' })
  name: string;

  @IsOptional()
  menuIds?: number[]; // 更新时的菜单 ID 列表
}
