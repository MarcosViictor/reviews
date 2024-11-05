from django.contrib import admin
from django.urls import path, include
from auth_app.views import ProtectedView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('auth_app.urls')),  # Inclui todas as rotas do seu app de autenticação com o prefixo `api/`
    path('page/', ProtectedView.as_view(), name='protected-page-view'),  # Rota direta sem prefixo
]
