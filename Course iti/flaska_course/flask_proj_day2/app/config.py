from flask_sqlalchemy import SQLAlchemy
import os

class Config:
    SECRET_KEY = os.urandom(32)

    @staticmethod
    def init_app(app):
        pass
class Devconfig(Config):
    DEBUG=True
    SQLALCHEMY_DATABASE_URI="sqlite:///database.db"
   
class Prodconfig(Config):
    
    DEBUG=False
    SQLALCHEMY_DATABASE_URI= 'postgresql://flask:123@localhost:5432/posts'
    UPLOADED_PHOTOS_DEST = 'app/static/'
    
config_option={
        'dev':Devconfig,
        'prd':Prodconfig
    }

# @staticmethod
# def init_app(app):
#     pass
