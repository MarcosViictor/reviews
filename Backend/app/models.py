from django.db import models
from django.contrib.auth.hashers import make_password, check_password

# Create your models here.

class Base (models.Model):
    criacao = models.DateTimeField(auto_now_add = True)
    atualizacao = models.DateTimeField(auto_now = True)
    ativo = models.BooleanField(default = True)
    
    class Meta:
        abstract = True
        

        # Filmes
class Movie(models.Model):
    tmdb_id = models.IntegerField(unique=True)  # Certifique-se de que o nome do campo está correto
    title = models.CharField(max_length=255)
    overview = models.TextField(null=True, blank=True)
    release_date = models.DateField(null=True, blank=True)
    vote_average = models.FloatField(default=0)
    vote_count = models.IntegerField(default=0)
    popularity = models.FloatField(default=0)
    poster_path = models.URLField(max_length=500, null=True, blank=True)
    backdrop_path = models.URLField(max_length=500, null=True, blank=True)

    def _str_(self):
        return self.title
class Series (Base):
    id_tmdb = models.IntegerField(unique=True) # api do TMDB para pegar os filmes e séries
    title = models.CharField(max_length=50) # título da série traduzido
    title_original = models.CharField(max_length=50) # título da série original
    overview = models.TextField(max_length=200) # sinopse da série
    status = models.CharField(max_length=50) # status da série
    num_season = models.IntegerField() # número de temporadas
    num_episode = models.IntegerField() # número de episódios
    popularity = models.FloatField() # popularidade da serie de acordo com a api
    release_date = models.DateField() # data de lançamento da serie
    length_serie = models.IntegerField() # duração da serie
    vote_average = models.FloatField() # média de votos da serie
    genre_ids = models.CharField(max_length=50) # gênero da serie
    language_original = models.CharField(max_length=20) # idioma original da serie
    language = models.CharField(max_length=20) # idioma traduzido da serie
    cast_serie = models.CharField(max_length=100) # elenco da serie
    director_serie = models.CharField(max_length=100) # diretor da serie
    poster_path = models.CharField(max_length=255) # poster da serie em url
    
    def __str__(self):
        return self.title
    
    
        # LISTA    
class List (Base):
    id_movie = models.ForeignKey (Movie, on_delete=models.CASCADE) #id da tabela filme
    id_series = models.ForeignKey(Series, on_delete=models.CASCADE) # id da tabela série
    list_creation_date = models.DateField() # data da criação da lista (metadado)
    name = models.CharField(max_length=50) # nome da lista que o usuário vai dar
    description = models.TextField(max_length=200) # descrição da lista criada
    privacy = models.BooleanField(default=True) #opção de deixar a lista pública ou privada
    
    
    def __str__(self):
        return self.name
    
      

# Avaliação de séries
class Overview_serie (Base):
    id_series = models.ForeignKey(Series, on_delete=models.CASCADE) # id da tabela série
    overview_text_serie = models.TextField(max_length=500) # Avaliação em comentário na série
    date_overview = models.DateField () # data da avaliação (metadado)
    stars = models.DecimalField(max_digits=3, decimal_places=1, default=0.0) # estrelas da série dada pelo usuário

    
    
    # Comentário da avaliação da série
class Comment_overview_series (Base):
    id_overview_serie = models.ForeignKey (Overview_serie, on_delete=models.CASCADE) #id da avaliação da série
    text = models.TextField(max_length=200) # comentário na avaliação feito na série
    date_comment = models.DateField() # data do comentário feito na avaliação (metadado)

    
    
    
    # Avaliação do Filme
class Overview_movie (Base):
    id_movie = models.ForeignKey(Movie, on_delete=models.CASCADE) # id da tabela movie
    overview_text_movie = models.TextField(max_length=500) # Avaliação em comentário no filme
    date_overview = models.DateField () # data da avaliação (metadado)
    stars = models.DecimalField(max_digits=3, decimal_places=1, default=0.0) # estrelas da série dada pelo usuário
    
    
    
    # Comentário da avaliação do filme
class Comment_overview_movies (Base):
    id_overview_movie = models.ForeignKey (Overview_movie, on_delete=models.CASCADE) #id da avaliação do filme
    text = models.TextField(max_length=200) # comentário na avaliação feito no filme
    date_comment = models.DateField() # data do comentário feito na avaliação (metadado)
    
    
    

