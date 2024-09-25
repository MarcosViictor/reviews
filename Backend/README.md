# Setup do Projeto Django

Este guia irá te ajudar a clonar o repositório, configurar o ambiente virtual, instalar as dependências, realizar as migrações do banco de dados e rodar o servidor Django.

## Pré-requisitos

- Python instalado (recomenda-se a versão 3.7 ou superior)
- Git instalado

## Passo a Passo
````
# Clonar o repositório
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_REPOSITORIO]

# Criar e ativar o ambiente virtual
python -m venv venv
source venv/bin/activate

# Instalar as dependências
pip install -r requirements.txt

# Instalar Django se não estiver listado nas dependências
pip install django

# Realizar as migrações do banco de dados
python manage.py migrate

# Criar um superusuário
python manage.py createsuperuser

# Executar o servidor
python manage.py runserver
