from rest_framework import generics
from rest_framework.views import APIView
from app.models import Comment_overview_series
from app.serializers import CommentOverviewSeriesSerializer


class CommentOverviewSeriesView(generics.ListCreateAPIView):
    queryset = Comment_overview_series.objects.all()
    serializer_class = CommentOverviewSeriesSerializer

class CommentOverviewSeriesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment_overview_series.objects.all()
    serializer_class = CommentOverviewSeriesSerializer
    lookup_field = 'id_overview_series'