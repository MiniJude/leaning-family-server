# 《学习团伙》服务端

## 项目简介

这是一个基于 **NestJS** 构建的《学习团伙》服务端，目的是为用户提供一个展示技术博客、成长领悟、生活日记、旅行随拍等内容的在线平台。项目将集成多个模块来处理网站内容的管理和展示，采用现代化的技术栈以提升开发效率和代码质量。

## 技术选型

- **后端框架**：NestJS
- **数据库**：Prisma + MySQL
- **API**：REST API
- **认证方式**：JWT（JSON Web Token）
- **代码风格**：TypeScript
- **依赖管理**：pnpm
- **其他工具**：Prisma Migrate，Redis（缓存）

## 功能点


- [✅] 用户注册
- [✅] 用户登录（JWT 认证）
- [ ] 用户信息修改
- [ ] 用户密码修改

- [✅] 权限管理
- [✅] 角色管理
- [✅] 用户管理

- [ ] 博客管理
- [ ] 评论管理
- [ ] 日志与监控

## 接口文档
https://app.apifox.com/project/5751130

## 安装与运行

1. 克隆项目：

```bash
git clone https://github.com/MiniJude/learning-family.git
cd learning-family
```

2. 安装依赖：

```bash
pnpm install
```

3. 配置数据库连接：

在 .env 文件中配置数据库连接信息，如：
```bash
DATABASE_URL=mysql://user:password@localhost:5432/dbname?schema=public
```

4. 启动应用：

```bash
pnpm start:dev
```

## 贡献
欢迎贡献代码！如有任何问题或建议，请提 Issue 或 Pull Request。

## License
MIT License