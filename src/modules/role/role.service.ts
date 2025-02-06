import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { Role } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.prismaService.$transaction(async (tx) => {
      const role = await tx.role.create({
        data: {
          name: createRoleDto.name,
          // 正确关联roleMenus，避免传入menuIds到Role模型
          roleMenus: {
            create: createRoleDto.menuIds?.map((menuId) => ({ menuId })) || [],
          },
        },
        // 包含关联数据以便返回完整结果（可选）
        include: {
          roleMenus: true,
        },
      });
      return role;
    });
  }

  async updateRole(updateRoleDto: UpdateRoleDto): Promise<Role> {
    return this.prismaService.$transaction(async (tx) => {
      const { id, menuIds, ...data } = updateRoleDto;

      // 更新角色
      const role = await tx.role.update({
        where: { id },
        data,
      });

      // 更新角色与菜单的关联
      await tx.roleMenu.deleteMany({ where: { roleId: id } }); // 删除旧的关联
      await tx.roleMenu.createMany({
        data: menuIds?.map((menuId) => ({ roleId: id, menuId })) || [],
      });

      return role;
    });
  }

  async deleteRole(id: number): Promise<Role> {
    return this.prismaService.$transaction(async (tx) => {
      // 删除角色与菜单的关联
      await tx.roleMenu.deleteMany({ where: { roleId: id } });
      // 删除角色
      return tx.role.delete({
        where: { id },
      });
    });
  }

  async getAllRoles() {
    const roles = await this.prismaService.role.findMany({
      include: { roleMenus: true }, // 包含角色与菜单的关联
    });

    return roles.map((role) => {
      const { roleMenus, ...rest } = role;
      return {
        ...rest,
        menuIds: roleMenus.map((roleMenu) => roleMenu.menuId),
      };
    });
  }

  async getRoleById(id: number): Promise<Role | null> {
    return this.prismaService.role.findUnique({
      where: { id },
      include: { roleMenus: true }, // 包含角色与菜单的关联
    });
  }
}
