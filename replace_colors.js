const fs = require('fs');

const files = ['./src/Hero.tsx', './src/ContentSections.tsx'];

const replacements = {
  'bg-navy': 'bg-[#0B1F3A]',
  'text-navy': 'text-[#0B1F3A]',
  'border-navy': 'border-[#0B1F3A]',
  'from-navy': 'from-[#0B1F3A]',
  'to-navy': 'to-[#0B1F3A]',
  'bg-navy2': 'bg-[#142d52]',
  'text-navy2': 'text-[#142d52]',
  'border-navy2': 'border-[#142d52]',
  'bg-teal': 'bg-[#0E8A6E]',
  'text-teal': 'text-[#0E8A6E]',
  'border-teal': 'border-[#0E8A6E]',
  'bg-teal2': 'bg-[#0fb88f]',
  'text-teal2': 'text-[#0fb88f]',
  'bg-tealLight': 'bg-[#e0f5ef]',
  'text-tealLight': 'text-[#e0f5ef]',
  'bg-amberExt': 'bg-[#C47D0E]',
  'text-amberExt': 'text-[#C47D0E]',
  'border-amberExt': 'border-[#C47D0E]',
  'bg-amberLight': 'bg-[#fef4e0]',
  'bg-redExt': 'bg-[#C0392B]',
  'text-redExt': 'text-[#C0392B]',
  'border-redExt': 'border-[#C0392B]',
  'bg-redLight': 'bg-[#fdf0ef]',
  'bg-bgLight': 'bg-[#f8f9fc]',
  'text-textMain': 'text-[#1a1a2e]',
  'text-textSec': 'text-[#4a5568]'
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`(?<=[\\s"'\\\`])(${key})(?=[\\s"'\\\`])`, 'g');
    content = content.replace(regex, value);
  }
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
