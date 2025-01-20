from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pathlib import Path

app = FastAPI()

# Define the path to the frontend directory
frontend_path = Path(__file__).parent.parent / "frontend"

# Mount static files (CSS, JS, images)
app.mount("/static", StaticFiles(directory=frontend_path), name="static")

# Serve the HTML page
@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open(frontend_path / "index.html", "r", encoding="utf-8") as file:
        html_content = file.read()
    return HTMLResponse(content=html_content)
