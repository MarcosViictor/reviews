from urllib import request as url_request  

# Função para obter dados de um filme específico a partir da API do The Movie Database (TMDb)
def get_movie_from_tmdb(id_movie):
    """
    Consulta a API TMDb para obter informações detalhadas sobre um filme.

    Parâmetros:
        id_movie (int): O ID do filme no TMDb.

    Retorna:
        dict: Dados do filme no formato JSON se a requisição for bem-sucedida.
        None: Se a requisição falhar ou o filme não for encontrado.
    """
    api_key = '7b5f38eb16357785db52918aed0d33f5'  # Chave da API do TMDb
    url = f'https://api.themoviedb.org/3/movie/{id_movie}?api_key={api_key}&language=en-pt-br'
    
    # Faz a requisição GET para a URL gerada
    response = request.get(url)  # type: ignore  # O tipo é ignorado para evitar erros de verificação estática
    
    if response.status_code == 200:
        return response.json()  # Retorna os dados do filme em formato JSON
    return None  # Retorna None se a requisição falhar



# URL para descobrir filmes populares na API do TMDb
url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"

# Cabeçalhos da requisição, incluindo autorização
headers = {
    "accept": "application/json",  # Aceita resposta em JSON
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjVmMzhlYjE2MzU3Nzg1ZGI1MjkxOGFlZDBkMzNmNSIsIm5iZiI6MTcyNzIxNTE1Mi45NDE4MjgsInN1YiI6IjY2ZjA1MzNiOTJkMzk2ODUzODNiODFmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bG2gxWpV-FKQ9WsbQZtu_FltU1gxpo91A2yObHs23R4"  # Token Bearer de
}