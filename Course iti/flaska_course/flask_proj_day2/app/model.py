from flask_sqlalchemy import  SQLAlchemy
from flask import  url_for
from sqlalchemy import ForeignKey
from flask_login import UserMixin
db = SQLAlchemy()

class Post(db.Model):
    __tablename__='post'
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(50))
    descrip=db.Column(db.String(300))
    image=db.Column(db.String(250))
    user_id=db.Column(db.Integer,ForeignKey('user.id'), nullable=True)

    @property
    def image_url(self):
        return url_for("static", filename=f"images/{self.image}")


class User(db.Model):
    __tablename__ = 'user'
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(50))
    age=db.Column(db.Integer)
    image=db.Column(db.String(50))
    posts= db.relationship('Post', backref='user')

    @property
    def image_url_user(self):
        return url_for("static", filename=f"images/{self.image}")

class Account(db.Model, UserMixin):
    __tablename__="account"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)
