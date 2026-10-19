/**
 * ATIVIDADE 1 - CONTROLE DE ACESSO BASEADO EM PAPÉIS (RBAC)
 * Cenário: Portal Acadêmico de Publicações Científicas
 */

/**
 * Código gerado com o Gemini AI, da Google. O modelo utilizado foi o Argon com nível de racicínio no máximo.
 * Prompt usado:
 * "Você é um especialista em Segurança em Sistemas de Computação. Você me ajudará com atividades práticas da disciplina na universidade. Preciso que me explique didaticamente o que cada atividade pede e depois implemente o que é pedido em JAVA SCRIPT. Atividade 1 - RBAC Esta atividade compreende criar um RBAC simples. Deixar o código comentado. O cenário pode ser definido por você, mas deve compreender ao menos 3 papéis"
 */

// 1. DEFINIÇÃO DAS PERMISSÕES E PAPÉIS (Matriz de Controle de Acesso)
// Usamos Object.freeze para impedir que a estrutura de segurança seja alterada em tempo de execução.
const ROLES_PERMISSIONS = Object.freeze({
  leitor: ["ler_artigo"],
  editor: ["ler_artigo", "criar_artigo", "editar_artigo"],
  admin: [
    "ler_artigo",
    "criar_artigo",
    "editar_artigo",
    "excluir_artigo",
    "gerenciar_usuarios",
  ],
});

// 2. BANCO DE DADOS SIMULADO DE USUÁRIOS
// Cada usuário possui um identificador, um nome e o papel (role) que ocupa no sistema.
const usuarios = [
  { id: 1, nome: "Ana (Aluna)", papel: "leitor" },
  { id: 2, nome: "Prof. Bruno (Pesquisador)", papel: "editor" },
  { id: 3, nome: "Carla (Diretora de TI)", papel: "admin" },
  { id: 4, nome: "Visitante Anônimo", papel: "convidado_invalido" }, // Para testar papel inexistente
];

// 3. MOTOR DE VERIFICAÇÃO DO RBAC (Policy Enforcement Point)
/**
 * Função responsável por verificar se um usuário tem permissão para executar uma ação.
 * @param {Object} usuario - O objeto representando o usuário autenticado.
 * @param {string} acao - A permissão necessária para acessar o recurso.
 * @returns {boolean} - Retorna true se permitido, ou false se negado.
 */
function verificarPermissao(usuario, acao) {
  // Verificação de segurança 1: O usuário existe e possui um papel definido?
  if (!usuario || !usuario.papel) {
    console.warn(
      `[ALERTA DE SEGURANÇA] Tentativa de acesso sem usuário ou papel válido.`
    );
    return false; // Negação por padrão (Default Deny)
  }

  // Busca a lista de permissões associadas ao papel do usuário
  const permissoesDoPapel = ROLES_PERMISSIONS[usuario.papel];

  // Verificação de segurança 2: O papel atribuído ao usuário existe na nossa configuração?
  if (!permissoesDoPapel) {
    console.warn(
      `[ACESSO NEGADO] O papel "${usuario.papel}" atribuído a ${usuario.nome} não é reconhecido pelo sistema.`
    );
    return false;
  }

  // Verificação de segurança 3: A ação desejada está dentro da lista de permissões desse papel?
  const possuiAcesso = permissoesDoPapel.includes(acao);

  if (possuiAcesso) {
    console.log(
      `[ACESSO PERMITIDO] ${usuario.nome} [Papel: ${usuario.papel}] executou a ação: "${acao}".`
    );
    return true;
  } else {
    console.error(
      `[ACESSO NEGADO] ${usuario.nome} [Papel: ${usuario.papel}] tentou executar "${acao}" sem permissão.`
    );
    return false;
  }
}

// 4. SIMULAÇÃO DE RECURSOS PROTEGIDOS DO SISTEMA
// Esta função representa uma rota ou funcionalidade real do sistema que exige autorização antes de rodar.
function executarOperacaoNoSistema(usuario, acao, descricaoDoRecurso) {
  console.log(`\n--- Solicitação: ${descricaoDoRecurso} ---`);

  // O sistema consulta o motor RBAC antes de permitir a execução da lógica de negócio
  if (verificarPermissao(usuario, acao)) {
    console.log(`-> Sucesso: Operação "${descricaoDoRecurso}" concluída!`);
  } else {
    console.log(
      `-> Bloqueio: Operação "${descricaoDoRecurso}" abortada por falta de privilégios.`
    );
  }
}

// ============================================================================
// 5. BATERIA DE TESTES (Casos de Uso)
// ============================================================================

const alunaAna = usuarios[0];
const profBruno = usuarios[1];
const adminCarla = usuarios[2];
const usuarioInvalido = usuarios[3];

// Teste 1: Leitor tentando ler (Permitido) e criar artigo (Negado)
executarOperacaoNoSistema(
  alunaAna,
  "ler_artigo",
  "Visualizar artigo sobre Criptografia"
);
executarOperacaoNoSistema(
  alunaAna,
  "criar_artigo",
  "Publicar novo artigo no portal"
);

// Teste 2: Editor tentando editar artigo (Permitido) e excluir artigo (Negado)
executarOperacaoNoSistema(
  profBruno,
  "editar_artigo",
  "Atualizar referências do artigo"
);
executarOperacaoNoSistema(
  profBruno,
  "excluir_artigo",
  "Apagar artigo do banco de dados"
);

// Teste 3: Admin realizando tarefas críticas de administração (Permitido)
executarOperacaoNoSistema(
  adminCarla,
  "excluir_artigo",
  "Remover artigo duplicado"
);
executarOperacaoNoSistema(
  adminCarla,
  "gerenciar_usuarios",
  "Alterar permissões de contas"
);

// Teste 4: Usuário com papel inválido/não cadastrado tentando ler artigo (Negado por padrão)
executarOperacaoNoSistema(
  usuarioInvalido,
  "ler_artigo",
  "Tentar acessar artigo com papel inválido"
);
