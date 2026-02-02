// 测试视频项目功能的脚本
const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'video');

console.log('🧪 测试视频项目路径配置\n');

// 测试1: 检查content/video目录是否存在
console.log('✅ 测试1: 检查content/video目录');
if (fs.existsSync(CONTENT_DIR)) {
  console.log('   ✓ content/video 目录存在');
} else {
  console.log('   ✗ content/video 目录不存在');
  process.exit(1);
}

// 测试2: 读取所有项目
console.log('\n✅ 测试2: 读取所有项目');
const projectDirs = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`   找到 ${projectDirs.length} 个项目目录:`);
projectDirs.forEach(dir => console.log(`   - ${dir}`));

// 测试3: 验证每个项目的metadata.json
console.log('\n✅ 测试3: 验证metadata.json');
let validProjects = 0;
let invalidProjects = 0;

for (const dir of projectDirs) {
  const metadataPath = path.join(CONTENT_DIR, dir, 'metadata.json');

  if (!fs.existsSync(metadataPath)) {
    console.log(`   ✗ ${dir}: metadata.json 不存在`);
    invalidProjects++;
    continue;
  }

  try {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

    // 验证必需字段
    const requiredFields = ['name', 'slug', 'description', 'status', 'tags', 'videos', 'createdAt', 'updatedAt'];
    const missingFields = requiredFields.filter(field => !metadata[field]);

    if (missingFields.length > 0) {
      console.log(`   ✗ ${dir}: 缺少字段 ${missingFields.join(', ')}`);
      invalidProjects++;
    } else {
      console.log(`   ✓ ${dir}: metadata.json 有效`);
      console.log(`      - 名称: ${metadata.name}`);
      console.log(`      - Slug: ${metadata.slug}`);
      console.log(`      - 状态: ${metadata.status}`);
      console.log(`      - 视频数量: ${metadata.videos.length}`);
      validProjects++;
    }
  } catch (error) {
    console.log(`   ✗ ${dir}: metadata.json 格式错误 - ${error.message}`);
    invalidProjects++;
  }
}

// 测试4: 检查视频文件
console.log('\n✅ 测试4: 检查视频文件');
for (const dir of projectDirs) {
  const metadataPath = path.join(CONTENT_DIR, dir, 'metadata.json');

  if (!fs.existsSync(metadataPath)) continue;

  try {
    const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));

    for (const video of metadata.videos) {
      const videoPath = path.join(CONTENT_DIR, dir, video.filename);

      if (fs.existsSync(videoPath)) {
        const stats = fs.statSync(videoPath);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`   ✓ ${dir}/${video.filename} - ${sizeMB} MB`);
      } else {
        console.log(`   ✗ ${dir}/${video.filename} - 文件不存在`);
      }
    }
  } catch (error) {
    // 跳过无效的metadata
  }
}

// 测试5: 检查符号链接
console.log('\n✅ 测试5: 检查public/content符号链接');
const symlinkPath = path.join(__dirname, '..', 'public', 'content');
try {
  const stats = fs.lstatSync(symlinkPath);
  if (stats.isSymbolicLink()) {
    const target = fs.readlinkSync(symlinkPath);
    console.log(`   ✓ 符号链接存在: public/content -> ${target}`);
  } else {
    console.log('   ✗ public/content 不是符号链接');
  }
} catch (error) {
  console.log('   ✗ public/content 符号链接不存在');
  console.log('   提示: 运行 cd public && ln -s ../content content');
}

// 总结
console.log('\n📊 测试总结');
console.log(`   项目总数: ${projectDirs.length}`);
console.log(`   有效项目: ${validProjects}`);
console.log(`   无效项目: ${invalidProjects}`);

if (invalidProjects === 0 && validProjects > 0) {
  console.log('\n🎉 所有测试通过！');
  process.exit(0);
} else if (validProjects === 0) {
  console.log('\n❌ 没有找到有效的视频项目');
  process.exit(1);
} else {
  console.log('\n⚠️  部分项目配置有问题，请检查');
  process.exit(0);
}
