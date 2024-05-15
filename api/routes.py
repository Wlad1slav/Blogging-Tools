from datetime import datetime

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from models.personal_information import PersonalInformation
from models.post import Post, PostModel

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
async def create_post(post: PostModel):
    print('create_post')
    print(post.key, post.title, post.content)
    Post.create_row({
        'title': post.title,
        'text': post.content,
        'created_at': datetime.now()
    })
