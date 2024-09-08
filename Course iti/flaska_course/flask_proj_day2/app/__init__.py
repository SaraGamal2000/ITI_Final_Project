
from flask import Flask

from app.accounts import accounts_blueprint
from app.config import config_option
from app.model import db
from flask_migrate import Migrate
from app.posts import posts_blueprint
from app.posts.api.views import GetPosts
from app.user import user_blueprint
from flask_bootstrap import Bootstrap5
from flask_restful import Resource, Api
from app.model import Account

from flask_login import LoginManager

login_manager = LoginManager()
login_manager.login_view = 'accounts.log'


def create_app(config_name='prd'):
    
    app = Flask(__name__)

    current_config=config_option[config_name]
    
    app.config['SQLALCHEMY_DATABASE_URI'] = current_config.SQLALCHEMY_DATABASE_URI

    app.config['SECRET_KEY'] = current_config.SECRET_KEY

    db.init_app(app)

    migrate=Migrate(app,db)

    bootstrap = Bootstrap5(app)
    api=Api(app)
    app.register_blueprint(posts_blueprint)
    app.register_blueprint(user_blueprint)
    app.register_blueprint(accounts_blueprint)

    from app.posts.api.views import GetPosts,PostsResourse
    api.add_resource(GetPosts, '/api/posts')
    api.add_resource(PostsResourse, '/api/posts/<int:id>')

    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return Account.query.get(int(id))

    print(app.url_map)
    return app