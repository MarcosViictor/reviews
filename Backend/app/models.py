from django.db import models
from django.contrib.auth.hashers import make_password, check_password

# Create your models here.

class Base (models.Model):
    criacao = models.DateTimeField(auto_now_add = True)
    atualizacao = models.DateTimeField(auto_now = True)
    ativo = models.BooleanField(default = True)
    
    class Meta:
        abstract = True
        
        
        # Usuário
class User (Base):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)
    safeword = models.CharField(max_length=50)
    date_birth = models.DateField()
    
    def __str__(self):
        return self.name
    
    def set_safeword(self, raw_safeword):
        """
        Define a senha (safeword) de maneira segura, aplicando hash.
        """
        self.safeword = make_password(raw_safeword)

    def check_safeword(self, raw_safeword):
        """
        Verifica se a senha fornecida corresponde à armazenada.
        """
        return check_password(raw_safeword, self.safeword)
    


        # Filmes
class Movie (Base):
    title = models.CharField(max_length=40)
    overview = models.TextField()
    genre_ids = models.CharField(max_length=40)
    vote_average = models.FloatField()
    release_date = models.DateField()
    # backdrop_path: string
    
         
    def __str__(self):
        return self.title
    
    
        # Séries
class Series (Base):
    name = models.CharField(max_length=100)
    overview = models.TextField()
    popularity = models.IntegerField()
    genre_ids = models.CharField(max_length=40)
    vote_average = models.FloatField()
    first_date = models.DateField()
    poster_path = models.CharField(max_length=200)
    
    def __str__(self):
        return self.title
    
    
        # LISTA    
class List (Base):
    name = models.CharField(max_length=255)
    overview = models.TextField()
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    
    def __str__(self):
        return self.name
    

        # Lista de filmes e séries
class List_movies_series (Base):
    id_list = models.ForeignKey(List, on_delete=models.CASCADE)
    id_movies = models.ForeignKey(Movie, on_delete=models.CASCADE)
    id_series = models.ForeignKey(Series, on_delete=models.CASCADE)
    
    

        # Avaliação de séries
class Overview_serie (Base):
    vote_average = models.FloatField()
    text = models.TextField()
    date_vote = models.DateField ()
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_series = models.ForeignKey(Series, on_delete=models.CASCADE)
    
    
    # Comentário da avaliação da série
class Comment_overview_series (Base):
    text = models.TextField()
    date_comment = models.DateField()
    id_user = models.ForeignKey (User, on_delete=models.CASCADE)
    id_overview = models.ForeignKey (Overview_serie, on_delete=models.CASCADE)
    
    
    
    # Avaliação do Filme
class Overview_movie (Base):
    vote_average = models.FloatField()
    text = models.TextField()
    date_vote = models.DateField ()
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_movie = models.ForeignKey (Movie, on_delete=models.CASCADE)
    
    
    
    # Comentário da avaliação do filme
class Comment_overview_movies (Base):
    text = models.TextField()
    date_comment = models.DateField()
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_overview_movie = models.ForeignKey(Overview_movie, on_delete=models.CASCADE)
    
    
    