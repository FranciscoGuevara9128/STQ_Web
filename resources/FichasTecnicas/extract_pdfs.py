import os
from pypdf import PdfReader

dir_path = r"c:\Users\frang\OneDrive\Documentos\STQ_Workspace\FichasTecnicas"
out_path = r"c:\Users\frang\OneDrive\Documentos\STQ_Workspace\fichas_text.txt"

with open(out_path, "w", encoding="utf-8") as out:
    for f in os.listdir(dir_path):
        if f.endswith(".pdf"):
            path = os.path.join(dir_path, f)
            reader = PdfReader(path)
            text_parts = []
            for page in reader.pages:
                t = page.extract_text()
                if t:
                    text_parts.append(t + "\n")
            text = "".join(text_parts)
            out.write(f"=== FILE: {f} ===\n")
            out.write(text)
            out.write("\n" + "===" * 10 + "\n")
