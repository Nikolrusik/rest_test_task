from django.db import models
from user.models import User

class Products(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(verbose_name='Title', max_length=250)
    description = models.TextField(verbose_name='Description', null=True, blank=True)
    image = models.ImageField(upload_to='uploads/')
    

class MeasureUnit(models.Model):
    id = models.AutoField(primary_key=True)
    articul = models.CharField(verbose_name='Articul', max_length=250)
    name = models.CharField(verbose_name='Name measure', max_length=250)
    amount = models.IntegerField(verbose_name='Amount product')
    price = models.FloatField(verbose_name='Price product')

    product_id = models.ForeignKey(Products, on_delete=models.CASCADE)


class Cart(models.Model):
    product_id = models.ForeignKey(Products, on_delete=models.CASCADE)
    measure_id = models.ForeignKey(MeasureUnit, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.FloatField(verbose_name='Total price product')