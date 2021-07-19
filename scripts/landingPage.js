var emailsCadastrados =
  JSON.parse(localStorage.getItem("melhorLandingPageStorage")) ?? [];

function cadastrarNovoContato(contato) {
  emailsCadastrados.push(contato);
  localStorage.setItem(
    "melhorLandingPageStorage",
    JSON.stringify(emailsCadastrados)
  );
}

function contatoJaCadastrado(contato) {
  if (
    emailsCadastrados.find(
      (contatoCadastrado) => contatoCadastrado.email === contato.email
    )
  ) {
    return true;
  }
  return false;
}

function emailValido(email) {
  var emailValido =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (emailValido.test(email)) {
    return true;
  }
  mensagem("Email inválido");
  return false;
}

function nomeValido(nome) {
  if (nome.trim() === "" || nome.length < 3) {
    mensagem("Nome deve ter mais de 3 caracteres");
    return false;
  }
  return true;
}

function validaContato(contato) {
  if (nomeValido(contato.nome) && emailValido(contato.email)) {
    return true;
  }
  return false;
}

function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("aceite").checked = false;
}

function mensagem(mensagem) {
  //TODO mensagem personalizada
  alert(mensagem);
}

function cadastrarDados() {
  let contato = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
  };
  let aceite = document.getElementById("aceite").checked;
  if (validaContato(contato)) {
    if (!contatoJaCadastrado(contato)) {
      if (aceite === true) {
        cadastrarNovoContato(contato);
        limparCampos();
        mensagem("Cadastro efetuado com sucesso! Em breve entraremos em contato!");
      } else mensagem("Por favor, aceite os termos de uso");
    } else mensagem("Contato já cadastrado. Em breve entraremos em contato!");
  }
}
