from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from app.models import Comment_overview_movies
from app.serializers import CommentOverviewMoviesSerializer

class CommentsOverviewMovieView(generics.ListCreateAPIView):
    serializer_class = CommentOverviewMoviesSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        # Filtra os comentários para uma avaliação específica
        id_overview_movie = self.kwargs.get('id_overview_movie')
        return Comment_overview_movies.objects.filter(id_overview_movie=id_overview_movie)

class CommentsOverviewMovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment_overview_movies.objects.all()
    serializer_class = CommentOverviewMoviesSerializer
    lookup_field = 'id'  # Usa o campo id único do comentário em vez de id_overview_movie
