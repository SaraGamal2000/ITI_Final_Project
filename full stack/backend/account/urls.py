from django.urls import path
from . import views


urlpatterns = [
    path('register/', views.register,name='register'), 
    path('userinfo/', views.current_user,name='user_info'), 
    path('reset_password/<str:token>', views.reset_password,name='reset_password'), 
    path('userinfo/update/', views.update_user,name='update_user'), 
    path('forgot_password/', views.forgot_password,name='forgot_password'), 

]