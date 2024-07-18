import http from "k6/http";
import { check, sleep } from "k6";

// carga 10 vus por 10s
// requisições com sucesso 95%
// requisições com falha < 1%
// duração da requisição p(95) < 500

export const options = {
    stages: [{ duration: '10s', target: 10}],
    thresholds: {
        cheks: ['rate > 0.95'],
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 500']
    }
}