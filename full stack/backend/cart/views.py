from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from rest_framework import viewsets
from product.models import Product
from .serializers import (
    CartItemSerializer,
    CartSerializer,
    OrderSerializer,
    OrderSerializer,
    OrderItemSerializer,
)

# from .serializers import OrderSerializer, OrderItemSerializer
from .models import CartItem, Cart, Order, OrderItem

# ====
from api import models as api_models


import logging

import stripe
import json
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

stripe.api_key = 'sk_test_51Q5PQ5RriQFy8QgNUz4iU5XImF14Aeb9wEMlib9YdwXHBKWkqz1mVpkt3wpdN4PzXhn4Dhw4VhMFlFwW8WkgbZJu00JD3BKtc3'

logger = logging.getLogger(__name__)

@csrf_exempt
def create_checkout_session(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        price_per_item = data.get('price_per_item', 0)  # Get price per item

        try:
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[
                    {
                        'price_data': {
                            'currency': 'usd',
                            'product_data': {
                                'name': 'Total Price',  # Replace with actual product name
                            },
                            'unit_amount': int(price_per_item * 100),  # price in cents
                        },
                        'quantity': 1,  # Default quantity to 1
                    }
                ],
                mode='payment',
                success_url='http://localhost:3000/success',
                cancel_url='http://localhost:3000/cancel',
            )
            return JsonResponse({'id': session.id})
        except Exception as e:
            return JsonResponse({'error': str(e)})
# @csrf_exempt
# def create_checkout_session(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         price_per_item = data.get('price_per_item', 0)  # Get price per item

#         try:
#             session = stripe.checkout.Session.create(
#                 payment_method_types=['card'],
#                 line_items=[
#                     {
#                         'price_data': {
#                             'currency': 'usd',
#                             'product_data': {
#                                 'name': 'Your Product Name',  # Replace with actual product name
#                             },
#                             'unit_amount': int(price_per_item * 100),  # price in cents
#                         },
#                         'quantity': 1,  # Default quantity to 1
#                     }
#                 ],
#                 mode='payment',
#                 success_url='http://localhost:3000/success',
#                 cancel_url='http://localhost:3000/cancel',
#             )
#             return JsonResponse({'id': session.id})
#         except Exception as e:
#             return JsonResponse({'error': str(e)})


# @api_view(["GET", "POST", "PUT", "DELETE"])
# # @permission_classes([IsAuthenticated])
# def cart_items(request, item_id=None):
#     if request.method == "GET":

#         if item_id is not None:
#             try:
#                 # item = CartItem.objects.get(id=item_id)
#                 product_id = request.data.get("product_id")

#                 item = CartItem.objects.get(product_id=item_id)
#                 serializer = CartItemSerializer(item)
#                 return Response(serializer.data)
#             except CartItem.DoesNotExist:
#                 return Response(
#                     {"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND
#                 )

#         items = CartItem.objects.all()
#         serializer = CartItemSerializer(items, many=True)
#         return Response(serializer.data)

#     # create
#     elif request.method == "POST":
#         print("the requst", request.data)
#         product_id = request.data.get("product_id")

#         # product = Product.objects.get(id=product_id)
#         product = api_models.ProductApi.objects.get(id=product_id)

#         items = CartItem.objects.filter(product_id=product_id)

#         # cart, created = Cart.objects.get_or_create(user=request.user)
#         cart, created = Cart.objects.get_or_create(id=1)

#         if items.exists():
#             for item in items:
#                 # item.quantity += 1
#                 item.quantity += 1
#                 item.price = item.quantity * item.product_id.price_per_unit
#                 item.save()

#             serializer = CartItemSerializer(items, many=True)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             new_item = CartItem.objects.create(
#                 cart_id=cart,
#                 product_id=product,
#                 quantity=1,
#                 price=product.price_per_unit,
#             )
#         serializer = CartItemSerializer(new_item)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

#         # return Response({"error": "Product not found in cart."}, status=status.HTTP_400_BAD_REQUEST)
#         return Response(
#             {"detail": "An unexpected error occurred."},
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     # elif request.method == "PUT":
#     elif request.method == "PUT":
#         print("the requst", request.data)

#         if item_id is None:
#             return Response(
#                 {"error": "ID is required to update an item."},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         try:
#             # item = CartItem.objects.get(id=item_id)
#             product_id = request.data.get("product_id")
#             item = CartItem.objects.filter(product_id=item_id).first()
#             # item = CartItem.objects.get(product_id=item_id)
#             action = request.data.get("action")

#             if action == "increment":
#                 # item.quantity += 1
#                 item.quantity = 1
#                 item.price = item.quantity * item.product_id.price_per_unit

