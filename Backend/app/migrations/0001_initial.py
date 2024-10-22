# Generated by Django 5.1.1 on 2024-10-22 16:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tmdb_id', models.IntegerField(unique=True)),
                ('title', models.CharField(max_length=255)),
                ('overview', models.TextField(blank=True, null=True)),
                ('release_date', models.DateField(blank=True, null=True)),
                ('vote_average', models.FloatField(default=0)),
                ('vote_count', models.IntegerField(default=0)),
                ('popularity', models.FloatField(default=0)),
                ('poster_path', models.URLField(blank=True, max_length=500, null=True)),
                ('backdrop_path', models.URLField(blank=True, max_length=500, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Overview_serie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('criacao', models.DateTimeField(auto_now_add=True)),
                ('atualizacao', models.DateTimeField(auto_now=True)),
                ('ativo', models.BooleanField(default=True)),
                ('overview_text_serie', models.TextField(max_length=500)),
                ('date_overview', models.DateField()),
                ('stars', models.DecimalField(decimal_places=1, default=0.0, max_digits=3)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Series',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_tmdb', models.IntegerField(unique=True)),
                ('title', models.CharField(max_length=100)),
                ('title_original', models.CharField(max_length=100)),
                ('overview', models.TextField()),
                ('status', models.CharField(max_length=50)),
                ('num_season', models.IntegerField()),
                ('num_episode', models.IntegerField()),
                ('popularity', models.FloatField()),
                ('release_date', models.DateField()),
                ('length_serie', models.IntegerField(blank=True, null=True)),
                ('vote_average', models.FloatField()),
                ('genre_ids', models.JSONField()),
                ('language_original', models.CharField(max_length=20)),
                ('language', models.CharField(max_length=20)),
                ('cast_serie', models.TextField()),
                ('director_serie', models.TextField()),
                ('poster_path', models.URLField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Overview_movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('criacao', models.DateTimeField(auto_now_add=True)),
                ('atualizacao', models.DateTimeField(auto_now=True)),
                ('ativo', models.BooleanField(default=True)),
                ('overview_text_movie', models.TextField(max_length=500)),
                ('date_overview', models.DateField()),
                ('stars', models.DecimalField(decimal_places=1, default=0.0, max_digits=3)),
                ('id_movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.movie')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Comment_overview_movies',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('criacao', models.DateTimeField(auto_now_add=True)),
                ('atualizacao', models.DateTimeField(auto_now=True)),
                ('ativo', models.BooleanField(default=True)),
                ('text', models.TextField(max_length=200)),
                ('date_comment', models.DateField()),
                ('id_overview_movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.overview_movie')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Comment_overview_series',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('criacao', models.DateTimeField(auto_now_add=True)),
                ('atualizacao', models.DateTimeField(auto_now=True)),
                ('ativo', models.BooleanField(default=True)),
                ('text', models.TextField(max_length=200)),
                ('date_comment', models.DateField()),
                ('id_overview_serie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.overview_serie')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='overview_serie',
            name='id_series',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.series'),
        ),
        migrations.CreateModel(
            name='List',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('criacao', models.DateTimeField(auto_now_add=True)),
                ('atualizacao', models.DateTimeField(auto_now=True)),
                ('ativo', models.BooleanField(default=True)),
                ('list_creation_date', models.DateField()),
                ('name', models.CharField(max_length=50)),
                ('description', models.TextField(max_length=200)),
                ('privacy', models.BooleanField(default=True)),
                ('id_movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.movie')),
                ('id_series', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.series')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
