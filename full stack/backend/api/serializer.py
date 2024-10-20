from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from api import models as api_models
from api import views as api_views
from rest_framework import serializers
from .models import Food, Category, UserProfile


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["full_name"] = user.full_name
        token["email"] = user.email
        token["username"] = user.username
        try:
            token["vendor_id"] = user.vendor.id
        except:
            token["vendor_id"] = 0

        return token


# =================================================================
# *** Authentication ***
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = api_models.User
        fields = ("full_name", "email", "password", "password2")

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )

        return attrs

    def create(self, validated_data):
        user = api_models.User.objects.create(
            full_name=validated_data["full_name"],
            email=validated_data["email"],
        )

        email_username, _ = user.email.split("@")
        user.username = email_username

        user.set_password(validated_data["password"])
        user.save()

        api_views.send_confirmation_email(user)

        return user


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = api_models.User
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = api_models.Profile
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["user"] = UserSerializer(instance.user).data
        return response


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()


# =================================================================
# *** Register Order ***
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.ProductApi
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(ProductSerializer, self).__init__(*args, **kwargs)
        request = self.context.get("request")
        if request and request.method == "POST":
            self.Meta.depth = 0
        else:
            self.Meta.depth = 3


# =============================================================


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"
