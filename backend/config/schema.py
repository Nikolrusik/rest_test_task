import graphene
from graphene_django import DjangoObjectType
from graphene_django.rest_framework.mutation import SerializerMutation
from mainapp.serializers import CartPostSerializer
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


class CartInput(graphene.InputObjectType):
    id = graphene.ID()
    product = graphene.Int()
    measure = graphene.Int()
    user = graphene.Int()
    amount = graphene.Int()
    total = graphene.Float()

class SuperCart(SerializerMutation):
    class Meta:
        serializer_class = CartPostSerializer
        extra_kwargs = {
            'id': {'read_only': False, 'required': False},
            'producto': {'read_only': False, 'required': False},
            'user': {'read_only': False, 'required': False},
            'measure': {'read_only': False, 'required': False},
            'amount': {'read_only': False, 'required': False},
            'total': {'read_only': False, 'required': False}
        }

class DelCart(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID()

    @classmethod
    def mutate(cls, root, info, **kwargs):
        obj = Cart.objects.get(pk=kwargs["id"])    
        obj.delete()
        return cls(ok=True)

class Mutation(graphene.ObjectType):
    super_cart = SuperCart.Field()
    delete_cart = DelCart.Field()

class Query(graphene.ObjectType):
    all_products = graphene.List(ProductsType)
    all_measure = graphene.List(MeasureType)
    all_cart = graphene.List(CartType)
    all_user = graphene.List(UserType)
    product_by_id = graphene.Field(ProductsType, id=graphene.Int(required=True))

    def resolve_product_by_id(self, info, id):
        try:
            return Products.objects.get(id=id)
        except Products.DoesNotExist:
            return None

    def resolve_all_products(root, info):
        return Products.objects.all()
    def resolve_all_cart(root, info):
        return Cart.objects.all()
    def resolve_all_measure(root, info):
        return MeasureUnit.objects.all()
    def resolve_all_user(root, info):
        return User.objects.all()    

schema = graphene.Schema(query=Query, mutation=Mutation)