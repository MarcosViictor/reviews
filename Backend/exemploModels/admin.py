from django.contrib import admin
from .models import Curso, Avaliacao

@admin.register(Curso)
class CursoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'url', 'criacao', 'atualizacao', 'ativo')

#@admin.register(Curso): Esse decorator registra o modelo Curso no Django Admin. Ele é uma maneira conveniente de registrar modelos, equivalente a admin.site.register(Curso, CursoAdmin), mas mais conciso.

#class CursoAdmin(admin.ModelAdmin): Essa classe personaliza a interface do admin para o modelo Curso. Ela herda de admin.ModelAdmin, que fornece várias funcionalidades para personalizar como os modelos aparecem e são manipulados no admin.

#list_display: Esse atributo define quais campos do modelo Curso serão exibidos na lista de itens no admin. Aqui, serão mostrados os campos titulo, url, criacao, atualizacao e ativo.

@admin.register(Avaliacao)
class AvaliacaoAdmin(admin.ModelAdmin):
    list_display = ('curso', 'nome', 'email', 'avaliacao', 'criacao', 'atualizacao', 'ativo')

#@admin.register(Avaliacao): Semelhante ao Curso, isso registra o modelo Avaliacao no Django Admin.

#class AvaliacaoAdmin(admin.ModelAdmin): Personaliza a interface do admin para o modelo Avaliacao.

#list_display: Define quais campos do modelo Avaliacao serão exibidos na lista de itens no admin. Aqui, serão mostrados os campos curso, nome, email, avaliacao, criacao, atualizacao e ativo.

#Depois de configurado fazer a migration pelo terminal: python manage.py makemigrations