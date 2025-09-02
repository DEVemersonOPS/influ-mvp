document.addEventListener('DOMContentLoaded', () => {
    const addServiceBtn = document.querySelector('.add-service-btn');
    const form = document.getElementById('influencer-form');

    // Função para adicionar um novo campo de serviço
    addServiceBtn.addEventListener('click', () => {
        const serviceContainer = document.querySelector('.form-group .service-item');
        const newServiceItem = document.createElement('div');
        newServiceItem.classList.add('service-item');
        newServiceItem.innerHTML = `
            <input type="text" class="service-name" placeholder="Ex: Post no Instagram">
            <input type="number" class="service-price" placeholder="Preço (R$)">
        `;
        serviceContainer.parentNode.insertBefore(newServiceItem, addServiceBtn);
    });

    // Lógica para o formulário (ainda não implementado o envio)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Formulário enviado com sucesso!'); // Feedback temporário
        // A lógica de envio para o AWS Lambda virá aqui
    });
});