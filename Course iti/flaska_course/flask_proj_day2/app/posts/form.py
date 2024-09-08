
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField,  FileField
from wtforms.fields.choices import SelectField
from wtforms.validators import DataRequired, Length
from app.model import  User

class PostForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(2,40)])
    descrip = StringField("Descrip", validators=[DataRequired(), Length(2,100)])
    # StringField -  FileField
    image =  FileField("Image", validators=[DataRequired()])
    user_id = SelectField("User", validators=[DataRequired()], choices=[])
    submit = SubmitField("create new post")

    def __init__(self, *args, **kwargs):
        super(PostForm, self).__init__(*args, **kwargs)

        self.user_id.choices = [(u.id, u.name) for u in User.query.all()]