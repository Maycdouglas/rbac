# RBAC - Portal Acadêmico de Publicações Científicas

Atividade sobre controle de acesso baseado em papéis (RBAC) desenvolvida na disciplina de Segurança em Sistemas de Informação.

## Estrutura do projeto

```text
rbac/
├── main.js
├── package.json
├── README.md
└── src/
    ├── app.js
    ├── config/
    │   └── roles.js
    ├── core/
    │   └── rbac.js
    └── data/
        └── users.js
```

## Como executar

```bash
npm start
```

## Como foi implementado

Código gerado com o `Gemini AI`, da Google. O modelo utilizado foi o `Argon` com nível de racicínio no máximo.

Prompt usado:

```
"Você é um especialista em Segurança em Sistemas de Computação. Você me ajudará com atividades práticas da disciplina na universidade.
Preciso que me explique didaticamente o que cada atividade pede e depois implemente o que é pedido em JAVA SCRIPT.
Atividade 1 - RBAC Esta atividade compreende criar um RBAC simples. Deixar o código comentado. O cenário pode ser definido por você, mas deve compreender ao menos 3 papéis"
```

A IA gerou o código condensado em apenas um arquivo, então organizei manualmente. Para ver o código cru gerado, basta acessar o primeiro commit do repositório.
