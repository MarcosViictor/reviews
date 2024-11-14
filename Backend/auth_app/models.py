from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.auth import get_user_model
from django.db import models

class CustomUser(AbstractUser):
    # Campos adicionais aqui, se necessário
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',  # Mude o related_name
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_set',  # Mude o related_name
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )


User = get_user_model()

class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)  # Data de criação automática
    updated_at = models.DateTimeField(auto_now=True)      # Data de atualização automática
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')

    def __str__(self):
        return self.title