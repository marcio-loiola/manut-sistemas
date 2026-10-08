# Gabarito do Docente — Sistema Didático de Manutenção de Sistemas

> **MATERIAL DE USO EXCLUSIVO DO CORPO DOCENTE — SENAI**  
> **Unidade Curricular:** Manutenção de Sistemas (30 Horas / 10 Encontros)  
> **Aula Específica:** Dia 3 (150 minutos) — Triagem, Priorização e Plano de Manutenção  
> **Curso:** Técnico em Desenvolvimento de Sistemas  
> **Referenciais:** Matriz de Eisenhower (ferramenta de reflexão) e ISO/IEC 14764 (processos de manutenção)

---

## 1. Dinâmica da Aula do Dia 3 (150 minutos)

A aula está estruturada em três blocos pedagógicos complementares:

### Bloco 1 (40 min): Aquecimento com Visualização de Fluxo (Kanban)
- Os estudantes jogam externamente o *Kanban Board Game* (ou simulação física/digital equivalente).
- **Objetivo:** Compreender limites de trabalho em andamento (WIP), gargalos e a necessidade de não iniciar todas as tarefas ao mesmo tempo.

### Bloco 2 (50 min): Eisenhower, Dimensões de SLA e Ficha de Priorização
- **Exposição docente:** O professor apresenta a Matriz de Eisenhower como modelo mental (Importante x Urgente). Em seguida, conecta com a realidade técnica: *O que torna um chamado urgente em TI? (SLA, falta de contingência, usuários parados).*
- **Prática no sistema:** Os alunos acessam a aplicação com usuário `aluno`, examinam os 6 chamados e utilizam o botão **Ver análise** para extrair as variáveis.
- **Produção externa:** Os alunos preenchem a Ficha de Priorização no Google Sheets/Docs e definem a ordem da fila com base em Impacto, Urgência e SLA.

### Bloco 3 (60 min): Seleção do Top 3 e Elaboração do Plano de Manutenção
- As equipes debatem e convergem para um **Top 3 de chamados**.
- Elaboram o **Plano de Manutenção Inicial** no portfólio externo respondendo: *O que tratar? Por que? Quem é responsável? Qual a primeira ação? Como validar?*

---

## 2. Análise Técnica dos Seis Chamados e Gabarito de Priorização

A tabela abaixo resume a análise técnica de referência para o docente:

| ID | Título | Tipo | Impacto | Urgência | Prioridade Atual | Sugerida (Matriz) | Contingência? | Classificação Recomendada |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|:---|
| **#1** | Erro 500 relatório financeiro | Corretiva | Alto | Alta | Alta | **P1** | **Não** | **Top 1 / Crítico** (Setor financeiro paralisado no fechamento mensal). |
| **#5** | Falha na placa de rede Lab 03 | Corretiva | Alto | Alta | Alta | **P1** | **Não** | **Top 2 / Crítico** (Turma inteira impedida de realizar aula prática). |
| **#2** | Limpeza de logs (disco a 88%) | Preventiva | Médio | Média | Média | **P3** | **Sim** | **Top 3 (Candidato Forte)**: P3 pela matriz pura, mas risco iminente de colapso de todo o servidor se atingir 100%. |
| **#6** | Revisão trimestral no-breaks | Preventiva | Médio | Baixa | Baixa | **P4** | **Sim** | **Planejável** (Importante para evitar desastres, mas agendável em janela). |
| **#4** | Exportação CSV solicitada | Evolutiva | Médio | Baixa | Média | **P4** | **Sim** | **Planejável** (Gera produtividade, mas há consulta manual na tela). |
| **#3** | Adequação visual SENAI 2026 | Adaptativa | Médio | Baixa | Baixa | **P4** | **Sim** | **Planejável** (Mudança de conformidade com prazo institucional longo). |

