from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests

class GenresView(APIView):

    def get(self, request, *args, **kwargs):
        id_genre = request.query_params.get('idGenre') 
        if not id_genre:
            return Response({"error": "idGenre is required"}, status=status.HTTP_400_BAD_REQUEST)

        url = f"https://api.themoviedb.org/3/discover/movie?with_genres={id_genre}&language=pt-BR"

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

        movies = response.json()  
        return Response(movies, status=status.HTTP_200_OK)
