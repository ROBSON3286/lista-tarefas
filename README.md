<h1 align="center">📋 Smart Task Manager</h1>

<p align="center">
Um gerenciador de tarefas simples desenvolvido com <strong>JavaScript Vanilla</strong>, focado em produtividade, controle de prazos e notificações no navegador.
</p>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-ES6-yellow">
<img src="https://img.shields.io/badge/status-ativo-success">
<img src="https://img.shields.io/badge/licença-MIT-blue">
</p>

<hr>

<h2>📖 Visão Geral</h2>

<p>
O <strong>Smart Task Manager</strong> é uma aplicação web simples para gerenciamento de tarefas que permite organizar atividades com controle de prazo e notificações.
</p>

<p>O sistema permite:</p>

<ul>
<li>Criação e edição de tarefas</li>
<li>Definição de data de início e prazo</li>
<li>Cálculo automático do status da tarefa</li>
<li>Notificações de vencimento</li>
<li>Estatísticas de tarefas</li>
<li>Persistência de dados no navegador</li>
</ul>

<p>
Este projeto foi desenvolvido com o objetivo de praticar conceitos de <strong>JavaScript moderno</strong>, manipulação de DOM e armazenamento local.
</p>

<hr>

<h2>✨ Funcionalidades</h2>

<h3>📝 Gerenciamento de Tarefas</h3>

<ul>
<li>Criar tarefas</li>
<li>Editar nome das tarefas</li>
<li>Remover tarefas</li>
<li>Marcar tarefas como concluídas</li>
<li>Ordenar tarefas alfabeticamente</li>
</ul>

<h3>⏰ Controle de Prazo</h3>

<p>Cada tarefa possui:</p>

<ul>
<li><strong>Data de início</strong></li>
<li><strong>Data e hora de vencimento</strong></li>
</ul>

<p>Status automático das tarefas:</p>

<table border="1" cellpadding="6">
<tr>
<th>Status</th>
<th>Descrição</th>
</tr>
<tr>
<td>🔴 Expirada</td>
<td>O prazo foi ultrapassado</td>
</tr>
<tr>
<td>🚨 Urgente</td>
<td>Menos de 1 hora restante</td>
</tr>
<tr>
<td>⚠ Hoje</td>
<td>Menos de 24 horas restantes</td>
</tr>
<tr>
<td>🟡 Atenção</td>
<td>Até 3 dias restantes</td>
</tr>
<tr>
<td>⏳ Normal</td>
<td>Mais de 3 dias restantes</td>
</tr>
</table>

<hr>

<h2>🔔 Notificações</h2>

<p>
O sistema verifica automaticamente tarefas próximas do vencimento e envia notificações no navegador.
</p>

<pre>
🔔 Tarefa próxima do vencimento
Reunião com equipe vence em 10 minutos
</pre>

<hr>

<h2>📊 Estatísticas de Tarefas</h2>

<p>Resumo automático das tarefas:</p>

<pre>
📋 Total: 10
✅ Concluídas: 6
⏳ Pendentes: 4
</pre>

<hr>

<h2>⏰ Relógio em Tempo Real</h2>

<p>
A aplicação possui um relógio no rodapé que exibe a data e hora atual em tempo real.
</p>

<hr>

<h2>💾 Persistência de Dados</h2>

<p>
As tarefas são armazenadas utilizando a <strong>LocalStorage API</strong>, garantindo que os dados permaneçam salvos mesmo após atualizar a página.
</p>

<hr>

<h2>🛠 Tecnologias Utilizadas</h2>

<ul>
<li>HTML5</li>
<li>CSS3</li>
<li>JavaScript (ES6+)</li>
<li>LocalStorage API</li>
<li>Notification API</li>
</ul>

<hr>

<h2>📂 Estrutura do Projeto</h2>

<pre>
smart-task-manager
│
├── index.html
├── style.css
└── script.js
</pre>

<p>Estrutura recomendada para evolução:</p>

<pre>
smart-task-manager
│
├── index.html
│
├── css
│   └── style.css
│
└── js
    ├── app.js
    ├── task.js
    ├── taskService.js
    ├── modal.js
    └── utils.js
</pre>

<hr>

<h2>⚙ Como Executar o Projeto</h2>

<p>Clone o repositório:</p>

<pre>
git clone https://github.com/seu-usuario/smart-task-manager.git
</pre>

<p>Entre na pasta do projeto:</p>

<pre>
cd smart-task-manager
</pre>

<p>Abra o arquivo:</p>

<pre>
index.html
</pre>

<hr>

<h2>🚀 Melhorias Futuras</h2>

<ul>
<li>🔎 Busca de tarefas</li>
<li>🎯 Prioridade de tarefas</li>
<li>📅 Filtros de tarefas</li>
<li>📊 Dashboard de produtividade</li>
<li>⏳ Contador regressivo</li>
<li>🌙 Modo Dark</li>
<li>📲 Transformar em PWA</li>
<li>🔄 Sincronização com API</li>
</ul>

<hr>

<h2>👨‍💻 Autor</h2>
<p>
<strong>Robson Augusto</strong><br>
Desenvolvedor de software
</p>
<hr>

<h2>📄 Licença</h2>
<p>Este projeto está licenciado sob a <strong>MIT License</strong>.</p>
