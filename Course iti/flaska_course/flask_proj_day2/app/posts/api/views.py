from flask_restful import Resource, Api, marshal_with
from app.posts.api.serializers import post_serializer
from app.posts.api.parsers import posts_parser
from app.model import Post, db
class GetPosts(Resource):
    @marshal_with(post_serializer)
    def get(self):
        posts=Post.query.all()
        return posts

    @marshal_with(post_serializer)
    def post(self):
        post_arg=posts_parser.parse_args()
        posts=Post(**post_arg)
        db.session.add(posts)
        db.session.commit()
        return posts

class PostsResourse(Resource):
    @marshal_with(post_serializer)
    def get(self, id):
        # post = db.get_or_404(post, id)
        posts =Post.query.get(id)
        return posts

    @marshal_with(post_serializer)
    def put(self, id):
        posts = Post.query.get(id)
        post_args = posts_parser.parse_args()
        posts.name = post_args['name']
        posts.descrip = post_args['descrip']
        posts.image = post_args['image']
        posts.user_id = post_args['user_id']
        db.session.add(posts)
        db.session.commit()
        return posts

    @marshal_with(post_serializer)
    def delete(self, id):
        posts = Post.query.get(id)
        db.session.delete(posts)
        db.session.commit()
        return "this post is deleted"
    