#             elif action == "decrement":
#                 item.quantity -= 1
#                 item.price = item.quantity * item.product_id.price_per_unit
#                 if item.quantity <= 0:
#                     print(
#                         f"Deleting item with product_id: {product_id}, quantity: {item.quantity}"
#                     )
#                     item.delete()
#                     return Response(status=status.HTTP_204_NO_CONTENT)

#             item.save()
#             serializer = CartItemSerializer(item)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         except CartItem.DoesNotExist:
#             return Response(
#                 {"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND
#             )

#     #
#     elif request.method == "DELETE":

#         if item_id is None:
#             return Response(
#                 {"error": "ID is required to delete an item."},
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         try:

#             # item = CartItem.objects.get(id=item_id)
#             product_id = request.data.get("product_id")
#             # item = CartItem.objects.filter(product_id=item_id).first()
#             item = CartItem.objects.get(product_id=item_id)

#             # ///////////////////////
#             if item is None:
#                 return Response(
#                     {"error": "CartItem not found."},
#                     status=status.HTTP_404_NOT_FOUND,
#                 )
#                 # ///////////////////////
#             item.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except CartItem.DoesNotExist:

#             return Response(
#                 {"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND
#             )


@api_view(["GET", "POST", "PUT", "DELETE"])
def cart_items(request, item_id=None):
    if request.method == "GET":
        if item_id is not None:
            try:
                product_id = request.data.get("product_id")
                item = CartItem.objects.get(product_id=item_id)
                serializer = CartItemSerializer(item)
                return Response(serializer.data)
            except CartItem.DoesNotExist:
                return Response(
                    {"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND
                )

        items = CartItem.objects.all()
        serializer = CartItemSerializer(items, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        product_id = request.data.get("product_id")
        product = api_models.ProductApi.objects.get(id=product_id)
        items = CartItem.objects.filter(product_id=product_id)
        cart, created = Cart.objects.get_or_create(id=1)

        if items.exists():
            for item in items:
                item.quantity += 1
                item.price = item.quantity * item.product_id.price_per_unit
                item.save()

            serializer = CartItemSerializer(items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            new_item = CartItem.objects.create(
                cart_id=cart,
                product_id=product,
                quantity=1,
                price=product.price_per_unit,
            )
        serializer = CartItemSerializer(new_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == "PUT":
        if item_id is None:
            return Response(
                {"error": "ID is required to update an item."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            item = CartItem.objects.filter(product_id=item_id).first()
            if item is None:
                return Response(
                    {"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND
                )

            action = request.data.get("action")

            if action == "increment":
                item.quantity += 1
            elif action == "decrement":
                item.quantity -= 1
                if item.quantity <= 0:
                    item.delete()
                    return Response(status=status.HTTP_204_NO_CONTENT)

            item.price = item.quantity * item.product_id.price_per_unit
            item.save()
            serializer = CartItemSerializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except CartItem.DoesNotExist:
            return Response(
                {"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND
            )

    elif request.method == "DELETE":
        if item_id is None:
            return Response(
                {"error": "ID is required to delete an item."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            item = CartItem.objects.get(product_id=item_id)
            if item is None:
                return Response(
                    {"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND
                )
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response(
                {"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND
            )


# ///////////////////////////////////////////////////////////////////////////
# @api_view(['GET'])
# def order_list(request):
#     orders = Order.objects.filter(user=request.user)
#     serializer = OrderSerializer(orders, many=True)
#     return Response(serializer.data)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def order_list(request):
    try:
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@permission_classes([IsAuthenticated])
@api_view(["GET"])
def order_detail(request, order_id):
    try:
        order = Order.objects.get(id=order_id, user=request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)


@permission_classes([IsAuthenticated])
@api_view(["POST"])
def create_order_from_cart(request):
    print(request.data)
    try:
        cart = Cart.objects.get(user=request.user, is_paid=False)
        order = Order.objects.create(
            user=request.user,
            total_price=cart.total_price,
            shipping_address=request.data.get("shipping_address"),
            payment_method=request.data.get("payment_method"),
        )
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order_id=order,
                product_id=cart_item.product_id,
                quantity=cart_item.quantity,
                price=cart_item.price,
            )
        cart.is_paid = True
        cart.save()

        return Response(
            {"message": "Order created successfully", "order_id": order.id},
            status=status.HTTP_201_CREATED,
        )
    except Cart.DoesNotExist:
        return Response(
            {"error": "Cart not found or already paid"},
            status=status.HTTP_400_BAD_REQUEST,
        )


@permission_classes([IsAuthenticated])
@api_view(["PUT"])
def update_order(request, order_id):
    try:
        order = Order.objects.get(id=order_id, user=request.user)
        data = request.data
        order.shipping_address = data.get("shipping_address", order.shipping_address)
        # order.billing_address = data.get('billing_address', order.billing_address)
        order.payment_method = data.get("payment_method", order.payment_method)
        order.status = data.get("status", order.status)
        order.save()
        return Response({"message": "Order updated successfully"})
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
    


