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
