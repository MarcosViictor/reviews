from django.db import models

# Create your models here.

class Base(models.Model):
    criacao = models.DateTimeField(auto_now_add = True)
    atualizacao = models.DateTimeField(auto_now=True)
    ativo = models.BooleanField(default=True)
#Essa classe base é apenas um configuração inicial, que eu quero que herde para os outros models.
    class Meta:
        abstract = True

class Curso(Base):
    titulo = models.CharField(max_length=255)
    url = models.URLField(unique=True)
#Criando o model de curso(tabela) com seus atributos.
    class Meta:
        verbose_name = 'Curso'
        verbose_name_plural = 'Cursos'

    def __str__(self):
        return self.titulo
# na hora de fazer o 
    # def __str__(self):
    #     return self.titulo
    #retorna o que vc acha mais importantee
#Retorna uma string que descreve a avaliação, mostrando o nome do titulo do curso.

class Avaliacao(Base):
    curso = models.ForeignKey(Curso, related_name='avaliacoes', on_delete=models.CASCADE)
    #exemplo de chave estrangeira
    nome = models.CharField(max_length=255)
    email = models.EmailField()
    comentario = models.TextField(blank=True, default='')
    avaliacao = models.DecimalField(max_digits=2, decimal_places=1)

    class Meta:
        verbose_name = "Avaliação"
        verbose_name_plural = "Avaliações"
        unique_together = ['email', 'curso']
    
    def __str__(self):
        return f'{self.nome} avaliou o curso {self.curso} com nota {self.avaliacao}'


#Depois de criar meus models  ir para o arquivo admin.py, para configurar o registradores e fazer as migrations.

#antes de fazer as migrations crie a pasta migration
#comando: python manage.py makemigrations
#verifica se a pasta foi criada se sim?
#usa o comando para registrar no banco 
#python manage.py migrate
