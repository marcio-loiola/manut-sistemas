# Guia do Estudante — Análise, Priorização e Plano de Manutenção

> **Unidade Curricular:** Manutenção de Sistemas (30h — Aula do Dia 3: 150 min)  
> **Curso Técnico em Desenvolvimento de Sistemas — SENAI**

Bem-vindo(a) à atividade prática de **Triagem e Priorização de Demandas de Manutenção**! Nesta aula, você e sua equipe atuarão como **analistas de sustentação de software**, tomando decisões estratégicas sobre qual chamado deve ser atendido primeiro.

---

## 1. Roteiro Passo a Passo da Aula (Dia 3)

Siga rigorosamente a sequência de atividades abaixo:

1. **Faça login como aluno:** Acesse o sistema utilizando o usuário `aluno` e a senha `123`.
2. **Abra "Consultar Chamados":** Navegue até a tela de consulta da fila de manutenção.
3. **Use os filtros e ordenações:** Explore a busca, filtre por status ou tipo de manutenção e experimente as ordenações por impacto e urgência.
4. **Clique em "Ver análise":** Inspecione a ficha técnica de cada um dos seis chamados cadastrados.
5. **Copie os dados necessários:** Utilize o botão **📋 Copiar dados para ficha externa** para levar as informações estruturadas ao seu portfólio.
6. **Preencha a Ficha de Priorização externa:** No Google Docs, Google Sheets ou Notion, registre sua análise para os seis chamados considerando:
   - Impacto no negócio (quem é afetado e qual o tamanho do prejuízo);
   - Urgência (pressão de tempo e iminência de parada);
   - Presença ou ausência de contingência (existe alternativa temporária?);
   - Prazos de SLA de resposta e resolução.
7. **Não edite os chamados nesta etapa:** O sistema opera em modo de somente leitura pedagógica para estudantes no Dia 3. Seu foco é diagnosticar e planejar externamente.
8. **Escolha o Top 3 junto à equipe:** Em debate com seu grupo, defina os **três chamados prioritários** que devem receber intervenção imediata.
9. **Leve o Top 3 para o Plano de Manutenção Inicial:** Documente o plano de ação no portfólio externo, detalhando responsáveis, primeiras ações e critérios de validação.

---

## 2. A Matriz de Prioridade Técnica

Durante a análise, compare a **Prioridade Atual** informada pelo solicitante com a **Prioridade Sugerida pela Matriz**:

| Impacto / Urgência | Baixa | Média | Alta |
|:---|:---:|:---:|:---:|
| **Alto** | **P3** (Média) | **P2** (Alta) | **P1** (Crítica) |
| **Médio** | **P4** (Baixa) | **P3** (Média) | **P2** (Alta) |
| **Baixo** | **P4** (Baixa) | **P4** (Baixa) | **P3** (Média) |

> **Dica:** A matriz fornece uma recomendação algorítmica, mas o analista de sustentação deve avaliar o contexto humano e operacional (por exemplo: um risco iminente de perda de dados pode justificar elevar uma demanda).

---

## 3. Modelo para seu Portfólio Externo

### 3.1. Ficha de Priorização da Fila
Para cada um dos 6 chamados, registre em sua planilha ou documento:
- ID e Título
- Tipo de Manutenção (Corretiva / Preventiva / Adaptativa / Evolutiva)
- Avaliação de Impacto e Urgência
- Há contingência disponível? (Sim/Não)
- Prioridade Final Decidida pela Equipe (P1, P2, P3 ou P4)
- Justificativa Técnica da Decisão

### 3.2. Estrutura do Plano de Manutenção Inicial (Top 3 Escolhido)
Para os 3 chamados selecionados pela equipe, responda com clareza:
1. **O que tratar?** Descrição sucinta do problema técnico.
2. **Por que tratar agora?** Justificativa do impacto/urgência e risco de não agir.
3. **Quem será o responsável?** Perfil técnico atribuído (infraestrutura, redes, front-end, back-end).
4. **Qual a primeira ação técnica?** (Investigar, reproduzir falha, avaliar risco, levantar requisito, planejar janela).
5. **Como validar a solução?** Critério objetivo para garantir que a manutenção foi bem-sucedida.
