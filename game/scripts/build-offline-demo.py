"""Bundle the already-built perspective demo into one browser-openable HTML file."""

from base64 import b64encode
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
dist = root / "dist-offline"
html = (dist / "perspective-demo.html").read_text(encoding="utf-8")

js_path = re.search(r'<script type="module" crossorigin src="(/[^"]+\.js)"></script>', html)
css_path = re.search(r'<link rel="stylesheet" crossorigin href="(/[^"]+\.css)">', html)
assert js_path and css_path, "Vite output asset tags changed"

js = (dist / js_path.group(1).lstrip("/")).read_text(encoding="utf-8")
js = re.sub(r'^import"\./modulepreload-polyfill-[^"]+\.js";', "", js, count=1)
assert not js.startswith("import"), "Unexpected JS imports in built demo"
css = (dist / css_path.group(1).lstrip("/")).read_text(encoding="utf-8")
detail_image = b64encode((dist / "investigation-reference.png").read_bytes()).decode("ascii")
css = css.replace("url(/investigation-reference.png)", f"url(data:image/png;base64,{detail_image})")
css = css.replace("url('/investigation-reference.png')", f"url(data:image/png;base64,{detail_image})")

html = html.replace(js_path.group(0), "")
html = re.sub(r'<link rel="modulepreload"[^>]+>', "", html)
html = html.replace(css_path.group(0), f"<style>{css}</style>")
for filename in sorted(set(re.findall(r'src="/([^\"]+\.png)"', html))):
    asset = (dist / filename).resolve()
    assert asset.is_relative_to(dist.resolve()), f"Image outside build: {filename}"
    image = b64encode(asset.read_bytes()).decode("ascii")
    html = html.replace(f'src="/{filename}"', f'src="data:image/png;base64,{image}"')
html = html.replace('href="/"', 'href="#case-screen"')
html = html.replace("</body>", f"<script>{js}</script>\n</body>")

output = root / "offline-demo.html"
output.write_text(html, encoding="utf-8")
print(f"Wrote {output} ({output.stat().st_size:,} bytes)")
