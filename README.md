# Sistema Didático de Manutenção de Sistemas — SENAI

> **Objeto Pedagógico de Aplicação Prática**  
> **Curso:** Técnico em Desenvolvimento de Sistemas  
> **Unidade Curricular:** Manutenção de Sistemas  
> **Carga Horária:** 30 horas (10 encontros de 3h)  
> **Instituição:** Serviço Nacional de Aprendizagem Industrial (SENAI)

---

## 1. Contextualização da Unidade Curricular

Na Engenharia de Software moderna, mais de **70% do ciclo de vida e dos custos de um sistema** concentram-se na fase pós-implantação (operação e manutenção). 

Este sistema atua como um **laboratório didático simulado**, onde os estudantes do curso técnico vivenciam a rotina de um departamento de sustentação e suporte técnico Nível 2/3:
1. **Classificação Técnica de Demandas:** Aplicação prática da norma **ISO/IEC 14764** (Corretiva, Preventiva, Adaptativa e Evolutiva).
2. **Diagnóstico de Causa-Raiz e Versionamento (A/B):** Investigação de anomalias na **Versão A**, análise de eficácia de correções e detecção de regressões na **Versão B**.
3. **Registro em Portfólio Externo:** Documentação padronizada de evidências, hipóteses de falha e soluções recomendadas em ferramentas de mercado (Planilhas Google/Excel, Google Docs ou Notion).
4. **Ciclo PDCA e Gestão de Indicadores:** Extração de dados consolidados para cálculo de métricas essenciais de sustentação (MTTR, MTBF, distribuição de demandas e taxa de reincidência).

> [!NOTE]
> **Diretriz Pedagógica:** Os estudantes **não alteram o código-fonte diretamente durante as aulas regulares**. Eles analisam as falhas como operadores e analistas de sistemas, propõem soluções arquiteturais em seu portfólio e justificam a classificação e o impacto de cada intervenção.

---

## 2. Tipos de Manutenção de Software (ISO/IEC 14764)

O sistema exige a classificação obrigatória de cada chamado em um dos quatro tipos canônicos:

| Tipo de Manutenção | Descrição Técnica | Exemplo no Sistema |
|---|---|---|
| **Corretiva** | Intervenção reativa realizada após a detecção de uma falha para restaurar a operação correta do software. | Correção de erro 500 ao gerar relatórios ou queda de conexão. |
| **Preventiva** | Modificação proativa para detectar e corrigir falhas latentes antes que se manifestem como incidentes operacionais. | Limpeza periódica de logs em disco e rotação de baterias de no-break. |
| **Adaptativa** | Modificação para manter o software compatível com alterações no ambiente de execução (leis, SO, navegadores, APIs). | Ajuste de contraste para nova lei de acessibilidade e layout institucional. |
| **Evolutiva** | Implementação de novos requisitos, melhorias de desempenho ou expansão de funcionalidades solicitadas pelo usuário. | Inclusão de botão para exportação de dados em CSV ou novos filtros. |

---

## 3. Arquitetura de Arquivos

```text
ManutencaoSistemas/
├── index.html               # Tela de login didática (sem minigame de QA)
├── dashboard.html           # Painel de métricas com filtro dinâmico por tipo de manutenção
├── novo.html                # Formulário de abertura com campo 'Tipo de Manutenção' obrigatório
├── consulta.html            # Listagem com filtros combinados e modal de edição/reclassificação
├── app.js                   # Controlador com motor de versionamento A/B e persistência
├── validadores.js           # Funções puras isoladas (híbrido browser / Node.js)
├── validadores.test.js      # Suíte de testes unitários com Vitest
├── style.css                # Folha de estilos unificada com design tokens e badges
├── package.json             # Dependências e scripts do Vitest
├── README.md                # Documentação institucional do projeto
├── GUIA_DO_ALUNO.md         # Roteiro passo a passo para os estudantes
└── GABARITO_PROFESSOR.md    # Manual docente com plano de 10 aulas, defeitos e indicadores
```

---

## 4. Como Executar a Aplicação

### 4.1. Execução Imediata (Sem Instalação)
O sistema foi construído 100% em **Vanilla Web Standards** (HTML5 semântico, CSS3 com design tokens e JavaScript moderno ES6+). Não requer Node.js, compilação nem banco de dados externo:

1. Dê um duplo clique no arquivo [`index.html`](file:///Users/marciob/Dev/TestStation/ManutencaoSistemas/index.html) para abrir diretamente no seu navegador preferido.
2. Ou utilize a extensão **Live Server** no VS Code.

### 4.2. Credenciais Pré-Configuradas para Simulação
- **Estudante / Técnico:** Usuário: `aluno` | Senha: `123`
- **Docente / Gestor:** Usuário: `professor@senai.br` | Senha: `SenhaValida123`

---

## 5. Suíte de Testes Automatizados (Vitest)

```bash
# Na raiz do projeto ou dentro da pasta ManutencaoSistemas:
npm test
```

---

## 6. O Motor de Versionamento A/B

A aplicação conta com um alternador de versão no rodapé e no **Painel Docente**:
- **Versão A (v1.0.0 — Build Inicial):** Contém anomalias pedagógicas planejadas (ex: categoria Hardware forçando prioridade Baixa, ausência de validação de tipo de manutenção, contagem de dashboard imprecisa e efeito hidra de duplicação ao encerrar).
- **Versão B (v1.1.0 — Build Reteste & Regressão):** Corrige os defeitos identificados, porém introduz regressões realistas (ex: alteração de prioridade inadvertida ao mover para "Em andamento" e anulação do filtro de tipo quando combinado com busca por texto).
