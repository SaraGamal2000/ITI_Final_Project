from django.db import models

# from users.models import Users
# from django.contrib.auth.models import User
from product.models import Product
from api import models as api_models


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
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)


class Order(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    user = models.ForeignKey(api_models.User, on_delete=models.CASCADE)
    cart = models.ForeignKey("Cart", on_delete=models.CASCADE)  # Link to Cart
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    address = models.CharField(max_length=255)

    items = models.ManyToManyField(CartItem)

    def __str__(self):
        return f"Order {self.id} by {self.user.username} (Cart {self.cart.id})"


# class Product(models.Model):
#     id=models.AutoField(primary_key=True)
#     name = models.CharField(max_length=100)
#     price = models.DecimalField(max_digits=10, decimal_places=2)


# class Product(models.Model):
#     name = models.CharField(max_length=255)
#     description = models.TextField()
#     price = models.DecimalField(max_digits=10, decimal_places=2)
#     # stock = models.IntegerField()
#     image = models.ImageField(upload_to='product_images/', null=True, blank=True)
#
#     def __str__(self):
#         return self.name
