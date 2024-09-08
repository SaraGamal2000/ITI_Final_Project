from flask_restful import reqparse
from pkg_resources import require

posts_parser=reqparse.RequestParser()

posts_parser.add_argument("name",required=True, type=str, help="Name is required")
posts_parser.add_argument("image",required=True, type=str, help="image is required")
posts_parser.add_argument("descrip",required=True, type=str, help="descrip is required")
posts_parser.add_argument("user_id",required=True, type=int, help="user_id is required")