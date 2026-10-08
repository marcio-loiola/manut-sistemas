import { describe, it, expect } from 'vitest';
import {
    calcularPrioridade,
    validarTipoManutencao,
    validarTituloChamado,
    validarDescricaoChamado,
    validarSenha,
    gerarCsvChamados,
    verificarPermissaoEdicao,
    TIPOS_MANUTENCAO_VALIDOS
} from './validadores.js';

describe('Suíte de Testes Unitários — Módulo de Validadores e Priorização (Manutenção de Sistemas SENAI)', () => {

    // -------------------------------------------------------------------------
    // 1. MATRIZ DE PRIORIDADE (Impacto x Urgência) — 9 Combinações Obrigatórias
    // -------------------------------------------------------------------------
    describe('calcularPrioridade() — Matriz de Priorização', () => {
        it('1. calcularPrioridade("Alto", "Alta") deve retornar "P1"', () => {
            expect(calcularPrioridade('Alto', 'Alta')).toBe('P1');
        });

        it('2. calcularPrioridade("Alto", "Média") deve retornar "P2"', () => {
            expect(calcularPrioridade('Alto', 'Média')).toBe('P2');
            expect(calcularPrioridade('Alto', 'Media')).toBe('P2');
        });

        it('3. calcularPrioridade("Alto", "Baixa") deve retornar "P3"', () => {
            expect(calcularPrioridade('Alto', 'Baixa')).toBe('P3');
        });

        it('4. calcularPrioridade("Médio", "Alta") deve retornar "P2"', () => {
            expect(calcularPrioridade('Médio', 'Alta')).toBe('P2');
            expect(calcularPrioridade('Medio', 'Alta')).toBe('P2');
        });

        it('5. calcularPrioridade("Médio", "Média") deve retornar "P3"', () => {
            expect(calcularPrioridade('Médio', 'Média')).toBe('P3');
            expect(calcularPrioridade('Medio', 'Media')).toBe('P3');
        });

        it('6. calcularPrioridade("Médio", "Baixa") deve retornar "P4"', () => {
            expect(calcularPrioridade('Médio', 'Baixa')).toBe('P4');
            expect(calcularPrioridade('Medio', 'Baixa')).toBe('P4');
        });

        it('7. calcularPrioridade("Baixo", "Alta") deve retornar "P3"', () => {
            expect(calcularPrioridade('Baixo', 'Alta')).toBe('P3');
        });

        it('8. calcularPrioridade("Baixo", "Média") deve retornar "P4"', () => {
            expect(calcularPrioridade('Baixo', 'Média')).toBe('P4');
            expect(calcularPrioridade('Baixo', 'Media')).toBe('P4');
        });

        it('9. calcularPrioridade("Baixo", "Baixa") deve retornar "P4"', () => {
            expect(calcularPrioridade('Baixo', 'Baixa')).toBe('P4');
        });

        it('10. Valores inválidos ou nulos devem retornar resultado seguro e previsível (null)', () => {
            expect(calcularPrioridade('', '')).toBeNull();
            expect(calcularPrioridade('Urgente', 'Alto')).toBeNull();
            expect(calcularPrioridade(null, undefined)).toBeNull();
            expect(calcularPrioridade('Desconhecido', 'Baixa')).toBeNull();
            expect(calcularPrioridade('Alto', 123)).toBeNull();
        });
    });

    // -------------------------------------------------------------------------
    // 2. EXPORTAÇÃO CSV E PRESERVAÇÃO DE CARACTERES/ACENTUAÇÃO
    // -------------------------------------------------------------------------
    describe('gerarCsvChamados() — Exportação para Planilha Externa', () => {
        const mockChamados = [
            {
                id: 1,
                title: 'Erro 500 ao gerar relatório mensal financeiro',
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
                primeiraAcaoRecomendada: 'Reproduzir falha',
                criterioValidacaoInicial: 'O relatório mensal deve ser gerado sem mensagem de erro.'
            }
        ];

        it('11. A exportação CSV deve preservar acentos, delimitador ";" e cabeçalhos em português', () => {
            const csv = gerarCsvChamados(mockChamados);
            expect(csv).toContain('ID;Título;Categoria;Tipo de manutenção;Status;Prioridade atual;Impacto;Urgência;Prioridade sugerida');
            expect(csv).toContain('Erro 500 ao gerar relatório mensal financeiro');
            expect(csv).toContain('Reproduzir falha');
            expect(csv).toContain('P1');
            expect(csv).toContain('Não'); // contingência convertida em Sim/Não
        });
    });

    // -------------------------------------------------------------------------
    // 3. MODO ESTUDANTE E MODO DOCENTE — PERMISSÕES DE EDIÇÃO
    // -------------------------------------------------------------------------
    describe('verificarPermissaoEdicao() — Controle de Acesso Pedagógico', () => {
        it('12. O modo estudante não pode alterar dados quando o bloqueio estiver ativo (permissaoAluno = false)', () => {
            expect(verificarPermissaoEdicao('Estudante', 'false')).toBe(false);
            expect(verificarPermissaoEdicao('Estudante', false)).toBe(false);
            expect(verificarPermissaoEdicao('Estudante', null)).toBe(false);
        });

        it('13. O modo docente consegue ativar e desativar a edição estudantil, mantendo sempre sua própria permissão ativa', () => {
            // Docente sempre tem permissão liberada
            expect(verificarPermissaoEdicao('Docente', 'false')).toBe(true);
            expect(verificarPermissaoEdicao('Docente', 'true')).toBe(true);

            // Quando docente libera para os alunos:
            expect(verificarPermissaoEdicao('Estudante', 'true')).toBe(true);
            expect(verificarPermissaoEdicao('Estudante', true)).toBe(true);
        });
    });

    // -------------------------------------------------------------------------
    // 4. VALIDADORES EXISTENTES (COMPATIBILIDADE PRESERVADA)
    // -------------------------------------------------------------------------
    describe('validarTipoManutencao() — Classificação Canônica ISO/IEC 14764', () => {
        it('deve aceitar os quatro tipos canônicos de manutenção', () => {
            expect(validarTipoManutencao('Corretiva')).toBe(true);
            expect(validarTipoManutencao('Preventiva')).toBe(true);
            expect(validarTipoManutencao('Adaptativa')).toBe(true);
            expect(validarTipoManutencao('Evolutiva')).toBe(true);
        });

        it('deve rejeitar tipos fora do padrão', () => {
            expect(validarTipoManutencao('Emergencial')).toBe(false);
            expect(validarTipoManutencao('')).toBe(false);
        });
    });

    describe('validarTituloChamado() e validarDescricaoChamado()', () => {
        it('deve validar tamanhos mínimos', () => {
            expect(validarTituloChamado('Erro')).toBe(false);
            expect(validarTituloChamado('Mouse')).toBe(true);
            expect(validarDescricaoChamado('Curto')).toBe(false);
            expect(validarDescricaoChamado('Descrição com mais de 10 caracteres')).toBe(true);
        });
    });

    describe('validarSenha()', () => {
        it('deve exigir no mínimo 6 caracteres', () => {
            expect(validarSenha('12345')).toBe(false);
            expect(validarSenha('123456')).toBe(true);
        });
    });
});
