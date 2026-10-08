const cadastroForm = document.getElementById('cadastroForm');

if (cadastroForm) {
    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const endereco = document.getElementById('endereco').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const conteudoTxt = `Dados do Usuário Cadastrado:\n` +
                            `-----------------------------\n` +
                            `Nome: ${nome}\n` +
                            `CPF: ${cpf}\n` +
                            `Endereço: ${endereco}\n` +
                            `E-mail: ${email}\n` +
                            `Senha: ${senha}\n` +
                            `Data do Registro: ${new Date().toLocaleString('pt-BR')}\n`;

        const blob = new Blob([conteudoTxt], { type: 'text/plain;charset=utf-8' });
        const linkSalvar = document.createElement('a');
        linkSalvar.href = URL.createObjectURL(blob);
        linkSalvar.download = `cadastro_${nome.replace(/\s+/g, '_').toLowerCase()}.txt`;
        linkSalvar.click();
        URL.revokeObjectURL(linkSalvar.href);


        // Criando o objeto do usuário
        const usuario = {
        nome: nome,
        email: email,
        senha: senha
        };
        // Convertendo para String JSON e salvando no localStorage
        localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));

        alert('Cadastro realizado com sucesso!');
        cadastroForm.reset();
        window.location.href = 'login.html'; 
    });
}

// ==========================================
// CÓDIGO PARA A PÁGINA DE LOGIN (login.html)
// ==========================================
const formLogin = document.getElementById('formLogin');

if (formLogin) {
  formLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailLogin = document.getElementById('emailLogin').value;
    const senhaLogin = document.getElementById('senhaLogin').value;

    // Buscando o usuário cadastrado no localStorage
    const dadosDadosLocalStorage = localStorage.getItem('usuarioCadastrado');

    if (!dadosDadosLocalStorage) {
      alert('Nenhum usuário cadastrado no sistema!');
      return;
    }

    // Convertendo a String JSON de volta para Objeto JavaScript
    const usuarioDados = JSON.parse(dadosDadosLocalStorage);

    // Validação dos dados informados com os salvos
    if (emailLogin === usuarioDados.email && senhaLogin === usuarioDados.senha) {
      // Cria uma sessão ativa para que o site saiba que ele está logado
      localStorage.setItem('usuarioLogado', 'true');
      alert(`Bem-vindo, ${usuarioDados.nome}!`);
      verificarAutenticacao(); // Chama a função para verificar autenticação
      window.location.href = 'mainSpot.html'; // Altere para a sua página principal pós-login
    } else {
      alert('E-mail ou senha incorretos.');
    }
  });
}

// ==========================================
// CÓDIGO DE PROTEÇÃO (Cole no topo das suas páginas restritas, ex: dashboard.html)
// ==========================================
function verificarAutenticacao() {
  const logado = localStorage.getItem('usuarioLogado');
  
  // Se não houver a flag de logado, barra o acesso e manda de volta pro login
  if (logado !== 'true') {
    alert('Acesso negado. Por favor, faça login para acessar esta página.');
    window.location.href = 'login.html';
  }
}

function fecharPopup() {
    const popup = document.getElementById('meuPopup');
    if (popup) {
        popup.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Erro ao carregar o footer:', error));
    }
});

const btnSobre = document.getElementById('btnSobre');
const menuVerticalSobre = document.getElementById('SubMenuSobre');
const btnContato = document.getElementById('btnContato');
const menuVerticalContato = document.getElementById('SubMenuContato');
const btnEmpresa = document.getElementById('btnEmpresa');
const subSubMenuEmpresa = document.getElementById('SubSubMenuEmpresa');
const btnCliente = document.getElementById('btnCliente');
const subSubMenuCliente = document.getElementById('SubSubMenuCliente');
const btnEmail = document.getElementById('btnEmail');
const subSubMenuEmail = document.getElementById('SubSubMenuEmail');
const btnTelefone = document.getElementById('btnTelefone');
const subSubMenuTelefone = document.getElementById('SubSubMenuTelefone');

function abreMenu(event, menu) {
    event.preventDefault();
    menu.classList.toggle('active');
}

function fechaMenu(event, menu, btn) {
    if (!menu.contains(event.target) && !btn.contains(event.target)) {
        menu.classList.remove('active');
    }
}

function configurarMenu(btn, menu) {
    if (!btn || !menu) {
        return null;
    }

    btn.addEventListener('click', function(event) {
        abreMenu(event, menu);
    });

    return { btn, menu };
}

const menus = [
    configurarMenu(btnSobre, menuVerticalSobre),
    configurarMenu(btnContato, menuVerticalContato),
    configurarMenu(btnEmpresa, subSubMenuEmpresa),
    configurarMenu(btnCliente, subSubMenuCliente),
    configurarMenu(btnEmail, subSubMenuEmail),
    configurarMenu(btnTelefone, subSubMenuTelefone)
].filter(Boolean);

document.addEventListener('click', function(event) {
    menus.forEach(function({ btn, menu }) {
        fechaMenu(event, menu, btn);
    });
});

// Pega a data de hoje
const hoje = new Date().toISOString().split('T')[0];
// Coloca a data atual no input
const campoData = document.getElementById('campo-data');
if (campoData) {
    campoData.value = hoje;
}

document.getElementById("dataAtual").textContent =
  new Date().toLocaleDateString("pt-BR");


