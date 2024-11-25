from requests import Response
from rest_framework import generics
from rest_framework.views import APIView
from app.models import Overview_movie
from app.serializers import OverviewMovieSerializer
from rest_framework.permissions import IsAuthenticated


class OverviewMovieListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]  # Exige autenticação
    serializer_class = OverviewMovieSerializer

    def get_queryset(self):
        # Filtra as avaliações do usuário autenticado
        return Overview_movie.objects.filter(owner=self.request.user)

class OverviewMovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = OverviewMovieSerializer
    lookup_field = 'id'  # Usa o ID da avaliação para recuperar um comentário específico
    lookup_url_kwarg = 'id'  # Parâmetro da URL a ser usado para buscar a avaliação correta

    def get_queryset(self):
        # Filtra avaliações, associadas ao tmdb_id de um filme específico
        return Overview_movie.objects.all()

