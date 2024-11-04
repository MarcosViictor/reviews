from django.db import models
from django.contrib.auth.hashers import make_password, check_password

# Modelo base abstrato, contendo campos comuns para outros modelos
class Base(models.Model):
    criacao = models.DateTimeField(auto_now_add=True)  # Data e hora de criação do registro, adicionada automaticamente
    atualizacao = models.DateTimeField(auto_now=True)  # Data e hora de atualização do registro, atualizada automaticamente
    ativo = models.BooleanField(default=True)  # Indica se o registro está ativo

    class Meta:
        abstract = True  # Define que este modelo é abstrato e não será criado no banco de dados


# Modelo de filme, representando dados de filmes com informações do TMDb
class Movie(models.Model):
    tmdb_id = models.IntegerField(unique=True)  # ID único do filme no TMDb
    title = models.CharField(max_length=255)  # Título do filme
    overview = models.TextField(null=True, blank=True)  # Sinopse do filme (opcional)
    release_date = models.DateField(null=True, blank=True)  # Data de lançamento do filme (opcional)
    vote_average = models.FloatField(default=0)  # Média de votos do filme
    vote_count = models.IntegerField(default=0)  # Quantidade de votos recebidos pelo filme
    popularity = models.FloatField(default=0)  # Popularidade do filme
    poster_path = models.URLField(max_length=500, null=True, blank=True)  # URL do poster do filme (opcional)
    backdrop_path = models.URLField(max_length=500, null=True, blank=True)  # URL da imagem de fundo do filme (opcional)
    favorite = models.BooleanField(default=False)  # Campo para marcar o filme como favorito

    def __str__(self):
        return self.title  # Retorna o título do filme como representação em string


# Modelo de série, representando dados de séries com informações do TMDb
class Series(models.Model):
    id_tmdb = models.IntegerField(unique=True)  # ID único da série no TMDb
    title = models.CharField(max_length=100)  # Título traduzido da série
    title_original = models.CharField(max_length=100)  # Título original da série
    overview = models.TextField()  # Sinopse da série
    status = models.CharField(max_length=50)  # Status da série (e.g., 'Ended', 'Returning Series')
    num_season = models.IntegerField()  # Número de temporadas
    num_episode = models.IntegerField()  # Número de episódios
    popularity = models.FloatField()  # Popularidade da série
    release_date = models.DateField()  # Data de lançamento da série
    length_serie = models.IntegerField(null=True, blank=True)  # Duração total da série (opcional)
    vote_average = models.FloatField()  # Média de votos da série
    genre_ids = models.JSONField()  # Lista de IDs de gêneros em formato JSON
    language_original = models.CharField(max_length=20)  # Idioma original da série
    language = models.CharField(max_length=20)  # Idioma traduzido da série
    cast_serie = models.TextField()  # Elenco da série
    director_serie = models.TextField()  # Diretores da série
    poster_path = models.URLField(max_length=255)  # URL do poster da série

    def __str__(self):
        return self.title  # Retorna o título da série como representação em string


# Modelo de avaliação de série, permitindo comentários e classificação em estrelas
class Overview_serie(Base):
    id_series = models.ForeignKey(Series, on_delete=models.CASCADE)  # Chave estrangeira para o modelo de série
    overview_text_serie = models.TextField(max_length=500)  # Texto de avaliação/comentário da série
    date_overview = models.DateField()  # Data da avaliação
    stars = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)  # Classificação em estrelas para a série


# Modelo de comentário em uma avaliação de série
class Comment_overview_series(Base):
    id_overview_serie = models.ForeignKey(Overview_serie, on_delete=models.CASCADE)  # Chave estrangeira para a avaliação da série
    text = models.TextField(max_length=200)  # Texto do comentário
    date_comment = models.DateField()  # Data do comentário


# Modelo de avaliação de filme, permitindo comentários e classificação em estrelas
class Overview_movie(Base):
    id_movie = models.ForeignKey(Movie, on_delete=models.CASCADE)  # Chave estrangeira para o modelo de filme
    overview_text_movie = models.TextField(max_length=500)  # Texto de avaliação/comentário do filme
    date_overview = models.DateField()  # Data da avaliação
    stars = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)  # Classificação em estrelas para o filme


# Modelo de comentário em uma avaliação de filme
class Comment_overview_movies(Base):
    id_overview_movie = models.ForeignKey(Overview_movie, on_delete=models.CASCADE)  # Chave estrangeira para a avaliação do filme
    text = models.TextField(max_length=200)  # Texto do comentário
    date_comment = models.DateField()  # Data do comentário


# Modelo de lista de exibição, permitindo que o usuário crie listas de filmes e séries
class WatchList(Base):
    name = models.CharField(max_length=255)  # Nome da lista de exibição
    movies = models.ManyToManyField(Movie, blank=True)  # Relacionamento opcional com o modelo de filmes
    series = models.ManyToManyField(Series, blank=True)  # Relacionamento opcional com o modelo de séries

    def __str__(self):
        return self.name  # Retorna o nome da lista de exibição como representação em string
