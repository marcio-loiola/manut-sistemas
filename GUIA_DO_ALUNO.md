# Guia do Estudante — Prática Profissional em Manutenção de Sistemas

> **Unidade Curricular:** Manutenção de Sistemas (30h — 10 Aulas)  
> **Curso Técnico em Desenvolvimento de Sistemas — SENAI**

Bem-vindo(a) à sua prática simulada de **Sustentação e Manutenção de Sistemas**! 

Neste ambiente, você atuará como um(a) **Analista de Suporte e Manutenção de Software (Nível 2/3)**. Sua missão não é apenas programar, mas diagnosticar incidentes operacionais, classificar chamados com rigor técnico, investigar causas-raiz, documentar soluções em seu portfólio e monitorar a qualidade do serviço através do ciclo **PDCA**.

---

## 1. Como Classificar Chamados por Tipo de Manutenção

De acordo com o padrão internacional **ISO/IEC 14764**, as demandas de manutenção de software dividem-se em quatro tipos fundamentais:

```
                            ┌───────────────┐
                            │    CHAMADO    │
                            └───────┬───────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           ▼                        ▼                        ▼
    Há um defeito ou         O sistema está bem,      Houve mudança no
  falha interrompendo o      mas queremos evitar       ambiente externo?
      funcionamento?          falhas futuras?         (SO, leis, padrões)
           │                        │                        │
       [ SIM ]                  [ SIM ]                  [ SIM ]
           ▼                        ▼                        ▼
      CORRETIVA                PREVENTIVA               ADAPTATIVA
           │                        │                        │
           └────────────────────────┴────────────────────────┘
                                    │ [ NÃO ]
                                    ▼
                      É um novo recurso, melhoria
                      ou otimização de funcionalidade?
                                    │
                                 [ SIM ]
                                    ▼
                                EVOLUTIVA
```

### 1.1. Manutenção Corretiva
- **Definição:** Ação reativa tomada para corrigir um defeito ou anomalia após a entrada em produção.
- **Pergunta-chave:** *"O sistema quebrou, travou ou gerou um resultado inconsistente com a especificação original?"*
- **Exemplo Real:** A tela de login rejeita credenciais válidas, ou um cálculo financeiro gera valor incorreto.

### 1.2. Manutenção Preventiva
- **Definição:** Ação proativa para identificar e mitigar falhas potenciais antes que elas provoquem paradas no sistema.
- **Pergunta-chave:** *"O sistema ainda não quebrou, mas se nada for feito haverá um incidente em breve?"*
- **Exemplo Real:** Limpeza de arquivos temporários e logs que estão prestes a esgotar o disco.

### 1.3. Manutenção Adaptativa
- **Definição:** Ajuste do sistema para mantê-lo operacional diante de mudanças no ambiente tecnológico, legal ou regulatório.
- **Pergunta-chave:** *"O sistema precisa mudar porque o mundo externo (ambiente, legislação, navegador) mudou?"*
- **Exemplo Real:** Atualização de layout para cumprir novas diretrizes de acessibilidade (WCAG), adequação às regras da LGPD.

### 1.4. Manutenção Evolutiva
- **Definição:** Incorporação de novos requisitos, aumento de escopo ou melhorias de usabilidade para agregar mais valor ao usuário.
- **Pergunta-chave:** *"Estamos adicionando uma capacidade que o sistema nunca teve antes?"*
- **Exemplo Real:** Criação de um botão para exportar listagens para CSV/Excel, novos filtros de busca.

---

## 2. Como Usar o Sistema para Diagnosticar Falhas

O sistema funciona em duas fases didáticas: **Versão A** (versão inicial em operação) e **Versão B** (versão pós-manutenção).

