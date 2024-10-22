from requests import Response
from rest_framework import generics
from rest_framework.views import APIView
from app.models import Overview_movie
from app.serializers import OverviewMovieSerializer


class OverviewMovieListCreateView(generics.ListCreateAPIView):
    queryset = Overview_movie.objects.all()
    serializer_class = OverviewMovieSerializer
class OverviewMovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Overview_movie.objects.all()
    serializer_class = OverviewMovieSerializer
    lookup_field = 'id_movie'

