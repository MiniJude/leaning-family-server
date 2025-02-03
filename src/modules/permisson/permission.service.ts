import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { Menu } from '@prisma/client';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/permission.dto';
@Injectable()
export class PermissionService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 获取用户的菜单
   * @param userId
   * @returns Menu[]
   */
  async getPermissionList(userId: number): Promise<Menu[]> {
    // 获取用户的角色
    const userRoles = await this.prismaService.userRole.findMany({
      where: { userId },
      include: {
        role: {
          include: { roleMenus: { include: { menu: true } } },
        },
      },
    });

    // 提取菜单并构建树结构
    const permissions = userRoles.flatMap((userRole) =>
      userRole.role.roleMenus.map((roleMenu) => roleMenu.menu),
    );

    // 构建树形结构
    const permissionTree = this.buildPermissionTree(permissions);

    return permissionTree;
  }

  // 新增构建菜单树的辅助方法
  private buildPermissionTree(permissions: Menu[]): Menu[] {
    const map: { [key: number]: Menu & { children?: Menu[] } } = {};
    const roots: Menu[] = [];

    permissions.forEach((permission) => {
      map[permission.id] = { ...permission, children: [] };
    });

    permissions.forEach((p) => {
      if (p.parentId) {
        map[p.parentId]?.children?.push(map[p.id]);
      } else {
        roots.push(map[p.id]);
      }
    });

    return roots;
  }

  /**
   * 创建菜单
   * @param permission
   * @returns Menu
   */
  async createPermission(permission: CreatePermissionDto) {
    try {
      // 创建一个事务
      await this.prismaService.$transaction(async (tx) => {
        permission.order ??= 1; // 设置order默认值
        const menu = await tx.menu.create({
          data: permission,
        });

        // 创建角色菜单
        await tx.roleMenu.create({
          data: {
            roleId: 1,
            menuId: menu.id,
          },
        });

        return menu;
      });
    } catch (error) {
      throw new Error('Failed to create permission:' + error);
    }
  }

  /**
   * 更新菜单
   * @param permission
   * @returns Menu
   */
  updatePermission(permission: UpdatePermissionDto) {
    permission.order ??= 1; // 设置order默认值
    const { id, parentId, ...rest } = permission;

    const parent = parentId
      ? { connect: { id: parentId } }
      : { disconnect: true };

    return this.prismaService.menu.update({
      where: { id },
      data: { ...rest, parent },
    });
  }

  /**
   * 删除菜单
   * @param id
   * @returns Menu
   */
  async deletePermission(id: number) {
    try {
      await this.prismaService.$transaction(async (tx) => {
        // 删除角色菜单
        await tx.roleMenu.deleteMany({
          where: { menuId: id },
        });

        // 删除菜单
        await tx.menu.delete({
          where: { id },
        });
      });
    } catch (error) {
      throw new Error('Failed to delete permission: ' + error);
    }
  }
}
