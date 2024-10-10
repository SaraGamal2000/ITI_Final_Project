from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CartItemSerializer, CartSerializer, OrderSerializer
from .models import CartItem, Cart
import logging

logger = logging.getLogger(__name__)


@api_view(["GET", "POST", "PUT", "DELETE"])
def cart_items(request, item_id=None):
    if request.method == "GET":
        if item_id is not None:
            try:
                item = CartItem.objects.get(id=item_id)
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
        items = CartItem.objects.filter(product_id=product_id)
        if items.exists():
            for item in items:
                item.quantity += 1
                item.price = item.quantity * item.product_id.price
                item.save()

            serializer = CartItemSerializer(items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            serializer = CartItemSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            {"detail": "An unexpected error occurred."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    elif request.method == "PUT":

        if item_id is None:
            return Response(
                {"error": "ID is required to update an item."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            item = CartItem.objects.get(id=item_id)
            action = request.data.get("action")
            if action == "increment":
                item.quantity += 1
            elif action == "decrement":
                item.quantity -= 1
                if item.quantity <= 0:
                    item.delete()
                    return Response(status=status.HTTP_204_NO_CONTENT)

            item.save()
            serializer = CartItemSerializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response(
                {"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND
            )

    elif request.method == "DELETE":
        # Delete an item from the cart
        if item_id is None:
            return Response(
                {"error": "ID is required to delete an item."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            item = CartItem.objects.get(id=item_id)
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response(
                {"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND
            )


@permission_classes([IsAuthenticated])
@api_view(["POST"])
def create_order(request):
    if request.user.is_authenticated:
        try:

            cart_id = request.data.get("cart_id")
            cart = Cart.objects.get(id=cart_id, is_paid=False)

            serializer = OrderSerializer(
                data={
                    "user": request.user.id,
                    "cart": cart_id,
                    "address": request.data.get("address"),
                }
            )

            if serializer.is_valid():

                order = serializer.save()
                cart.is_paid = True
                cart.save()

                return Response(
                    {"success": "Order created successfully"},
                    status=status.HTTP_201_CREATED,
                )
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Cart.DoesNotExist:
            return Response(
                {"error": "Cart not found or already paid."},
                status=status.HTTP_404_NOT_FOUND,
            )

    else:
        return Response(
            {"error": "Authentication credentials were not provided."},
            status=status.HTTP_401_UNAUTHORIZED,
        )
