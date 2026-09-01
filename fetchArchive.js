import fs from 'fs';

async function fetchCodePen() {
    try {
        const hash = 'YPyPjQY';
        const jsRes = await fetch(`https://codepen.io/anon/pen/${hash}.js`);
        fs.writeFileSync('codepen.js', await jsRes.text());
        
        const htmlRes = await fetch(`https://codepen.io/anon/pen/${hash}.html`);
        fs.writeFileSync('codepen.html', await htmlRes.text());
        
        const cssRes = await fetch(`https://codepen.io/anon/pen/${hash}.css`);
        fs.writeFileSync('codepen.css', await cssRes.text());
        
        console.log('Saved CodePen files');
    } catch (e) {
        console.error(e);
    }
}
fetchCodePen();
