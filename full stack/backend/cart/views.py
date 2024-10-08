from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CartItemSerializer,CartSerializer
from .models import CartItem,Cart
import logging

logger = logging.getLogger(__name__)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def cart_items(request, item_id=None):
    if request.method == 'GET':
        # Fetch all cart items or a specific item if item_id is provided
        if item_id is not None:
            try:
                item = CartItem.objects.get(id=item_id)
                serializer = CartItemSerializer(item)
                return Response(serializer.data)
            except CartItem.DoesNotExist:
                return Response({"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND)

        items = CartItem.objects.all()
        serializer = CartItemSerializer(items, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
            product_id = request.data.get('product_id')
        
                # Retrieve all cart items for the specified product_id
            items = CartItem.objects.filter(product_id=product_id)

            if items.exists():
                # Iterate over all items and increment their quantity
                for item in items:
                    item.quantity += 1
                    item.price=item.quantity*item.price
                    item.save()
                
                # Serialize the updated items and return them
                serializer = CartItemSerializer(items, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # If no items exist, create a new one
                serializer = CartItemSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    # Return validation errors if serializer is not valid
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # If we reach here (which should not happen), return a 400 error
            return Response({"detail": "An unexpected error occurred."}, status=status.HTTP_400_BAD_REQUEST)

        
        # # logger.debug("Request data: %s", request.data) 
        # # Check if the item already exists in the cart
        # item_data = request.data
        # product_id = item_data.get('product_id')
        
        # if not product_id:
        #     return Response({"error": "product_id is required."}, status=status.HTTP_400_BAD_REQUEST)
        # try:
        #     item = CartItem.objects.filter(product_id=product_id)
        #     # If the item exists, update the quantity
        #     # item.quantity += 1
        #     # item.save()
        #     if item.exists():
        #     # Iterate over all items and increment their quantity
        #         for item in item:
        #             item.quantity += 1
        #             item.save()
        #             serializer = CartItemSerializer(item)
        #     return Response(serializer.data, status=status.HTTP_200_OK)
        # except CartItem.DoesNotExist:
        #     # If the item doesn't exist, create a new cart item
        #     serializer = CartItemSerializer(data=request.data)
        #     if serializer.is_valid():
        #         serializer.save()
        #         return Response(serializer.data, status=status.HTTP_201_CREATED)
        #     print("Validation errors:", serializer.errors)
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'PUT':
        # This will handle increasing or decreasing the quantity
        if item_id is None:
            return Response({"error": "ID is required to update an item."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            item = CartItem.objects.get(id=item_id)
            action = request.data.get('action')
            if action == 'increment':
                item.quantity += 1
            elif action == 'decrement':
                item.quantity -= 1
                if item.quantity <= 0:
                    item.delete()
                    return Response(status=status.HTTP_204_NO_CONTENT)
            item.save()
            serializer = CartItemSerializer(item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response({"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'DELETE':
        # Delete an item from the cart
        if item_id is None:
            return Response({"error": "ID is required to delete an item."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            item = CartItem.objects.get(id=item_id)
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND)
#/////////////////////////////////////////////////////////////

# @api_view(['GET', 'POST', 'DELETE'])
# def cart_items(request, item_id=None):
#     if request.method == 'GET':
#         # Fetch all cart items or a specific item if item_id is provided
#         if item_id is not None:
#             try:
#                 item = CartItem.objects.get(id=item_id)
#                 serializer = CartItemSerializer(item)
#                 return Response(serializer.data)
#             except CartItem.DoesNotExist:
#                 return Response({"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND)

#         items = CartItem.objects.all()
#         serializer = CartItemSerializer(items, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = CartItemSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         # Log validation errors to understand why it failed
#         print("Validation errors:", serializer.errors)  # Log the errors
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         # Use the item_id passed in the URL
#         if item_id is None:
#             return Response({"error": "ID is required to delete an item."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             item = CartItem.objects.get(id=item_id)
#             item.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except CartItem.DoesNotExist:
#             return Response({"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND)
#//////////////////////////////////////////////////////////////////////////////////////////////////////////////

# class CartViewSet(viewsets.ModelViewSet):
#     queryset = Cart.objects.all()
#     serializer_class = CartSerializer

#     def get_queryset(self):
#         user = self.request.user
#         return self.queryset.filter(user=user)



# @api_view(['GET', 'POST', 'DELETE'])
# def cart_items(request):
#     if request.method == 'GET':
#         items = CartItem.objects.filter(cart_id=request.user.cart)  # Assuming user has a cart
#         serializer = CartItemSerializer(items, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = CartItemSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         item_id = request.data.get('id')
#         try:
#             item = CartItem.objects.get(id=item_id)
#             item.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except CartItem.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)












# Create your views here.

# class CartItemView(viewsets.ModelViewSet):
#     queryset = CartItem.objects.select_related('product_id').all()  
#     serializer_class =CartItemSerializer


# class CartView(viewsets.ModelViewSet):
#     queryset = Cart.objects.all()
#     serializer_class =CartSerializer




#/////////////////////////////////////////////////////
# @api_view(['GET', 'POST'])
# def cart_items(request):
#     if request.method == 'GET':
#         items = CartItem.objects.all()
#         serializer = CartItemSerializer(items, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = CartItemSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         # Log validation errors to understand why it failed
#         print("Validation errors:", serializer.errors)  # Log the errors
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#//////////////////////////////////////////////////////////////////////////////
