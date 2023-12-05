const logger = require('../../../config/winston');
const fs = require('fs');

module.exports = {

    async parseAlerts(alertMessage) {
        regex = /destination_ip=([^,}]+), network_transport=([^,}]+).*?/gm;
        let results = [];

        while (match = regex.exec(alertMessage)) {
            const network_transport = match[2];
            const destination_ip = match[1];
            results.push({ network_transport, destination_ip });
        }
        return {
            code: 200,
            results: results,
        };
    },

    async filtrarNovosItens(req) {
        if (fs.existsSync('persistencia.json')) {
            try {
                const data = fs.readFileSync('persistencia.json');
                dadosPersistidos = JSON.parse(data);
            } catch (err) {
                console.error(err);
            }
        } else {
            fs.writeFileSync('persistencia.json', '[]');
        }

        // Passo 2: receber a requisição
        const dadosRecebidos = req

        // Passo 3: verificar cada objeto na requisição
        const novosItens = [];
        const itensRemovidos = [];
        dadosPersistidos.forEach((objPersistido) => {
            const objetoRecebido = dadosRecebidos.find(
                (objRecebido) =>
                    objRecebido.network_transport === objPersistido.network_transport &&
                    objRecebido.destination_ip === objPersistido.destination_ip
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
                            dado.network_transport === obj.network_transport &&
                            dado.destination_ip === obj.destination_ip
                    )
            )
        );

        fs.writeFileSync('persistencia.json', JSON.stringify(dadosAtualizados), (err) => {
            if (err) throw err;
            console.log('Dados salvos com sucesso!');
        });

        const response = dadosRecebidos.filter(itemB => !dadosPersistidos.some(itemA => itemA.destination_ip === itemB.destination_ip && itemA.network_transport === itemB.network_transport));
        // Passo 5: retornar os novos itens e os itens removidos
        return { response, itensRemovidos };
    }
};