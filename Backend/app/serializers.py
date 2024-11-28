from rest_framework import serializers
from app.models import  Overview_movie, Overview_serie, Comment_overview_movies,Comment_overview_series, Movie, Series, WatchList

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'tmdb_id', 'title'] 
class OverviewMovieSerializer(serializers.ModelSerializer):
    tmdb_id = serializers.IntegerField(source='id_movie.tmdb_id', read_only=True)  # Exibe o `tmdb_id` do filme na resposta
    tmdb_id_input = serializers.IntegerField(write_only=True)  # Campo usado apenas para input
    owner = serializers.ReadOnlyField(source='owner.username')  # Nome do usuário autenticado na resposta
    owner_id = serializers.ReadOnlyField(source='owner.id')
    class Meta:
        model = Overview_movie
        fields = [
            'id',
            'tmdb_id',
            'tmdb_id_input',
            'overview_text_movie',
            'date_overview',  # Torne este campo editável
            'stars',
            'owner',
            'owner_id'
        ]
        read_only_fields = ['id', 'tmdb_id', 'owner','owner_id']

    def create(self, validated_data):
        # Verifica se o usuário está autenticado
        user = self.context['request'].user
        if user.is_anonymous:
            raise serializers.ValidationError("Usuário não autenticado")

        tmdb_id = validated_data.pop('tmdb_id_input', None)

        # Valida se `tmdb_id` foi enviado
        if not tmdb_id:
            raise serializers.ValidationError({'tmdb_id_input': 'Este campo é obrigatório.'})

        # Busca ou cria o filme baseado no `tmdb_id`
        movie, created = Movie.objects.get_or_create(tmdb_id=tmdb_id)
        if created:
            # Adicione lógica para preencher dados do filme, como título
            movie.title = 'Título Padrão'  # Ou buscar informações externas
            movie.save()

        # Cria a avaliação associando ao filme e ao usuário autenticado
        validated_data['id_movie'] = movie
        validated_data['owner'] = user  # Atribui o usuário autenticado ao campo owner
        return Overview_movie.objects.create(**validated_data)

class OverviewSerieSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')  # Mostra o nome do usuário autenticado

    class Meta:
        model = Overview_serie
        fields = [
            'id',
            'id_series',
            'overview_text_serie',
            'date_overview',
            'stars',
            'owner',
        ]
        read_only_fields = ['id', 'date_overview', 'owner']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user  # Associa o usuário autenticado
        return Overview_serie.objects.create(**validated_data)

class CommentOverviewSeriesSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')  # Mostra o nome do usuário autenticado
    
    class Meta:
        model = Comment_overview_series
        fields = [
            'id',
            'id_overview_serie',
            'text',
            'date_comment',
            'owner',
            'owner_id'
        ]
        read_only_fields = ['id', 'owner', 'owner_id']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user  # Associa o usuário autenticado
        return Comment_overview_series.objects.create(**validated_data)

class CommentOverviewMoviesSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')  
    owner_id = serializers.ReadOnlyField(source='owner.id')
    class Meta:
        model = Comment_overview_movies
        fields = [
            'id',
            'id_overview_movie',
            'text',
            'owner',
            'owner_id'
        ]
        read_only_fields = ['id', 'owner', 'owner_id']

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user  # Associa o usuário autenticado
        return Comment_overview_movies.objects.create(**validated_data)

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
    

class FavoriteMovieSerializer(serializers.ModelSerializer):
    tmdb_id = serializers.IntegerField()  # Campo de entrada para o ID do TMDb
    favorite = serializers.BooleanField(default=False)  # Campo para marcar como favorito
    title = serializers.CharField(read_only=True)  # O campo `title` agora é somente leitura

    class Meta:
        model = Movie
        fields = ['id', 'tmdb_id', 'title', 'favorite']

    def create(self, validated_data):
        # Extrair o ID do TMDb e o valor de `favorite`
        tmdb_id = validated_data.get('tmdb_id')
        favorite = validated_data.get('favorite', False)

        # Buscar ou criar o filme pelo `tmdb_id`
        movie, created = Movie.objects.get_or_create(tmdb_id=tmdb_id)

        if created:
            # Título padrão, opcionalmente buscar na API
            movie.title = 'Título Padrão'
        movie.favorite = favorite  # Atualizar o status de favorito
        movie.save()

        return movie