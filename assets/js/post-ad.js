// O nome deste arquivo deve ser post-ad.js

document.addEventListener('DOMContentLoaded', () => {
    // --- PARTE 1: LÓGICA DE NAVEGAÇÃO ENTRE ETAPAS ---
    
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const formSteps = document.querySelectorAll('.form-step');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    let currentStep = 0;

    const progressTexts = [
        "Starting strong... 1/3",
        "Getting the details... 2/3",
        "Finishing up... 3/3"
    ];

    // Função para mostrar apenas a etapa atual
    function updateFormSteps() {
        formSteps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });
    }

    // Função para atualizar a barra de progresso
    function updateProgressBar() {
        const progressPercentage = ((currentStep + 1) / formSteps.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = progressTexts[currentStep];
    }

    // Event listeners para os botões "próximo"
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < formSteps.length - 1) {
                currentStep++;
                updateFormSteps();
                updateProgressBar();
            }
        });
    });

    // Event listeners para os botões "anterior"
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateFormSteps();
                updateProgressBar();
            }
        });
    });

    // --- PARTE 2: LÓGICA DE SUBMISSÃO PARA A AWS ---

    const apiUrl = 'https://7n37z1x6fe.execute-api.us-east-1.amazonaws.com/first-stage/createAdPost';
    const form = document.getElementById('adForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o recarregamento da página
        
        // Coletar dados de todos os campos do formulário
        const adData = {
            title: document.getElementById('title').value,
            about: document.getElementById('about').value,
            serviceType: document.getElementById('service').value,
            price: document.querySelector('.preco-input input').value,
            deadlineDays: document.querySelector('.prazo-inputs input[placeholder="days"]').value,
            deadlineHours: document.querySelector('.prazo-inputs input[placeholder="hours"]').value,
        };
        
        console.log('Enviando dados para a AWS:', JSON.stringify(adData));

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(adData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Ad posted successfully! Ad ID: ${result.adId}`);
                form.reset();
                // Opcional: voltar para a primeira etapa após o sucesso
                currentStep = 0;
                updateFormSteps();
                updateProgressBar();
            } else {
                alert('Error posting ad. Please try again.');
                const errorText = await response.text();
                console.error('Server responded with an error:', errorText);
            }
        } catch (error) {
            alert('A network error occurred. Please check your connection.');
            console.error('Fetch error:', error);
        }
    });

    // Iniciar o formulário na primeira etapa
    updateFormSteps();
    updateProgressBar();
});