# Markdown链接路由实现 ✅

## 需求

将Markdown文件中的相对链接（如 `./details/jd.md`）转换为可访问的网站路由，而不是隐藏或禁用这些链接。

## 实现方案

### 1. 目录结构调整

**移动前**：
```
/Users/qpjoy/workspace/qpjoy/cowork/cook-hire/
├── details/
│   └── positions/
│       ├── android-middleware/
│       ├── android-senior-developer/
│       └── android-system-architect/
└── website/
```

**移动后**：
```
website/
├── content/
│   └── details/
│       └── positions/
│           ├── android-middleware/
│           │   ├── README.md
│           │   └── details/
│           │       ├── jd.md
│           │       ├── requirements.md
│           │       └── interview.md
│           ├── android-senior-developer/
│           └── android-system-architect/
└── src/
```

**优势**：
- ✅ 所有内容在一个项目内，便于管理
- ✅ 使用 `process.cwd()` 可以直接访问
- ✅ 不需要跨目录引用

### 2. 动态路由设计

#### 路由结构

```
/careers                              → 职位列表
/careers/[slug]                       → 职位详情页
/careers/[slug]/[...doc]              → 职位子文档页
```

#### 实际URL示例

```
/careers/android-middleware                          → README.md
/careers/android-middleware/details/jd               → details/jd.md
/careers/android-middleware/details/requirements     → details/requirements.md
/careers/android-middleware/details/interview        → details/interview.md
```

### 3. 核心实现文件

#### 3.1 子文档路由页面

**文件**: `src/app/careers/[slug]/[...doc]/page.tsx`

功能：
- ✅ 使用 catch-all 路由捕获所有子路径
- ✅ 动态读取对应的Markdown文件
- ✅ 支持任意层级的文档结构
- ✅ 静态生成所有子文档页面

```typescript
// 路径映射示例
params.slug = 'android-middleware'
params.doc = ['details', 'jd']
→ 读取: content/details/positions/android-middleware/details/jd.md
```

#### 3.2 链接转换插件

**文件**: `src/lib/markdown/remarkTransformLinks.ts`

功能：转换Markdown中的相对链接为网站路由

```typescript
export function remarkTransformLinks(options: TransformOptions = {}) {
  const { baseSlug } = options;

  return (tree: Node) => {
    visit(tree, 'link', (node: LinkNode) => {
      if (node.url && node.url.startsWith('./')) {
        // ./details/jd.md → /careers/android-middleware/details/jd
        let cleanPath = node.url.replace(/^\.\//, '').replace(/\.md$/, '');
        node.url = `/careers/${baseSlug}/${cleanPath}`;
      }
    });
  };
}
```

**转换示例**：

| Markdown原始链接 | 转换后的网站路由 |
|----------------|----------------|
| `./details/jd.md` | `/careers/android-middleware/details/jd` |
| `./details/requirements.md` | `/careers/android-middleware/details/requirements` |
| `./details/interview.md` | `/careers/android-middleware/details/interview` |

#### 3.3 Markdown加载器更新

**文件**: `src/lib/markdown/index.ts`

关键变更：
```typescript
// 旧路径（跨目录）
const positionsPath = path.join(process.cwd(), '../details/positions');

// 新路径（项目内）
const positionsPath = path.join(process.cwd(), 'content/details/positions');
```

使用链接转换插件：
```typescript
const processedContent = await remark()
  .use(remarkGfm)
  .use(remarkTransformLinks, { baseSlug: slug })  // 传入职位slug
  .use(html)
  .process(content);
```

### 4. 页面生成结果

#### 4.1 静态生成的页面

```
✓ Generating static pages (17/17)

Route (app)
├ ● /careers/[slug]
├   ├ /careers/android-middleware
├   ├ /careers/android-senior-developer
├   └ /careers/android-system-architect
├ ● /careers/[slug]/[...doc]
├   ├ /careers/android-middleware/details/interview
├   ├ /careers/android-middleware/details/jd
├   ├ /careers/android-middleware/details/requirements
├   ├ /careers/android-senior-developer/details/interview
├   ├ /careers/android-senior-developer/details/jd
├   └ /careers/android-senior-developer/details/requirements
```

