from django.shortcuts import render
from django.http import JsonResponse
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.db.models import Sum

# mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.utils.encoding import force_str
from django.contrib.auth import get_user_model
from django.http import HttpResponseRedirect


# Restframework
from rest_framework import status
from rest_framework.decorators import api_view, APIView
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from datetime import datetime

from django.contrib.auth.models import AnonymousUser

# Others
import json
import random

# Custom Imports
from api import serializer as api_serializer
from api import models as api_models
from django.shortcuts import render
from rest_framework import viewsets
from .models import Food, Category, UserProfile
from .serializer import FoodSerializer, CategorySerializer, UserProfileSerializer
from django.http import JsonResponse
from django.db.models import Q

# =================================================================
# *** Admin ***
@api_view(["GET"])
def get_current_user(request):
    user = request.user
    return Response({"username": user.username, "is_superuser": user.is_superuser})


# =================================================================
# *** Authentication ***
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = api_serializer.MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = api_models.User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = api_serializer.RegisterSerializer


class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = api_serializer.ProfileSerializer

    def get_object(self):
        user_id = self.kwargs["user_id"]

        user = api_models.User.objects.get(id=user_id)
        profile = api_models.Profile.objects.get(user=user)
        return profile


def generate_numeric_otp(length=7):
    otp = "".join([str(random.randint(0, 9)) for _ in range(length)])
    return otp


