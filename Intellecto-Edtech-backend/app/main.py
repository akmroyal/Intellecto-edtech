from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import connect_to_mongo, close_mongo_connection
from app.routers import course, user

app = FastAPI(title="Intellecto EdTech API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # Do not allow credentials when using wildcard origin — browsers block this combination.
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(course.router)
app.include_router(user.router)

# Startup and shutdown events
@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()


@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()


@app.get("/")
async def root():
    return {"message": "✅ Welcome to the Intellecto EdTech API"}


# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "✅ Intellecto EdTech API is running"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)