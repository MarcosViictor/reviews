# reviews/urls.py
from django.contrib import admin
from django.urls import path, include  # Importando include para usar as URLs do app

urlpatterns = [
    path('admin/', admin.site.urls),
 
    path('auth/', include('auth_app.urls')),  # Incluindo as URLs do auth_app
]
