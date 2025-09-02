document.getElementById('waitlist-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    const apiUrl = 'URL_DA_SUA_API_AQUI'; // VOCÊ VAI COLOCAR A URL DA SUA API AQUI

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            alert('Você foi adicionado à lista de espera com sucesso!');
            document.getElementById('waitlist-form').reset();
        } else {
            alert('Ocorreu um erro ao tentar entrar na lista de espera. Por favor, tente novamente.');
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar entrar na lista de espera. Por favor, verifique sua conexão.');
    }
});