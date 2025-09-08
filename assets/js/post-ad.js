document.addEventListener('DOMContentLoaded', () => {
    // --- NAVEGAÇÃO DO FORMULÁRIO (código existente) ---
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const formSteps = document.querySelectorAll('.form-step');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    let currentStep = 0;
    const progressTexts = ["Starting strong... 1/3", "Getting the details... 2/3", "Finishing up... 3/3"];

    function updateFormSteps() { /* ...código existente... */ }
    function updateProgressBar() { /* ...código existente... */ }
    nextButtons.forEach(button => { /* ...código existente... */ });
    prevButtons.forEach(button => { /* ...código existente... */ });
    
    // --- NOVO CÓDIGO PARA SUBMISSÃO ---
    
    // 1. COLOQUE A URL DA SUA API AQUI
    const apiUrl = 'COLE_A_SUA_INVOKE_URL_AQUI/post-ad'; // Ex: https://xxxx.execute-api.us-east-1.amazonaws.com/first-stage/post-ad

    const form = document.getElementById('adForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 2. Coletar dados de todos os campos do formulário
        const adData = {
            title: document.getElementById('title').value,
            about: document.getElementById('about').value,
            serviceType: document.getElementById('service').value,
            // Adicione aqui a lógica para pegar plataformas, tags, etc.
            price: document.querySelector('.preco-input input').value,
            deadlineDays: document.querySelector('.prazo-inputs input[placeholder="days"]').value,
            deadlineHours: document.querySelector('.prazo-inputs input[placeholder="hours"]').value,
        };
        
        console.log('Enviando dados:', JSON.stringify(adData));

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Ad posted successfully! Ad ID: ${result.adId}`);
                form.reset(); // Limpa o formulário
                // Opcional: redirecionar para outra página
                // window.location.href = 'feed.html'; 
            } else {
                alert('Error posting ad. Please try again.');
                console.error('Server responded with an error:', await response.text());
            }
        } catch (error) {
            alert('A network error occurred. Please check your connection.');
            console.error('Fetch error:', error);
        }
    });

    // Iniciar
    updateFormSteps();
    updateProgressBar();
});