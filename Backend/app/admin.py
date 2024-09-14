from django.contrib import admin


# Register your models here.



from .models import (
    User, Movie, Series, List, List_movies_series, Overview_serie,
    Comment_overview_series, Overview_movie, Comment_overview_movies
)

# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    # Usuário
    list_display = ('name', 'email', 'date_birth')

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    # Filmes
    list_display = ('title', 'release_date', 'vote_average')

@admin.register(Series)
class SeriesAdmin(admin.ModelAdmin):
    # Séries
    list_display = ('name', 'first_date', 'vote_average')

@admin.register(List)
class ListAdmin(admin.ModelAdmin):
    # Lista
    list_display = ('name', 'id_user')

@admin.register(List_movies_series)
class ListMoviesSeriesAdmin(admin.ModelAdmin):
    # Lista de filmes e séries
    list_display = ('id_list', 'id_movies', 'id_series')

@admin.register(Overview_serie)
class OverviewSerieAdmin(admin.ModelAdmin):
    # Avaliação de séries
    list_display = ('id_series', 'vote_average', 'date_vote')

@admin.register(Comment_overview_series)
class CommentOverviewSeriesAdmin(admin.ModelAdmin):
    # Comentário da avaliação da série
    list_display = ('id_overview', 'text', 'date_comment')

@admin.register(Overview_movie)
class OverviewMovieAdmin(admin.ModelAdmin):
    # Avaliação do Filme
    list_display = ('id_movie', 'vote_average', 'date_vote')

@admin.register(Comment_overview_movies)
class CommentOverviewMoviesAdmin(admin.ModelAdmin):
    # Comentário da avaliação do filme
    list_display = ('id_overview_movie', 'text', 'date_comment')
