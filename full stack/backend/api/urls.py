from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from api import views as api_views


from rest_framework.routers import DefaultRouter
from .views import FoodViewSet, CategoryViewSet, UserProfileViewSet
from django.urls import path


router = DefaultRouter()
router.register(r'foods', FoodViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'users', UserProfileViewSet)

urlpatterns = router.urls


urlpatterns = [
    # Userauths API Endpoints
    path(
        "user/token/",
        api_views.MyTokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path("user/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user/register/", api_views.RegisterView.as_view(), name="auth_register"),
    path(
        "user/profile/<user_id>/", api_views.ProfileView.as_view(), name="user_profile"
    ),
    path(
        "user/password-reset/<email>/",
        api_views.PasswordEmailVerify.as_view(),
        name="password_reset",
    ),
    path(
        "user/password-change/",
        api_views.PasswordChangeView.as_view(),
        name="password_reset",
    ),
    path(
        "activate/<uidb64>/<token>/",
        api_views.ActivateAccountView.as_view(),
        name="activate_account",
    ),
    # =================================================================
    # Register Order
    path("productapi/create/", api_views.ProductCreateAPIView.as_view()),
    path(
        "productapi/update/<user_id>/<post_id>/",
        api_views.ProductUpdateAPIView.as_view(),
    ),
    path(
        "productapi/admin/lists/",
        api_views.ProductListAdminAPIView.as_view(),
    ),
    path(
        "productapi/lists/",
        api_views.ProductListAPIView.as_view(),
    ),
    path(
        "productapi/admin/detail/<slug>/",
        api_views.ProductDetailAdminAPIView.as_view(),
    ),
    path("productapi/detail/<slug>/", api_views.ProductDetailAPIView.as_view()),
    path(
        "productapi/delete/<user_id>/<int:pk>/",
        api_views.ProductDeleteAPIView.as_view(),
    ),
]
