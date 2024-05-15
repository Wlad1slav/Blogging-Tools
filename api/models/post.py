from pydantic import BaseModel

from models.model import Model


class PostModel(BaseModel):
    key: str
    title: str
    content: str


class Post(Model):
    table = 'posts'


if __name__ == '__main__':
    print(Post.read_all())
