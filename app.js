// ==========================================================================
// MANUTENÇÃO DE SISTEMAS SENAI — CONTROLADOR PRINCIPAL (app.js)
// Unidade Curricular: Manutenção de Sistemas (30h, 10 aulas)
// ==========================================================================

// -------------------------------------------------------------------------
// 1. Controle de Versão Pedagógica (Versão A vs. Versão B)
// -------------------------------------------------------------------------
function getAppVersion() {
    return localStorage.getItem('manutencao_app_version') || 'A';
}

function setAppVersion(version) {
    const v = (version || 'A').toUpperCase() === 'B' ? 'B' : 'A';
    localStorage.setItem('manutencao_app_version', v);
    window.location.reload();
}

window.setVersion = setAppVersion;
window.getAppVersion = getAppVersion;

window.resetTestData = function () {
    localStorage.removeItem('manutencao_chamados');
    localStorage.removeItem('manutencao_usuarios');
    localStorage.removeItem('manutencao_permitir_edicao_aluno');
    initData(true);
    window.location.reload();
};

// -------------------------------------------------------------------------
// 2. Perfis de Usuário e Controle de Edição Pedagógica (Dia 3)
// -------------------------------------------------------------------------
function getUsuarioPerfil() {
    return localStorage.getItem('manutencao_usuario_perfil') || 'Estudante';
}

function isDocente() {
    return getUsuarioPerfil() === 'Docente';
}

function podeEditarChamados() {
    if (isDocente()) return true;
    return localStorage.getItem('manutencao_permitir_edicao_aluno') === 'true';
}

window.togglePermissaoEdicaoAluno = function () {
    const atual = localStorage.getItem('manutencao_permitir_edicao_aluno') === 'true';
    localStorage.setItem('manutencao_permitir_edicao_aluno', atual ? 'false' : 'true');
    window.location.reload();
};

// -------------------------------------------------------------------------
// 3. Inicializador de Dados Didáticos (Os 6 Chamados Canônicos)
// -------------------------------------------------------------------------
function initData(force = false) {
    const chamadosExistentes = localStorage.getItem('manutencao_chamados');
    let precisaAtualizar = force || !chamadosExistentes;

    if (!precisaAtualizar && chamadosExistentes) {
        try {
            const parsed = JSON.parse(chamadosExistentes);
            if (!Array.isArray(parsed) || parsed.length === 0 || !parsed[0].impact) {
                precisaAtualizar = true;
            }
        } catch (e) {
            precisaAtualizar = true;
        }
    }

    if (precisaAtualizar) {
        const mockChamados = [
            {
                id: 1,
                title: 'Erro 500 ao gerar relatório mensal financeiro',
                description: 'Usuários do setor financeiro relatam travamento e mensagem de erro ao tentar gerar o relatório mensal. A atividade impede a consolidação de informações necessárias para o fechamento interno.',
                category: 'Software',
                tipoManutencao: 'Corretiva',
                status: 'Aberto',
                priority: 'Alta',
                impact: 'Alto',
                urgency: 'Alta',
                slaResponse: '15 minutos',
                slaResolution: '4 horas',
                setorAfetado: 'Financeiro',
                usuariosAfetados: 'Um setor',
                contingenciaDisponivel: false,
                justificativaPrioridade: 'O setor financeiro não consegue concluir uma atividade de fechamento necessária no período atual.',
                primeiraAcaoRecomendada: 'Reproduzir falha',
                criterioValidacaoInicial: 'O relatório mensal deve ser gerado sem mensagem de erro e com os dados esperados.',
                observacaoPedagogica: 'Verifique em que etapa a mensagem aparece, quais filtros foram usados e se o comportamento ocorre para mais de um usuário.',
                solicitante: 'Coordenação Financeira',
                dataAbertura: '2026-10-08 08:30',
                evidencias: 'Captura de tela com mensagem HTTP 500 Internal Server Error ao clicar no botão "Gerar PDF Mensal".',
                responsavel: 'Equipe de Sustentação de Sistemas'
            },
            {
                id: 2,
                title: 'Limpeza de logs e rotação de disco no servidor',
                description: 'A partição /var/log atingiu 88% de ocupação. É necessário avaliar limpeza controlada, rotação de logs e monitoramento para evitar indisponibilidade do serviço.',
                category: 'Hardware',
                tipoManutencao: 'Preventiva',
                status: 'Aberto',
                priority: 'Média',
                impact: 'Médio',
                urgency: 'Média',
                slaResponse: '4 horas',
                slaResolution: '2 dias úteis',
                setorAfetado: 'Infraestrutura',
                usuariosAfetados: 'Todos',
                contingenciaDisponivel: true,
                justificativaPrioridade: 'Ainda não há parada, mas a falta de ação pode causar indisponibilidade futura do sistema.',
                primeiraAcaoRecomendada: 'Avaliar risco',
                criterioValidacaoInicial: 'A ocupação do disco deve permanecer em nível seguro e a política de rotação deve estar documentada.',
                observacaoPedagogica: 'Analise a diferença entre uma falha que já interrompeu a operação e uma ação para evitar uma falha futura.',
                solicitante: 'Administração de Redes',
                dataAbertura: '2026-10-08 09:15',
                evidencias: 'Alerta do monitoramento Zabbix indicando disco em 88% de uso na partição /var/log.',
                responsavel: 'Infraestrutura de TI'
            },
            {
                id: 3,
                title: 'Adequação do layout ao padrão visual SENAI 2026',
                description: 'Atualizar tipografia, paleta institucional e elementos visuais conforme novo padrão institucional divulgado para materiais e sistemas.',
                category: 'Software',
                tipoManutencao: 'Adaptativa',
                status: 'Aberto',
                priority: 'Baixa',
                impact: 'Médio',
                urgency: 'Baixa',
                slaResponse: '1 dia útil',
                slaResolution: 'Agendado',
                setorAfetado: 'Coordenação Pedagógica',
                usuariosAfetados: 'Todos',
                contingenciaDisponivel: true,
                justificativaPrioridade: 'A adequação é necessária, mas não interrompe o uso atual do sistema; deve respeitar o prazo institucional definido.',
                primeiraAcaoRecomendada: 'Levantar requisito',
                criterioValidacaoInicial: 'O layout deve seguir o guia visual definido e manter legibilidade e funcionamento das telas.',
                observacaoPedagogica: 'Identifique qual informação ainda seria necessária para saber se essa demanda pode subir de prioridade.',
                solicitante: 'Comunicação Institucional',
                dataAbertura: '2026-10-07 14:00',
                evidencias: 'Manual de Identidade Visual SENAI 2026 e tabela de conformidade de cores.',
                responsavel: 'Desenvolvimento Front-end'
            },
            {
                id: 4,
                title: 'Exportação de relatórios de chamados para formato CSV',
                description: 'A Coordenação Pedagógica solicitou a inclusão de um botão para exportar dados de chamados em formato CSV, facilitando a análise externa em planilhas.',
                category: 'Software',
                tipoManutencao: 'Evolutiva',
                status: 'Aberto',
                priority: 'Média',
                impact: 'Médio',
                urgency: 'Baixa',
                slaResponse: '1 dia útil',
                slaResolution: 'Agendado',
                setorAfetado: 'Coordenação Pedagógica',
                usuariosAfetados: 'Grupo restrito',
                contingenciaDisponivel: true,
                justificativaPrioridade: 'A funcionalidade gera ganho de produtividade, mas há alternativa temporária de consulta manual aos dados.',
                primeiraAcaoRecomendada: 'Levantar requisito',
                criterioValidacaoInicial: 'O usuário deve conseguir gerar um arquivo CSV com os dados filtrados, sem perda de informações.',
                observacaoPedagogica: 'Diferencie uma melhoria solicitada de uma falha que já impede a operação.',
                solicitante: 'Coordenação Pedagógica',
                dataAbertura: '2026-10-07 16:30',
                evidencias: 'Solicitação formal de melhoria via memorando pedagógico nº 42/2026.',
                responsavel: 'Desenvolvimento de Sistemas'
            },
            {
                id: 5,
                title: 'Falha intermitente na placa de rede do laboratório 03',
                description: 'Switch e cabeamento do Laboratório 03 apresentam perda de pacotes durante o uso. Estudantes relatam queda de conexão e dificuldade para acessar recursos da aula.',
                category: 'Rede',
                tipoManutencao: 'Corretiva',
                status: 'Aberto',
                priority: 'Alta',
                impact: 'Alto',
                urgency: 'Alta',
                slaResponse: '15 minutos',
                slaResolution: '4 horas',
                setorAfetado: 'Laboratório 03',
                usuariosAfetados: 'Uma turma',
                contingenciaDisponivel: false,
                justificativaPrioridade: 'A falha prejudica uma turma inteira e pode interromper atividades práticas dependentes de rede.',
                primeiraAcaoRecomendada: 'Investigar',
                criterioValidacaoInicial: 'A conexão deve permanecer estável durante um período de teste definido, sem perda significativa de pacotes.',
                observacaoPedagogica: 'Registre em quais horários ocorre a falha, quantos equipamentos são afetados e se há alternativa de acesso para a turma.',
                solicitante: 'Instrutor do Laboratório 03',
                dataAbertura: '2026-10-08 07:45',
                evidencias: 'Relatório de ping com 28% de pacotes perdidos e relato de desconexão dos alunos.',
                responsavel: 'Suporte de Redes'
            },
            {
                id: 6,
                title: 'Revisão periódica dos no-breaks e baterias da sala de servidores',
                description: 'Checagem trimestral preventiva do banco de baterias, autonomia dos no-breaks e condição física dos equipamentos da sala de servidores.',
                category: 'Hardware',
                tipoManutencao: 'Preventiva',
                status: 'Aberto',
                priority: 'Baixa',
                impact: 'Médio',
                urgency: 'Baixa',
                slaResponse: '1 dia útil',
                slaResolution: 'Agendado',
                setorAfetado: 'Infraestrutura',
                usuariosAfetados: 'Todos',
                contingenciaDisponivel: true,
                justificativaPrioridade: 'A atividade reduz riscos de interrupção futura, mas pode ser organizada em janela programada de manutenção.',
                primeiraAcaoRecomendada: 'Planejar manutenção',
                criterioValidacaoInicial: 'A revisão deve estar registrada, com resultado do teste de autonomia e indicação de ações necessárias.',
                observacaoPedagogica: 'Discuta por que uma atividade preventiva pode ser importante mesmo quando não é urgente.',
                solicitante: 'Gestão de Infraestrutura',
                dataAbertura: '2026-10-06 10:00',
                evidencias: 'Ordem de serviço preventiva trimestral nº 18/2026.',
                responsavel: 'Manutenção de Infraestrutura'
            }
        ];
        localStorage.setItem('manutencao_chamados', JSON.stringify(mockChamados));
    }

    if (force || !localStorage.getItem('manutencao_usuarios')) {
        const mockUsuarios = [
            { id: 1, nome: 'Professor Responsável', email: 'professor@senai.br', perfil: 'Docente', senha: 'SenhaValida123' },
            { id: 2, nome: 'Estudante Técnico', email: 'aluno', perfil: 'Estudante', senha: '123' }
        ];
        localStorage.setItem('manutencao_usuarios', JSON.stringify(mockUsuarios));
    }

    if (!localStorage.getItem('manutencao_permitir_edicao_aluno')) {
        localStorage.setItem('manutencao_permitir_edicao_aluno', 'false');
    }
}

