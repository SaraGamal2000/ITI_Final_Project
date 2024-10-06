from django.db import models
from django.contrib.auth.models import User


class Category(models.TextChoices):
    CONFECTIONERY = 'Confectionery'
    BEVERAGES = 'Beverages'
    MEAT = 'Meat'
    
    
class Product(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=200,default="",blank=False)
    description = models.TextField(max_length=1000,default="",blank=False)
    price = models.DecimalField(max_digits=7,decimal_places=2,default=0)
    brand = models.CharField(max_length=200,default="",blank=False)
    category = models.CharField(max_length=40,choices=Category.choices)
    ratings = models.DecimalField(max_digits=3,decimal_places=2,default=0)
    stock = models.IntegerField(default=0)
    createAt = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='products_images/',null=True, blank=True)
    
    
    
def __str__(self):
        return self.name