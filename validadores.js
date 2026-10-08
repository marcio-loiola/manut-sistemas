// ==========================================================================
// MANUTENÇÃO DE SISTEMAS SENAI — MÓDULO DE VALIDADORES E PRIORIZAÇÃO PURAS
// Unidade Curricular: Manutenção de Sistemas (30h, 10 aulas)
// ==========================================================================

const TIPOS_MANUTENCAO_VALIDOS = ['Corretiva', 'Preventiva', 'Adaptativa', 'Evolutiva'];

/**
 * Matriz canônica de priorização (Impacto x Urgência)
 * | Impacto / Urgência | Baixa | Média | Alta |
 * | Alto               | P3    | P2    | P1   |
 * | Médio              | P4    | P3    | P2   |
 * | Baixo              | P4    | P4    | P3   |
 */
const MATRIZ_PRIORIDADE = {
    alto: { alta: 'P1', media: 'P2', baixa: 'P3' },
    medio: { alta: 'P2', media: 'P3', baixa: 'P4' },
    baixo: { alta: 'P3', media: 'P4', baixa: 'P4' }
};

function normalizarTexto(txt) {
    if (!txt || typeof txt !== 'string') return '';
    return txt.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Calcula a prioridade sugerida (P1, P2, P3, P4) baseada na Matriz de Prioridade.
 * @param {string} impacto - "Alto", "Médio" ou "Baixo"
 * @param {string} urgencia - "Alta", "Média" ou "Baixa"
 * @returns {string|null} "P1", "P2", "P3", "P4" ou null se valores forem inválidos
 */
function calcularPrioridade(impacto, urgencia) {
    const imp = normalizarTexto(impacto);
    const urg = normalizarTexto(urgencia);
    if (!MATRIZ_PRIORIDADE[imp] || !MATRIZ_PRIORIDADE[imp][urg]) {
        return null;
    }
    return MATRIZ_PRIORIDADE[imp][urg];
}

function validarTipoManutencao(tipo) {
    if (!tipo || typeof tipo !== 'string') return false;
    const tipoNormalizado = tipo.trim();
    return TIPOS_MANUTENCAO_VALIDOS.includes(tipoNormalizado);
}

function validarTituloChamado(titulo) {
    if (!titulo || typeof titulo !== 'string') return false;
    return titulo.trim().length >= 5;
}

function validarDescricaoChamado(descricao) {
    if (!descricao || typeof descricao !== 'string') return false;
    return descricao.trim().length >= 10;
}

function validarSenha(senha) {
    if (!senha || typeof senha !== 'string') return false;
    return senha.length >= 6;
}

/**
 * Gera conteúdo CSV em formato compatível com Excel e Google Sheets (delimitador ponto e vírgula).
 * @param {Array} chamados - Lista de objetos de chamados
 * @returns {string} Linhas formatadas em CSV
 */
function gerarCsvChamados(chamados = []) {
    const cabecalhos = [
        'ID',
        'Título',
        'Categoria',
        'Tipo de manutenção',
        'Status',
        'Prioridade atual',
        'Impacto',
        'Urgência',
        'Prioridade sugerida',
        'SLA resposta',
        'SLA resolução',
        'Setor afetado',
        'Usuários afetados',
        'Contingência',
        'Primeira ação',
        'Critério de validação'
    ];

    const formatarCampo = (valor) => {
        if (valor === null || valor === undefined) return '""';
        const str = String(valor).replace(/"/g, '""');
        return `"${str}"`;
    };

    const linhas = chamados.map(c => {
        const prioridadeSugerida = calcularPrioridade(c.impact, c.urgency) || 'Não avaliada';
        const contingencia = c.contingenciaDisponivel ? 'Sim' : 'Não';
        return [
            c.id,
            c.title || '',
            c.category || '',
            c.tipoManutencao || '',
            c.status || '',
            c.priority || '',
            c.impact || '',
            c.urgency || '',
            prioridadeSugerida,
            c.slaResponse || '',
            c.slaResolution || '',
            c.setorAfetado || '',
            c.usuariosAfetados || '',
            contingencia,
            c.primeiraAcaoRecomendada || '',
            c.criterioValidacaoInicial || ''
        ].map(formatarCampo).join(';');
    });

    return [cabecalhos.join(';'), ...linhas].join('\r\n');
}

/**
 * Valida permissão de edição baseada no perfil e na chave de bloqueio pedagógico.
 * @param {string} perfil - 'Docente' ou 'Estudante'
 * @param {boolean|string} permissaoAluno - valor de localStorage
 * @returns {boolean}
 */
function verificarPermissaoEdicao(perfil, permissaoAluno) {
    if (perfil === 'Docente') return true;
    return String(permissaoAluno) === 'true';
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TIPOS_MANUTENCAO_VALIDOS,
        MATRIZ_PRIORIDADE,
        calcularPrioridade,
        validarTipoManutencao,
        validarTituloChamado,
        validarDescricaoChamado,
        validarSenha,
        gerarCsvChamados,
        verificarPermissaoEdicao
    };
}

if (typeof window !== 'undefined') {
    window.Validadores = {
        TIPOS_MANUTENCAO_VALIDOS,
        MATRIZ_PRIORIDADE,
        calcularPrioridade,
        validarTipoManutencao,
        validarTituloChamado,
        validarDescricaoChamado,
        validarSenha,
        gerarCsvChamados,
        verificarPermissaoEdicao
    };
}
