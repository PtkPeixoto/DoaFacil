import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, BRASIL_API_BASE_URL, TIMEOUT } from '@env';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: Number(TIMEOUT),
    headers: {
        // 'User-Agent': 'PostmanRuntime/7.43.0',
        // 'Accept': '*/*',
        // 'Accept-Encoding': 'gzip, deflate, br',
        // 'Connection': 'keep-alive',
    },
});

const brasilApi = axios.create({
    baseURL: BRASIL_API_BASE_URL,
    timeout: Number(TIMEOUT),
});

const configureInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response) {
                console.error(`Erro na API: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
                console.error(`URL da requisição: ${error.response.config.url}`);
            } else if (error.request) {
                console.error('Erro na API: Sem resposta do servidor.');
                console.error(`URL da requisição: ${error.config?.baseURL || ''}${error.config?.url}`);
                console.error(`Método HTTP: ${error.config?.method}`);
                console.error(`Headers da requisição: ${JSON.stringify(error.config?.headers, null, 2)}`);
                console.error(`Timeout configurado: ${error.config?.timeout}ms`);
            } else {
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