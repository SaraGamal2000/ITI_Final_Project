from flask_sqlalchemy import SQLAlchemy

class Config():
    pass

class Devconfig(Config):
    DEBUG=True
    SQLALCHEMY_DATABASE_URI="sqlite:///database.db"
   
class Prodconfig(Config):
    
    DEBUG=False
    SQLALCHEMY_DATABASE_URI= 'postgresql://flask:123@localhost:5432/posts'
    
config_option={
        'dev':Devconfig,
        'prd':Prodconfig
    }
   
