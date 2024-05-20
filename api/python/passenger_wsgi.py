from a2wsgi import ASGIMiddleware
from routes import app  # Import your FastAPI app.

application = ASGIMiddleware(app)