initData();

function getChamados() {
    return JSON.parse(localStorage.getItem('manutencao_chamados') || '[]');
}

function saveChamados(chamados) {
    localStorage.setItem('manutencao_chamados', JSON.stringify(chamados));
}

function getUsuarios() {
    return JSON.parse(localStorage.getItem('manutencao_usuarios') || '[]');
}

function checkAuth() {
    const path = window.location.pathname;
    const isLogin = path.endsWith('index.html') || path === '/' || path.endsWith('/');
    if (!localStorage.getItem('manutencao_auth_token') && !isLogin) {
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.removeItem('manutencao_auth_token');
    localStorage.removeItem('manutencao_usuario_perfil');
    localStorage.removeItem('manutencao_usuario_nome');
    window.location.href = 'index.html';
}

checkAuth();

// -------------------------------------------------------------------------
// 4. Painel Docente (Configurações e Controle de Bloqueio)
// -------------------------------------------------------------------------
window.abrirPainelProfessor = function () {
    fecharPainelProfessor();
    const version = getAppVersion();
    const chamados = getChamados();
    const edicaoLiberada = localStorage.getItem('manutencao_permitir_edicao_aluno') === 'true';

    const overlay = document.createElement('div');
    overlay.id = 'painelProfessorModal';
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => {
        if (e.target === overlay) fecharPainelProfessor();
    };

    overlay.innerHTML = `
        <div class="modal-card">
            <div class="modal-header">
                <h3>
                    <span>🛠️ Painel Docente — Manutenção de Sistemas SENAI</span>
                </h3>
                <button class="modal-close-btn" onclick="fecharPainelProfessor()">&times;</button>
            </div>

            <div class="modal-section">
                <h4>Estado Atual do Ambiente Didático</h4>
                <p>Versão Ativa: <strong>${version === 'A' ? 'Versão A (v1.0.0 — Inicial com Defeitos Pedagógicos)' : 'Versão B (v1.1.0 — Corrigida com Regressões)'}</strong></p>
                <p>Total de Chamados na Base: <strong>${chamados.length}</strong></p>
                <div class="modal-btn-group">
                    <button type="button" class="modal-action-btn" onclick="setVersion('A')">Ativar Versão A (Inicial)</button>
                    <button type="button" class="modal-action-btn" onclick="setVersion('B')">Ativar Versão B (Reteste/Regressão)</button>
                    <button type="button" class="modal-action-btn danger" onclick="resetTestData()">Restaurar Dados Iniciais</button>
                </div>
            </div>

            <div class="modal-section">
                <h4>Controle de Acesso da Sequência Didática</h4>
                <p>Estado da Edição Estudantil: <strong>${edicaoLiberada ? '🔓 Liberada (Aulas posteriores)' : '🔒 Bloqueada (Dia 3: Análise e Priorização)'}</strong></p>
                <p style="font-size: 0.84rem; color: #64748b;">
                    No Dia 3, os estudantes devem apenas analisar, comparar prioridades e preencher o portfólio externo sem modificar os chamados.
                </p>
                <div class="modal-btn-group">
                    <button type="button" class="modal-action-btn ${edicaoLiberada ? 'danger' : 'primary'}" onclick="togglePermissaoEdicaoAluno()">
                        ${edicaoLiberada ? '🔒 Bloquear Edição para Estudantes (Modo Dia 3)' : '🔓 Liberar Edição para Estudantes (Aulas Posteriores)'}
                    </button>
                </div>
            </div>

            <div class="modal-section" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
                <p style="font-size: 0.82rem; color: #64748b;">
                    Consulte <code>GABARITO_PROFESSOR.md</code> para a matriz completa de defeitos pedagógicos, orientações da Matriz de Eisenhower e critérios de avaliação do portfólio externo.
                </p>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
};

window.fecharPainelProfessor = function () {
    const modal = document.getElementById('painelProfessorModal');
    if (modal) modal.remove();
};

// -------------------------------------------------------------------------
// 5. Rodapé Pedagógico & Identificação de Usuário
// -------------------------------------------------------------------------
function setupPedagogicalNotice() {
    const version = getAppVersion();
    const perfil = getUsuarioPerfil();
    const edicaoLiberada = localStorage.getItem('manutencao_permitir_edicao_aluno') === 'true';

    // Atualiza cabeçalho com identificação do perfil se houver elemento
    const brandWrapper = document.querySelector('.brand-wrapper');
    if (brandWrapper && !document.getElementById('userProfileBadge')) {
        const badge = document.createElement('span');
        badge.id = 'userProfileBadge';
        badge.className = 'user-badge';
        badge.innerHTML = perfil === 'Docente'
            ? '👨‍🏫 <strong>Docente</strong>'
            : `👨‍🎓 <strong>Estudante</strong> ${edicaoLiberada ? '(Edição Liberada)' : '(Somente Consulta)'}`;
        brandWrapper.appendChild(badge);
    }

    const notices = document.querySelectorAll('.pedagogical-notice');
    notices.forEach(notice => {
        const buildInfo = version === 'A' ? 'v1.0.0 (Build A)' : 'v1.1.0 (Build B)';
        const targetVersion = version === 'A' ? 'B' : 'A';
        const targetLabel = version === 'A' ? 'Build B (Reteste & Regressão)' : 'Build A (Versão Inicial)';

        let botoesExtras = '';
        if (isDocente()) {
            botoesExtras = `
                <button type="button" class="btn-version-toggle" onclick="setVersion('${targetVersion}')">Alternar para ${targetLabel}</button> | 
                <button type="button" class="btn-version-toggle" onclick="abrirPainelProfessor()">⚙️ Painel Docente</button> | 
                <button type="button" class="btn-version-reset" onclick="resetTestData()">Restaurar Dados</button>
            `;
        } else {
            botoesExtras = `
                <span>Perfil: Estudante (Modo Análise e Priorização)</span> | 
                <button type="button" class="btn-version-reset" onclick="resetTestData()" title="Restaurar dados caso necessário para os exercícios">Restaurar Fila</button>
            `;
        }

        notice.innerHTML = `
            <span>Manutenção de Sistemas SENAI:</span> 
            <strong>${buildInfo}</strong> — ${botoesExtras}
        `;
    });
}

// -------------------------------------------------------------------------
// 6. Modal "Ver Análise" do Chamado (Dia 3 — Análise e Cópia Externa)
// -------------------------------------------------------------------------
window.abrirModalAnalise = function (id) {
    const chamados = getChamados();
    const c = chamados.find(item => item.id === id);
    if (!c) return;

    fecharModalAnalise();

    const prioridadeSugerida = typeof Validadores !== 'undefined'
        ? (Validadores.calcularPrioridade(c.impact, c.urgency) || 'Não avaliada')
        : 'P3';

    const overlay = document.createElement('div');
    overlay.id = 'modalAnaliseChamado';
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => {
        if (e.target === overlay) fecharModalAnalise();
    };

    overlay.innerHTML = `
        <div class="modal-card">
            <div class="modal-header">
                <h3>🔍 Análise Pedagógica — Chamado #${c.id}</h3>
                <button class="modal-close-btn" onclick="fecharModalAnalise()">&times;</button>
            </div>

            <div style="margin-bottom: 1rem;">
                <h4 style="font-size: 1.15rem; color: #0f172a; margin-bottom: 0.35rem;">${c.title}</h4>
                <p style="color: #475569; font-size: 0.92rem; line-height: 1.5;">${c.description}</p>
            </div>

            <div class="analise-grid">
                <div class="analise-item">
                    <div class="label">Categoria</div>
                    <div class="value">${c.category || 'Software'}</div>
                </div>
                <div class="analise-item">
                    <div class="label">Tipo de Manutenção</div>
                    <div class="value">${c.tipoManutencao || 'Corretiva'}</div>
                </div>
                <div class="analise-item">
                    <div class="label">Status Operacional</div>
                    <div class="value">${c.status || 'Aberto'}</div>
                </div>
                <div class="analise-item">
                    <div class="label">Prioridade Atual</div>
                    <div class="value">${c.priority || 'Média'}</div>
                </div>
                <div class="analise-item">
                    <div class="label">Impacto Avaliado</div>
                    <div class="value">${c.impact || 'Médio'}</div>
                </div>
                <div class="analise-item">
                    <div class="label">Urgência Avaliada</div>
                    <div class="value">${c.urgency || 'Média'}</div>
                </div>
                <div class="analise-item" style="border-left: 3px solid #0284c7;">
                    <div class="label">Prioridade Sugerida (Matriz)</div>
                    <div class="value" style="color: #0369a1;">${prioridadeSugerida}</div>
                </div>
                <div class="analise-item">
                    <div class="label">SLA de Resposta</div>
                    <div class="value">${c.slaResponse || '4 horas'}</div>
                </div>
                <div class="analise-item">
                    <div class="label">SLA de Resolução</div>
                    <div class="value">${c.slaResolution || '8 horas'}</div>
                </div>
                <div class="analise-item">
                    <div class="label">Setor Afetado</div>
                    <div class="value">${c.setorAfetado || 'Geral'}</div>
                </div>
                <div class="analise-item">
                    <div class="label">Usuários Afetados</div>
                    <div class="value">${c.usuariosAfetados || 'Todos'}</div>
                </div>
                <div class="analise-item">
                    <div class="label">Contingência Disponível?</div>
                    <div class="value">${c.contingenciaDisponivel ? 'Sim (Há alternativa temporária)' : 'Não (Operação interrompida)'}</div>
                </div>
            </div>

            <div class="analise-box">
                <div class="box-title">Justificativa da Prioridade Atual</div>
                <p style="font-size: 0.88rem; color: #334155; margin: 0;">${c.justificativaPrioridade || 'Sem justificativa registrada.'}</p>
            </div>

            <div class="analise-box">
                <div class="box-title">Primeira Ação Recomendada & Critério de Validação</div>
                <p style="font-size: 0.88rem; color: #334155; margin: 0 0 0.4rem 0;">
                    <strong>Ação:</strong> ${c.primeiraAcaoRecomendada || 'Investigar'}
                </p>
                <p style="font-size: 0.88rem; color: #334155; margin: 0;">
                    <strong>Critério de Validação:</strong> ${c.criterioValidacaoInicial || 'Verificar funcionamento normal após atendimento.'}
                </p>
            </div>

            ${c.evidencias ? `
            <div class="analise-box">
                <div class="box-title">Evidências Iniciais Registradas</div>
                <p style="font-size: 0.88rem; color: #334155; margin: 0;">${c.evidencias}</p>
            </div>
            ` : ''}

            <div class="analise-box observacao-pedagogica">
                <div class="box-title">💡 Observação para Análise Pedagógica</div>
                <p style="font-size: 0.88rem; color: #14532d; margin: 0;">${c.observacaoPedagogica || 'Avalie o impacto real no negócio antes de tomar uma decisão técnica.'}</p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.25rem; flex-wrap: wrap; gap: 0.75rem;">
                <button type="button" class="btn btn-success" onclick="copiarDadosChamado(${c.id})">
                    📋 Copiar dados para ficha externa
                </button>
                <button type="button" class="btn btn-secondary" onclick="fecharModalAnalise()">Fechar</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
};

window.fecharModalAnalise = function () {
    const modal = document.getElementById('modalAnaliseChamado');
    if (modal) modal.remove();
};

window.copiarDadosChamado = function (id) {
    const chamados = getChamados();
    const c = chamados.find(item => item.id === id);
    if (!c) return;

    const prioridadeSugerida = typeof Validadores !== 'undefined'
        ? (Validadores.calcularPrioridade(c.impact, c.urgency) || 'Não avaliada')
        : 'P3';

    const textoFormatado = `## Chamado #${c.id} — ${c.title}
- Tipo de manutenção: ${c.tipoManutencao || 'Corretiva'}
- Status: ${c.status || 'Aberto'}
- Prioridade atual: ${c.priority || 'Média'}
- Impacto: ${c.impact || 'Médio'}
- Urgência: ${c.urgency || 'Média'}
- Prioridade sugerida pela matriz: ${prioridadeSugerida}
- SLA de resposta: ${c.slaResponse || '4 horas'}
- SLA de resolução: ${c.slaResolution || '8 horas'}
- Setor afetado: ${c.setorAfetado || 'Geral'}
- Usuários afetados: ${c.usuariosAfetados || 'Todos'}
- Contingência disponível: ${c.contingenciaDisponivel ? 'Sim' : 'Não'}
- Justificativa: ${c.justificativaPrioridade || 'Não informada'}
- Primeira ação recomendada: ${c.primeiraAcaoRecomendada || 'Investigar'}
- Critério de validação: ${c.criterioValidacaoInicial || 'Verificar funcionamento normal'}
- Observação para análise: ${c.observacaoPedagogica || 'Não informada'}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textoFormatado).then(() => {
            exibirToastFeedback('Dados do chamado copiados. Cole-os na sua ficha externa.');
        }).catch(() => {
            fallbackCopiarTexto(textoFormatado);
        });
    } else {
        fallbackCopiarTexto(textoFormatado);
    }
};

function fallbackCopiarTexto(texto) {
    const ta = document.createElement('textarea');
    ta.value = texto;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        exibirToastFeedback('Dados do chamado copiados. Cole-os na sua ficha externa.');
    } catch (e) {
        alert('Não foi possível copiar automaticamente. Selecione e copie o texto manualmente.');
    }
    document.body.removeChild(ta);
}

function exibirToastFeedback(mensagem) {
    const toastAntigo = document.getElementById('copyFeedbackToast');
    if (toastAntigo) toastAntigo.remove();

    const toast = document.createElement('div');
    toast.id = 'copyFeedbackToast';
    toast.className = 'copy-feedback-toast';
    toast.innerHTML = `<span>📋</span> <span>${mensagem}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast && toast.parentNode) toast.remove();
    }, 4000);
}

