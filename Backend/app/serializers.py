from rest_framework import serializers
from app.models import Overview_movie, Overview_serie, Comment_overview_movies,Comment_overview_series

class OverviewMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Overview_movie
        fields = [
                    'id_movie',
                    'overview_text_movie',
                    'date_overview',
                    'stars']

class OverviewSerieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Overview_serie
        fields = ['id_series',
                  'overview_text_serie',
                  'date_overview',
                  'stars']
        
class CommentOverviewSeriesSerializer(serializers.ModelSerializer):
        class Meta:
            model = Comment_overview_series
            fields = ['id_overview_serie',
                      'text',
                      'date_comment']
            
class CommentOverviewMoviesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comment_overview_movies  # Especifica o modelo correto
        fields = [
            'id_overview_movie',  # Chave estrangeira para o filme
            'text',               # Texto do comentário
            'date_comment'        # Data do comentário
        ]