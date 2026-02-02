# 品牌名称更新 - Cook-Hire → Mingxi-Info ✅

## 更新范围

将整个项目中的品牌名称从 **Cook-Hire** 更新为 **Mingxi-Info**（项目目录名称保持不变）。

## 更新内容

### 1. 源代码文件

使用批量替换更新了所有源文件中的品牌引用：

```bash
# 执行的命令
find src -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.scss" \) \
  -exec sed -i '' 's/Cook-Hire/Mingxi-Info/g' {} \;
```

**更新统计**：
- ✅ 59处 "Cook-Hire" → "Mingxi-Info"
- ✅ 涵盖所有 `.tsx`, `.ts`, `.scss` 文件

### 2. Logo缩写更新

**Header Logo** (`src/components/layout/Header.tsx`):
```tsx
// 更新前
<div className="...">
  CH
</div>

// 更新后
<div className="...">
  MI
</div>
```

**Footer Logo** (`src/components/layout/Footer.tsx`):
```tsx
// 更新前
<div className="...">
  CH
</div>

// 更新后
<div className="...">
  MI
</div>
```

### 3. 邮箱域名更新

所有邮箱地址域名统一更新：

```bash
# 执行的命令
find src -type f \( -name "*.tsx" -o -name "*.ts" \) \
  -exec sed -i '' 's/@cook-hire\.com/@mingxi-info.com/g' {} \;
```

**更新的邮箱**：
- `hr@cook-hire.com` → `hr@mingxi-info.com`
- `careers@cook-hire.com` → `careers@mingxi-info.com`

## 更新的关键文件

### 布局组件
- [x] `src/app/layout.tsx` - 页面标题、meta描述
- [x] `src/components/layout/Header.tsx` - 导航栏Logo和名称
- [x] `src/components/layout/Footer.tsx` - 页脚Logo、版权信息

### 页面组件
- [x] `src/app/page.tsx` - 首页
- [x] `src/app/about/page.tsx` - 关于页面
- [x] `src/app/team/page.tsx` - 团队页面
- [x] `src/app/projects/page.tsx` - 项目页面
- [x] `src/app/careers/page.tsx` - 招聘列表页
- [x] `src/app/careers/[slug]/page.tsx` - 职位详情页
- [x] `src/app/careers/[slug]/[...doc]/page.tsx` - 职位文档页

### 首页组件
- [x] `src/components/home/HeroSection.tsx`
- [x] `src/components/home/FeaturesSection.tsx`
- [x] `src/components/home/CTASection.tsx`

### 招聘组件
- [x] `src/components/careers/PositionCard.tsx`

### 工具库
- [x] `src/lib/markdown/index.ts`
- [x] `src/lib/markdown/remarkTransformLinks.ts`
- [x] `src/lib/markdown/remarkRemoveLinks.ts`

### 样式文件
- [x] `src/styles/main.scss`
- [x] `src/styles/components/_markdown.scss`
- [x] `src/styles/components/_glass.scss`
- [x] `src/styles/base/_typography.scss`

## 具体更新示例

### Meta信息
```tsx
// src/app/layout.tsx
export const metadata: Metadata = {
  title: 'Mingxi-Info - AI Agent创新科技公司',
  description: '专注AI Agent的创业公司...',
  authors: [{ name: 'Mingxi-Info Team' }],
};
```

### 页脚版权
```tsx
// src/components/layout/Footer.tsx
<p className="text-sm text-tertiary">
  © {currentYear} Mingxi-Info. All rights reserved.
</p>
```

### 首页介绍
```tsx
// src/components/home/HeroSection.tsx
<p className="body-large">
  Mingxi-Info 是一家专注于 AI Agent 技术的创新科技公司。
  我们致力于将人工智能带入日常工作流...
</p>
```

### 职位详情页
```tsx
// src/app/careers/[slug]/page.tsx
return {
  title: `${position.frontmatter.title} - Mingxi-Info 招聘`,
  description: position.content.substring(0, 160),
};
```

### 注释和文档
```typescript
// src/lib/markdown/index.ts
// Mingxi-Info Markdown Utilities
// 用于加载和解析Markdown内容
```

## 未更新的内容

以下内容**保持不变**（按用户要求）：

### 项目目录结构
```
/Users/qpjoy/workspace/qpjoy/cowork/cook-hire/  ← 保持不变
└── website/
```

### package.json
```json
{
  "name": "cook-hire-website",  ← 保持不变
  "version": "0.1.0"
}
```

### 配置文件名称
- `cook-hire-website` (npm包名)
- 其他配置文件中的项目标识符

## 验证结果

### 构建测试
```bash
npm run build
✓ Generating static pages (17/17)
✓ Build succeeded
```

### 搜索验证
```bash
# 验证Cook-Hire已全部替换
grep -r "Cook-Hire" src --include="*.tsx" --include="*.ts" --include="*.scss"
# 结果：0个匹配

# 验证Mingxi-Info正确替换
grep -r "Mingxi-Info" src --include="*.tsx" --include="*.ts" --include="*.scss" | wc -l
# 结果：59个匹配
```

### Logo验证
```bash
# 验证Logo缩写已更新
grep "CH" src/components/layout/*.tsx
# 结果：0个匹配（已全部改为MI）

grep "MI" src/components/layout/*.tsx
# 结果：2个匹配（Header和Footer）
```

## 用户可见的品牌展示

### 网站标题
```
浏览器标签: Mingxi-Info - AI Agent创新科技公司
```

### 导航栏
```
[MI] Mingxi-Info | 首页 | 关于我们 | 团队 | 项目 | 招聘
```

### 页脚
```
[MI] Mingxi-Info
专注AI Agent的创新科技公司...
© 2026 Mingxi-Info. All rights reserved.
```

### 招聘职位页
```
职位标题 - Mingxi-Info 招聘
联系邮箱：careers@mingxi-info.com
```

## 品牌一致性检查清单

- [x] 所有页面标题包含 "Mingxi-Info"
- [x] Logo显示 "MI" 缩写
- [x] 完整品牌名 "Mingxi-Info" 在导航栏和页脚
- [x] 邮箱域名为 @mingxi-info.com
- [x] 版权信息显示 "Mingxi-Info"
- [x] 代码注释中的公司名更新
- [x] Meta描述中的公司名更新
- [x] 所有用户可见文本更新

## 总结

品牌更新已完成！所有用户可见的内容都已从 **Cook-Hire** 更新为 **Mingxi-Info**：

✅ **59处源代码引用** - 全部更新
✅ **2处Logo缩写** - CH → MI
✅ **所有邮箱域名** - @mingxi-info.com
✅ **构建成功** - 无错误
✅ **品牌一致性** - 完整统一

项目目录名称按要求保持为 `cook-hire`，但所有对外展示的内容均显示为 **Mingxi-Info**。

---

**更新日期**: 2026-02-03
**状态**: ✅ 完成并验证通过
**影响范围**: 全站品牌展示
**向后兼容**: 项目结构不变
