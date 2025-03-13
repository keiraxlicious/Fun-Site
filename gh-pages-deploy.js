const ghpages = require('gh-pages');
const path = require('path');

// Deploy 'dist' folder to GitHub Pages
ghpages.publish('docs', {
  branch: 'gh-pages',
  repo: 'https://github.com/keiraxlicious/premium-website.git',
  message: 'Auto-deployed with gh-pages'
}, (err) => {
  if (err) {
    console.error('Deployment failed:', err);
    return;
  }
  console.log('Deployment successful!');
});
