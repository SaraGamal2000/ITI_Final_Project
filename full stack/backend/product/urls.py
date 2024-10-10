from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views


urlpatterns = [
    path("products/", views.get_all_products, name="products"),
    path("products/<int:pk>/", views.get_by_id_product, name="get_by_id_product"),
]
# +static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
