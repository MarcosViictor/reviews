from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from auth_app.models import CustomUser
from django.utils.timezone import now
# Create your models here.

class Base (models.Model):
    criacao = models.DateTimeField(auto_now_add = True)
    atualizacao = models.DateTimeField(auto_now = True)
    ativo = models.BooleanField(default = True)
    
    class Meta:
        abstract = True
        

        # Filmes
class Movie(models.Model):
    tmdb_id = models.IntegerField(unique=True)  # ID do TMDb
    title = models.CharField(max_length=255)
    overview = models.TextField(null=True, blank=True)
    release_date = models.DateField(null=True, blank=True)
    vote_average = models.FloatField(default=0)
    vote_count = models.IntegerField(default=0)
    popularity = models.FloatField(default=0)
    poster_path = models.URLField(max_length=500, null=True, blank=True)
    backdrop_path = models.URLField(max_length=500, null=True, blank=True)
    favorite = models.BooleanField(default=False)  # Novo campo para marcar como favorito

    def __str__(self):
        return self.title
class Series(models.Model):
    id_tmdb = models.IntegerField(unique=True)  # id do TMDB
    title = models.CharField(max_length=100)  # título da série traduzido
    title_original = models.CharField(max_length=100)  # título original
    overview = models.TextField()  # sinopse pode ser longa, removi o max_length
    status = models.CharField(max_length=50)  # status da série (e.g., 'Ended', 'Returning Series')
    num_season = models.IntegerField()  # número de temporadas
    num_episode = models.IntegerField()  # número de episódios
    popularity = models.FloatField()  # popularidade da série de acordo com a API
    release_date = models.DateField()  # data de lançamento da série
    length_serie = models.IntegerField(null=True, blank=True)  # duração total da série (opcional)
    vote_average = models.FloatField()  # média de votos da série
    genre_ids = models.JSONField()  # lista de gêneros (JSON é uma boa opção para listas)
    language_original = models.CharField(max_length=20)  # idioma original
    language = models.CharField(max_length=20)  # idioma traduzido
    cast_serie = models.TextField()  # elenco (usar TextField para uma lista grande)
    director_serie = models.TextField()  # diretor (usar TextField para uma lista grande)
    poster_path = models.URLField(max_length=255)  # poster da série (URL)

    def __str__(self):
        return self.title
   
      

# Avaliação de séries
class Overview_serie(Base):
    id_series = models.ForeignKey(Series, on_delete=models.CASCADE)  # id da tabela série
    overview_text_serie = models.TextField(max_length=500)  # Avaliação em comentário na série
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="overview_series")
    date_overview = models.DateField()  # data da avaliação (metadado)
    stars = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)  # estrelas da série dada pelo usuário

    def __str__(self):
        return f"{self.id_series} - {self.owner.username}"


class Comment_overview_series(Base):
    id_overview_serie = models.ForeignKey(Overview_serie, on_delete=models.CASCADE)  # id da avaliação da série
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="comments_overview_series")
    text = models.TextField(max_length=200)  # comentário na avaliação feito na série
    date_comment = models.DateField(default=now)   # data do comentário feito na avaliação (metadado)

    def __str__(self):
        return f"Comment by {self.owner.username} on {self.id_overview_serie}"


class Overview_movie(Base):
    id_movie = models.ForeignKey(Movie, on_delete=models.CASCADE)  # id da tabela movie
    overview_text_movie = models.TextField(max_length=500)  # Avaliação em comentário no filme
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="overview_movies")
    date_overview = models.DateField(default=now)  
    stars = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)  # estrelas do filme dadas pelo usuário

    def __str__(self):
        return f"{self.id_movie} - {self.owner.username}"


class Comment_overview_movies(Base):
    id_overview_movie = models.ForeignKey(Overview_movie, on_delete=models.CASCADE)  # id da avaliação do filme
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="comments_overview_movies")
    text = models.TextField(max_length=200)  # comentário na avaliação feito no filme
    date_comment = models.DateField()  # data do comentário feito na avaliação (metadado)

    def __str__(self):
        return f"Comment by {self.owner.username} on {self.id_overview_movie}"


class WatchList(Base):
    name = models.CharField(max_length=255)  # Nome da lista
    movies = models.ManyToManyField(Movie, blank=True)  # Relacionamento opcional com Movie
    series = models.ManyToManyField(Series, blank=True)  # Relacionamento opcional com Series

    def __str__(self):
        return self.name
