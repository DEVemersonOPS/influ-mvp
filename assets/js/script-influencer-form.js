document.addEventListener('DOMContentLoaded', () => {
    const influencerForm = document.getElementById('influencer-form');

    // Função para coletar os dados dos serviços de forma dinâmica
    const getServicesData = () => {
        const services = [];
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            const serviceName = item.querySelector('.service-name').value;
            const servicePrice = item.querySelector('.service-price').value;
            if (serviceName && servicePrice) {
                services.push({
                    name: serviceName,
                    price: servicePrice
                });
            }
        });
        return services;
    };

    influencerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Coleta os dados do formulário
        const formData = {
            name: document.getElementById('name').value,
            username: document.getElementById('username').value,
            bio: document.getElementById('bio').value,
            instagram: document.getElementById('instagram').value,
            tiktok: document.getElementById('tiktok').value,
            services: getServicesData()
        };

        // URL correta da sua API Gateway para influenciadores
        const apiUrl = 'https://7n37z1x6fe.execute-api.us-east-1.amazonaws.com/first-stage/register-influencer';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Seu perfil de influenciador foi criado com sucesso!');
                influencerForm.reset();
            } else {
                alert('Ocorreu um erro no cadastro. Por favor, tente novamente.');
            }

        } catch (error) {
            console.error('Erro:', error);
            alert('Erro de conexão. Verifique se a API está ativa.');
        }
    });
});