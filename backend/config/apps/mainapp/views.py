from rest_framework.viewsets import ModelViewSet
from .models import Cart, MeasureUnit, Products
from .serializers import CartSerializer, MeasureUnitSerializer, ProductsSerializer

class ProductsViewSet(ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer

class MeasureUnitViewSet(ModelViewSet):
    queryset = MeasureUnit.objects.all()
    serializer_class = MeasureUnitSerializer

class CartViewSet(ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer