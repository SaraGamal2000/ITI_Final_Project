from rest_framework import serializers
from product.models import Product
from .models import Cart, CartItem, Order, OrderItem


class CartItemSerializer(serializers.ModelSerializer):
    # product_name = serializers.StringRelatedField(read_only=True)  # Show product name
    product_name = serializers.CharField(source="product_id.name", read_only=True)
    Product_image = serializers.ImageField(
        source="product_id.image", read_only=True
    )  # show the product image

    class Meta:
        model = CartItem
        fields = [
            "product_name",
            "product_id",
            "quantity",
            "cart_id",
            "price",
            "Product_image",
        ]



class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ["id", "user", "created_at", "is_paid", "items", "total_price"]

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        cart = Cart.objects.create(**validated_data)
        for item_data in items_data:
            CartItem.objects.create(cart_id=cart, **item_data)
        cart.update_total_price()
        return cart

    def update(self, instance, validated_data):
        items_data = validated_data.pop("items")
        instance.is_paid = validated_data.get("is_paid", instance.is_paid)
        instance.save()

        # Update CartItem objects
        for item_data in items_data:
            item_id = item_data.get("id")
            if item_id:  # Update existing items
                item = CartItem.objects.get(id=item_id, cart_id=instance)
                item.quantity = item_data.get("quantity", item.quantity)
                item.price = item_data.get("price", item.price)
                item.save()
            else:  # Create new items
                CartItem.objects.create(cart_id=instance, **item_data)

        instance.update_total_price()
        return instance

    #//////////////////////////////////////////////////////////////////order

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product_id.name', read_only=True) 
    Product_image = serializers.ImageField(source='product_id.image', read_only=True)
    class Meta:
        model = OrderItem
        fields = ['id', 'order_id', 'product_id', 'quantity', 'price','product_name','Product_image']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'total_price', 'shipping_address', 'status', 'payment_method', 'items']




    