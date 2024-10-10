from django.contrib import admin
from api import models as api_models


class UserAdmin(admin.ModelAdmin):
    search_fields = ["full_name", "username", "email"]
    list_display = ["username", "email"]


class ProfileAdmin(admin.ModelAdmin):
    search_fields = ["user"]
    list_display = ["thumbnail", "user", "full_name"]
 
 

 
 

admin.site.register(api_models.User, UserAdmin)
admin.site.register(api_models.Profile, ProfileAdmin)

