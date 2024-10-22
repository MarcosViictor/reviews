import requests
from django.core.management.base import BaseCommand
from app.models import Movie

class Command(BaseCommand):
    help = 'Importa filmes da API do TMDb para o banco de dados'

    def handle(self, *args, **kwargs):
        API_KEY= '7b5f38eb16357785db52918aed0d33f5'
        url = f'https://api.themoviedb.org/3/movie/popular?api_key={API_KEY}&language=pt-BR&page=1'
        response = requests.get(url)

        if response.status_code == 200:
            movies = response.json()['results']
            for movie_data in movies:
                movie, created = Movie.objects.update_or_create(
                    tmdb_id=movie_data['id'],
                    defaults={
                        'title': movie_data['title'],
                        'overview': movie_data.get('overview', ''),
                        'release_date': movie_data.get('release_date') or None,
                        'vote_average': movie_data.get('vote_average', 0),
                        'vote_count': movie_data.get('vote_count', 0),
                        'popularity': movie_data.get('popularity', 0),
                        'poster_path': f"https://image.tmdb.org/t/p/w500{movie_data['poster_path']}" if movie_data.get('poster_path') else None,
                        'backdrop_path': f"https://image.tmdb.org/t/p/w500{movie_data['backdrop_path']}" if movie_data.get('backdrop_path') else None,
                    }
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Filme '{movie.title}' foi inserido com sucesso"))
                else:
                    self.stdout.write(self.style.WARNING(f"Filme '{movie.title}' foi atualizado"))
        else:
            self.stdout.write(self.style.ERROR('Falha ao obter dados da API do TMDb'))