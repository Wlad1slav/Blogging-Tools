from fastapi import FastAPI
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


@app.get("/personal_information")
async def get_personal_information():
    personal_information = PersonalInformation()
    return personal_information.read_all()
