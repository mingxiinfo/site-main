// 自定义remark插件：移除或转换Markdown中的相对链接
import { visit } from 'unist-util-visit';
import type { Node, Parent } from 'unist';

interface LinkNode extends Node {
  type: 'link';
  url: string;
  children: Array<{ type: string; value: string }>;
}

/**
 * remark插件：将文档内部链接转换为纯文本
 * 因为这些链接在网站上会404，我们直接显示为文本
 */
export function remarkRemoveInternalLinks() {
  return (tree: Node) => {
    visit(tree, 'link', (node: LinkNode, index: number | null, parent: Parent | null) => {
      // 检查是否是相对路径链接（./xxx 或 ../xxx）
      if (node.url && (node.url.startsWith('./') || node.url.startsWith('../'))) {
        // 将链接节点替换为文本节点
        if (parent && typeof index === 'number') {
          // 保留链接文本，但移除链接
          const textContent = node.children
            .filter((child: any) => child.type === 'text')
            .map((child: any) => child.value)
            .join('');

          // 替换为强调文本节点
          (parent.children as any)[index] = {
            type: 'strong',
            children: [
              {
                type: 'text',
                value: textContent,
              },
            ],
          };
        }
      }
    });
  };
}
