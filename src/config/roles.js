// DEFINIÇÃO DAS PERMISSÕES E PAPÉIS (Matriz de Controle de Acesso)
// Usamos Object.freeze para impedir que a estrutura de segurança seja alterada em tempo de execução.
export const ROLES_PERMISSIONS = Object.freeze({
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