// -------------------------------------------------------------------------
// 7. Exportação de Chamados para CSV (Compatível Excel pt-BR)
// -------------------------------------------------------------------------
window.exportarFilaCsv = function (chamadosParaExportar) {
    const lista = chamadosParaExportar || getChamados();
    if (!lista || lista.length === 0) {
        alert('Nenhum chamado disponível para exportação.');
        return;
    }

    const conteudoCsv = typeof Validadores !== 'undefined'
        ? Validadores.gerarCsvChamados(lista)
        : '';

    // UTF-8 com BOM (\uFEFF) para garantir acentuação correta no Excel pt-BR
    const blob = new Blob(['\uFEFF' + conteudoCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fila_chamados_manutencao_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    exibirToastFeedback('Arquivo CSV gerado com sucesso. Abra-o no Excel ou Google Sheets.');
};

// -------------------------------------------------------------------------
// 8. Edição e Reclassificação de Chamados (Bloqueado no Dia 3 para Estudantes)
// -------------------------------------------------------------------------
window.editarChamado = function (id) {
    if (!podeEditarChamados()) {
        alert('Ação bloqueada: na etapa atual (Dia 3), os estudantes realizam apenas análise e priorização na ficha externa. A edição será liberada nas aulas posteriores.');
        return;
    }

    const chamados = getChamados();
    const c = chamados.find(item => item.id === id);
    if (!c) return;

    fecharModalEdicao();

    const overlay = document.createElement('div');
    overlay.id = 'modalEdicaoChamado';
    overlay.className = 'modal-overlay';
    overlay.onclick = (e) => {
        if (e.target === overlay) fecharModalEdicao();
    };

    overlay.innerHTML = `
        <div class="modal-card">
            <div class="modal-header">
                <h3>🛠️ Análise Técnica e Edição do Chamado #${c.id}</h3>
                <button class="modal-close-btn" onclick="fecharModalEdicao()">&times;</button>
            </div>

            <form id="formEdicaoChamado" onsubmit="salvarEdicaoChamado(event, ${c.id})">
                <div class="form-group">
                    <label for="editTitulo">Título do Chamado <span class="required-mark">*</span></label>
                    <input type="text" id="editTitulo" value="${c.title || ''}" required>
                </div>

                <div class="form-group">
                    <label for="editTipoManutencao">Tipo de Manutenção (ISO/IEC 14764) <span class="required-mark">*</span></label>
                    <select id="editTipoManutencao" required>
                        <option value="Corretiva" ${c.tipoManutencao === 'Corretiva' ? 'selected' : ''}>Corretiva (corrige falha reportada)</option>
                        <option value="Preventiva" ${c.tipoManutencao === 'Preventiva' ? 'selected' : ''}>Preventiva (antecipa problemas latentes)</option>
                        <option value="Adaptativa" ${c.tipoManutencao === 'Adaptativa' ? 'selected' : ''}>Adaptativa (ajusta a mudanças no ambiente)</option>
                        <option value="Evolutiva" ${c.tipoManutencao === 'Evolutiva' ? 'selected' : ''}>Evolutiva (novas funcionalidades ou melhorias)</option>
                    </select>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label for="editCategoria">Categoria</label>
                        <select id="editCategoria">
                            <option value="Hardware" ${c.category === 'Hardware' ? 'selected' : ''}>Hardware (Equipamentos)</option>
                            <option value="Software" ${c.category === 'Software' ? 'selected' : ''}>Software (Sistemas)</option>
                            <option value="Rede" ${c.category === 'Rede' ? 'selected' : ''}>Rede e Internet</option>
                            <option value="Outros" ${c.category === 'Outros' ? 'selected' : ''}>Outros</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="editPrioridade">Prioridade Atual</label>
                        <select id="editPrioridade">
                            <option value="Baixa" ${c.priority === 'Baixa' ? 'selected' : ''}>Baixa</option>
                            <option value="Média" ${c.priority === 'Média' ? 'selected' : ''}>Média</option>
                            <option value="Alta" ${c.priority === 'Alta' ? 'selected' : ''}>Alta</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="editStatus">Status Operacional</label>
                    <select id="editStatus">
                        <option value="Aberto" ${c.status === 'Aberto' ? 'selected' : ''}>Aberto</option>
                        <option value="Em andamento" ${c.status === 'Em andamento' ? 'selected' : ''}>Em andamento</option>
                        <option value="Encerrado" ${c.status === 'Encerrado' ? 'selected' : ''}>Encerrado</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="editDescricao">Diagnóstico / Descrição Técnica <span class="required-mark">*</span></label>
                    <textarea id="editDescricao" rows="4" required>${c.description || ''}</textarea>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1rem;">
                    <button type="button" class="btn btn-secondary" onclick="fecharModalEdicao()">Cancelar</button>
                    <button type="submit" class="btn">Salvar Alterações</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(overlay);
};

window.fecharModalEdicao = function () {
    const modal = document.getElementById('modalEdicaoChamado');
    if (modal) modal.remove();
};

window.salvarEdicaoChamado = function (e, id) {
    e.preventDefault();
    if (!podeEditarChamados()) {
        alert('Edição bloqueada no momento.');
        return;
    }

    const titulo = document.getElementById('editTitulo').value.trim();
    const tipo = document.getElementById('editTipoManutencao').value;
    const categoria = document.getElementById('editCategoria').value;
    const prioridade = document.getElementById('editPrioridade').value;
    const status = document.getElementById('editStatus').value;
    const descricao = document.getElementById('editDescricao').value.trim();

    const version = getAppVersion();

    if (version === 'B') {
        const validadorTipo = typeof Validadores !== 'undefined' ? Validadores.validarTipoManutencao(tipo) : true;
        const validadorTitulo = typeof Validadores !== 'undefined' ? Validadores.validarTituloChamado(titulo) : (titulo.length >= 5);

        if (!validadorTipo || !validadorTitulo || descricao.length < 10) {
            alert('Erro de validação: selecione um Tipo de Manutenção válido, título com no mínimo 5 caracteres e descrição com no mínimo 10 caracteres.');
            return;
        }
    }

    const chamados = getChamados();
    const idx = chamados.findIndex(c => c.id === id);
    if (idx !== -1) {
        chamados[idx].title = titulo;
        chamados[idx].tipoManutencao = tipo;
        chamados[idx].category = categoria;
        chamados[idx].priority = prioridade;
        chamados[idx].status = status;
        chamados[idx].description = descricao;

        saveChamados(chamados);
        fecharModalEdicao();

        const evt = new CustomEvent('chamadosAtualizados');
        window.dispatchEvent(evt);
    }
};

// ==========================================================================
// LÓGICA ESPECÍFICA DE CADA PÁGINA
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    setupPedagogicalNotice();

    // ---------------------------------------------------------------------
    // 1. TELA DE LOGIN (index.html)
    // ---------------------------------------------------------------------
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('user').value.trim();
            const pass = document.getElementById('pass').value;
            const errorMsg = document.getElementById('loginError');

            const usuarios = getUsuarios();
            const foundUser = usuarios.find(u => u.email === user || (user === 'aluno' && u.email === 'aluno'));

            if (foundUser && foundUser.senha === pass) {
                localStorage.setItem('manutencao_auth_token', 'token_manutencao_valido');
                localStorage.setItem('manutencao_usuario_perfil', foundUser.perfil || (user === 'aluno' ? 'Estudante' : 'Docente'));
                localStorage.setItem('manutencao_usuario_nome', foundUser.nome || (user === 'aluno' ? 'Estudante Técnico' : 'Professor Responsável'));
                window.location.href = 'dashboard.html';
            } else {
                errorMsg.textContent = 'Usuário ou senha inválidos. Verifique as credenciais didáticas informadas abaixo.';
                errorMsg.style.display = 'block';
            }
        });
    }

    // ---------------------------------------------------------------------
    // 2. DASHBOARD (dashboard.html) — Leitura da Fila de Manutenção
    // ---------------------------------------------------------------------
    const dashboardStats = document.getElementById('dashboardStats');
    if (dashboardStats) {
        const filtroTipoDashboard = document.getElementById('filtroTipoDashboard');

        const atualizarDashboard = () => {
            const chamados = getChamados();
            const version = getAppVersion();
            const tipoSelecionado = filtroTipoDashboard ? filtroTipoDashboard.value : '';

            let chamadosFiltrados = chamados;
            if (tipoSelecionado) {
                chamadosFiltrados = chamados.filter(c => c.tipoManutencao === tipoSelecionado);
            }

            let abertos = 0;
            let andamento = 0;
            let encerrados = 0;

            chamadosFiltrados.forEach(c => {
                const st = (c.status || '').toLowerCase();
                if (st === 'aberto') {
                    // DEFEITO 3: Na Versão A, o contador de Abertos ignora chamados com prioridade Baixa
                    if (version === 'A') {
                        if (c.priority !== 'Baixa') {
                            abertos++;
                        }
                    } else {
                        abertos++;
                    }
                } else if (st === 'em andamento') {
                    andamento++;
                } else if (st === 'encerrado') {
                    encerrados++;
                }
            });

            const elAbertos = document.getElementById('countAbertos');
            const elAndamento = document.getElementById('countAndamento');
            const elEncerrados = document.getElementById('countEncerrados');

            if (elAbertos) elAbertos.textContent = abertos;
            if (elAndamento) elAndamento.textContent = andamento;
            if (elEncerrados) elEncerrados.textContent = encerrados;

            // Total de Abertos Geral
            const elTotalAbertosGeral = document.getElementById('dashTotalAbertosGeral');
            if (elTotalAbertosGeral) {
                elTotalAbertosGeral.textContent = chamados.filter(c => (c.status || '').toLowerCase() === 'aberto').length;
            }

            // Contagens por Tipo de Manutenção
            const elCountCorretiva = document.getElementById('dashCountCorretiva');
            const elCountPreventiva = document.getElementById('dashCountPreventiva');
            const elCountAdaptativa = document.getElementById('dashCountAdaptativa');
            const elCountEvolutiva = document.getElementById('dashCountEvolutiva');

            if (elCountCorretiva) elCountCorretiva.textContent = chamados.filter(c => c.tipoManutencao === 'Corretiva').length;
            if (elCountPreventiva) elCountPreventiva.textContent = chamados.filter(c => c.tipoManutencao === 'Preventiva').length;
            if (elCountAdaptativa) elCountAdaptativa.textContent = chamados.filter(c => c.tipoManutencao === 'Adaptativa').length;
            if (elCountEvolutiva) elCountEvolutiva.textContent = chamados.filter(c => c.tipoManutencao === 'Evolutiva').length;

            // Contagens por Prioridade Atual
            const elPrioAlta = document.getElementById('dashCountPrioAlta');
            const elPrioMedia = document.getElementById('dashCountPrioMedia');
            const elPrioBaixa = document.getElementById('dashCountPrioBaixa');

            if (elPrioAlta) elPrioAlta.textContent = chamados.filter(c => c.priority === 'Alta').length;
            if (elPrioMedia) elPrioMedia.textContent = chamados.filter(c => c.priority === 'Média').length;
            if (elPrioBaixa) elPrioBaixa.textContent = chamados.filter(c => c.priority === 'Baixa').length;

            // Contagens por Prioridade Sugerida (P1..P4)
            let p1Count = 0, p2Count = 0, p3Count = 0, p4Count = 0;
            chamados.forEach(c => {
                const sugerida = typeof Validadores !== 'undefined'
                    ? Validadores.calcularPrioridade(c.impact, c.urgency)
                    : null;
                if (sugerida === 'P1') p1Count++;
                else if (sugerida === 'P2') p2Count++;
                else if (sugerida === 'P3') p3Count++;
                else if (sugerida === 'P4') p4Count++;
            });

            const elP1 = document.getElementById('dashCountP1');
            const elP2 = document.getElementById('dashCountP2');
            const elP3 = document.getElementById('dashCountP3');
            const elP4 = document.getElementById('dashCountP4');

            if (elP1) elP1.textContent = p1Count;
            if (elP2) elP2.textContent = p2Count;
            if (elP3) elP3.textContent = p3Count;
            if (elP4) elP4.textContent = p4Count;

            // Contagens por Impacto
            const elImpAlto = document.getElementById('dashCountImpAlto');
            const elImpMedio = document.getElementById('dashCountImpMedio');
            const elImpBaixo = document.getElementById('dashCountImpBaixo');

            if (elImpAlto) elImpAlto.textContent = chamados.filter(c => c.impact === 'Alto').length;
            if (elImpMedio) elImpMedio.textContent = chamados.filter(c => c.impact === 'Médio').length;
            if (elImpBaixo) elImpBaixo.textContent = chamados.filter(c => c.impact === 'Baixo').length;

            // Contagens por Urgência
            const elUrgAlta = document.getElementById('dashCountUrgAlta');
            const elUrgMedia = document.getElementById('dashCountUrgMedia');
            const elUrgBaixa = document.getElementById('dashCountUrgBaixa');

            if (elUrgAlta) elUrgAlta.textContent = chamados.filter(c => c.urgency === 'Alta').length;
            if (elUrgMedia) elUrgMedia.textContent = chamados.filter(c => c.urgency === 'Média').length;
            if (elUrgBaixa) elUrgBaixa.textContent = chamados.filter(c => c.urgency === 'Baixa').length;
        };

        if (filtroTipoDashboard) {
            filtroTipoDashboard.addEventListener('change', atualizarDashboard);
        }

        atualizarDashboard();
    }

    // ---------------------------------------------------------------------
    // 3. ABERTURA DE CHAMADO (novo.html)
    // ---------------------------------------------------------------------
    const formNovo = document.getElementById('formNovo');
    if (formNovo) {
        formNovo.addEventListener('submit', (e) => {
            e.preventDefault();
            const tituloInput = document.getElementById('titulo');
            const descricaoInput = document.getElementById('descricao');
            const categoriaInput = document.getElementById('categoria');
            const prioridadeInput = document.getElementById('prioridade');
            const tipoManutencaoInput = document.getElementById('tipoManutencao');

            const version = getAppVersion();

            const titulo = tituloInput ? tituloInput.value.trim() : '';
            const descricao = descricaoInput ? descricaoInput.value.trim() : '';
            const categoria = categoriaInput ? categoriaInput.value : 'Outros';
            let prioridade = prioridadeInput ? prioridadeInput.value : 'Média';
            const tipoManutencao = tipoManutencaoInput ? tipoManutencaoInput.value : '';

            // DEFEITO 2: Na Versão A, não valida obrigatoriedade de tipo nem tamanhos mínimos
            if (version === 'B') {
                const validadorTipo = typeof Validadores !== 'undefined'
                    ? Validadores.validarTipoManutencao(tipoManutencao)
                    : (tipoManutencao !== '');

                const validadorTitulo = typeof Validadores !== 'undefined'
                    ? Validadores.validarTituloChamado(titulo)
                    : (titulo.length >= 5);

                const validadorDescricao = typeof Validadores !== 'undefined'
                    ? Validadores.validarDescricaoChamado(descricao)
                    : (descricao.length >= 10);

                if (!validadorTipo) {
                    alert('Erro de Classificação: O campo "Tipo de Manutenção" é obrigatório e deve ser classificado entre Corretiva, Preventiva, Adaptativa ou Evolutiva.');
                    if (tipoManutencaoInput) tipoManutencaoInput.focus();
                    return;
                }

                if (!validadorTitulo || !validadorDescricao) {
                    alert('Por favor, preencha os campos obrigatórios. O Título deve ter no mínimo 5 caracteres e a Descrição no mínimo 10 caracteres.');
                    return;
                }
            }

            // DEFEITO 1: Na Versão A, Categoria Hardware força Prioridade Baixa
            if (version === 'A') {
                if (categoria === 'Hardware') {
                    prioridade = 'Baixa';
                }
            }

            const chamados = getChamados();
            const newId = chamados.length > 0 ? Math.max(...chamados.map(c => c.id)) + 1 : 1;

            const novoChamado = {
                id: newId,
                title: titulo,
                description: descricao,
                category: categoria,
                priority: prioridade,
                tipoManutencao: tipoManutencao || 'Não Classificado (Versão A)',
                status: 'Aberto',
                impact: 'Médio',
                urgency: 'Média',
                slaResponse: '4 horas',
                slaResolution: '8 horas',
                setorAfetado: 'Geral',
                usuariosAfetados: 'Grupo restrito',
                contingenciaDisponivel: true,
                justificativaPrioridade: 'Chamado cadastrado via formulário de manutenção.',
                primeiraAcaoRecomendada: 'Investigar',
                criterioValidacaoInicial: 'Verificar funcionamento normal após atendimento.',
                observacaoPedagogica: 'Avalie a urgência e o impacto declarados.',
                solicitante: localStorage.getItem('manutencao_usuario_nome') || 'Usuário do Sistema',
                dataAbertura: new Date().toISOString().slice(0, 16).replace('T', ' '),
                evidencias: 'Registro inicial via sistema web.',
                responsavel: 'Equipe de Suporte'
            };

            chamados.push(novoChamado);
            saveChamados(chamados);

            const successMsg = document.getElementById('formSuccess');
            if (successMsg) {
                successMsg.textContent = `Chamado #${newId} registrado com sucesso!`;
                successMsg.className = 'alert success';
                successMsg.style.display = 'block';
                formNovo.reset();
                setTimeout(() => { successMsg.style.display = 'none'; }, 4000);
            } else {
                alert(`Chamado #${newId} registrado com sucesso!`);
                formNovo.reset();
            }
        });
    }

    // ---------------------------------------------------------------------
    // 4. CONSULTA E GESTÃO DE CHAMADOS (consulta.html)
    // ---------------------------------------------------------------------
    const tableBody = document.getElementById('tableBody');
    if (tableBody) {
        const version = getAppVersion();

        const searchInput = document.getElementById('busca');
        const filterStatus = document.getElementById('filtroStatus');
        const filterTipo = document.getElementById('filtroTipo');
        const ordenarPorSelect = document.getElementById('ordenarPor');
        const btnExportarCsv = document.getElementById('btnExportarCsv');

        let chamadosAtualmenteVisiveis = [];

        const obterClasseBadgeTipo = (tipo) => {
            switch ((tipo || '').toLowerCase()) {
                case 'corretiva': return 'badge-tipo badge-corretiva';
                case 'preventiva': return 'badge-tipo badge-preventiva';
                case 'adaptativa': return 'badge-tipo badge-adaptativa';
                case 'evolutiva': return 'badge-tipo badge-evolutiva';
                default: return 'badge-tipo';
            }
        };

        const obterClasseBadgeNivel = (nivel) => {
            const n = (nivel || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            if (n === 'alto' || n === 'alta') return 'badge badge-alto';
            if (n === 'medio' || n === 'media') return 'badge badge-medio';
            if (n === 'baixo' || n === 'baixa') return 'badge badge-baixo';
            return 'badge';
        };

        const obterClasseBadgePrioridadeSugerida = (prio) => {
            switch (prio) {
                case 'P1': return 'badge badge-p1';
                case 'P2': return 'badge badge-p2';
                case 'P3': return 'badge badge-p3';
                case 'P4': return 'badge badge-p4';
                default: return 'badge';
            }
        };

        const renderTable = (chamadosList) => {
            tableBody.innerHTML = '';
            chamadosAtualmenteVisiveis = chamadosList;

            if (chamadosList.length === 0) {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td colspan="11" style="text-align:center; color:#888; padding: 2rem;">Nenhum chamado encontrado para os filtros selecionados.</td>`;
                tableBody.appendChild(tr);
                return;
            }

            const podeEditar = podeEditarChamados();

            chamadosList.forEach(c => {
                const tr = document.createElement('tr');

                let cssStatus = 'status-aberto';
                const st = (c.status || '').toLowerCase();
                if (st === 'em andamento') cssStatus = 'status-andamento';
                else if (st === 'encerrado') cssStatus = 'status-encerrado';

                let cssPrioridade = 'priority-baixa';
                if (c.priority === 'Alta') cssPrioridade = 'priority-alta';
                else if (c.priority === 'Média') cssPrioridade = 'priority-media';

                const prioridadeSugerida = typeof Validadores !== 'undefined'
                    ? (Validadores.calcularPrioridade(c.impact, c.urgency) || 'P3')
                    : 'P3';

                const badgeTipoClass = obterClasseBadgeTipo(c.tipoManutencao);
                const badgeImpactoClass = obterClasseBadgeNivel(c.impact);
                const badgeUrgenciaClass = obterClasseBadgeNivel(c.urgency);
                const badgeSugeridaClass = obterClasseBadgePrioridadeSugerida(prioridadeSugerida);

                tr.innerHTML = `
                    <td><strong>#${c.id}</strong></td>
                    <td>
                        <div style="font-weight: 600; color: #1e293b;">${c.title}</div>
                        <div style="font-size: 0.78rem; color: #64748b;">
                            Setor: <strong>${c.setorAfetado || 'Geral'}</strong> | Resp: ${c.responsavel || 'Suporte'}
                        </div>
                    </td>
                    <td><span style="font-size: 0.85rem;">${c.category}</span></td>
                    <td><span class="${badgeTipoClass}">${c.tipoManutencao || 'Não Classificado'}</span></td>
                    <td><span class="${badgeImpactoClass}">${c.impact || 'Médio'}</span></td>
                    <td><span class="${badgeUrgenciaClass}">${c.urgency || 'Média'}</span></td>
                    <td><span class="${cssPrioridade}">${c.priority || 'Média'}</span></td>
                    <td><span class="${badgeSugeridaClass}" title="Calculada pela Matriz Impacto x Urgência">${prioridadeSugerida}</span></td>
                    <td>
                        <div style="font-size: 0.78rem; white-space: nowrap;">
                            <div>Resp: <strong>${c.slaResponse || '4h'}</strong></div>
                            <div>Res: <strong>${c.slaResolution || '8h'}</strong></div>
                        </div>
                    </td>
                    <td>
                        <select class="status-select ${cssStatus}" data-id="${c.id}" ${podeEditar ? '' : 'disabled'} title="${podeEditar ? 'Alterar status operacional' : 'Edição bloqueada na etapa atual de análise (Dia 3)'}">
                            <option value="Aberto" ${c.status === 'Aberto' ? 'selected' : ''}>Aberto</option>
                            <option value="Em andamento" ${c.status === 'Em andamento' ? 'selected' : ''}>Em andamento</option>
                            <option value="Encerrado" ${c.status === 'Encerrado' ? 'selected' : ''}>Encerrado</option>
                        </select>
                    </td>
                    <td>
                        <div style="display: flex; gap: 0.35rem; align-items: center;">
                            <button type="button" class="btn btn-sm" onclick="abrirModalAnalise(${c.id})" title="Ver informações pedagógicas completas e copiar dados">
                                🔍 Ver análise
                            </button>
                            <button type="button" class="btn btn-secondary btn-sm" onclick="editarChamado(${c.id})" ${podeEditar ? '' : 'disabled'} title="${podeEditar ? 'Editar ou reclassificar chamado' : 'Edição bloqueada na etapa atual de análise (Dia 3)'}">
                                ✏️ Editar
                            </button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        };

        const pesoPrioridade = { 'Alta': 3, 'Média': 2, 'Baixa': 1 };
        const pesoSugerida = { 'P1': 4, 'P2': 3, 'P3': 2, 'P4': 1 };
        const pesoNivel = { 'Alto': 3, 'Alta': 3, 'Médio': 2, 'Média': 2, 'Baixo': 1, 'Baixa': 1 };

        const applyFilters = () => {
            let filtered = getChamados();
            const term = searchInput ? searchInput.value.trim() : '';
            const statusF = filterStatus ? filterStatus.value : '';
            const tipoF = filterTipo ? filterTipo.value : '';
            const ordenacao = ordenarPorSelect ? ordenarPorSelect.value : 'id';

            if (version === 'A') {
                // DEFEITO 4: Busca sensível a maiúsculas/minúsculas
                if (term) {
                    filtered = filtered.filter(c => c.title.includes(term));
                }
                if (statusF) {
                    filtered = filtered.filter(c => c.status === statusF);
                }
                if (tipoF) {
                    filtered = filtered.filter(c => c.tipoManutencao === tipoF);
                }
            } else {
                // Versão B: Busca normalizada, mas com REGRESSÃO 2 se texto + tipo juntos
                if (term && tipoF) {
                    filtered = filtered.filter(c => (c.title || '').toLowerCase().includes(term.toLowerCase()));
                    if (statusF) {
                        filtered = filtered.filter(c => c.status === statusF);
                    }
                } else {
                    if (term) {
                        filtered = filtered.filter(c => (c.title || '').toLowerCase().includes(term.toLowerCase()));
                    }
                    if (statusF) {
                        filtered = filtered.filter(c => c.status === statusF);
                    }
                    if (tipoF) {
                        filtered = filtered.filter(c => c.tipoManutencao === tipoF);
                    }
                }
            }

            // Ordenação manual opcional (não altera ordenação padrão a menos que o aluno escolha)
            if (ordenacao === 'prioridade_atual') {
                filtered.sort((a, b) => (pesoPrioridade[b.priority] || 0) - (pesoPrioridade[a.priority] || 0));
            } else if (ordenacao === 'prioridade_sugerida') {
                filtered.sort((a, b) => {
                    const pA = typeof Validadores !== 'undefined' ? Validadores.calcularPrioridade(a.impact, a.urgency) : 'P3';
                    const pB = typeof Validadores !== 'undefined' ? Validadores.calcularPrioridade(b.impact, b.urgency) : 'P3';
                    return (pesoSugerida[pB] || 0) - (pesoSugerida[pA] || 0);
                });
            } else if (ordenacao === 'impacto') {
                filtered.sort((a, b) => (pesoNivel[b.impact] || 0) - (pesoNivel[a.impact] || 0));
            } else if (ordenacao === 'urgencia') {
                filtered.sort((a, b) => (pesoNivel[b.urgency] || 0) - (pesoNivel[a.urgency] || 0));
            } else if (ordenacao === 'tipo') {
                filtered.sort((a, b) => (a.tipoManutencao || '').localeCompare(b.tipoManutencao || ''));
            } else {
                // Padrão: por ID
                filtered.sort((a, b) => a.id - b.id);
            }

            renderTable(filtered);
        };

        let currentChamados = getChamados();
        renderTable(currentChamados);

        if (searchInput) searchInput.addEventListener('input', applyFilters);
        if (filterStatus) filterStatus.addEventListener('change', applyFilters);
        if (filterTipo) filterTipo.addEventListener('change', applyFilters);
        if (ordenarPorSelect) ordenarPorSelect.addEventListener('change', applyFilters);

        if (btnExportarCsv) {
            btnExportarCsv.addEventListener('click', () => {
                exportarFilaCsv(chamadosAtualmenteVisiveis);
            });
        }

        window.addEventListener('chamadosAtualizados', () => {
            applyFilters();
        });

        tableBody.addEventListener('change', (e) => {
            if (e.target.classList.contains('status-select')) {
                if (!podeEditarChamados()) {
                    alert('Ação bloqueada: na etapa atual, os estudantes não devem alterar status.');
                    applyFilters();
                    return;
                }

                const id = parseInt(e.target.getAttribute('data-id'), 10);
                const newStatus = e.target.value;
                const chamados = getChamados();
                const idx = chamados.findIndex(c => c.id === id);

                if (idx !== -1) {
                    chamados[idx].status = newStatus;

                    if (version === 'A') {
                        // DEFEITO 5: Efeito Hidra ao encerrar
                        if (newStatus === 'Encerrado') {
                            const newId = chamados.length > 0 ? Math.max(...chamados.map(c => c.id)) + 1 : 1;
                            chamados.push({
                                id: newId,
                                title: 'Reabertura indevida: ' + chamados[idx].title,
                                description: 'Chamado reaberto automaticamente por anomalia de transição de estado.',
                                category: chamados[idx].category,
                                priority: chamados[idx].priority,
                                tipoManutencao: 'Corretiva',
                                status: 'Aberto',
                                impact: chamados[idx].impact,
                                urgency: chamados[idx].urgency,
                                slaResponse: chamados[idx].slaResponse,
                                slaResolution: chamados[idx].slaResolution,
                                setorAfetado: chamados[idx].setorAfetado,
                                usuariosAfetados: chamados[idx].usuariosAfetados,
                                contingenciaDisponivel: chamados[idx].contingenciaDisponivel,
                                justificativaPrioridade: 'Gerado automaticamente por transição anômala.',
                                primeiraAcaoRecomendada: 'Investigar',
                                criterioValidacaoInicial: 'Verificar encerramento.',
                                observacaoPedagogica: 'Investigue por que o chamado foi reaberto.',
                                solicitante: 'Sistema Automático',
                                dataAbertura: new Date().toISOString().slice(0, 16).replace('T', ' '),
                                evidencias: 'Log de encerramento.',
                                responsavel: 'Suporte'
                            });
                        }
                    } else {
                        // REGRESSÃO 1 na Versão B: Alterar para "Em andamento" reseta prioridade para Média
                        if (newStatus === 'Em andamento') {
                            chamados[idx].priority = 'Média';
                        }
                    }

                    saveChamados(chamados);
                    applyFilters();
                }
            }
        });
    }
});
