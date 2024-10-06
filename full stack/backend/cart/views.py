from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CartItemSerializer,CartSerializer
from .models import CartItem,Cart




@api_view(['GET', 'POST', 'DELETE'])
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
        serializer = CartItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Log validation errors to understand why it failed
        print("Validation errors:", serializer.errors)  # Log the errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        # Use the item_id passed in the URL
        if item_id is None:
            return Response({"error": "ID is required to delete an item."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            item = CartItem.objects.get(id=item_id)
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({"error": "CartItem not found."}, status=status.HTTP_404_NOT_FOUND)


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
