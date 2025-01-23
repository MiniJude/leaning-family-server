import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { Menu } from '@prisma/client';
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
}
