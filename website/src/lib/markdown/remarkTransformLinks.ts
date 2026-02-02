// 自定义remark插件：转换Markdown中的相对链接为网站路由
import { visit } from 'unist-util-visit';
import type { Node, Parent } from 'unist';

interface LinkNode extends Node {
  type: 'link';
  url: string;
  children: Array<{ type: string; value: string }>;
}

interface TransformOptions {
  baseSlug?: string; // 职位slug，如 'android-middleware'
}

/**
 * remark插件：将文档内部链接转换为网站路由
 * 例如：./details/jd.md -> /careers/android-middleware/details/jd
 */
export function remarkTransformLinks(options: TransformOptions = {}) {
  const { baseSlug } = options;

  return (tree: Node) => {
    visit(tree, 'link', (node: LinkNode) => {
      // 只处理相对路径链接（./xxx 或 ../xxx）
      if (node.url && (node.url.startsWith('./') || node.url.startsWith('../'))) {
        // 移除 ./ 或 ../
        let cleanPath = node.url.replace(/^\.\//, '').replace(/^\.\.\//, '');

        // 移除 .md 后缀
        cleanPath = cleanPath.replace(/\.md$/, '');

        // 如果有baseSlug，构建完整路由
        if (baseSlug) {
          // ./details/jd.md -> /careers/android-middleware/details/jd
          node.url = `/careers/${baseSlug}/${cleanPath}`;
        } else {
          // 没有baseSlug时，只是移除.md
          node.url = `/${cleanPath}`;
        }
      }
    });
  };
}
