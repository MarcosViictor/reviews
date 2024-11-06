from rest_framework import generics
from rest_framework.views import APIView
from app.models import Comment_overview_movies
from app.serializers import CommentOverviewMoviesSerializers

class CommentsOverviewMovieView(generics.ListCreateAPIView):
    queryset = Comment_overview_movies.objects.all()
    serializer_class = CommentOverviewMoviesSerializers

class CommentsOverviewMovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment_overview_movies.objects.all()
    serializer_class = CommentOverviewMoviesSerializers
    lookup_field = 'id_overview_movie'