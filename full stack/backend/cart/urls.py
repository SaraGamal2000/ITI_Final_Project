from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import cart_items,create_order_from_cart,order_detail,update_order,order_list

# ////////////////////////////////////////////////////
urlpatterns = [
    path('cart-items/', cart_items, name='cart-items'),  
    path('cart-items/<int:item_id>/', cart_items, name='delete-cart-item'),
    # path('create-order/', create_order, name='create-order'),
    
    path('orders/', views.order_list, name='order-list'),
    path('orders/<int:order_id>/', views.order_detail, name='order-detail'),
    path('orders/create/', views.create_order_from_cart, name='create-order'),
    path('orders/update/<int:order_id>/', views.update_order, name='update-order'),


]


