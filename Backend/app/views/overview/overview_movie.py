from requests import Response
from rest_framework import generics
from rest_framework.views import APIView
from app.models import Overview_movie
from app.serializers import OverviewMovieSerializer

# View para listar todas as avaliações e criar uma nova
class OverviewMovieListCreateView(generics.ListCreateAPIView):
    queryset = Overview_movie.objects.all()
    serializer_class = OverviewMovieSerializer

# View para visualizar, atualizar ou deletar uma avaliação específica pelo id do filme
class OverviewMovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Overview_movie.objects.all()
    serializer_class = OverviewMovieSerializer
    lookup_field = 'id_movie'

class MovieOverviewListView(APIView):
    def get(self, request):
        # Fazendo o JOIN usando select_related para incluir o filme
        overviews = Overview_movie.objects.select_related('id_movie').values(
            'id_movie__title',  # Campo do título do filme
            'overview_text_movie'  # Campo do comentário
        )
        return Response(overviews)