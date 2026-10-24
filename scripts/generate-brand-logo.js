const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const brandDir = path.join(__dirname, '../assets/brand');
const sitePublicDir = path.join(__dirname, '../site/public');

[brandDir, sitePublicDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const logoSvg = `
<svg width="800" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E45C2A" />
      <stop offset="100%" stop-color="#FF7A45" />
    </linearGradient>
  </defs>

  <!-- インフィニティW シンボル -->
  <g transform="translate(40, 30)">
    <path d="M 20,40 C 40,10 70,10 90,50 C 110,90 130,130 150,130 C 170,130 190,90 200,70 L 180,50 C 170,70 155,100 145,100 C 135,100 120,70 100,30 C 75,-10 35,-10 10,30 C -10,70 10,120 40,130 C 65,140 85,120 100,90 L 120,110 C 100,140 75,160 40,150 C -5,140 -30,80 0,30 Z" fill="url(#brandGrad)" />
  </g>

  <!-- WANTHIS テキスト。76px に対する letter-spacing 6 は約 +8% -->
  <text x="260" y="125" font-family="Montserrat, 'Helvetica Neue', Arial, sans-serif" font-size="76" font-weight="700" letter-spacing="6" fill="#1A1A1A">WANTHIS</text>
</svg>
`;

const symbolSvg = `
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="40" fill="#1A1A1A"/>
  <path d="M 30,60 C 50,30 75,30 90,60 L 100,80 L 110,60 C 125,30 150,30 170,60 C 190,100 160,150 120,150 C 95,150 80,130 70,110 L 85,95 C 92,110 102,125 120,125 C 140,125 160,90 145,65 C 135,45 120,45 110,65 L 100,85 L 90,65 C 80,45 65,45 55,65 C 40,90 60,125 80,125 L 70,145 C 40,140 20,100 30,60 Z" fill="#E45C2A"/>
</svg>
`;

async function main() {
  fs.writeFileSync(path.join(brandDir, 'wanthis-logo.svg'), logoSvg);
  fs.writeFileSync(path.join(sitePublicDir, 'logo.svg'), logoSvg);
  fs.writeFileSync(path.join(brandDir, 'wanthis-symbol.svg'), symbolSvg);

  const logoBuffer = Buffer.from(logoSvg);
  const symbolBuffer = Buffer.from(symbolSvg);

  await sharp(logoBuffer, { density: 180 })
    .resize(2000, 500, { fit: 'fill' })
    .png()
    .toFile(path.join(brandDir, 'wanthis-logo.png'));
  await sharp(symbolBuffer, { density: 216 })
    .resize(32, 32, { fit: 'fill' })
    .png()
    .toFile(path.join(sitePublicDir, 'favicon.png'));
  await sharp(symbolBuffer, { density: 216 })
    .resize(180, 180, { fit: 'fill' })
    .png()
    .toFile(path.join(sitePublicDir, 'apple-touch-icon.png'));

  console.log('Brand logo & site assets generated successfully.');
}

main().catch((err) => {
  console.error('Error generating brand assets:', err);
  process.exit(1);
});
