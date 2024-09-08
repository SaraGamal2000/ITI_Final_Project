from app.model import User, db
from flask import render_template, request, redirect, url_for
from app.user import user_blueprint
# from app.model import User


@user_blueprint.route("/landing", endpoint="land")
def land():
    users=User.query.all()
    # return redirect(url_for('users_land'))
    return  render_template("users/landing.html", users=users)


@user_blueprint.route("/show/<int:id>", endpoint="show_user")
def show(id):
    users = User.query.get(id)
    return render_template("users/show.html", users=users)


@user_blueprint.route("/delete/<int:id>", endpoint="delete_user")
def delete_user(id):
    users = User.query.get(id)
    if users:
        db.session.delete(users)
        db.session.commit()
    return redirect(url_for("users.land"))


@user_blueprint.route("/create", endpoint="create_user", methods=['GET', "POST"])
def create():
    users=User.query.all()
    if request.method == "POST":
        user = User(name=request.form['name'],
                    age=request.form['age'],
                    image=request.form['image'],
                   )
        # user_id = request.form['user_id']
        db.session.add(user)
        db.session.commit()
        return redirect(url_for("users.land"))
    return render_template("users/create.html", users=users)


@user_blueprint.route("/edit/<int:id>", endpoint="edit_user", methods=['GET', "POST"])
def edit(id):
    users = User.query.get(id)
    if request.method == "POST":
        users.name = request.form['name']
        users.age = request.form['age']
        users.image = request.form['image']

        db.session.commit()
        return redirect(url_for("users.land"))
    return render_template("users/edit.html", users=users)