
from flask import Flask
from app.config import config_option
from app.model import db
from flask_migrate import Migrate
from app.posts import posts_blueprint
def create_app(config_name='prd'):
    
    app = Flask(__name__)
    
    current_config=config_option[config_name]
    
    app.config['SQLALCHEMY_DATABASE_URI'] = current_config.SQLALCHEMY_DATABASE_URI
    # app.config.from_object(current_config)
    db.init_app(app)
    
    migrate=Migrate(app,db)
    app.register_blueprint(posts_blueprint)
    # app.register_blueprint(posts_blueprint)
    return app