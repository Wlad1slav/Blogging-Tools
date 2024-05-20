from typing import List
from pydantic import BaseModel

from models.model import Model


class PostCreateModel(BaseModel):
    key: str  # API key
    title: str
    content: str
    images: List[str]  # Assuming images are represented as URLs


class Post(Model):
    table = 'posts'


if __name__ == '__main__':
    print(Post.read_all())
