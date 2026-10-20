import { ROLES_PERMISSIONS } from "../config/roles.js";

// MOTOR DE VERIFICAÇÃO DO RBAC (Policy Enforcement Point)
/**
 * Função responsável por verificar se um usuário tem permissão para executar uma ação.
 * @param {Object} usuario - O objeto representando o usuário autenticado.
 * @param {string} acao - A permissão necessária para acessar o recurso.
 * @returns {boolean} - Retorna true se permitido, ou false se negado.
 */
export function getRolePermissions(papel) {
  return ROLES_PERMISSIONS[papel] ?? [];
}

export function canUserAccess(usuario, acao) {
  // Verificação de segurança 1: O usuário existe e possui um papel definido?
  if (!usuario || !usuario.papel) {
    console.warn(
      "[ALERTA DE SEGURANÇA] Tentativa de acesso sem usuário ou papel válido."
    );
    return false; // Negação por padrão (Default Deny)
  }

  // Busca a lista de permissões associadas ao papel do usuário
  const permissoesDoPapel = getRolePermissions(usuario.papel);

  // Verificação de segurança 2: O papel atribuído ao usuário existe na nossa configuração?
  if (!permissoesDoPapel.length) {
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
  }

  console.error(
    `[ACESSO NEGADO] ${usuario.nome} [Papel: ${usuario.papel}] tentou executar "${acao}" sem permissão.`
  );
  return false;
}
