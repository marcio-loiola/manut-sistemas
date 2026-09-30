// ==========================================================================
// MANUTENÇÃO DE SISTEMAS SENAI — CONTROLADOR PRINCIPAL (app.js)
// Unidade Curricular: Manutenção de Sistemas (30h, 10 aulas)
// ==========================================================================

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
    initData(true);
    window.location.reload();
};

function initData(force = false) {
    if (force || !localStorage.getItem('manutencao_chamados')) {
        const mockChamados = [
            {
                id: 1,
                title: 'Erro 500 ao gerar relatório mensal financeiro',
                description: 'Usuários do financeiro relatam travamento ao exportar PDF no fechamento de mês.',
                category: 'Software',
                priority: 'Alta',
                tipoManutencao: 'Corretiva',
                status: 'Aberto'
            },
            {
                id: 2,
                title: 'Limpeza de logs e rotação de disco no servidor',
                description: 'Partição /var/log atingiu 88% de ocupação. Necessário expurgo preventivo para evitar parada operacional.',
                category: 'Hardware',
                priority: 'Média',
                tipoManutencao: 'Preventiva',
                status: 'Em andamento'
            },
            {
                id: 3,
                title: 'Adequação do layout ao padrão visual SENAI 2026',
                description: 'Atualizar tipografia e paleta institucional para atender a novas diretrizes de acessibilidade e identidade.',
                category: 'Software',
                priority: 'Baixa',
                tipoManutencao: 'Adaptativa',
                status: 'Encerrado'
            },
            {
                id: 4,
                title: 'Exportação de relatórios de chamados para formato CSV',
                description: 'Coordenação pedagógica solicitou botão para baixar dados brutos e calcular métricas no Excel/Notion.',
                category: 'Software',
                priority: 'Média',
                tipoManutencao: 'Evolutiva',
                status: 'Aberto'
            },
            {
                id: 5,
                title: 'Falha intermitente na placa de rede do laboratório 03',
                description: 'Switch e cabeamento apresentam perda de pacotes durante aulas práticas de banco de dados.',
                category: 'Rede',
                priority: 'Alta',
                tipoManutencao: 'Corretiva',
                status: 'Em andamento'
            },
            {
                id: 6,
                title: 'Revisão periódica dos no-breaks e baterias da sala de servidores',
                description: 'Checagem trimestral preventiva do banco de baterias para garantir autonomia em caso de oscilação elétrica.',
                category: 'Hardware',
                priority: 'Baixa',
                tipoManutencao: 'Preventiva',
                status: 'Encerrado'
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
    window.location.href = 'index.html';
}

checkAuth();

window.abrirPainelProfessor = function() {
    fecharPainelProfessor();
    const version = getAppVersion();
    const chamados = getChamados();

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
                <p>Total de Chamados Cadastrados: <strong>${chamados.length}</strong></p>
                <div class="modal-btn-group">
                    <button type="button" class="modal-action-btn" onclick="setVersion('A')">Ativar Versão A (Inicial)</button>
                    <button type="button" class="modal-action-btn" onclick="setVersion('B')">Ativar Versão B (Reteste/Regressão)</button>
                    <button type="button" class="modal-action-btn danger" onclick="resetTestData()">Restaurar Dados Iniciais</button>
                </div>
            </div>

            <div class="modal-section">
                <h4>Competências e Objetivos da UC (30h - 10 aulas)</h4>
                <div>
                    <span class="req-badge">1. Classificação (Corretiva / Preventiva / Adaptativa / Evolutiva)</span>
                    <span class="req-badge">2. Diagnóstico de Causa-Raiz</span>
                    <span class="req-badge">3. Versionamento & Regressão</span>
                    <span class="req-badge">4. Ciclo PDCA e Indicadores (Planilha Externa)</span>
                </div>
            </div>

            <div class="modal-section" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
                <p style="font-size: 0.82rem; color: #64748b;">
                    Consulte <code>GABARITO_PROFESSOR.md</code> para a matriz completa de defeitos didáticos, gabarito de classificação e fórmulas para cálculo de indicadores em planilha externa.
                </p>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
};

window.fecharPainelProfessor = function() {
    const modal = document.getElementById('painelProfessorModal');
    if (modal) modal.remove();
};

function setupPedagogicalNotice() {
    const version = getAppVersion();
    const notices = document.querySelectorAll('.pedagogical-notice');
    notices.forEach(notice => {
        const buildInfo = version === 'A' ? 'v1.0.0 (Build A — Inicial com Defeitos)' : 'v1.1.0 (Build B — Corrigida + Regressão)';
        const targetVersion = version === 'A' ? 'B' : 'A';
        const targetLabel = version === 'A' ? 'Build B (Reteste & Regressão)' : 'Build A (Versão Inicial)';

        notice.innerHTML = `
            <span>Manutenção de Sistemas SENAI:</span> 
            <strong>${buildInfo}</strong> — 
            <button type="button" class="btn-version-toggle" onclick="setVersion('${targetVersion}')">Alternar para ${targetLabel}</button> | 
            <button type="button" class="btn-version-toggle" onclick="abrirPainelProfessor()">⚙️ Painel Docente</button> | 
            <button type="button" class="btn-version-reset" onclick="resetTestData()">Restaurar Dados</button>
        `;
    });
}

window.editarChamado = function(id) {
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
                        <label for="editPrioridade">Prioridade</label>
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

window.fecharModalEdicao = function() {
    const modal = document.getElementById('modalEdicaoChamado');
    if (modal) modal.remove();
};

window.salvarEdicaoChamado = function(e, id) {
    e.preventDefault();
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

document.addEventListener('DOMContentLoaded', () => {
    setupPedagogicalNotice();

    // 1. Login
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
                window.location.href = 'dashboard.html';
            } else {
                errorMsg.textContent = 'Usuário ou senha inválidos. Verifique as credenciais didáticas informadas abaixo.';
                errorMsg.style.display = 'block';
            }
        });
    }

    // 2. Dashboard
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

            let countCorretiva = 0;
            let countPreventiva = 0;
            let countAdaptativa = 0;
            let countEvolutiva = 0;

            chamados.forEach(c => {
                const t = c.tipoManutencao || '';
                if (t === 'Corretiva') countCorretiva++;
                else if (t === 'Preventiva') countPreventiva++;
                else if (t === 'Adaptativa') countAdaptativa++;
                else if (t === 'Evolutiva') countEvolutiva++;
            });

            const elCorretiva = document.getElementById('countCorretiva');
            const elPreventiva = document.getElementById('countPreventiva');
            const elAdaptativa = document.getElementById('countAdaptativa');
            const elEvolutiva = document.getElementById('countEvolutiva');

            if (elCorretiva) elCorretiva.textContent = countCorretiva;
            if (elPreventiva) elPreventiva.textContent = countPreventiva;
            if (elAdaptativa) elAdaptativa.textContent = countAdaptativa;
            if (elEvolutiva) elEvolutiva.textContent = countEvolutiva;
        };

        if (filtroTipoDashboard) {
            filtroTipoDashboard.addEventListener('change', atualizarDashboard);
        }

        atualizarDashboard();
    }

    // 3. Novo Chamado
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
                    alert('Por favor, preencha os campos obrigatórios. O Título deve ter no mínimo 5 caracteres e a Descrição no mínimo 10 caracteres para subsidiar a manutenção.');
                    return;
                }
            }

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
                status: 'Aberto'
            };

            chamados.push(novoChamado);
            saveChamados(chamados);

            const successMsg = document.getElementById('formSuccess');
            if (successMsg) {
                successMsg.textContent = `Chamado #${newId} registrado com sucesso na categoria de Manutenção ${novoChamado.tipoManutencao}!`;
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

    // 4. Consulta de Chamados
    const tableBody = document.getElementById('tableBody');
    if (tableBody) {
        const version = getAppVersion();

        const searchInput = document.getElementById('busca');
        const filterStatus = document.getElementById('filtroStatus');
        const filterTipo = document.getElementById('filtroTipo');

        const obterClasseBadgeTipo = (tipo) => {
            switch ((tipo || '').toLowerCase()) {
                case 'corretiva': return 'badge-tipo badge-corretiva';
                case 'preventiva': return 'badge-tipo badge-preventiva';
                case 'adaptativa': return 'badge-tipo badge-adaptativa';
                case 'evolutiva': return 'badge-tipo badge-evolutiva';
                default: return 'badge-tipo';
            }
        };

        const renderTable = (chamadosList) => {
            tableBody.innerHTML = '';

            if (chamadosList.length === 0) {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td colspan="7" style="text-align:center; color:#888; padding: 2rem;">Nenhum chamado encontrado para os filtros selecionados.</td>`;
                tableBody.appendChild(tr);
                return;
            }

            chamadosList.forEach(c => {
                const tr = document.createElement('tr');

                let cssStatus = 'status-aberto';
                const st = (c.status || '').toLowerCase();
                if (st === 'em andamento') {
                    cssStatus = 'status-andamento';
                } else if (st === 'encerrado') {
                    cssStatus = 'status-encerrado';
                }

                let cssPrioridade = 'priority-baixa';
                if (c.priority === 'Alta') cssPrioridade = 'priority-alta';
                else if (c.priority === 'Média') cssPrioridade = 'priority-media';

                const badgeTipoClass = obterClasseBadgeTipo(c.tipoManutencao);

                tr.innerHTML = `
                    <td><strong>#${c.id}</strong></td>
                    <td>
                        <div style="font-weight: 600; color: #1e293b;">${c.title}</div>
                        <div style="font-size: 0.8rem; color: #64748b;">${c.description ? c.description.substring(0, 50) + (c.description.length > 50 ? '...' : '') : ''}</div>
                    </td>
                    <td>${c.category}</td>
                    <td><span class="${cssPrioridade}">${c.priority}</span></td>
                    <td><span class="${badgeTipoClass}">${c.tipoManutencao || 'Não Classificado'}</span></td>
                    <td>
                        <select class="status-select ${cssStatus}" data-id="${c.id}" title="Alterar status operacional">
                            <option value="Aberto" ${c.status === 'Aberto' ? 'selected' : ''}>Aberto</option>
                            <option value="Em andamento" ${c.status === 'Em andamento' ? 'selected' : ''}>Em andamento</option>
                            <option value="Encerrado" ${c.status === 'Encerrado' ? 'selected' : ''}>Encerrado</option>
                        </select>
                    </td>
                    <td>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="editarChamado(${c.id})" title="Editar ou reclassificar chamado">
                            ✏️ Editar
                        </button>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        };

        const applyFilters = () => {
            let filtered = getChamados();
            const term = searchInput ? searchInput.value.trim() : '';
            const statusF = filterStatus ? filterStatus.value : '';
            const tipoF = filterTipo ? filterTipo.value : '';

            if (version === 'A') {
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

            renderTable(filtered);
        };

        let currentChamados = getChamados();
        renderTable(currentChamados);

        if (searchInput) searchInput.addEventListener('input', applyFilters);
        if (filterStatus) filterStatus.addEventListener('change', applyFilters);
        if (filterTipo) filterTipo.addEventListener('change', applyFilters);

        window.addEventListener('chamadosAtualizados', () => {
            applyFilters();
        });

        tableBody.addEventListener('change', (e) => {
            if (e.target.classList.contains('status-select')) {
                const id = parseInt(e.target.getAttribute('data-id'), 10);
                const newStatus = e.target.value;
                const chamados = getChamados();
                const idx = chamados.findIndex(c => c.id === id);

                if (idx !== -1) {
                    chamados[idx].status = newStatus;

                    if (version === 'A') {
                        if (newStatus === 'Encerrado') {
                            const newId = chamados.length > 0 ? Math.max(...chamados.map(c => c.id)) + 1 : 1;
                            chamados.push({
                                id: newId,
                                title: 'Reabertura indevida: ' + chamados[idx].title,
                                description: 'Chamado reaberto automaticamente por anomalia de transição de estado no encerramento.',
                                category: chamados[idx].category,
                                priority: chamados[idx].priority,
                                tipoManutencao: 'Corretiva',
                                status: 'Aberto'
                            });
                        }
                    } else {
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
