from email import header
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests

class SearchMovieView(APIView):

    def get(self, request, *args, **kwargs):

        query = kwargs.get('query')

        if not query:
            return Response({"error": "Parâmetro 'query' é necessário."}, status=status.HTTP_400_BAD_REQUEST)

        url = f'https://api.themoviedb.org/3/search/movie?query={query}'


        headers = {
            "accept": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjVmMzhlYjE2MzU3Nzg1ZGI1MjkxOGFlZDBkMzNmNSIsIm5iZiI6MTcyNzIyMTMyNC4zMTc2MjcsInN1YiI6IjY2ZjA1MzNiOTJkMzk2ODUzODNiODFmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i7Uxgfzeto7U0fiSQO1xDcSPeta98dfVZOw7hsyIjYo"
        }
    
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Verifica se a requisição teve sucesso (status 200)
        except requests.exceptions.HTTPError as errh:
            return Response({"error": str(errh)}, status=status.HTTP_400_BAD_REQUEST)
        except requests.exceptions.RequestException as err:
            return Response({"error": str(err)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        search_movie = response.json()

        return Response(search_movie, status= status.HTTP_200_OK)
