from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app.views.overview import OverviewMovieViewSet

# Criamos um roteador para a API
router = DefaultRouter()
router.register(r'reviews', OverviewMovieViewSet, basename='overviewmovie')

# Definindo as URLs da API
urlpatterns = [
    path('', include(router.urls)),  # Isso inclui todas as rotas do ViewSet
]
