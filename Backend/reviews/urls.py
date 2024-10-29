from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('auth_app.urls')),  # Inclui todas as rotas do seu app de autenticação com o prefixo `api/`
]
