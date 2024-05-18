import json
import os
from datetime import datetime
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.personal_information import PersonalInformation
from models.post import Post, PostCreateModel

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
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/personal_information")
async def get_personal_information():
    result = {}
    for setting in PersonalInformation.read_all():
        # A single dictionary is created from an array of dictionaries (strings from the database).
        result[setting['key']] = setting['value']
    return result


@app.get("/posts")
async def get_posts():
    return Post.read_all()[::-1]


@app.post("/post/create")
async def create_post(post: PostCreateModel):
    if post.key != os.getenv('API_KEY'):
        raise Exception('Invalid API key')
    else:
        Post.create_row({
            'title': post.title,
            'text': post.content,
            'images': json.dumps(post.images),
            'created_at': datetime.now(),
        })
