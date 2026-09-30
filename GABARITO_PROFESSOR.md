# Gabarito do Docente — Sistema Didático de Manutenção de Sistemas

> **MATERIAL DE USO EXCLUSIVO DO CORPO DOCENTE — SENAI**  
> **Unidade Curricular:** Manutenção de Sistemas (30 Horas / 10 Encontros)  
> **Curso:** Técnico em Desenvolvimento de Sistemas  
> **Referencial Normativo:** ISO/IEC 14764

---

## 1. Visão Geral e Cronograma Sugerido de 10 Aulas (3h cada)

| Aula | Tema Central | Atividades com o Sistema Didático |
|:---:|---|---|
| **01** | Ciclo de Vida do Software e Introdução à Manutenção | Apresentação do sistema legado; acesso via `index.html`; primeiros registros e navegação. |
| **02** | Tipologia de Manutenção (ISO/IEC 14764) | Classificação prática de chamados: Corretiva, Preventiva, Adaptativa e Evolutiva na tela `novo.html`. |
| **03** | Diagnóstico de Falhas e Análise de Causa-Raiz | Investigação de anomalias na **Versão A** (DEF-001 prioridade de Hardware e DEF-004 busca). |
| **04** | Registro de Evidências e Ficha Técnica de Atendimento | Elaboração do portfólio externo (Google Docs / Sheets / Notion); documentação de sintomas e contornos. |
| **05** | Métricas de Sustentação e Ciclo PDCA (Fase Plan & Do) | Coleta de dados no Dashboard; montagem da planilha externa com as fórmulas de MTTR, MTBF e % por tipo. |
| **06** | Versionamento de Software e Reteste na Versão B | Ativação da **Versão B (v1.1.0)**; verificação das correções aplicadas (Reteste dos DEF-001 a DEF-005). |
| **07** | Efeitos Colaterais e Testes de Regressão | Descoberta guiada das regressões da Versão B (`DEF-REG-001` e `DEF-REG-002`); análise de impacto. |
| **08** | Testes Automatizados como Barreira de Regressão | Execução da suíte Vitest (`npm test`); análise de funções puras isoladas em `validadores.js`. |
| **09** | Ciclo PDCA (Fase Check & Act): Análise dos Indicadores | Cálculo das métricas comparativas (Versão A vs. Versão B) na planilha externa; proposição de melhorias. |
| **10** | Apresentação dos Portfólios e Fechamento da UC | Avaliação final do portfólio individual/grupo; consolidação dos aprendizados da disciplina. |

---

## 2. Catálogo Completo de Defeitos Pedagógicos (Versão A)

### **DEF-001: Forçamento Indevido de Prioridade Baixa para Hardware**
- **Tela:** `novo.html`
- **Tipo:** **Corretiva** (Falha de lógica de negócio).
- **Comportamento Obtido (Versão A):** Ao selecionar categoria `Hardware` e prioridade `Alta`, o sistema força a gravação com prioridade `Baixa`.
- **Solução na Versão B:** Mantém a prioridade informada pelo usuário.

### **DEF-002: Ausência de Validação de Tipo de Manutenção e Campos Obrigatórios**
- **Tela:** `novo.html`
- **Tipo:** **Adaptativa / Preventiva** (Conformidade com padrões operacionais).
- **Comportamento Obtido (Versão A):** O formulário submete mesmo sem selecionar o tipo de manutenção e com campos em branco.
- **Solução na Versão B:** Validações obrigatórias de tipo de manutenção, título (>=5 chars) e descrição (>=10 chars).

### **DEF-003: Subnotificação de Chamados Abertos no Dashboard**
- **Tela:** `dashboard.html`
- **Tipo:** **Corretiva** (Erro de agregação de dados gerenciais).
- **Comportamento Obtido (Versão A):** O contador de Abertos ignora chamados cuja prioridade seja "Baixa".
- **Solução na Versão B:** Contabiliza todos os chamados abertos independentemente de prioridade.

### **DEF-004: Busca Textual Sensível a Maiúsculas/Minúsculas**
- **Tela:** `consulta.html`
- **Tipo:** **Evolutiva / Adaptativa** (Tolerância e usabilidade de busca).
- **Comportamento Obtido (Versão A):** Busca com `includes(term)` sem normalização para minúsculas.
- **Solução na Versão B:** Utiliza `.toLowerCase()` para busca case-insensitive.

### **DEF-005: Efeito Hidra ao Encerrar Chamados (Duplicação Anômala)**
- **Tela:** `consulta.html`
- **Tipo:** **Corretiva** (Falha de transição de estado).
- **Comportamento Obtido (Versão A):** Ao encerrar um chamado, o sistema cria automaticamente uma cópia aberta ("Reabertura indevida: ...").
- **Solução na Versão B:** Encerramento limpo sem duplicações.

---

## 3. Catálogo de Regressões Didáticas (Versão B)

### **DEF-REG-001: Redefinição Involuntária de Prioridade ao Mudar Status**
- **Cenário:** O operador altera o status de um chamado para `Em andamento`.
- **Efeito Colateral na Versão B:** A prioridade do chamado é resetada compulsoriamente para `Média`.

### **DEF-REG-002: Anulação do Filtro de Tipo em Buscas Textuais Cruzadas**
- **Cenário:** Na tela `consulta.html`, o operador filtra por Tipo de Manutenção `Corretiva` e digita uma palavra no campo de busca.
- **Efeito Colateral na Versão B:** A busca textual anula o filtro de tipo de manutenção, retornando chamados de qualquer tipo.

---

## 4. Gabarito de Indicadores PDCA para Planilha Externa

### 4.1. Chamados Iniciais de Fábrica

| ID | Título | Tipo de Manutenção | Status | Prioridade |
|:---:|---|:---:|:---:|:---:|
| **#1** | Erro 500 ao gerar relatório mensal financeiro | **Corretiva** | Aberto | Alta |
| **#2** | Limpeza de logs e rotação de disco no servidor | **Preventiva** | Em andamento | Média |
| **#3** | Adequação do layout ao padrão visual SENAI 2026 | **Adaptativa** | Encerrado | Baixa |
| **#4** | Exportação de relatórios de chamados para formato CSV | **Evolutiva** | Aberto | Média |
| **#5** | Falha intermitente na placa de rede do laboratório 03 | **Corretiva** | Em andamento | Alta |
| **#6** | Revisão periódica dos no-breaks e baterias da sala de servidores | **Preventiva** | Encerrado | Baixa |

### 4.2. Cálculos de Distribuição Percentual (Gabarito da Fase CHECK)

- **Total Geral de Chamados:** 6 chamados
- **Corretivas:** 2 chamados $\to \mathbf{33{,}33\%}$
- **Preventivas:** 2 chamados $\to \mathbf{33{,}33\%}$
- **Adaptativas:** 1 chamado $\to \mathbf{16{,}67\%}$
- **Evolutivas:** 1 chamado $\to \mathbf{16{,}67\%}$

### 4.3. Simulação de MTTR

| Chamado | Tipo | Horas |
|---|---|:---:|
| **#3 (Adaptativa)** | Padrão Visual 2026 | 5,0 h |
| **#6 (Preventiva)** | Revisão No-breaks | 3,0 h |

$$\text{MTTR} = \frac{5{,}0 + 3{,}0}{2} = \mathbf{4{,}0\text{ horas por chamado encerrado}}$$
