const fs = require('fs');
const path = 'src/app/page.jsx';
let content = fs.readFileSync(path, 'utf8');

const before6xl = (content.match(/max-w-6xl/g) || []).length;
const before5xl = (content.match(/max-w-5xl/g) || []).length;

// Replace all max-w-6xl mx-auto and max-w-5xl mx-auto with max-w-7xl mx-auto
content = content.replace(/max-w-6xl mx-auto/g, 'max-w-7xl mx-auto');
content = content.replace(/max-w-5xl mx-auto/g, 'max-w-7xl mx-auto');

fs.writeFileSync(path, content);

const after6xl = (content.match(/max-w-6xl/g) || []).length;
const after5xl = (content.match(/max-w-5xl/g) || []).length;

console.log('max-w-6xl: before=' + before6xl + ', after=' + after6xl);
console.log('max-w-5xl: before=' + before5xl + ', after=' + after5xl);

// Show remaining lines with old max-w
const lines = content.split('\n');
lines.forEach((l, i) => {
    if (l.includes('max-w-6xl') || l.includes('max-w-5xl')) {
        console.log('REMAINING line ' + (i+1) + ':', l.trim().substring(0, 100));
    }
});
console.log('Done!');
