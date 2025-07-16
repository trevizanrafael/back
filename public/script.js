// Pega o formulário do HTML
const form = document.getElementById('meuFormulario');
const mensagemEl = document.getElementById('mensagem');

// Fica "ouvindo" o evento de envio do formulário
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede que a página recarregue

    // Pega os valores digitados nos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    // Envia os dados para o back-end usando a API Fetch
    const response = await fetch('/salvar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email })
    });

    const resultado = await response.json();

    // Mostra a mensagem de resposta do servidor e limpa o formulário
    mensagemEl.textContent = resultado.mensagem;
    form.reset();
});