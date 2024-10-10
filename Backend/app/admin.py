from django.contrib import admin
from .models import (
    Movie, Series, List, Overview_serie,
    Comment_overview_series, Overview_movie, Comment_overview_movies
)


class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_date', 'vote_average', 'vote_count', 'popularity')
    search_fields = ('title',)
    list_filter = ('release_date', 'vote_average', 'popularity')
    ordering = ('-release_date',)
admin.site.register(Movie, MovieAdmin)
@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    # Séries
    list_display = ('title', 'title_original', 'status', 'release_date', 'num_season', 'num_episode', 'vote_average', 'popularity', 'language')
    search_fields = ('title', 'title_original', 'genre_ids', 'status', 'language', 'director_serie', 'cast_serie')
    list_filter = ('release_date', 'status', 'vote_average', 'language', 'popularity')
    ordering = ('-release_date',)

@admin.register(List)
class ListAdmin(admin.ModelAdmin):
    # Lista
    list_display = ('name', 'id_movie', 'id_series', 'list_creation_date', 'privacy')
    search_fields = ('name', 'description')
    list_filter = ('privacy', 'list_creation_date')
    ordering = ('-list_creation_date',)

@admin.register(Overview_serie)
class OverviewSerieAdmin(admin.ModelAdmin):
    # Avaliação de séries
    list_display = ('id_series', 'date_overview', 'stars')
    search_fields = ('id_series__title', 'overview_text_serie')  # Busca pelo título da série e texto da avaliação
    list_filter = ('stars', 'date_overview')
    ordering = ('-date_overview',)

@admin.register(Comment_overview_series)
class CommentOverviewSeriesAdmin(admin.ModelAdmin):
    # Comentário da avaliação da série
    list_display = ('id_overview_serie', 'date_comment')
    search_fields = ('id_overview_serie__overview_text_serie', 'text')  # Busca pelo texto da avaliação e texto do comentário
    list_filter = ('date_comment',)
    ordering = ('-date_comment',)

@admin.register(Overview_movie)
class OverviewMovieAdmin(admin.ModelAdmin):
    # Avaliação do Filme
    list_display = ('id_movie', 'date_overview', 'stars')
    search_fields = ('id_movie__title', 'overview_text_movie')  # Busca pelo título do filme e texto da avaliação
    list_filter = ('stars', 'date_overview')
    ordering = ('-date_overview',)

@admin.register(Comment_overview_movies)
class CommentOverviewMoviesAdmin(admin.ModelAdmin):
    # Comentário da avaliação do filme
    list_display = ('id_overview_movie', 'date_comment')
    search_fields = ('id_overview_movie__overview_text_movie', 'text')  # Busca pelo texto da avaliação e texto do comentário
    list_filter = ('date_comment',)
    ordering = ('-date_comment',)




