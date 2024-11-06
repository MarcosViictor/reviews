from rest_framework import generics
from rest_framework.response import Response
from app.models import WatchList
from app.serializers import WatchListSerializer

class WatchListCreateView(generics.ListCreateAPIView):
    queryset = WatchList.objects.all()
    serializer_class = WatchListSerializer

    def perform_create(self, serializer):
        serializer.save()

class WatchListDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = WatchList.objects.all()
    serializer_class = WatchListSerializer
