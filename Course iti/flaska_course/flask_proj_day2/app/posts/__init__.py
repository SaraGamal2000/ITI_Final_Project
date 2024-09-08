
from flask import  Blueprint

posts_blueprint = Blueprint('posts', __name__, url_prefix='/posts')

from app.posts import  views