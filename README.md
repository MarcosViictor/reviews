## Setup do Projeto Django

Este guia irá te ajudar a clonar o repositório, configurar o ambiente virtual, instalar as dependências, realizar as migrações do banco de dados e rodar o servidor Django.

## Pré-requisitos:

- Python 3.10 ou ++ instalado (Você precisa de uma versão do Python que seja compatível com as bibliotecas do 'Requirements.txt'. Python 3.11 é uma escolha ideal).
- Git instalado

## Passo a Passo:


### Clonar o repositório
````
git clone https://github.com/MarcosViictor/reviews
cd .\Backend\
````

### Criar e ativar o ambiente virtual (é preciso estar no diretório "./Backend/").
````
python -m venv venv #cria a venv
venv\Scripts\Activate.ps1 #ativa a venv (É necessário ativar toda vez que for codar)
````

### Instalar as dependências
````
pip install -r requirements.txt
````
### Instalar Django se não estiver listado nas dependências _e também para funcionar o REST FRAMEWORK e AUTH_.
````
pip install django djangorestframework djangorestframework-simplejwt
````
### Criar as migrações do banco de dados
````
python manage.py makemigrations
````

### Realizar as migrações para o banco de dados
````
python manage.py migrate
````
### Criar um superusuário
````
python manage.py createsuperuser
````
### Executar/rodar o servidor
````
python manage.py runserver
````