### Discussão Pedagógica Esperada dos Alunos:
- **Consenso quase unânime:** Chamados **#1** e **#5** devem encabeçar o Top 3 porque combinam impacto alto, urgência alta, SLA curto (4h) e **ausência total de contingência**.
- **A grande discussão da aula (O terceiro lugar):**
  - Estudantes com visão estritamente reativa podem colocar o chamado #4 por ser pedido da Coordenação.
  - Estudantes com visão preventiva e madura escolherão o **#2 (Logs a 88%)**, justificando que se o disco atingir 100%, todos os outros sistemas cairão. **Essa reflexão deve ser valorizada pelo docente!**

---

## 3. Gestão do Bloqueio de Edição no Sistema

Para garantir que os estudantes não alterem status ou dados dos chamados durante a aula do Dia 3:
1. O sistema mantém o modo estudante com **edição bloqueada por padrão** (`manutencao_permitir_edicao_aluno = "false"`).
2. Na tela de consulta, o estudante consegue visualizar todas as informações, usar filtros, abrir o modal de análise, copiar dados e exportar CSV, mas os botões e selects de alteração permanecem desabilitados com aviso explícito.
3. **Nas aulas futuras (Aulas 6 a 10):**
   - O professor acessa com `professor@senai.br` / `SenhaValida123`.
   - Clica em **⚙️ Painel Docente** no rodapé.
   - Clica no botão **🔓 Liberar Edição para Estudantes (Aulas Posteriores)**.
   - A partir desse momento, os estudantes poderão testar a alteração de status e edição em sala.

---

## 4. Rubrica de Avaliação do Portfólio Externo

| Critério de Avaliação | Insuficiente (0 - 4) | Regular (5 - 6) | Bom (7 - 8) | Excelente (9 - 10) |
|---|---|---|---|---|
| **Qualidade da Justificativa** | Decisão sem justificativa ou baseada em preferência pessoal. | Justificativa superficial, sem citar impacto ou urgência. | Justifica com base em quem é afetado e tempo de SLA. | Articula impacto no negócio, urgência, presença de contingência e risco de inação. |
| **Leitura de Impacto e Urgência** | Confunde urgência com impacto. | Identifica isoladamente, mas erra no cruzamento da matriz. | Aplica corretamente a matriz e identifica os chamados P1. | Analisa criticamente a matriz e pondera riscos adicionais (ex: disco a 88%). |
| **Coerência da Primeira Ação** | Propõe ações desconexas com o problema. | Propõe soluções genéricas sem diagnóstico prévio. | Define ação adequada (ex: reproduzir falha para bugs, planejar para preventivas). | Detalha primeira ação e critério objetivo de validação final da entrega. |
| **Estrutura do Plano de Manutenção** | Incompleto ou não entrega o Top 3. | Lista apenas os títulos sem detalhar responsáveis ou prazos. | Plano estruturado com os 5 elementos requeridos para os 3 chamados. | Plano profissional, claro, pronto para execução pela equipe de suporte. |

---

## 5. Mapeamento Interno de Defeitos Pedagógicos (Uso Exclusivo do Docente)

> **ATENÇÃO:** Nunca revele estes códigos ou mencione "bugs intencionais" aos alunos na interface.

- **DEF-001 (Versão A):** Ao cadastrar novo chamado em `novo.html` com categoria Hardware, o sistema força prioridade Baixa.
- **DEF-002 (Versão A):** Formulário de novo chamado não valida tipo de manutenção nem campos mínimos.
- **DEF-003 (Versão A):** Card de chamados abertos no Dashboard ignora prioridade Baixa.
- **DEF-004 (Versão A):** Busca textual na consulta é sensível a maiúsculas/minúsculas.
- **DEF-005 (Versão A):** Efeito hidra — ao encerrar chamado na tabela, cria cópia reaberta.
- **DEF-REG-001 (Versão B):** Ao alterar status para "Em andamento", prioridade reseta para Média.
- **DEF-REG-002 (Versão B):** Busca de texto combinada com filtro de tipo anula o filtro de tipo.
