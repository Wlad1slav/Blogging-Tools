from models.model import Model


class Post(Model):
    table = 'posts'


if __name__ == '__main__':
    print(Post.read_all())
