#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Run: npm run build && node scripts/analyze-bundle.js
 * 
 * Analyzes the production build and provides detailed statistics
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

/**
 * Get file size in KB
 */
function getFileSizeKB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

/**
 * Get all files in directory recursively
 */
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Analyze bundle
 */
function analyzBundle() {
  console.log('\n🔍 Analyzing Production Bundle...\n');
  console.log('='.repeat(60));

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ directory not found. Run `npm run build` first.');
    process.exit(1);
  }

  const allFiles = getAllFiles(DIST_DIR);
  
  // Categorize files
  const jsFiles = allFiles.filter(f => f.endsWith('.js'));
  const cssFiles = allFiles.filter(f => f.endsWith('.css'));
  const imgFiles = allFiles.filter(f => /\.(png|jpe?g|gif|svg|webp|ico)$/.test(f));
  const otherFiles = allFiles.filter(f => 
    !jsFiles.includes(f) && 
    !cssFiles.includes(f) && 
    !imgFiles.includes(f) &&
    !f.endsWith('.html')
  );

  // Calculate sizes
  const jsSize = jsFiles.reduce((sum, f) => sum + parseFloat(getFileSizeKB(f)), 0);
  const cssSize = cssFiles.reduce((sum, f) => sum + parseFloat(getFileSizeKB(f)), 0);
  const imgSize = imgFiles.reduce((sum, f) => sum + parseFloat(getFileSizeKB(f)), 0);
  const totalSize = jsSize + cssSize + imgSize;

  console.log('\n📊 Bundle Statistics:\n');
  console.log(`  Total Files:      ${allFiles.length}`);
  console.log(`  JavaScript:       ${jsFiles.length} files (${jsSize.toFixed(2)} KB)`);
  console.log(`  CSS:              ${cssFiles.length} files (${cssSize.toFixed(2)} KB)`);
  console.log(`  Images:           ${imgFiles.length} files (${imgSize.toFixed(2)} KB)`);
  console.log(`  Total Size:       ${totalSize.toFixed(2)} KB (${(totalSize / 1024).toFixed(2)} MB)`);

  // List largest JS chunks
  console.log('\n📦 Largest JavaScript Chunks:\n');
  const sortedJs = jsFiles
    .map(f => ({
      name: path.basename(f),
      path: f.replace(DIST_DIR, ''),
      size: parseFloat(getFileSizeKB(f)),
    }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);

  sortedJs.forEach((file, i) => {
    const bar = '█'.repeat(Math.ceil(file.size / 50));
    console.log(`  ${i + 1}. ${file.name}`);
    console.log(`     ${file.size.toFixed(2)} KB ${bar}`);
  });

  // Identify vendor chunks
  console.log('\n📚 Vendor Chunks:\n');
  const vendorChunks = jsFiles.filter(f => 
    f.includes('vendor-') || 
    f.includes('chunk-')
  );

  vendorChunks.forEach(chunk => {
    const name = path.basename(chunk);
    const size = getFileSizeKB(chunk);
    console.log(`  - ${name}: ${size} KB`);
  });

  // Check for optimization opportunities
  console.log('\n💡 Optimization Recommendations:\n');

  const largeChunks = sortedJs.filter(f => f.size > 500);
  if (largeChunks.length > 0) {
    console.log(`  ⚠️  ${largeChunks.length} chunk(s) exceed 500 KB`);
    console.log('     Consider splitting large chunks further.');
  }

  if (jsSize > 1000) {
    console.log('  ⚠️  Total JS size exceeds 1 MB');
    console.log('     Consider lazy loading more routes or components.');
  }

  if (cssSize > 300) {
    console.log('  ⚠️  Total CSS size exceeds 300 KB');
    console.log('     Consider removing unused CSS or splitting by route.');
  }

  const duplicateNames = new Set();
  const fileNames = jsFiles.map(f => path.basename(f).split('-')[0]);
  fileNames.forEach(name => {
    if (fileNames.filter(n => n === name).length > 1) {
      duplicateNames.add(name);
    }
  });

  if (duplicateNames.size > 0) {
    console.log('  ℹ️  Possible duplicate dependencies detected:');
    duplicateNames.forEach(name => console.log(`     - ${name}`));
  }

  console.log('\n='.repeat(60));
  console.log('\n✅ Analysis complete!\n');
  console.log('📈 For visual analysis, open: dist/stats.html\n');
}

// Run analysis
try {
  analyzBundle();
} catch (error) {
  console.error('❌ Error analyzing bundle:', error.message);
  process.exit(1);
}
