from rest_framework import serializers
from .models import User, Movie, Series,List, List_movies_series,Overview_movie,Overview_serie,Comment_overview_movies,Comment_overview_series

class UserSerialzier(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'name',
            'email',
            'date_birth',
            ' safeword'
        )

        extra_kwargs = {
            'senha': {'write_only': True},
            'email': {'write_only': True}
        }

class MovieSerializers(serializers.ModelSerializer):
    model = Movie
    fields = (
        'id',
        'title',
        'release_date',
        'vote_average',
        'genre_ids',
        'overview'
    )

class SeriesSerializers(serializers.ModelSerializer):
    model = Series
    fields = (
        'id',
        'name',
        'overview',
        'popularity',
        'genre_ids',
        'vote_average',
        'first_date',
        'poster_path'
    )

class ListSerializers(serializers.ModelSerializer):
    model = List
    fields = (
        'id',
        'overview',
        'id_user'
    )
class ListMoviesSeriesSerializers(serializers.ModelSerializer):
    model = List_movies_series
    fields = (
        'id',
        'id_list',
        'id_movies',
        'id_series'
    )

class OverviewSerieSerialiezers(serializers.ModelSerializer):
    model = Overview_serie
    fields = (
        'id',
        'vote_average',
        'text',
        'data_vote',
        'id_user',
        'id_series'
    )


class CommentOverviewSeriesSerializers(serializers.ModelSerializer):
    model = Comment_overview_series
    fields = ('id',
    'text',
    'date_coment',
    'id_user',
    'id_overview',
    )


class OverviewMovieSerializers(serializers.ModelSerializer):
    class Meta:
        model = Overview_movie
        fields = (
            'id',
            'vote_average',
            'text',
            'date_vote',
            'id_movie'
        )

    def create(self, validated_data):
        if validated_data.get('id_movie') is None:
            raise serializers.ValidationError("O campo 'id_movie' é obrigatório.")

        # Criação do objeto Overview_movie com os dados validados
        overview_movie = Overview_movie.objects.create(**validated_data)
        return overview_movie

class CommentOverviewMoviesSerializers(serializers.ModelSerializer):
    model = Comment_overview_movies
    fields = (
        'id',
        'text',
        'date_comment',
        'id_user',
        'id_overview_movie'
    )
