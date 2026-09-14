const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);

const mapping = [
  { regex: /https:\/\/placehold\.co\/[^"']+\?text=(Apartment|Interior)/g, replace: '/images/interior.jpg' },
  { regex: /https:\/\/placehold\.co\/[^"']+\?text=(Villa|Project)/g, replace: '/images/villa.jpg' },
  { regex: /https:\/\/placehold\.co\/[^"']+\?text=(Penthouse|Dubai|Downtown|Business\+Bay|Marina|Hills|South|Palm|Islands|Village|Meydan|Furjan|Rashid|Expo|Ras\+Al|Blog)/gi, replace: '/images/dubai.jpg' },
  { regex: /https:\/\/placehold\.co\/[^"']+\?text=(Commercial|Architecture)/g, replace: '/images/architecture.jpg' },
  { regex: /https:\/\/placehold\.co\/[^"']+\?text=(Branded|Waterfront)/gi, replace: '/images/waterfront.jpg' },
  { regex: /https:\/\/placehold\.co\/[^"']+\?text=(Townhouse|Community)/g, replace: '/images/community.jpg' },
  { regex: /https:\/\/placehold\.co\/[^"']+/g, replace: '/images/dubai.jpg' } // Fallback
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  mapping.forEach(m => {
    if (m.regex.test(content)) {
      content = content.replace(m.regex, m.replace);
      changed = true;
    }
  });
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated images in ${file}`);
  }
});
