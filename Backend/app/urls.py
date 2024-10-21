from django.urls import path
from .views.list_filmes_e_series.list_movies import ListMoviesView
from .views.list_filmes_e_series.list_series import ListSeriesViews
from .views.list_filmes_e_series.list_series_popular import ListSeriesPopularViews
from .views.list_filmes_e_series.list_movies_popular import ListMoviesPopularViews
from .views.list_filmes_e_series.list_all import ListAllView
from .views.discovery.discovery_movie import DiscoveryMovieView
from .views.discovery.discovery_series import DiscoverySeriesView
from .views.search.search_movie import SearchMovieView
from .views.search.search_series import SearchSerieView
from .views.image.image_movie import ImageMovieView
from .views.genres.genres import GenresView
from .views.overview.overview_movie import MovieOverviewListView, OverviewMovieDetailView, OverviewMovieListCreateView
from .views.overview.overview_series import OverviewSeriesListCreateView, OverviewSeriesDetail


urlpatterns = [
    #Urls para consumir API do TMDB
    path('movies/list/', ListMoviesView.as_view(), name='list-movie'),
    path('series/list', ListSeriesViews.as_view(), name= 'list-series'),
    path('series/popular/', ListSeriesPopularViews.as_view(), name = 'lis-serie-popular'),
    path('movies/popular/', ListMoviesPopularViews.as_view(), name = 'list-movies-popular'),
    path('list/all/', ListAllView.as_view(), name = 'list-all'),
    path('discovery/movie/', DiscoveryMovieView.as_view(), name= 'discovery-movie'),
    path('discovery/series/', DiscoverySeriesView.as_view(), name= 'discovery-series'),
    path('search/movie/', SearchMovieView.as_view(), name = 'search-movie'),
    path('search/series/', SearchSerieView.as_view(), name = 'search-series'),
    path('image/movie/', ImageMovieView.as_view(), name= 'image-movie'),
    path('genres/', GenresView.as_view(), name= 'genres'),
    path('movies/overviews/', OverviewMovieListCreateView.as_view(), name='overview-list-create'),
    path('movies/overviews/<int:id_movie>/', OverviewMovieDetailView.as_view(), name='overview-detail'),
    path('overview-series/', OverviewSeriesListCreateView.as_view(), name='overview-series-list-create'),  # Listar e criar
    path('overview-series/<int:id_series>/', OverviewSeriesDetail.as_view(), name='overview-series-detail'),  # Detalhar, atualizar e deletar
]