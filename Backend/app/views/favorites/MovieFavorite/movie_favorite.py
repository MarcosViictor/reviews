from rest_framework import generics
from app.models import Movie
from app.serializers import FavoriteMovieSerializer

class FavoriteMovieView(generics.CreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = FavoriteMovieSerializer

class FavoriteMovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = FavoriteMovieSerializer

class FavoriteMovieListView(generics.ListAPIView):
    serializer_class = FavoriteMovieSerializer

    def get_queryset(self):
        return Movie.objects.filter(favorite=True)