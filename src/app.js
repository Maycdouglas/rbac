import { DEMO_USERS } from "./data/users.js";
import { canUserAccess } from "./core/rbac.js";

// SIMULAÇÃO DE RECURSOS PROTEGIDOS DO SISTEMA
// Esta função representa uma rota ou funcionalidade real do sistema que exige autorização antes de rodar.
export function executarOperacaoNoSistema({
  usuario,
  acao,
  descricaoDoRecurso,
}) {
  console.log(`\n--- Solicitação: ${descricaoDoRecurso} ---`);

  // O sistema consulta o motor RBAC antes de permitir a execução da lógica de negócio
  if (canUserAccess(usuario, acao)) {
    console.log(`-> Sucesso: Operação "${descricaoDoRecurso}" concluída!`);
    return true;
  }

  console.log(
    `-> Bloqueio: Operação "${descricaoDoRecurso}" abortada por falta de privilégios.`
  );
  return false;
}

// ============================================================================
// BATERIA DE TESTES (Casos de Uso)
// ============================================================================
export function runDemo() {
  const { alunaAna, profBruno, adminCarla, usuarioInvalido } = DEMO_USERS;

  // Teste 1: Leitor tentando ler (Permitido) e criar artigo (Negado)
  executarOperacaoNoSistema({
    usuario: alunaAna,
    acao: "ler_artigo",
    descricaoDoRecurso: "Visualizar artigo sobre Criptografia",
  });

  executarOperacaoNoSistema({
    usuario: alunaAna,
    acao: "criar_artigo",
    descricaoDoRecurso: "Publicar novo artigo no portal",
  });

  // Teste 2: Editor tentando editar artigo (Permitido) e excluir artigo (Negado)
  executarOperacaoNoSistema({
    usuario: profBruno,
    acao: "editar_artigo",
    descricaoDoRecurso: "Atualizar referências do artigo",
  });

  executarOperacaoNoSistema({
    usuario: profBruno,
    acao: "excluir_artigo",
    descricaoDoRecurso: "Apagar artigo do banco de dados",
  });

  // Teste 3: Admin realizando tarefas críticas de administração (Permitido)
  executarOperacaoNoSistema({
    usuario: adminCarla,
    acao: "excluir_artigo",
    descricaoDoRecurso: "Remover artigo duplicado",
  });

  executarOperacaoNoSistema({
    usuario: adminCarla,
    acao: "gerenciar_usuarios",
    descricaoDoRecurso: "Alterar permissões de contas",
  });

  // Teste 4: Usuário com papel inválido/não cadastrado tentando ler artigo (Negado por padrão)
  executarOperacaoNoSistema({
    usuario: usuarioInvalido,
    acao: "ler_artigo",
    descricaoDoRecurso: "Tentar acessar artigo com papel inválido",
  });
}
