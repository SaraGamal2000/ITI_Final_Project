from flask import Blueprint

user_blueprint = Blueprint('users', __name__, url_prefix='/users')

from app.user import views