# =================================================================
# *** send mail ***
class PasswordEmailVerify(generics.RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = api_serializer.UserSerializer

    def get_object(self):
        email = self.kwargs["email"]
        user = api_models.User.objects.get(email=email)

        if user:
            user.otp = generate_numeric_otp()
            uidb64 = user.pk

            refresh = RefreshToken.for_user(user)
            reset_token = str(refresh.access_token)

            user.reset_token = reset_token
            user.save()

            # *** edit here ***
            link = f"http://localhost:3000/changepassword?otp={user.otp}&uidb64={uidb64}&reset_token={reset_token}"

            merge_data = {
                "link": link,
                "username": user.username,
            }
            subject = f"Password Reset Request"
            text_body = render_to_string("email/password_reset.txt", merge_data)
            html_body = render_to_string("email/password_reset.html", merge_data)

            msg = EmailMultiAlternatives(
                subject=subject,
                from_email=settings.FROM_EMAIL,
                to=[user.email],
                body=text_body,
            )
            msg.attach_alternative(html_body, "text/html")
            msg.send()
        return user


class PasswordChangeView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = api_serializer.UserSerializer

    def create(self, request, *args, **kwargs):
        payload = request.data

        otp = payload["otp"]
        uidb64 = payload["uidb64"]
        password = payload["password"]

        user = api_models.User.objects.get(id=uidb64, otp=otp)
        if user:
            user.set_password(password)
            user.otp = ""
            user.save()

            return Response(
                {"message": "Password Changed Successfully"},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {"message": "An Error Occured"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# =================================================================
# *** send mail ***
def send_confirmation_email(user):
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    activation_link = reverse(
        "activate_account", kwargs={"uidb64": uid, "token": token}
    )

    # *** edit here ***
    activation_url = f"http://127.0.0.1:8000{activation_link}"

    subject = "Confirm your registration"
    message = f"Thank you for registering. Please confirm your email by clicking the link below:\n{activation_url}"
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list)


# =================================================================
# *** active account ***


class ActivateAccountView(APIView):
    def get(self, request, uidb64, token):
        User = get_user_model()
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            # *** edit here ***
            return HttpResponseRedirect("http://localhost:3000/login?activated=true")

        else:
            # *** edit here ***
            return HttpResponseRedirect("http://localhost:3000/error?activation=failed")


# =================================================================
# *** Register Order ***
def get_queryset(self):
    user = self.request.user

    if isinstance(user, AnonymousUser):
        return api_models.ProductApi.objects.none()
    else:
        return api_models.ProductApi.objects.filter(user=user)


# =================================================================
# create
class ProductCreateAPIView(generics.CreateAPIView):
    queryset = api_models.ProductApi.objects.all()
    serializer_class = api_serializer.ProductSerializer

    def create(self, request, *args, **kwargs):
        try:
            post = api_models.ProductApi.objects.create(
                user_id=request.data["user_id"],
                full_name=request.data["full_name"],
                phone=request.data["phone"],
                title=request.data["title"],
                description=request.data["description"],
                governorate=request.data["governorate"],
                price_per_unit=request.data["price_per_unit"],
                thumbnail=request.data["thumbnail"],
                image1=request.data["image1"],
                image2=request.data["image2"],
                image3=request.data["image3"],
                image4=request.data["image4"],
                tags=request.data["tags"],
                status=request.data["post_status"],
            )
            return Response(
                {"message": "product created successfully."},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# edit
class ProductUpdateAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = api_serializer.ProductSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        user_id = self.kwargs["user_id"]
        product_id = self.kwargs["product_id"]
        user = api_models.User.objects.get(id=user_id)
        return api_models.ProductApi.objects.get(user=user, id=product_id)

    def update(self, request, *args, **kwargs):
        product_instance = self.get_object()

        full_name = request.data.get("full_name")
        phone = request.data.get("phone")

        title = request.data.get("title")
        description = request.data.get("description")
        governorate = request.data.get("governorate")
        price_per_unit = request.data.get("price_per_unit")

        thumbnail = request.data.get("thumbnail")
        image1 = request.data.get("image1")
        image2 = request.data.get("image2")
        image3 = request.data.get("image3")
        image4 = request.data.get("image4")

        post_status = request.data.get("post_status")

        # ==
        product_instance.full_name = full_name
        product_instance.phone = phone

        product_instance.title = title
        product_instance.description = description
        product_instance.governorate = governorate
        product_instance.price_per_unit = price_per_unit

        if thumbnail != "undefined":
            product_instance.thumbnail = thumbnail
        if image1 != "undefined":
            product_instance.image1 = image1
        if image2 != "undefined":
            product_instance.image2 = image2
        if image3 != "undefined":
            product_instance.image3 = image3
        if image4 != "undefined":
            product_instance.image4 = image4

        product_instance.status = post_status
        product_instance.save()

        return Response(
            {"message": "product Updated Successfully"},
            status=status.HTTP_200_OK,
        )


# handle admin
class ProductListAdminAPIView(generics.ListAPIView):
    serializer_class = api_serializer.ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return api_models.ProductApi.objects.all()


class ProductListAPIView(generics.ListAPIView):
    serializer_class = api_serializer.ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return api_models.ProductApi.objects.all()
        else:
            return api_models.ProductApi.objects.filter(user=user)


# handle admin
class ProductDetailAdminAPIView(generics.RetrieveAPIView):
    serializer_class = api_serializer.ProductSerializer
    permission_classes = [AllowAny]

    def get_object(self):
        slug = self.kwargs["slug"]
        post = api_models.ProductApi.objects.get(slug=slug)
        # post.view += 1
        post.save()
        return post


class ProductDetailAPIView(generics.RetrieveAPIView):
    serializer_class = api_serializer.ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        slug = self.kwargs["slug"]
        try:
            post = api_models.ProductApi.objects.get(slug=slug)
            if user.is_superuser or post.user == user:
                return post
            else:
                raise PermissionDenied("You do not have permission to view this order.")
        except api_models.ProductApi.DoesNotExist:
            raise NotFound("Order not found.")


# handle
class ProductDeleteAPIView(generics.DestroyAPIView):
    serializer_class = api_serializer.ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return api_models.ProductApi.objects.all()
        else:
            return api_models.ProductApi.objects.filter(user=user)








class FoodViewSet(viewsets.ModelViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


# Food Search
def food_search(request):
    query = request.GET.get('q', '')  # Get search query from the request
    if query:
        # Search for food items whose name contains the search query
        results = Food.objects.filter(Q(name__icontains=query))
    else:
        results = Food.objects.all()  # If no query, return all items
    data = list(results.values())  # Convert QuerySet to a list of dictionaries
    return JsonResponse(data, safe=False)

# Category Search
def category_search(request):
    query = request.GET.get('q', '')
    if query:
        results = Category.objects.filter(Q(name__icontains=query))
    else:
        results = Category.objects.all()
    data = list(results.values())
    return JsonResponse(data, safe=False)

# User Search
def user_search(request):
    query = request.GET.get('q', '')
    if query:
        results = UserProfile.objects.filter(Q(name__icontains=query))
    else:
        results = UserProfile.objects.all()
    data = list(results.values())
    return JsonResponse(data, safe=False)
