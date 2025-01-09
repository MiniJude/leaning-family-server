# 个人站点服务端

## 项目简介

这是一个基于 **NestJS** 构建的个人站点服务端，目的是为用户提供一个展示技术博客、成长领悟、生活日记、旅行随拍等内容的在线平台。项目将集成多个模块来处理网站内容的管理和展示，采用现代化的技术栈以提升开发效率和代码质量。

## 技术选型

- **后端框架**：NestJS
- **数据库**：Prisma + MySQL
- **API**：GraphQL
- **认证方式**：JWT（JSON Web Token）
- **代码风格**：TypeScript
- **依赖管理**：pnpm
- **其他工具**：Prisma Migrate，GraphQL Playground，Redis（缓存）

## 功能点

### 1. 用户认证与管理
- [ ] 用户注册
- [ ] 用户登录（JWT 认证）
- [ ] 用户信息修改
- [ ] 用户密码修改
- [ ] Google登录
- [ ] Github登录
- [ ] WeChat扫码登录
- [ ] 手机号登录

### 2. 分类管理
- [ ] 新增分类
- [ ] 分类查询
- [ ] 删除分类
- [ ] 编辑分类

### 3. 博客管理
- [ ] 发布文章（支持 Markdown 格式）
- [ ] 编辑文章
- [ ] 删除文章
- [ ] 查看文章

### 4. 评论管理
- [ ] 新增评论
- [ ] 删除评论
- [ ] 点赞评论
- [ ] 踩评论

### 5. 站点设置
- [ ] 站点标题和简介设置
- [ ] 主题样式配置（如暗黑模式、色彩搭配等）
- [ ] 多语言设置

### 9. 日志与监控
- [ ] 查看站点访问统计
- [ ] 系统日志记录
- [ ] API 请求监控

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
DATABASE_URL=postgresql://user:password@localhost:5432/dbname?schema=public
```

4. 启动应用：

```bash
pnpm start:dev
```

5. 访问 GraphQL Playground：
   - 默认地址：http://localhost:3000/graphql

## 贡献
欢迎贡献代码！如有任何问题或建议，请提 Issue 或 Pull Request。

## License
MIT License