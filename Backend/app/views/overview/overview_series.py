from requests import Response
from rest_framework import generics
from rest_framework.views import APIView
from app.models import Overview_serie
from app.serializers import OverviewSerieSerializer
from rest_framework.permissions import IsAuthenticated

class OverviewSeriesListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Overview_serie.objects.all()
    serializer_class = OverviewSerieSerializer

class OverviewSeriesDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Overview_serie.objects.all()
    serializer_class = OverviewSerieSerializer
    lookup_field = 'id_series'
