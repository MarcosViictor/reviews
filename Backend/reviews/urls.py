<<<<<<< HEAD
from django.contrib import admin
from django.urls import path, include
from auth_app.views import ProtectedView, PostListCreateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('auth_app.urls')),  # Inclui todas as rotas do seu app de autenticação com o prefixo `api/`
    path('posts/', PostListCreateView.as_view(), name='post-list-create'),
    #pagina temporaria para testar posts no banco
    
    path('page/', ProtectedView.as_view(), name='protected-page-view'),  
    
    # Rota direta sem prefixo
    #utilizar ProtectedView.as_view() para proteger a pagina
]
=======
"""
URL configuration for reviews project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('app.urls')),  # Incluindo as URLs do aplicativo
]
>>>>>>> 24b81cc9e019c4d09f986c4a440ca693c3a61535
