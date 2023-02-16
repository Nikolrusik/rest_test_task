from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import Products, Cart, MeasureUnit
from user.models import User

class ProductsSerializer(ModelSerializer):
    class Meta:
        model = Products
        fields = ['id', 'title', 'description', 'image']

class MeasureUnitSerializer(HyperlinkedModelSerializer):
    product = ProductsSerializer
    class Meta:
        model =  MeasureUnit
        fields = ['id']
