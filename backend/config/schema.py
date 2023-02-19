import graphene
from graphene_django import DjangoObjectType
from mainapp.models import MeasureUnit, Cart, Products
from user.models import User 

class ProductsType(DjangoObjectType):
    class Meta:
        model = Products
        fields = "__all__"

class CartType(DjangoObjectType):
    class Meta:
        model = Cart
        fields = "__all__"

class MeasureType(DjangoObjectType):
    class Meta:
        model = MeasureUnit
        fields = "__all__"

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"

class Query(graphene.ObjectType):
    all_products = graphene.List(ProductsType)
    all_measure = graphene.List(MeasureType)
    all_cart = graphene.List(CartType)
    all_user = graphene.List(UserType)

    def resolve_all_products(root, info):
        return Products.objects.all()
    def resolve_all_cart(root, info):
        return Cart.objects.all()
    def resolve_all_measure(root, info):
        return MeasureUnit.objects.all()
    def resolve_all_user(root, info):
        return User.objects.all()    

schema = graphene.Schema(query=Query)