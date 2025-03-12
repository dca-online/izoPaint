const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to execute shell commands
function runCommand(command) {
  try {
    console.log(`Running: ${command}`);
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return output;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    return null;
  }
}

// Main function to prepare the repository for Git
async function prepareForGit() {
  console.log('Starting preparation for Git upload...');
  
  // 1. Run the minification script
  console.log('\n=== Running Minification ===');
  try {
    require('./minify.js');
  } catch (error) {
    console.error('Error running minification script:', error);
  }
  
  // 2. Clean up build artifacts
  console.log('\n=== Cleaning Up Build Artifacts ===');
  if (fs.existsSync('.next')) {
    console.log('Removing .next directory...');
    fs.rmSync('.next', { recursive: true, force: true });
  }
  
  // 3. Update .gitignore to ensure proper files are excluded
  console.log('\n=== Updating .gitignore ===');
  const gitignoreContent = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem
Thumbs.db

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`;

  fs.writeFileSync('.gitignore', gitignoreContent);
  
  // 4. Check if Git is initialized
  console.log('\n=== Checking Git Status ===');
  const hasGit = fs.existsSync('.git');
  
  if (!hasGit) {
    console.log('Initializing Git repository...');
    runCommand('git init');
    runCommand('git add .');
    runCommand('git commit -m "Initial commit with minified codebase"');
  } else {
    console.log('Git repository already exists.');
    console.log('You can run the following commands to commit changes:');
    console.log('\ngit add .');
    console.log('git commit -m "Update with minified codebase"');
    console.log('git push origin <branch-name>');
  }
  
  console.log('\n=== Preparation Complete ===');
  console.log('Your codebase is now minified and ready for Git upload!');
}

// Run the preparation
prepareForGit(); 