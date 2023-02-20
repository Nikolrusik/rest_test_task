from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer, SlugRelatedField
from .models import Products, Cart, MeasureUnit
from user.models import User
from user.serializers import UserSerializer

class ProductsSerializer(ModelSerializer):
    class Meta:
        model = Products
        fields = ['id', 'title', 'description', 'image']

class MeasureUnitSerializer(HyperlinkedModelSerializer):
    product = ProductsSerializer
    
    class Meta:
        model =  MeasureUnit
        fields = ['id', 'articul', 'name', 'amount', 'price', 'product']

class CartSerializer(HyperlinkedModelSerializer):
    product = ProductsSerializer
    measure = MeasureUnitSerializer
    user = UserSerializer

    class Meta:
        model = Cart
        fields = ['id', 'product', 'measure', 'user', 'amount','total']

class CartPostSerializer(ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'product', 'measure', 'user', 'amount','total']