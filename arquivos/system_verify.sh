#!/bin/bash

# Lista de serviços a serem verificados
SERVICES=("prometheus" "grok-exporter" "apache2" "zabbix-server")

# Caminho do arquivo de log
LOG_FILE="/var/log/status_servicos.log"

# Verifica se cada serviço está em execução e escreve o status em um arquivo de log
for SERVICE in "${SERVICES[@]}"; do
    if systemctl is-active --quiet "$SERVICE"; then
        STATUS=1
    else
        STATUS=0
    fi

    # Escreve o status do serviço no arquivo de log
    echo "{\"Service\":\"$SERVICE\",\"Status\":$STATUS}" >> "$LOG_FILE"
done
