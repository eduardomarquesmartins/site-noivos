# Epic: Lumina Premium Experience - Dashboard & Conversion Growth

**Goal:** Transformar o Lumina em uma plataforma de vendas e gestão completa para noivos, implementando métricas reais no dashboard e refinando o fluxo de onboarding para máxima conversão.

## Epic Description

**Existing System Context:**
- **Current functionality:** Landing page responsiva com seções de vendas (FAQ, Preços, Depoimentos) e um layout básico de Dashboard com navegação lateral.
- **Technology stack:** Next.js 15+, Tailwind CSS, Lucide React, Framer Motion.
- **Integration points:** O Dashboard consome o `DashboardLayout` e exibe subpáginas. A Landing Page possui um modal de Onboarding simulado.

**Enhancement Details:**
- **What's being added/changed:** 
    1. Implementação de cards de métricas dinâmicas (fictícias por enquanto, mas com estrutura para dados reais) no Dashboard.
    2. Refinamento do modal de Onboarding (Stepper) para coletar mais dados e parecer um processo de "consultoria".
    3. Atualização da paleta de cores para o padrão "Wedding-Chic" (Champagne/Gold/Ivory) em todo o sistema.
- **How it integrates:** Modificação do `src/app/dashboard/page.tsx` e `src/app/page.tsx`.
- **Success criteria:** Dashboard visualmente informativo; Fluxo de onboarding concluído sem erros; Identidade visual consistente em mobile e desktop.

---

## Stories

### Story 1: Painel de Métricas e Performance (Dashboard)
**Description:** Implementar o design de métricas no resumo do painel, incluindo cards de RSVPs, Presentes Recebidos e Cliques no Site.

**YAML Frontmatter:**
```yaml
executor: "@dev"
quality_gate: "@architect"
quality_gate_tools: [code_review, pattern_validation]
```

**Quality Gates:**
- Pre-Commit: Verificação de contraste e acessibilidade nos cards.
- Pre-PR: Code review focado em performance de renderização.

---

### Story 2: Fluxo de Onboarding Premium e Conversão
**Description:** Refinar o modal de onboarding na landing page para incluir seleção de estilo e confirmação de plano, tornando-o um funil de vendas.

**YAML Frontmatter:**
```yaml
executor: "@ux-design-expert"
quality_gate: "@dev"
quality_gate_tools: [ui_validation, accessibility_test]
```

**Quality Gates:**
- Pre-Commit: Teste de usabilidade mobile do stepper.
- Pre-PR: Verificação dos estados de erro e loading.

---

### Story 3: Refinamento Estético "Wedding-Chic" Global
**Description:** Sincronizar as cores globais e sombras (glassmorphism) entre a Landing Page e o Dashboard para uma experiência de marca unificada e luxuosa.

**YAML Frontmatter:**
```yaml
executor: "@ux-design-expert"
quality_gate: "@pm"
quality_gate_tools: [brand_alignment_review]
```

**Quality Gates:**
- Pre-Commit: Verificação da paleta HSL no `globals.css`.
- Pre-PR: Review estratégico de Morgan (PM) quanto ao posicionamento de luxo.

---

## Compatibility Requirements
- [x] Navegação mobile deve permanecer intacta.
- [x] O Dashboard deve continuar acessível sem autenticação (mock).
- [x] Performance do Lighthouse acima de 90.

## Risk Mitigation
- **Primary Risk:** Quebra de estilos globais ao alterar o `globals.css`.
- **Mitigation:** Uso de variáveis CSS no Tailwind com fallbacks seguros.
- **Rollback Plan:** Reverter para o commit anterior do `globals.css`.

## Definition of Done
- [ ] Stories 1, 2 e 3 concluídas.
- [ ] Teste em dispositivos iOS e Android simulados aprovado.
- [ ] Identidade visual validada pelo PM.
