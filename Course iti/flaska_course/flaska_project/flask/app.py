
from flask import Flask, render_template, url_for, redirect, request
from flask import url_for 
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# @app.route('/landing')
# def land():
#     return  render_template("landing.html")



app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
db=SQLAlchemy(app)

class Post(db.Model):
    __tablename__='post'
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(50))
    descrip=db.Column(db.String(300))
    image=db.Column(db.String(250))
    def __str__(self):
        return f"{self.name}"
    
    @property
    def image_url(self):
        return url_for("static", filename=f"images/posts/{self.image}")

    
@app.route("/landing")
def posts_land():
    posts=Post.query.all()
    return  render_template("landing.html", posts=posts)

@app.route("/show/<int:id>", endpoint="show_post")
def show(id):
    posts=Post.query.get(id)
    return  render_template("show.html", posts=posts)


@app.route("/delete/<int:id>", endpoint="delete_post")
def delete_post(id):
    post=Post.query.get(id)
    if post:
        db.session.delete(post)
        db.session.commit()
    return redirect(url_for("posts_land")) 

@app.route("/create", endpoint="create_post", methods=['GET', "POST"])
def create():
    if request.method=="POST":
        post=Post(name=request.form['name'],
                    descrip=request.form['descrip'],
                    image=request.form['image'])
   
        db.session.add(post)
        db.session.commit()
        return redirect(url_for("posts_land"))
    return render_template("create.html")

@app.route("/edit/<int:id>", endpoint="edit_post", methods=['GET', "POST"])
def edit(id):
    post=Post.query.get(id)
    if request.method=="POST":
       
        post.name=request.form['name']
        post.descrip=request.form['descrip']
        post.image=request.form['image']
         
        db.session.commit()
        return redirect(url_for("posts_land"))
    return render_template("edit.html", post=post)


# id,name,descriptio,image
# id=request.form['id'],
if __name__ == "__main__":
    app.run(debug=True) 