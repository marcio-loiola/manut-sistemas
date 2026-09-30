// ==========================================================================
// MANUTENÇÃO DE SISTEMAS SENAI — MÓDULO DE VALIDADORES PURAS
// Unidade Curricular: Manutenção de Sistemas (30h, 10 aulas)
// ==========================================================================

const TIPOS_MANUTENCAO_VALIDOS = ['Corretiva', 'Preventiva', 'Adaptativa', 'Evolutiva'];

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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TIPOS_MANUTENCAO_VALIDOS,
        validarTipoManutencao,
        validarTituloChamado,
        validarDescricaoChamado,
        validarSenha
    };
}

if (typeof window !== 'undefined') {
    window.Validadores = {
        TIPOS_MANUTENCAO_VALIDOS,
        validarTipoManutencao,
        validarTituloChamado,
        validarDescricaoChamado,
        validarSenha
    };
}
