import { describe, it, expect } from 'vitest';
import {
    validarTipoManutencao,
    validarTituloChamado,
    validarDescricaoChamado,
    validarSenha,
    TIPOS_MANUTENCAO_VALIDOS
} from './validadores.js';

describe('Suíte de Testes Unitários — Módulo de Validadores (Manutenção de Sistemas SENAI)', () => {

    describe('validarTipoManutencao() — Classificação Canônica', () => {
        it('deve aceitar os quatro tipos canônicos de manutenção', () => {
            expect(validarTipoManutencao('Corretiva')).toBe(true);
            expect(validarTipoManutencao('Preventiva')).toBe(true);
            expect(validarTipoManutencao('Adaptativa')).toBe(true);
            expect(validarTipoManutencao('Evolutiva')).toBe(true);
        });

        it('deve rejeitar valores vazios, nulos ou não-string', () => {
            expect(validarTipoManutencao('')).toBe(false);
            expect(validarTipoManutencao('   ')).toBe(false);
            expect(validarTipoManutencao(null)).toBe(false);
            expect(validarTipoManutencao(undefined)).toBe(false);
            expect(validarTipoManutencao(123)).toBe(false);
        });

        it('deve rejeitar tipos inválidos ou fora do padrão ISO/IEC 14764', () => {
            expect(validarTipoManutencao('Emergencial')).toBe(false);
            expect(validarTipoManutencao('Urgente')).toBe(false);
            expect(validarTipoManutencao('Geral')).toBe(false);
        });

        it('deve conter exatamente os 4 tipos normativos na constante', () => {
            expect(TIPOS_MANUTENCAO_VALIDOS).toEqual([
                'Corretiva',
                'Preventiva',
                'Adaptativa',
                'Evolutiva'
            ]);
        });
    });

    describe('validarTituloChamado() — Partição de Equivalência e BVA', () => {
        it('deve rejeitar título com 4 caracteres (Valor Limite - Imediatamente Abaixo)', () => {
            expect(validarTituloChamado('Rede')).toBe(false);
        });

        it('deve aceitar título com 5 caracteres (Valor Limite - No Limite)', () => {
            expect(validarTituloChamado('Mouse')).toBe(true);
        });

        it('deve aceitar título com 6 caracteres (Valor Limite - Imediatamente Acima)', () => {
            expect(validarTituloChamado('Teclas')).toBe(true);
        });

        it('deve rejeitar título composto apenas por espaços', () => {
            expect(validarTituloChamado('     ')).toBe(false);
        });

        it('deve rejeitar título nulo ou indefinido', () => {
            expect(validarTituloChamado(null)).toBe(false);
            expect(validarTituloChamado(undefined)).toBe(false);
        });
    });

    describe('validarDescricaoChamado() — Detalhamento Mínimo para Diagnóstico', () => {
        it('deve rejeitar descrições com menos de 10 caracteres', () => {
            expect(validarDescricaoChamado('Curto')).toBe(false);
            expect(validarDescricaoChamado('123456789')).toBe(false);
        });

        it('deve aceitar descrições com 10 ou mais caracteres', () => {
            expect(validarDescricaoChamado('1234567890')).toBe(true);
            expect(validarDescricaoChamado('Falha na conexão de rede do servidor')).toBe(true);
        });
    });

    describe('validarSenha() — Autenticação de Usuário', () => {
        it('deve rejeitar senha com 5 caracteres', () => {
            expect(validarSenha('12345')).toBe(false);
        });

        it('deve aceitar senha com 6 caracteres', () => {
            expect(validarSenha('123456')).toBe(true);
        });

        it('deve aceitar senha longa segura', () => {
            expect(validarSenha('SenhaSegura2026!')).toBe(true);
        });
    });
});
