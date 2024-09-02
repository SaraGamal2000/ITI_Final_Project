from flask_sqlalchemy import  SQLAlchemy
from flask import  url_for

db = SQLAlchemy()

class Post(db.Model):
    __tablename__='post'
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(50))
    descrip=db.Column(db.String(300))
    image=db.Column(db.String(250))


    @property
    def image_url(self):
        return url_for("static", filename=f"images/{self.image}")