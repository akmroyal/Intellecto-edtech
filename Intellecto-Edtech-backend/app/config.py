from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    mongodb_url: str
    database_name: str
    secret_key: str
    algorithm: str = "HS256"
    gemini_api_key: str = ""
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()