from app.model import Post, db, User
from flask import render_template, request, redirect, url_for
from app.posts import posts_blueprint
from app.posts.form import PostForm

# from app.model import User


@posts_blueprint.route("/landing", endpoint="land")
def land():
    posts=Post.query.all()
    # return redirect(url_for('posts_land'))
    return  render_template("posts/landing.html", posts=posts)


@posts_blueprint.route("/show/<int:id>", endpoint="show_post")
def show(id):
    posts = Post.query.get(id)
    return render_template("posts/show.html", posts=posts)


@posts_blueprint.route("/delete/<int:id>", endpoint="delete_post")
def delete_post(id):
    post = Post.query.get(id)
    if post:
        db.session.delete(post)
        db.session.commit()
    return redirect(url_for("posts.land"))


@posts_blueprint.route("/create", endpoint="create_post", methods=['GET', "POST"])
def create():
    users=User.query.all()
    if request.method == "POST":
        post = Post(name=request.form['name'],
                    descrip=request.form['descrip'],
                    image=request.form['image'],
                    user_id=request.form['user_id'])

        db.session.add(post)
        db.session.commit()
        return redirect(url_for("posts.land"))
    return render_template("posts/create.html",users=users)


@posts_blueprint.route("/edit/<int:id>", endpoint="edit_post", methods=['GET', "POST"])
def edit(id):
    post = Post.query.get(id)
    if request.method == "POST":
        post.name = request.form['name']
        post.descrip = request.form['descrip']
        post.image = request.form['image']
        post.user_id=request.form['user_id']
        db.session.commit()
        return redirect(url_for("posts.land"))
    return render_template("posts/edit.html", post=post)



import os
from werkzeug.utils import secure_filename
from app.posts.form import PostForm
@posts_blueprint.route("/for/create", endpoint="Form_Create" ,methods=['GET', "POST"])
def create_post_form():
    form = PostForm()
    if request.method == "POST":
        if form.validate_on_submit():
            if form.image.data:
                image= form.image.data
                image_name =secure_filename(image.filename)
                image_path = os.path.join('static/images/', image_name)
                image.save(image_path)

            post = Post(name=request.form['name'],
                    descrip=request.form['descrip'],
                    image=image_name,
                    user_id=request.form['user_id'])
            db.session.add(post)
            db.session.commit()
        return redirect(url_for("posts.land"))
    return render_template("posts/form/FormCreate.html",form=form )
