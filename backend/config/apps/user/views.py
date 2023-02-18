from rest_framework.viewsets import GenericViewSet
from rest_framework import mixins, generics
from .models import User
from .serializers import UserSerializer


class UserModelViewSet(GenericViewSet, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer