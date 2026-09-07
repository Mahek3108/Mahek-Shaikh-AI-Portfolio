from pathlib import Path

import fitz


pdf_path = Path("attached_assets/Mahek_Shaikh_Resume_July2026_1788790778093.pdf")
output_dir = Path(".agents/outputs/resume-preview")
output_dir.mkdir(parents=True, exist_ok=True)

document = fitz.open(pdf_path)
print(f"pages={document.page_count}")
print(f"metadata={document.metadata}")

for page_number, page in enumerate(document, start=1):
    pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    output_path = output_dir / f"page-{page_number}.png"
    pixmap.save(output_path)
    print(f"rendered={output_path} size={page.rect.width}x{page.rect.height}")