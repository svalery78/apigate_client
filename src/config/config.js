const getEnvironment = (envSystemVariable) => {
    switch (envSystemVariable) {
        case 'work':
        case 'test':
        case 'production':
        case 'sandbox':
            return envSystemVariable;
        default:
            return 'localhost';
    }
}

const getEnvironmentMeta = (environment) => {
    switch (environment) {
        case 'work':
        case 'test':
        case 'production':
        case 'sandbox':
            return {
                environment,
                backendUrl: process.env.REACT_APP_BACKEND_URL || 'localhost',
                backendPort: process.env.REACT_APP_BACKEND_PORT //в кубере не нужен
            };
        default:
            return {
                environment: 'localhost',
                backendUrl: 'http://localhost',
                backendPort: 13081
            };
    }
}

const envMeta = getEnvironmentMeta(getEnvironment(process.env.REACT_APP_APIGATE_FRONT_ENV));

module.exports = {
    environment: envMeta.environment,
    microservicesUrl: envMeta.backendUrl,
    microservicesPort: envMeta.backendPort
};