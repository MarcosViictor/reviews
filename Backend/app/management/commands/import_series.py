import requests
from django.core.management.base import BaseCommand
from app.models import Series

class Command(BaseCommand):
    help = 'Importa séries da API do TMDb para o banco de dados'

    def handle(self, *args, **kwargs):
        API_KEY = '7b5f38eb16357785db52918aed0d33f5'
        url = f'https://api.themoviedb.org/3/tv/popular?api_key={API_KEY}&language=pt-BR&page=5'
        response = requests.get(url)

        if response.status_code == 200:
            series_list = response.json()['results']
            for series_data in series_list:
                series, created = Series.objects.update_or_create(
                    id_tmdb=series_data['id'],
                    defaults={
                        'title': series_data.get('name', ''),
                        'title_original': series_data.get('original_name', ''),
                        'overview': series_data.get('overview', ''),
                        'status': series_data.get('status', 'Unknown'),
                        'num_season': series_data.get('number_of_seasons', 0),
                        'num_episode': series_data.get('number_of_episodes', 0),
                        'popularity': series_data.get('popularity', 0),
                        'release_date': series_data.get('first_air_date') or None,
                        'length_serie': series_data.get('episode_run_time', [0])[0],  # Usa o tempo médio do episódio
                        'vote_average': series_data.get('vote_average', 0),
                        'genre_ids': series_data.get('genre_ids', []),
                        'language_original': series_data.get('original_language', ''),
                        'language': 'pt-BR',  # Assumindo que as séries estão sendo traduzidas para pt-BR
                        'cast_serie': '',  # Pode ser preenchido separadamente se precisar buscar o elenco
                        'director_serie': '',  # Pode ser preenchido separadamente se necessário
                        'poster_path': f"https://image.tmdb.org/t/p/w500{series_data['poster_path']}" if series_data.get('poster_path') else None,
                    }
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f"Série '{series.title}' foi inserida com sucesso"))
                else:
                    self.stdout.write(self.style.WARNING(f"Série '{series.title}' foi atualizada"))
        else:
            self.stdout.write(self.style.ERROR('Falha ao obter dados da API do TMDb'))
