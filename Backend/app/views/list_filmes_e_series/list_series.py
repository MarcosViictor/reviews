
from wsgiref import headers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests


class ListSeriesViews(APIView):

    def get(self, request, *args, **kwargs):
            
        url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US"

        headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjVmMzhlYjE2MzU3Nzg1ZGI1MjkxOGFlZDBkMzNmNSIsIm5iZiI6MTcyNzIyMTMyNC4zMTc2MjcsInN1YiI6IjY2ZjA1MzNiOTJkMzk2ODUzODNiODFmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i7Uxgfzeto7U0fiSQO1xDcSPeta98dfVZOw7hsyIjYo"
        }

        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
        except requests.exceptions.HTTPError as errh:
            return Response({"error": str(errh)}, status=status.HTTP_400_BAD_REQUEST)
        except requests.exceptions.RequestException as err:
            return Response({"error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Retorna os dados da API no formato JSON
        series = response.json()
        return Response(series, status=status.HTTP_200_OK)