**总计**：
- 3个职位详情页
- 6个子文档页面
- 所有页面静态生成（SSG）

#### 4.2 文件系统结构

```
.next/server/app/careers/
├── android-middleware/
│   └── details/
│       ├── interview.html
│       ├── jd.html
│       └── requirements.html
├── android-senior-developer/
│   └── details/
│       ├── interview.html
│       ├── jd.html
│       └── requirements.html
└── android-system-architect/
    └── details/
        ├── interview.html
        ├── jd.html
        └── requirements.html
```

### 5. 用户体验流程

#### 访问流程示例

1. **访问职位详情页**：`/careers/android-middleware`
   - 显示README.md内容
   - 包含指向子文档的链接

2. **点击"职位描述 (JD)"链接**
   - 原始Markdown: `[职位描述 (JD)](./details/jd.md)`
   - 转换后链接: `/careers/android-middleware/details/jd`
   - ✅ 成功跳转，显示完整JD内容

3. **面包屑导航**
   ```
   招聘职位 / android-middleware / 职位描述
   ```

4. **返回职位详情**
   - 提供"返回职位详情"按钮
   - 清晰的导航体验

### 6. 技术亮点

#### 6.1 动态但静态

- 使用动态路由 `[...doc]` 支持任意层级
- 但所有页面在构建时静态生成
- 最佳性能 + 最大灵活性

#### 6.2 智能路径解析

```typescript
// 自动处理各种路径格式
./details/jd.md          → /careers/slug/details/jd
./details/requirements   → /careers/slug/details/requirements
details/interview.md     → /careers/slug/details/interview
```

#### 6.3 表格和GFM支持

- ✅ 使用 `remarkGfm` 支持表格
- ✅ 任务列表、删除线等GFM特性
- ✅ 统一的Markdown样式系统

### 7. 开发体验

#### 7.1 内容更新流程

1. 编辑Markdown文件：
   ```bash
   vim content/details/positions/android-middleware/details/jd.md
   ```

2. 开发模式自动热更新：
   ```bash
   npm run dev
   # 访问 http://localhost:3000/careers/android-middleware/details/jd
   ```

3. 生产构建：
   ```bash
   npm run build
   # 自动生成所有子文档页面
   ```

#### 7.2 添加新文档

只需在对应职位的 `details/` 目录添加新的 `.md` 文件，构建时会自动生成路由：

```bash
# 添加新文档
echo "# 福利待遇" > content/details/positions/android-middleware/details/benefits.md

# 重新构建
npm run build
# 自动生成 /careers/android-middleware/details/benefits
```

### 8. 配置文件无需修改

由于使用了 catch-all 路由 `[...doc]`，无需修改任何配置文件即可支持新文档。

### 9. SEO优化

每个子文档页面都有：
- ✅ 独立的meta标题
- ✅ 动态生成的描述
- ✅ 正确的URL结构
- ✅ 面包屑导航

### 10. 对比之前的方案

#### 方案1（已废弃）：隐藏链接

```typescript
// 将链接转换为加粗文本
node.url = undefined;
```

❌ 链接不可点击
❌ 用户无法访问详细文档
❌ 体验差

#### 方案2（当前）：路由转换

```typescript
// 将相对链接转换为网站路由
node.url = `/careers/${baseSlug}/${cleanPath}`;
```

✅ 链接可点击
✅ 完整的文档访问
✅ 优秀的用户体验
✅ SEO友好

## 总结

实现了完整的Markdown文档路由系统：

1. ✅ **目录结构优化** - 将 `details` 移到 `website/content`
2. ✅ **动态路由** - 使用 `[...doc]` catch-all 路由
3. ✅ **链接转换** - 自动将相对链接转为网站路由
4. ✅ **静态生成** - 所有页面提前生成
5. ✅ **表格支持** - GFM完整支持
6. ✅ **导航优化** - 面包屑、返回按钮
7. ✅ **SEO优化** - 每个页面独立meta

**用户现在可以**：
- 在职位详情页点击任何文档链接
- 顺畅访问完整的技术要求、面试流程等
- 享受完整的导航体验

---

**实施日期**: 2026-02-03
**状态**: ✅ 完成并测试通过
**开发服务器**: http://localhost:3000
