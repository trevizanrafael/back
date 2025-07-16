// Função para buscar os dados do back-end e montar a tabela
async function carregarDados() {
    // Faz uma requisição GET para a nossa nova rota /dados
    const response = await fetch('/dados');
    const dados = await response.json(); // Converte a resposta em um objeto JavaScript

    const tabelaCorpo = document.querySelector('#tabela-dados tbody');
    tabelaCorpo.innerHTML = ''; // Limpa a tabela antes de preencher

    // Para cada cadastro recebido, cria uma nova linha na tabela
    dados.forEach(cadastro => {
        const tr = document.createElement('tr'); // Cria uma linha <tr>

        // Cria a célula do nome (<td>)
        const tdNome = document.createElement('td');
        tdNome.textContent = cadastro.nome;
        tr.appendChild(tdNome); // Adiciona a célula na linha

        // Cria a célula do email (<td>)
        const tdEmail = document.createElement('td');
        tdEmail.textContent = cadastro.email;
        tr.appendChild(tdEmail); // Adiciona a célula na linha

        tabelaCorpo.appendChild(tr); // Adiciona a linha preenchida no corpo da tabela
    });
}

// Chama a função para carregar os dados assim que a página é carregada
document.addEventListener('DOMContentLoaded', carregarDados);