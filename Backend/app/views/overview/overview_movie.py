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

    def get_queryset(self):
            # Obtém o tmdb_id dos parâmetros da URL
            tmdb_id = self.kwargs.get('tmdb_id')
            # Filtra as avaliações associadas ao filme com o tmdb_id fornecido
            return Overview_movie.objects.filter(id_movie__tmdb_id=tmdb_id)
