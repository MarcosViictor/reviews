from requests import Response
from rest_framework import generics
from rest_framework.views import APIView
from app.models import Overview_movie
from app.serializers import OverviewMovieSerializer


class OverviewMovieListCreateView(generics.ListCreateAPIView):
    queryset = Overview_movie.objects.all()
    serializer_class = OverviewMovieSerializer
# class OverviewMovieDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Overview_movie.objects.all()
#     serializer_class = OverviewMovieSerializer
#     lookup_field = 'id_movie'

class OverviewMovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OverviewMovieSerializer
    lookup_field = 'id'  # Usa o ID da avaliação para recuperar um comentário específico
    lookup_url_kwarg = 'id'  # Parâmetro da URL a ser usado para buscar a avaliação correta

    def get_queryset(self):
        # Filtra avaliações, associadas ao tmdb_id de um filme específico
        return Overview_movie.objects.all()

