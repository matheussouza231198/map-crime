# Testes Unitários - Map Crime Web

## 📋 Visão Geral

Esta documentação descreve a suíte de testes unitários criada para a aplicação Map Crime Web. Os testes cobrem as partes mais importantes da aplicação, incluindo utilitários, hooks customizados e componentes React.

## 🛠️ Tecnologias Utilizadas

- **Vitest**: Framework de testes rápido e moderno
- **React Testing Library**: Para testes de componentes React
- **@testing-library/jest-dom**: Matchers customizados para asserções DOM
- **@testing-library/user-event**: Para simular interações do usuário

## 📁 Estrutura de Testes

```
src/
├── test/
│   └── setup.ts                          # Configuração global dos testes
├── lib/
│   └── utils.test.ts                     # Testes da função utilitária cn()
├── hooks/
│   ├── use-copy-to-clipboard.test.ts     # Testes do hook de copiar para clipboard
│   ├── use-report-by-code.test.ts        # Testes do hook de buscar report
│   └── use-report-mutate.test.ts         # Testes do hook de criar report
└── components/
    ├── status-badge.test.tsx             # Testes do componente StatusBadge
    └── search-form.test.tsx              # Testes do componente SearchForm
```

## 🧪 Cobertura de Testes

### 1. Utilitários (`utils.test.ts`)

Testa a função `cn()` que combina classes CSS usando `clsx` e `tailwind-merge`:

- ✅ Merge de classes simples
- ✅ Classes condicionais
- ✅ Valores falsy (false, null, undefined)
- ✅ Conflitos de classes Tailwind
- ✅ Arrays de classes
- ✅ Objetos com valores booleanos
- ✅ Casos edge (sem argumentos)

### 2. Hook `useCopyToClipboard`

Testa a funcionalidade de copiar texto para a área de transferência:

- ✅ Estado inicial (`isCopied = false`)
- ✅ Copiar texto usando Clipboard API
- ✅ Estado `isCopied` muda para `true` após copiar
- ✅ Reset automático após 3 segundos
- ✅ Referência estável da função `copyToClipboard`

### 3. Hook `useReportByCode`

Testa a busca de denúncias por código:

- ✅ Query não executa quando código está vazio
- ✅ Busca report com código válido
- ✅ Retorna `null` para código inválido
- ✅ Estrutura correta do objeto Report
- ✅ Arrays de observations e attachments
- ✅ Query key correto

### 4. Hook `useReportMutate`

Testa a criação de novas denúncias:

- ✅ Estado inicial (idle)
- ✅ Submissão de report e retorno do tracking code
- ✅ Submissão com anexos
- ✅ Estado `isPending` durante mutação
- ✅ Múltiplas mutações
- ✅ Reset do estado

### 5. Componente `StatusBadge`

Testa a exibição de badges de status:

- ✅ Renderização com status "Pendente" (amarelo)
- ✅ Renderização com status "Em Andamento" (azul)
- ✅ Renderização com status "Resolvido" (verde)
- ✅ Renderização com status "Rejeitado" (vermelho)
- ✅ Classes CSS corretas para cada status
- ✅ Classes de estilo consistentes (font-semibold)

### 6. Componente `SearchForm`

Testa o formulário de busca de denúncias:

- ✅ Renderização de input e botão
- ✅ Texto de ajuda
- ✅ Botão desabilitado quando input vazio
- ✅ Botão habilitado com valor válido
- ✅ Validação de espaços em branco
- ✅ Navegação ao submeter formulário
- ✅ Trim de espaços do código
- ✅ Reset do formulário após submissão
- ✅ Mensagem de erro para campo vazio
- ✅ Atributos de acessibilidade (ARIA)

## 🚀 Como Executar os Testes

### Executar todos os testes

```bash
pnpm test
```

### Executar testes em modo watch

```bash
pnpm test -- --watch
```

### Executar testes com cobertura

```bash
pnpm test -- --coverage
```

### Executar testes de um arquivo específico

```bash
pnpm test src/lib/utils.test.ts
```

### Executar testes com UI interativa

```bash
pnpm test -- --ui
```

## 📝 Padrões de Teste

### Estrutura de um teste

```typescript
describe('ComponentName ou FunctionName', () => {
  it('should do something specific', () => {
    // Arrange: Preparar o teste
    // Act: Executar a ação
    // Assert: Verificar o resultado
  });
});
```

### Boas práticas aplicadas

1. **Descrições claras**: Cada teste tem uma descrição em português que explica o que está sendo testado
2. **Isolamento**: Cada teste é independente e não depende de outros
3. **Cleanup automático**: Limpeza após cada teste usando `afterEach`
4. **Mocks apropriados**: Uso de mocks para APIs externas (clipboard, router)
5. **Testes de acessibilidade**: Verificação de atributos ARIA
6. **Testes de interação**: Simulação realista de ações do usuário

## 🔧 Configuração

### vitest.config.ts

```typescript
export default defineConfig({
  test: {
    globals: true,           // Permite usar funções globais do vitest
    environment: 'jsdom',    // Simula ambiente de navegador
    setupFiles: './src/test/setup.ts',  // Arquivo de setup
    css: true,               // Processa CSS nos testes
  },
});
```

### setup.ts

Configurações globais incluem:

- Import automático dos matchers do jest-dom
- Cleanup automático após cada teste
- Mock do `navigator.clipboard`
- Mock do `window.matchMedia`

## 🎯 Próximos Passos

Para expandir a cobertura de testes, considere adicionar:

1. **Testes de integração** para fluxos completos
2. **Testes E2E** com Playwright ou Cypress
3. **Testes de componentes de UI** (Button, Input, Dialog, etc.)
4. **Testes de páginas** (páginas de admin, reports, etc.)
5. **Testes de contextos** (AuthContext)
6. **Snapshot tests** para componentes visuais
7. **Cobertura de código** com threshold mínimo

## 📊 Métricas de Qualidade

Os testes garantem:

- ✅ **Confiabilidade**: Código testado é mais confiável
- ✅ **Manutenibilidade**: Facilita refatorações
- ✅ **Documentação**: Testes servem como documentação viva
- ✅ **Regressões**: Previne bugs ao adicionar features
- ✅ **Confiança**: Deploy com mais segurança

## 🐛 Debug de Testes

Se um teste falhar:

1. Use `screen.debug()` para ver o HTML renderizado
2. Use `--reporter=verbose` para mais detalhes
3. Use `--no-coverage` para testes mais rápidos
4. Use breakpoints com `debugger;`
5. Execute apenas o teste específico com `.only()`

```typescript
it.only('should focus only on this test', () => {
  // Este é o único teste que vai rodar
});
```

## 📚 Recursos Adicionais

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
