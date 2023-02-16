from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

router = DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
]
