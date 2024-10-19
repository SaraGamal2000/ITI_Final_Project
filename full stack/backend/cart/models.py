from django.db import models

# from users.models import Users
# from django.contrib.auth.models import User
from product.models import Product
from api import models as api_models
from django.contrib.auth import get_user_model

User = get_user_model() 

class Cart(models.Model):

    # user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    # user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(api_models.User, null=True, on_delete=models.SET_NULL)
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def update_total_price(self):
        self.total_price = sum(item.price * item.quantity for item in self.items.all())
        self.save()


class CartItem(models.Model):
    id = models.AutoField(primary_key=True)
    cart_id = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    # product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_id = models.ForeignKey(api_models.ProductApi, on_delete=models.CASCADE)

    quantity = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)


class Order(models.Model):

    id = models.AutoField(primary_key=True)
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    user = models.ForeignKey(api_models.User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    shipping_address = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default='Pending')
    payment_method = models.CharField(max_length=50)
    


class OrderItem(models.Model):
    id = models.AutoField(primary_key=True)
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    # product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    product_id = models.ForeignKey(api_models.ProductApi, on_delete=models.CASCADE)

    quantity = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)


