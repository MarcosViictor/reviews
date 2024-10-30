from rest_framework import serializers
from app.models import  Overview_movie, Overview_serie, Comment_overview_movies,Comment_overview_series, Movie, Series, WatchList

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'tmdb_id', 'title'] 
class OverviewMovieSerializer(serializers.ModelSerializer):
    tmdb_id = serializers.IntegerField(source='id_movie.tmdb_id', read_only=True)  # Exibe o tmdb_id na resposta
    tmdb_id_input = serializers.IntegerField(write_only=True)  # Campo usado apenas para input (formulário)

    class Meta:
        model = Overview_movie
        fields = [
            'id',
            'tmdb_id',  # Mostra o tmdb_id na resposta
            'tmdb_id_input',  # Usa tmdb_id_input para receber o ID no formulário
            'overview_text_movie',  # texto da avaliação
            'date_overview',  # data da avaliação
            'stars'  # estrelas de avaliação
        ]

    def create(self, validated_data):
        # Busca o filme pelo tmdb_id e associa à avaliação
        tmdb_id = validated_data.pop('tmdb_id_input')  # Usando o campo de entrada
        movie, created = Movie.objects.get_or_create(tmdb_id=tmdb_id)

        if created:
            # Caso o filme não exista, você pode preencher com informações padrão ou buscar na API
            movie.title = 'Título Padrão'  # ou buscar na API se necessário
            movie.save()

        # Cria a avaliação associando ao filme encontrado
        overview_movie = Overview_movie.objects.create(
            id_movie=movie,  # Referência ao filme
            **validated_data  # Passa os demais campos (overview_text_movie, date_overview, stars)
        )
        return overview_movie
class OverviewSerieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Overview_serie
        fields = ['id_series',
                  'overview_text_serie',
                  'date_overview',
                  'stars']
        
class CommentOverviewSeriesSerializer(serializers.ModelSerializer):
        class Meta:
            model = Comment_overview_series
            fields = ['id_overview_serie',
                      'text',
                      'date_comment']
            
class CommentOverviewMoviesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comment_overview_movies 
        fields = [
            'id_overview_movie', 
            'text',               
            'date_comment'        
        ]

# class WatchListSerializer(serializers.ModelSerializer):
#     movies = MovieSerializer(many=True, read_only=True)
#     movies_ids = serializers.PrimaryKeyRelatedField(
#         queryset=Movie.objects.all(), many=True, write_only=True, source='movies'
#     )
#     series = serializers.PrimaryKeyRelatedField(queryset=Series.objects.all(), many=True, required=False)

#     class Meta:
#         model = WatchList
#         fields = ['id', 'name', 'movies', 'movies_ids', 'series']

class WatchListSerializer(serializers.ModelSerializer):
    movies = MovieSerializer(many=True, read_only=True)  # Apenas leitura para exibir filmes
    movies_tmdb_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )
    series = serializers.PrimaryKeyRelatedField(queryset=Series.objects.all(), many=True, required=False)

    class Meta:
        model = WatchList
        fields = ['id', 'name', 'movies', 'movies_tmdb_ids', 'series']

    def create(self, validated_data):
        movies_tmdb_ids = validated_data.pop('movies_tmdb_ids', [])
        watchlist = WatchList.objects.create(**validated_data)

        # Buscar ou criar filmes com base nos tmdb_ids fornecidos
        for tmdb_id in movies_tmdb_ids:
            movie, created = Movie.objects.get_or_create(tmdb_id=tmdb_id)
            if created:
                movie.title = 'Título Padrão'  # Preencher título padrão ou buscar na API
                movie.save()
            watchlist.movies.add(movie)  # Adiciona o filme à lista de filmes da WatchList

        return watchlist