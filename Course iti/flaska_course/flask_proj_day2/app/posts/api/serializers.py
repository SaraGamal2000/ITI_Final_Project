from flask_restful import fields



user_serializer={
    "id": fields.Integer,
    "name": fields.String,
    "age": fields.Integer,
    "image": fields.String
}

image_serializer={

    "name":fields.String
}


post_serializer={
    "id":fields.Integer,
    "name":fields.String,
    "descrip":fields.String,
    "image":fields.String,
    "user_id":fields.Integer,
    "user":fields.Nested(user_serializer)
}

