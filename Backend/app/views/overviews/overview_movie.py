from urllib import request as url_request  
from rest_framework import generics, status
from rest_framework.response import Response
import json 
from ...models import Overview_movie
from ...serializers import OverviewMovieSerializers

class MovieReviewCreateView(generics.CreateAPIView):
    serializer_class = OverviewMovieSerializers
    
    def get_movie(self, id_movie):
        api_key = '7b5f38eb16357785db52918aed0d33f5'
        url = f"https://api.themoviedb.org/3/search/movie?query={id_movie}&api_key=7b5f38eb16357785db52918aed0d33f5"
        
        try:
            with url_request.urlopen(url) as response:  
                if response.status == 200:
                    data = response.read()
                    return json.loads(data)
                else:
                    print(f"Erro na resposta: {response.status}")  
        except Exception as e:
            print(f"Erro ao acessar a API: {e}")  
        return None

    def post(self, request, *args, **kwargs):
        id_movie = request.data.get('id_movie')
        
        if id_movie is None:
            return Response({'error': 'ID do filme não fornecido.'}, status=status.HTTP_400_BAD_REQUEST)
        
        movie_details = self.get_movie(id_movie)

        if movie_details is None:
            return Response({'error': 'Filme não encontrado no TMDb'}, status=status.HTTP_404_NOT_FOUND)

       
        movie, created = Overview_movie.objects.get_or_create(
            id=id_movie,
            defaults={
                'vote_average': movie_details.get('vote_average'),
                'date_vote': movie_details.get('release_date')
            }
        )

        
        request.data['vote_average'] = movie_details.get('vote_average')
        request.data['date_vote'] = movie_details.get('release_date')
        
        
        print("Dados da requisição:", request.data)

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            print("Dados validados:", serializer.validated_data)  
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print(serializer.errors) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
