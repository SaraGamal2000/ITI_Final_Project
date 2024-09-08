from flask import render_template, request, redirect, url_for
from app.accounts import accounts_blueprint
from app.model import Account,db
from flask_login import login_user

@accounts_blueprint.route("/", endpoint="home" )
def home():

    return render_template("home.html")

@accounts_blueprint.route("/index", endpoint="index" )
def index():
    accounts = Account.query.all()
    # return redirect(url_for('accounts.index'))
    return render_template("accounts/index.html", accounts=accounts)

@accounts_blueprint.route("/login", endpoint="log", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        accounts = Account.query.filter_by(
            username=request.form["username"]).first()

        if  accounts and accounts.password == request.form["password"]:

            login_user(accounts)
            return redirect(url_for('accounts.index'))
        else:
            return render_template("accounts/login.html", error="Invalid username or password")

        return render_template("accounts/login.html")


@accounts_blueprint.route("/register", endpoint="reg", methods=["GET", "POST"])
def register_user():
    accounts=Account.query.all()
    if request.method == "POST":
        accounts = Account(username=request.form["username"],
                            password=request.form["password"])

        db.session.add(accounts)
        db.session.commit()
        return redirect(url_for("accounts.log"))

    return render_template("accounts/register.html", accounts=accounts)

