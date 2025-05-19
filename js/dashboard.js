// Cria e adiciona uma tarefa em qualquer container
function criarTarefa(container, texto = 'Novo Cartão') {
  const tarefa = document.createElement('div');
  tarefa.className = 'task';

  const conteudo = document.createElement('span');
  conteudo.contentEditable = true;
  conteudo.innerText = texto;
  conteudo.classList.add('editavel');

  const botaoRemover = document.createElement('button');
  botaoRemover.innerText = 'x';
  botaoRemover.onclick = () => tarefa.remove();

  tarefa.appendChild(conteudo);
  tarefa.appendChild(botaoRemover);

  tarefa.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') abrirModal(tarefa);
  });

  container.appendChild(tarefa);
}

// Adiciona tarefa a uma coluna por ID
function adicionarTarefa(colunaId) {
  const container = document.querySelector(`#${colunaId} .tasks`);
  criarTarefa(container, 'Novo Cartão');
}

// Cria nova lista/coluna
function criarNovaLista() {
  const nomeLista = prompt("Digite o nome da nova lista:");
  if (!nomeLista) return;

  const board = document.querySelector(".board");

  const novaColuna = document.createElement("div");
  novaColuna.className = "column";

  const titulo = document.createElement("h3");
  titulo.innerText = nomeLista;

  const tarefas = document.createElement("div");
  tarefas.className = "tasks";

  const botao = document.createElement("button");
  botao.className = "add-btn";
  botao.innerText = "+ Add Tarefa";
  botao.onclick = () => criarTarefa(tarefas);

  novaColuna.appendChild(titulo);
  novaColuna.appendChild(tarefas);
  novaColuna.appendChild(botao);

  board.appendChild(novaColuna);
}

// Eventos de clique nos menus
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu-toggle")) {
    e.target.nextElementSibling.classList.toggle("hidden");
  }

  if (e.target.classList.contains("arquivar-lista")) {
    const coluna = e.target.closest(".column");
    coluna.style.display = "none";
  }

  if (e.target.classList.contains("apagar-lista")) {
    const coluna = e.target.closest(".column");
    coluna.remove();
  }
});

// Função principal de modal
function abrirModal(tarefa) {
  let modal = document.getElementById('modal');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal';
    modal.className = 'modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal" onclick="fecharModal()">&times;</span>
      <h2>Detalhes do Cartão</h2>
      <textarea class="descricao" placeholder="Adicione uma descrição..."></textarea>

      <h3>Checklist</h3>
      <div class="checklists"></div>
      <button id="criar-checklist">+ Criar Checklist</button>

      <h3>Membros</h3>
      <input type="text" class="membro" placeholder="Nome do membro">

      <h3>Comentários</h3>
      <textarea class="comentario" placeholder="Escreva um comentário..."></textarea>
      <button id="salvar-comentario">Salvar Comentário</button>
      <div class="comentarios"></div>
    </div>
  `;

  configurarChecklist(modal);
  configurarComentarios(modal);

  modal.style.display = 'block';
}

// Modularização do checklist
function configurarChecklist(modal) {
  const btnCriarChecklist = modal.querySelector('#criar-checklist');
  const checklistsContainer = modal.querySelector('.checklists');

  btnCriarChecklist.onclick = () => {
    btnCriarChecklist.style.display = 'none';

    const ul = document.createElement('ul');
    ul.classList.add('checklist');

    const input = document.createElement('input');
    input.placeholder = "Novo item...";
    input.classList.add('input-checklist');

    input.onkeydown = (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        const li = criarItemChecklist(input.value.trim());
        ul.appendChild(li);
        input.value = '';
      }
    };

    checklistsContainer.appendChild(ul);
    checklistsContainer.appendChild(input);
  };
}

// Criação de item de checklist
function criarItemChecklist(texto) {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const span = document.createElement('span');
  span.innerText = texto;
  span.ondblclick = () => {
    span.contentEditable = true;
    span.focus();
    span.onblur = () => span.contentEditable = false;
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  return li;
}

// Modularização dos comentários
function configurarComentarios(modal) {
  const btnSalvarComentario = modal.querySelector('#salvar-comentario');
  const campo = modal.querySelector('.comentario');
  const container = modal.querySelector('.comentarios');

  btnSalvarComentario.onclick = () => {
    const texto = campo.value.trim();
    if (texto) {
      const div = document.createElement('div');
      div.innerText = texto;
      container.appendChild(div);
      campo.value = '';
    }
  };
}

// Fechar modal
function fecharModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.style.display = 'none';
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
