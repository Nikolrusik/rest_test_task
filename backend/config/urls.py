from django.contrib import admin
from django.urls import path
from rest_framework.router import DefaultRouter
from rest_framework.authtoken import views

router = DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
]
