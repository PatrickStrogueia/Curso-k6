//Realizar consulta à API de listagem de crocodilos e buscar por id de crocodilos.
//É esperado um RPS de 200 REQ/S para a API de listagem de crocodilos durante 30s.
//Para a busca por id o sistem deve anteder 50 usuários onde cada usuário realiza até 20 solicitações em até 1 min.
//Usuários par devem realizar busca ao crocodilo de ID 2.
//Usuários ímpar devem realizar busca ao crocodilo de ID 1.
//Ambos os testes devem ser executados simultâneamente.
//k6 run .\exemplo06.js -e URL=https://test.api.k6.io/public
import http from "k6/http";

export const options = {
    scenarios: {
        listar: {
            executor: 'constant-arrival-rate',
            exec: 'listar',
            duration: '30s',
            rate: 200,
            timeUnit: '1s',
            preAllocatedVUs: 150,
            gracefulStop: '5s',
            tags: { test_type: 'listagem_crocodilos' },
        },
        buscar: {
            executor: 'per-vu-iterations',
            exec: 'buscar',
            vus: 50,
            iterations: 20,
            maxDuration: '1m',
            tags: { test_type: 'busca_crocodilos' },
            gracefulStop: '5s'
        }
    },
    discardResponseBodies: true
}

export function listar() {
    http.get(__ENV.URL + '/crocodiles')
};

export function buscar() {
    if (__VU % 2 === 0) {
        http.get(__ENV.URL + '/crocodiles/2')
    } else {
        http.get(__ENV.URL + '/crocodiles/1')
    }
};