#!/bin/bash

# Espera o banco de dados estar disponível
until pg_isready -h "$DB_HOST" -U "$DB_USER"; do
  echo "Aguardando o banco de dados estar pronto..."
  sleep 2
done

# Faz as migrações
python manage.py makemigrations
python manage.py migrate

# Inicia o servidor Django
python manage.py runserver 0.0.0.0:8000