### Passo 1: Autenticação
Acesse [`index.html`](file:///Users/marciob/Dev/TestStation/ManutencaoSistemas/index.html) e utilize as credenciais:
- **Usuário:** `aluno` | **Senha:** `123`

### Passo 2: Investigação no Dashboard
No [`dashboard.html`](file:///Users/marciob/Dev/TestStation/ManutencaoSistemas/dashboard.html):
1. Verifique os cartões de contagem (Abertos, Em andamento, Encerrados).
2. Utilize o filtro por **Tipo de Manutenção** e observe se as somatórias batem com a realidade.
3. Observe o quadro de **Distribuição de Demandas por Tipo de Manutenção** para subsidiar suas análises de PDCA.

### Passo 3: Triagem e Abertura de Chamados
Em [`novo.html`](file:///Users/marciob/Dev/TestStation/ManutencaoSistemas/novo.html):
1. Registre chamados simulados de diferentes naturezas.
2. Observe o comportamento da **Prioridade** ao selecionar diferentes categorias (ex: Hardware).
3. Teste a validação: tente submeter chamados sem selecionar o Tipo de Manutenção e observe o comportamento em cada versão.

### Passo 4: Operação e Transição de Status
Em [`consulta.html`](file:///Users/marciob/Dev/TestStation/ManutencaoSistemas/consulta.html):
1. Teste o campo de busca textual com letras maiúsculas e minúsculas.
2. Altere o status de um chamado para "Em andamento" e depois para "Encerrado".
3. Use o botão **✏️ Editar** para abrir a ficha técnica do chamado, ajustar a descrição e validar a reclassificação.

---

## 3. Modelo de Registro para Portfólio Externo

Você deve registrar suas evidências em sua ferramenta preferida (**Planilhas Google**, **Excel**, **Google Docs** ou **Notion**):

```markdown
### Ficha de Manutenção # [ID DO CHAMADO]

- **Título da Ocorrência:** [Ex: Erro 500 no relatório financeiro]
- **Classificação ISO/IEC 14764:** [Corretiva | Preventiva | Adaptativa | Evolutiva]
- **Justificativa da Classificação:** [Por que se enquadra nesta categoria]
- **Sintomas Observados:** [O que o usuário ou operador relatou]
- **Passos para Reproduzir:**
  1. Acessar a tela X
  2. Preencher os campos Y e Z
  3. Clicar no botão W
- **Diagnóstico Técnico / Causa-Raiz Hipotética:** [O que causou o problema no código]
- **Plano de Ação Proposto:** [Quais alterações técnicas devem ser implementadas]
- **Evidência:** [Printscreen da tela ou transcrição da mensagem de erro]
- **Impacto no Negócio:** [Crítico | Alto | Médio | Baixo]
```

---

## 4. Como Calcular Indicadores PDCA em Planilha Externa

### 4.1. Distribuição Percentual por Tipo de Manutenção
$$\% \text{ Tipo} = \left( \frac{\text{Quantidade de Chamados do Tipo}}{\text{Total Geral de Chamados}} \right) \times 100$$

> **Meta Ideal na Indústria:** Corretivas $< 30\%$, Preventivas $> 20\%$, Adaptativas $\approx 10\%$, Evolutivas $> 40\%$.

### 4.2. MTTR — Mean Time To Repair (Tempo Médio de Atendimento/Reparo)
$$\text{MTTR} = \frac{\sum \text{Tempo total gasto em horas nas manutenções}}{\text{Total de chamados encerrados}}$$

### 4.3. Taxa de Reincidência / Reabertura Indevida (Efeito Hidra)
$$\text{Taxa de Reabertura} = \left( \frac{\text{Chamados Reabertos ou Duplicados}}{\text{Total de Chamados Encerrados}} \right) \times 100$$

---

## 5. Dinâmica em Duas Etapas: Versão A e Versão B

### Fase 1: Diagnóstico na Versão A (Aulas 1 a 5)
1. Mantenha o sistema na **Versão A (v1.0.0)**.
2. Identifique os defeitos pedagógicos na abertura, busca, encerramento e dashboard.
3. Classifique os chamados existentes por tipo de manutenção.
4. Preencha seu portfólio externo e elabore o plano de ação de sustentação.

### Fase 2: Reteste e Análise de Regressão na Versão B (Aulas 6 a 10)
1. Alterne para **Build B (Reteste & Regressão)** no rodapé.
2. **Reteste:** Verifique se as anomalias da Versão A foram solucionadas.
3. **Teste de Regressão:** Execute testes para descobrir os novos efeitos colaterais.
4. Registre no portfólio a lição aprendida: por que manutenções sem testes automatizados geram novas falhas em produção.
