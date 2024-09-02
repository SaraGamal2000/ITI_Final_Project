from app.model import Post, db
from flask import render_template, request, redirect, url_for
from app.posts import posts_blueprint
# from crypt import methods

@posts_blueprint.route("/landing", endpoint="land")
def land():
    posts=Post.query.all()
    # return redirect(url_for('posts_land'))
    return  render_template("landing.html", posts=posts)


@posts_blueprint.route("/show/<int:id>", endpoint="show_post")
def show(id):
    posts = Post.query.get(id)
    return render_template("show.html", posts=posts)


@posts_blueprint.route("/delete/<int:id>", endpoint="delete_post")
def delete_post(id):
    post = Post.query.get(id)
    if post:
        db.session.delete(post)
        db.session.commit()
    return redirect(url_for("posts.land"))


@posts_blueprint.route("/create", endpoint="create_post", methods=['GET', "POST"])
def create():
    if request.method == "POST":
        post = Post(name=request.form['name'],
                    descrip=request.form['descrip'],
                    image=request.form['image'])

        db.session.add(post)
        db.session.commit()
        return redirect(url_for("posts.land"))
    return render_template("create.html")


@posts_blueprint.route("/edit/<int:id>", endpoint="edit_post", methods=['GET', "POST"])
def edit(id):
    post = Post.query.get(id)
    if request.method == "POST":
        post.name = request.form['name']
        post.descrip = request.form['descrip']
        post.image = request.form['image']

        db.session.commit()
        return redirect(url_for("posts.land"))
    return render_template("edit.html", post=post)