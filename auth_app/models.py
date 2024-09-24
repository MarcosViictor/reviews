from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    name = models.CharField(max_length=40)
    email = models.CharField(max_length=40, unique=True)
    password = models.CharField(max_length=40)
    username = None
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []