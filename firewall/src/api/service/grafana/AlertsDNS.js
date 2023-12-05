const logger = require('../../../config/winston');
const fs = require('fs');

module.exports = {

    async parseAlerts(alertMessage) {
        regex = /destination_ip=([^,}]+).*?source_port=([^,}]+)/gm;
        let results = [];

        while (match = regex.exec(alertMessage)) {
            const destination_ip = match[1];
            const source_port = match[2];
            results.push({ destination_ip, source_port });
        }
        return {
            code: 200,
            results: results,
        };
    },

    async filtrarNovosItens(req) {
        if (fs.existsSync('persistencia_dns.json')) {
            try {
                const data = fs.readFileSync('persistencia_dns.json');
                dadosPersistidos = JSON.parse(data);
            } catch (err) {
                console.error(err);
            }
        } else {
            fs.writeFileSync('persistencia_dns.json', '[]');
        }

        // Passo 2: receber a requisição
        const dadosRecebidos = req

        // Passo 3: verificar cada objeto na requisição
        const novosItens = [];
        const itensRemovidos = [];
        dadosPersistidos.forEach((objPersistido) => {
            const objetoRecebido = dadosRecebidos.find(
                (objRecebido) =>
                    objRecebido.destination_ip === objPersistido.destination_ip &&
                    objRecebido.source_port === objPersistido.source_port
            );
            if (objetoRecebido) {
                novosItens.push(objetoRecebido)
            }
            else {
                itensRemovidos.push(objPersistido);
            }
        });

        // Passo 4: salvar a lista atualizada no arquivo de persistência
        const dadosAtualizados = novosItens.concat(
            dadosRecebidos.filter(
                (obj) =>
                    !novosItens.some(
                        (dado) =>
                            dado.destination_ip === obj.destination_ip &&
                            dado.source_port === obj.source_port
                    )
            )
        );

        fs.writeFileSync('persistencia_dns.json', JSON.stringify(dadosAtualizados), (err) => {
            if (err) throw err;
            console.log('Dados salvos com sucesso!');
        });

        const response = dadosRecebidos.filter(itemB => !dadosPersistidos.some(itemA => itemA.destination_ip === itemB.destination_ip && itemA.source_port === itemB.source_port));
        // Passo 5: retornar os novos itens e os itens removidos
        return { response, itensRemovidos };
    }
};