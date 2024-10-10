from urllib import request as url_request  

def get_movie_from_tmdb(id_movie):
    api_key = '7b5f38eb16357785db52918aed0d33f5'
    url =  f'https://api.themoviedb.org/3/movie/{id_movie}?api_key={api_key}&language=en-US'
    
    response  = request.get(url) # type: ignore
    
    if response.status_code == 200:
        return response.json()
    return None





url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjVmMzhlYjE2MzU3Nzg1ZGI1MjkxOGFlZDBkMzNmNSIsIm5iZiI6MTcyNzIxNTE1Mi45NDE4MjgsInN1YiI6IjY2ZjA1MzNiOTJkMzk2ODUzODNiODFmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bG2gxWpV-FKQ9WsbQZtu_FltU1gxpo91A2yObHs23R4"
}

response = url_request.get(url, headers=headers)

print(response.text)