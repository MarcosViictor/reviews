import requests
from django.core.management.base import BaseCommand
from app.models import Series

class Command(BaseCommand):
    help = 'Importa séries da API do TMDb para o banco de dados'

    def handle(self, *args, **kwargs):
        API_KEY = '7b5f38eb16357785db52918aed0d33f5'
        url = f'https://api.themoviedb.org/3/tv/popular?api_key={API_KEY}&language=pt-BR&page=6'
        response = requests.get(url)

        if response.status_code == 200:
            series_list = response.json()['results']
            for series_data in series_list:
                # Função para garantir que as strings sejam tratadas corretamente
                def safe_str(value):
                    if isinstance(value, str):
                        # Tenta codificar e decodificar, ignorando erros
                        return value.encode('utf-8', 'replace').decode('utf-8', 'ignore')
                    return value

                # Tente capturar possíveis exceções
                try:
                    series, created = Series.objects.update_or_create(
                        id_tmdb=series_data['id'],
                        defaults={
                            'title': safe_str(series_data.get('title', '')),
                            'title_original': safe_str(series_data.get('original_title', '')),
                            'overview': safe_str(series_data.get('overview', '')),
                            'status': safe_str(series_data.get('status', 'Unknown')),
                            'num_season': series_data.get('number_of_seasons', 0),
                            'num_episode': series_data.get('number_of_episodes', 0),
                            'popularity': series_data.get('popularity', 0),
                            'release_date': series_data.get('release_date') or None,
                            'length_serie': series_data.get('episode_run_time', [0])[0] if series_data.get('episode_run_time') else 0,
                            'vote_average': series_data.get('vote_average', 0),
                            'genre_ids': series_data.get('genre_ids', []),
                            'language_original': safe_str(series_data.get('original_language', '')),
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
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"Erro ao importar a série '{series_data.get('title', 'Unknown')}' - {str(e)}"))
        else:
            self.stdout.write(self.style.ERROR('Falha ao obter dados da API do TMDb'))
