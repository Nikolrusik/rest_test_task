from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views

from mainapp.views import ProductsViewSet, CartViewSet, MeasureUnitViewSet 
from user.views import UserModelViewSet 

router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('products', ProductsViewSet)
router.register('cart', CartViewSet)
router.register('measures', MeasureUnitViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-token-auth/', views.obtain_auth_token),
    path('api/', include(router.urls)),
]
