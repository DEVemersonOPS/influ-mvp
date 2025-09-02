document.addEventListener('DOMContentLoaded', () => {
    const brandForm = document.getElementById('brand-form');

    brandForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Coleta os dados do formulário
        const formData = {
            companyName: document.getElementById('company-name').value,
            contactName: document.getElementById('contact-name').value,
            website: document.getElementById('website').value,
            bio: document.getElementById('bio').value,
            budget: document.getElementById('budget').value
        };

        // URL da sua API Gateway para o cadastro de marcas
        const apiUrl = 'https://7n37z1x6fe.execute-api.us-east-1.amazonaws.com/first-stage/register-brand'; 

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Sua marca foi cadastrada com sucesso!');
                brandForm.reset();
            } else {
                alert('Ocorreu um erro no cadastro. Por favor, tente novamente.');
            }

        } catch (error) {
            console.error('Erro:', error);
            alert('Erro de conexão. Verifique se a API está ativa.');
        }
    });
});