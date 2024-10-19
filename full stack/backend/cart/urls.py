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


# from django.urls import path, include
# from rest_framework.routers import DefaultRouter

# # from .views import CartView,CartItemView
# from . import views
# from .views import cart_items, create_order

# # from .views import CartViewSet


# # router = DefaultRouter()
# # router.register(r'carts', CartViewSet)

# # urlpatterns = [
# #     path('cart-items/', cart_items, name='cart-items'),
# #     path('', include(router.urls)),
# # ]
# # ////////////////////////////////////////////////////
# # ////////////////////////////////////////////////////
# urlpatterns = [
#     path("cart-items/", cart_items, name="cart-items"),
#     path("cart-items/<int:item_id>/", cart_items, name="delete-cart-item"),
#     path("create-order/", create_order, name="create-order"),
# ]

# # ////////////////////////////////////////////////////

# # router = DefaultRouter()
# # router.register(r'carts', CartView)
# # router.register(r'cart-items', CartItemView)

# # urlpatterns = [
# #     path('', include(router.urls)),

# # ]
