from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer




@api_view(['GET'])
def get_all_products(request):
    products= Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    print(products)
    return Response({"products":serializer.data})


@api_view(['GET'])
def get_by_id_product(request,pk):
    products = get_object_or_404(Product,id=pk)
    serializer = ProductSerializer(products,many=False)
    print(products)
    return Response({"products":serializer.data})


# @api_view(['GET'])
# def get_all_products(request):
#     products = Product.objects.all()  # Get all products
#     serializer = ProductSerializer(products, many=True)  # Serialize products
#     return Response(serializer.data)  # Return JSON response

# @api_view(['GET'])
# def get_by_id_product(request, pk):
#     try:
#         product = Product.objects.get(pk=pk)  # Get product by ID
#         serializer = ProductSerializer(product)  # Serialize product
#         return Response(serializer.data)  # Return JSON response
#     except Product.DoesNotExist:
#         return Response({"error": "Product not found"}, status=404)  # Handle not found