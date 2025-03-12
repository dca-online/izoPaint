const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to process
const directories = ['src'];

// File types to minify
const fileTypes = ['.tsx', '.jsx', '.css', '.html'];

// Function to minify JavaScript/TypeScript files
function minifyJSFile(filePath) {
  try {
    console.log(`Minifying: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Remove comments
    let minified = content.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    
    // Remove multiple spaces, newlines, and tabs
    minified = minified.replace(/\s+/g, ' ');
    
    // Remove spaces around operators
    minified = minified.replace(/\s*([+\-*/%=<>!&|,;:?{}()\[\]])\s*/g, '$1');
    
    // Add necessary spaces back for JSX syntax
    minified = minified.replace(/\{\s*\}/g, '{ }');
    minified = minified.replace(/>\s*</g, '> <');
    
    // Write back to file
    fs.writeFileSync(filePath, minified, 'utf8');
    console.log(`Successfully minified: ${filePath}`);
  } catch (error) {
    console.error(`Error minifying ${filePath}:`, error);
  }
}

// Function to minify CSS files
function minifyCSSFile(filePath) {
  try {
    console.log(`Minifying CSS: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Remove comments
    let minified = content.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove whitespace
    minified = minified.replace(/\s+/g, ' ');
    minified = minified.replace(/\s*([{}:;,])\s*/g, '$1');
    minified = minified.replace(/;\}/g, '}');
    
    // Write back to file
    fs.writeFileSync(filePath, minified, 'utf8');
    console.log(`Successfully minified CSS: ${filePath}`);
  } catch (error) {
    console.error(`Error minifying CSS ${filePath}:`, error);
  }
}

// Function to minify HTML files
function minifyHTMLFile(filePath) {
  try {
    console.log(`Minifying HTML: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Remove comments
    let minified = content.replace(/<!--[\s\S]*?-->/g, '');
    
    // Remove whitespace between tags (with caution for preformatted text)
    minified = minified.replace(/>\s+</g, '><');
    
    // Remove unnecessary whitespace within tags
    minified = minified.replace(/\s+/g, ' ');
    minified = minified.replace(/\s*([=<>])\s*/g, '$1');
    
    // Write back to file
    fs.writeFileSync(filePath, minified, 'utf8');
    console.log(`Successfully minified HTML: ${filePath}`);
  } catch (error) {
    console.error(`Error minifying HTML ${filePath}:`, error);
  }
}

// Function to walk through directories and process files
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next')) {
      // Recursively process subdirectories
      processDirectory(filePath);
    } else {
      // Process files based on extension
      const ext = path.extname(filePath).toLowerCase();
      
      if (fileTypes.includes(ext)) {
        if (ext === '.css') {
          minifyCSSFile(filePath);
        } else if (ext === '.html') {
          minifyHTMLFile(filePath);
        } else if (ext === '.jsx' || ext === '.tsx') {
          minifyJSFile(filePath);
        }
      }
    }
  });
}

// Start processing directories
console.log('Starting minification process...');
directories.forEach(dir => {
  console.log(`Processing directory: ${dir}`);
  processDirectory(dir);
});
console.log('Minification complete!'); 