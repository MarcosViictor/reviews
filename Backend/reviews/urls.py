from django.contrib import admin
from django.urls import path, include
from auth_app.views import ProtectedView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('auth_app.urls')),  # Inclui todas as rotas do app de autenticação
    path('page/', ProtectedView.as_view(), name='protected-page-view'),  # Página protegida para teste
    path('api/v1/', include('app.urls')),  # Rotas da aplicação principal
]
