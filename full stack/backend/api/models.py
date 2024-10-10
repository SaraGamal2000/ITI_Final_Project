from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.utils.html import mark_safe
from django.utils.text import slugify
from django.core.validators import RegexValidator

from shortuuid.django_fields import ShortUUIDField
import shortuuid

#
from django.conf import settings


class User(AbstractUser):
    username = models.CharField(unique=True, max_length=100)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100, null=True, blank=True)
    otp = models.CharField(max_length=100, null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        # email_username, mobile = self.email.split("@")
        email_username, _ = self.email.split("@")
        if self.full_name == "" or self.full_name == None:
            self.full_name = email_username
        if self.username == "" or self.username == None:
            self.username = email_username

        super(User, self).save(*args, **kwargs)


class Profile(models.Model):
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    image = models.FileField(
        upload_to="user", default="user/default-user.png", null=True, blank=True
    )
    full_name = models.CharField(max_length=100, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    phone = models.CharField(
        max_length=12,
        validators=[
            RegexValidator(
                regex="^01[0|1|2|5][0-9]{8}$",
                message="Phone must be start 010, 011, 012, 015 and all number contains 11 digits",
            )
        ],
        blank=True,
    )
    about = models.TextField(null=True, blank=True)
    author = models.BooleanField(default=False)
    country = models.CharField(max_length=100, null=True, blank=True)
    facebook = models.CharField(max_length=100, null=True, blank=True)
    twitter = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.full_name:
            return str(self.full_name)
        else:
            return str(self.user.full_name)

    def save(self, *args, **kwargs):
        if self.full_name == "" or self.full_name == None:
            self.full_name = self.user.full_name
        super(Profile, self).save(*args, **kwargs)

    def thumbnail(self):
        return mark_safe(
            '<img src="/media/user/%s" width="50" height="50" object-fit:"cover" style="border-radius: 30px; object-fit: cover;" />'
            % (self.image)
        )


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)


# =================================================================
# Produc
class ProductApi(models.Model):
    STATUS = (
        ("Active", "Active"),
        ("Draft", "Draft"),
        ("Disabled", "Disabled"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, null=True, blank=True
    )

    full_name = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(
        max_length=12,
        validators=[
            RegexValidator(
                regex="^01[0|1|2|5][0-9]{8}$",
                message="Phone must be start 010, 011, 012, 015 and all number contains 11 digits",
            )
        ],
        blank=True,
    )

    title = models.CharField(max_length=1000)
    description = models.TextField(null=True, blank=True)
    governorate = models.CharField(max_length=2000)
    price_per_unit = models.DecimalField(max_digits=15, decimal_places=2)

    thumbnail = models.FileField(upload_to="product", null=True, blank=True)
    image1 = models.FileField(upload_to="product", null=True, blank=True)
    image2 = models.FileField(upload_to="product", null=True, blank=True)
    image3 = models.FileField(upload_to="product", null=True, blank=True)
    image4 = models.FileField(upload_to="product", null=True, blank=True)

    # image = models.FileField(upload_to="image", null=True, blank=True)
    tags = models.CharField(max_length=100)
    status = models.CharField(max_length=100, choices=STATUS, default="Active")
    slug = models.SlugField(unique=True, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "ProductApi"

    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug == None:
            self.slug = slugify(self.title) + "-" + shortuuid.uuid()[:2]
        super(ProductApi, self).save(*args, **kwargs)
