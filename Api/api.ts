import axios, { AxiosInstance } from 'axios';

const api = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 10000, // Set a timeout of 10 seconds
});

const brasilApi = axios.create({
    baseURL: 'https://brasilapi.com.br/api',
    timeout: 10000, // Set a timeout of 10 seconds
});

const configureInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            // Trata erros de forma centralizada
            if (error.response) {
                // Erros com resposta do servidor (status 4xx ou 5xx)
                console.error(`Erro na API: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
            } else if (error.request) {
                // Erros sem resposta do servidor (ex.: timeout, sem conexão)
                console.error('Erro na API: Sem resposta do servidor.');
            } else {
                // Erros na configuração da requisição
                console.error(`Erro na API: ${error.message}`);
            }
    
            // Opcional: Retornar uma mensagem de erro personalizada
            // return Promise.reject(error);
        }
    );
}

configureInterceptors(api);
configureInterceptors(brasilApi);

export default api;
export { brasilApi };