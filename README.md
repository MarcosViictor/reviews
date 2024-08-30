#!/bin/bash

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
