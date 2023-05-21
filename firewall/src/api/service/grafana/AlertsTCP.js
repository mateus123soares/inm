const logger = require('../../../config/winston');
const fs = require('fs');

module.exports = {

    async parseAlerts(alertMessage) {
        regex = /network_transport=([^,}]+).*?source_ip=([^,}]+)/gm;
        let results = [];

        while (match = regex.exec(alertMessage)) {
            const network_transport = match[1];
            const source_ip = match[2];
            results.push({ network_transport, source_ip });
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
                    objRecebido.source_ip === objPersistido.source_ip
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
                            dado.source_ip === obj.source_ip
                    )
            )
        );

        fs.writeFileSync('persistencia.json', JSON.stringify(dadosAtualizados), (err) => {
            if (err) throw err;
            console.log('Dados salvos com sucesso!');
        });

        const response = dadosRecebidos.filter(itemB => !dadosPersistidos.some(itemA => itemA.network_transport === itemB.network_transport && itemA.source_ip === itemB.source_ip));
        // Passo 5: retornar os novos itens e os itens removidos
        return { response, itensRemovidos };
    }
};