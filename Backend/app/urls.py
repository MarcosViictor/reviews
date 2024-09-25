from django.urls import path
from .views.overview_movie import MovieReviewCreateView
from .views.list_movies import ListMoviesView
from .views.list_series import ListSeriesViews
from .views.list_series_popular import ListSeriesPopularViews
from .views.list_movies_popular import ListMoviesPopularViews
from .views.list_all import ListAllView




urlpatterns = [
    path('movies/review/', MovieReviewCreateView.as_view(), name='movie-review-create'),
    path('movies/list/', ListMoviesView.as_view(), name='list-movie'),
    path('series/list', ListSeriesViews.as_view(), name= 'list-series'),
    path('series/popular/', ListSeriesPopularViews.as_view(), name = 'lis-serie-popular'),
    path('movies/popular/', ListMoviesPopularViews.as_view(), name = 'list-movies-popular'),
    path('list/all/', ListAllView.as_view(), name = 'list-all')
]