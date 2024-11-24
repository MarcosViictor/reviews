#!/bin/bash

# Variáveis de ambiente
PRIMARY_HOST="postgres_primary"
PRIMARY_PORT=5432
REPLICA_USER="${DB_USER}"

# Criar o backup base
pg_basebackup -h $PRIMARY_HOST -p $PRIMARY_PORT -D /var/lib/postgresql/data -U $REPLICA_USER -Fp -Xs -P

# Criar o arquivo recovery.conf
cat <<EOF > /var/lib/postgresql/data/recovery.conf
standby_mode = 'on'
primary_conninfo = 'host=$PRIMARY_HOST port=$PRIMARY_PORT user=$REPLICA_USER password=${DB_PASSWORD}'
trigger_file = '/tmp/postgresql.trigger'
EOF

# Ajustar permissões
chown -R postgres:postgres /var/lib/postgresql/data
