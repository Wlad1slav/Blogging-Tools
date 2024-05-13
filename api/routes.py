from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.personal_information import PersonalInformation

"""
Starting the router:
    - cd ./api
    - python -m venv venv
    - venv\Scripts\activate or source venv/bin/activate
    - pip install -r requirements.txt
    - uvicorn routes:app --reload
"""

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins from localhost:3000
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/personal_information")
async def get_personal_information():
    result = {}
    personal_information = PersonalInformation()
    for setting in personal_information.read_all():
        # A single dictionary is created from an array of dictionaries (strings from the database).
        result[setting['key']] = setting['value']
    return result
