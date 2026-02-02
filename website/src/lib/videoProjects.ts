// 视频项目工具函数
import fs from 'fs';
import path from 'path';

export interface VideoMetadata {
  title: string;
  filename: string;
  description: string;
  duration?: string;
  thumbnail?: string;
}

export interface VideoProject {
  name: string;
  slug: string;
  description: string;
  coverImage?: string;
  status: string;
  tags: string[];
  videos: VideoMetadata[];
  links?: {
    website?: string;
    github?: string;
  };
  createdAt: string;
  updatedAt: string;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'video');

/**
 * 获取所有视频项目
 */
export function getAllVideoProjects(): VideoProject[] {
  try {
    // 检查目录是否存在
    if (!fs.existsSync(CONTENT_DIR)) {
      return [];
    }

    const projectDirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const projects: VideoProject[] = [];

    for (const dir of projectDirs) {
      const metadataPath = path.join(CONTENT_DIR, dir, 'metadata.json');

      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
        projects.push(metadata);
      }
    }

    // 按更新时间排序
    return projects.sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  } catch (error) {
    console.error('Error reading video projects:', error);
    return [];
  }
}

/**
 * 根据 slug 获取单个视频项目
 */
export function getVideoProjectBySlug(slug: string): VideoProject | null {
  try {
    const projectDirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const dir of projectDirs) {
      const metadataPath = path.join(CONTENT_DIR, dir, 'metadata.json');

      if (fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
        if (metadata.slug === slug) {
          return metadata;
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Error reading video project:', error);
    return null;
  }
}

/**
 * 获取视频文件的公共路径
 */
export function getVideoPath(projectSlug: string, filename: string): string {
  // 找到项目目录名
  const projectDirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const dir of projectDirs) {
    const metadataPath = path.join(CONTENT_DIR, dir, 'metadata.json');

    if (fs.existsSync(metadataPath)) {
      const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
      if (metadata.slug === projectSlug) {
        return `/content/video/${dir}/${filename}`;
      }
    }
  }

  return '';
}

/**
 * 获取所有项目的 slugs，用于生成静态路径
 */
export function getAllVideoProjectSlugs(): string[] {
  const projects = getAllVideoProjects();
  return projects.map(project => project.slug);
}
