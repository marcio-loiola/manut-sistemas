# Sistema Didático de Manutenção de Sistemas — SENAI

> **Objeto Pedagógico de Aplicação Prática**  
> **Curso:** Técnico em Desenvolvimento de Sistemas  
> **Unidade Curricular:** Manutenção de Sistemas  
> **Carga Horária:** 30 horas (10 encontros de 3h)  
> **Instituição:** Serviço Nacional de Aprendizagem Industrial (SENAI)

---

## 1. Contextualização e Objetivo da Adaptação (Dia 3 — Análise e Priorização)

Na Engenharia de Software moderna, mais de **70% do ciclo de vida e dos custos de um sistema** concentram-se na fase pós-implantação (operação e sustentação). 

Esta adaptação do sistema atua como **laboratório didático simulado de análise e tomada de decisão técnica**. Na aula dedicada à **Priorização e Planejamento Inicial da Manutenção (Dia 3 — 150 minutos)**, os estudantes assumem o papel de **analistas de sustentação** que recebem uma fila real de demandas e devem estruturar sua atuação com base em critérios técnicos objetivos:
- **Impacto no Negócio:** Extensão do dano ou benefício operacional (usuários/setores afetados, parada operacional vs. lentidão).
- **Urgência Operacional:** Pressão de tempo para ação imediata ou possibilidade de agendamento em janela programada.
- **Acordo de Nível de Serviço (SLA):** Prazos contratuais de resposta e resolução técnica.
- **Matriz de Prioridade Técnica:** Cruzamento formal de Impacto e Urgência gerando a prioridade sugerida (P1 a P4).

> [!NOTE]
> **Ponte Didática com a Matriz de Eisenhower:**  
> A Matriz de Eisenhower (Importante vs. Urgente) é apresentada pelo docente no Bloco 2 como ferramenta mental e pessoal de tomada de decisão. No entanto, no contexto profissional de suporte a sistemas, ela se desdobra tecnicamente nas dimensões de **Impacto**, **Urgência**, **SLA** e **Existência de Contingência**.

---

## 2. Como Iniciar e Executar a Aplicação

O sistema é construído inteiramente em **Vanilla Web Standards** (HTML5 semântico, CSS3 com design tokens e JavaScript ES6+ puro), persistido em `localStorage`, **sem dependência de backend ou frameworks**:

1. Dê um duplo clique no arquivo [`index.html`](file:///Users/marciob/Dev/TestStation/ManutencaoSistemas/index.html) para abrir diretamente em qualquer navegador moderno.
2. Ou utilize a extensão **Live Server** no VS Code.

### Credenciais Pré-Configuradas
- **Estudante / Técnico:** Usuário: `aluno` | Senha: `123`
- **Docente / Gestor:** Usuário: `professor@senai.br` | Senha: `SenhaValida123`

---

## 3. Diferença entre Modo Estudante e Modo Docente

| Recurso / Funcionalidade | Modo Estudante (`aluno`) | Modo Docente (`professor@senai.br`) |
|---|:---:|:---:|
| **Consulta e filtros da fila** | Liberado | Liberado |
| **Modal "Ver análise"** | Liberado | Liberado |
| **Copiar dados para ficha externa** | Liberado | Liberado |
| **Exportar fila para CSV** | Liberado | Liberado |
| **Edição e alteração de status (Dia 3)** | 🔒 **Bloqueado** (Modo Análise) | 🔓 **Liberado** |
| **Alternar Versão A/B e Reset de Fábrica** | Apenas Reset de Fila | 🔓 **Liberado no Painel Docente** |
| **Controle de Bloqueio da Turma** | Não visível | 🔓 **Controle de liberação/bloqueio** |

---

## 4. Recursos da Interface para Análise e Coleta de Evidências

### 4.1. Modal "Ver análise"
Na tela [`consulta.html`](file:///Users/marciob/Dev/TestStation/ManutencaoSistemas/consulta.html), cada chamado possui o botão **🔍 Ver análise**. Ao clicar, abre-se uma ficha pedagógica completa contendo:
- Título, descrição detalhada, categoria e tipo de manutenção (ISO/IEC 14764).
- Impacto, Urgência, Prioridade Atual e **Prioridade Sugerida pela Matriz**.
- SLAs de resposta e resolução contratados.
- Setor afetado, quantidade de usuários impactados e presença de alternativa temporária (contingência).
- Primeira ação recomendada e critério de validação técnica inicial.
- Observação pedagógica para orientar o raciocínio sem entregar a resposta.

### 4.2. Botão "Copiar dados para ficha externa"
Dentro do modal de análise, o botão copia automaticamente as informações do chamado formatadas em Markdown para a área de transferência, permitindo colagem rápida em relatórios no **Google Docs**, **Notion** ou **Google Sheets**.

### 4.3. Botão "Exportar fila para CSV"
No topo da tela de consulta, o botão gera um arquivo CSV delimitado por ponto e vírgula com codificação UTF-8 com BOM (`\uFEFF`), preservando acentos e abrindo perfeitamente no Excel e Google Sheets.

---

## 5. Roteiro de Trabalho do Estudante no Dia 3

Durante a aula de 150 minutos, os estudantes devem executar o seguinte fluxo:
1. **Consultar os seis chamados:** Acessar a tela de consulta e examinar os dados contextuais.
2. **Analisar Impacto e Urgência:** Avaliar quem é afetado e se a operação parou ou há contingência.
3. **Comparar Prioridade Atual e Prioridade Sugerida:** Identificar divergências entre o que foi registrado e o que a matriz recomenda.
4. **Preencher externamente a Fila Priorizada:** Registrar a ordem de atendimento justificada na Ficha de Priorização.
5. **Escolher o Top 3:** Selecionar em equipe os três chamados mais críticos para ação imediata.
6. **Produzir o Plano de Manutenção Inicial:** Documentar no portfólio externo o plano respondendo: *O que tratar? Por que? Quem é o responsável? Qual a primeira ação? Como validar?*

---

## 6. Testes Automatizados (Vitest)

O projeto possui testes unitários para a matriz de priorização, exportação de CSV e regras de acesso:

```bash
# Executar a suíte de testes:
npm test
```
