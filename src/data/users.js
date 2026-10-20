// BANCO DE DADOS SIMULADO DE USUÁRIOS
// Cada usuário possui um identificador, um nome e o papel (role) que ocupa no sistema.
export const users = Object.freeze([
  { id: 1, nome: "Ana (Aluna)", papel: "leitor" },
  { id: 2, nome: "Prof. Bruno (Pesquisador)", papel: "editor" },
  { id: 3, nome: "Carla (Diretora de TI)", papel: "admin" },
  { id: 4, nome: "Visitante Anônimo", papel: "convidado_invalido" }, // Para testar papel inexistente
]);

export const DEMO_USERS = Object.freeze({
  alunaAna: users[0],
  profBruno: users[1],
  adminCarla: users[2],
  usuarioInvalido: users[3],
});
