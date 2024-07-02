## Instalação
### Introdução

O Playwright Test foi criado especificamente para atender às necessidades de testes de ponta a ponta. O Playwright suporta todos os mecanismos de renderização modernos, incluindo Chromium, WebKit e Firefox. Teste no Windows, Linux e macOS, localmente ou em CI, sem cabeça ou com cabeça, com emulação móvel nativa do Google Chrome para Android e Safari Mobile.

### O que você vai aprender

- Como instalar o Playwright
- O que é instalado
- Como executar o teste de exemplo
- Como abrir o relatório de teste HTML

### Instalando o Playwright

Comece instalando o Playwright usando npm, yarn ou pnpm. Alternativamente, você também pode começar e executar seus testes usando a Extensão do VS Code.

```bash
npm init playwright@latest
```

Execute o comando de instalação e selecione o seguinte para começar:

- Escolha entre TypeScript ou JavaScript (o padrão é TypeScript)
- Nome da sua pasta de testes (o padrão é `tests` ou `e2e` se você já tiver uma pasta de testes em seu projeto)
- Adicione um fluxo de trabalho do GitHub Actions para executar testes facilmente no CI
- Instale os navegadores do Playwright (o padrão é verdadeiro)

### O que é instalado

O Playwright fará o download dos navegadores necessários, bem como criará os seguintes arquivos.

- `playwright.config.ts`
- `package.json`
- `package-lock.json`
- `tests/`
  - `example.spec.ts`
- `tests-examples/`
  - `demo-todo-app.spec.ts`

O `playwright.config` é onde você pode adicionar configurações para o Playwright, incluindo a modificação de quais navegadores você gostaria de executar o Playwright. Se você estiver executando testes em um projeto já existente, as dependências serão adicionadas diretamente ao seu `package.json`.

A pasta `tests` contém um teste de exemplo básico para ajudá-lo a começar com os testes. Para um exemplo mais detalhado, consulte a pasta `tests-examples`, que contém testes escritos para testar um aplicativo de tarefas.

### Executando o Teste de Exemplo

Por padrão, os testes serão executados em todos os 3 navegadores: chromium, firefox e webkit usando 3 workers. Isso pode ser configurado no arquivo `playwright.config`. Os testes são executados em modo headless, o que significa que nenhum navegador será aberto ao executar os testes. Os resultados dos testes e os logs dos testes serão mostrados no terminal.

```bash
npx playwright test
```

Consulte nossa documentação sobre [Executando Testes](https://playwright.dev/docs/running-tests) para saber mais sobre como executar testes no modo com cabeça, executar vários testes, executar testes específicos, etc.

### Relatórios de Teste HTML

Após a conclusão do seu teste, um HTML Reporter será gerado, que mostra um relatório completo dos seus testes, permitindo que você filtre o relatório por navegadores, testes aprovados, testes falhados, testes ignorados e testes instáveis. Você pode clicar em cada teste e explorar os erros do teste, bem como cada etapa do teste. Por padrão, o relatório HTML é aberto automaticamente se alguns dos testes falharem.

```bash
npx playwright show-report
```

### Executando o Teste de Exemplo no Modo UI

Execute seus testes no Modo UI para uma melhor experiência de desenvolvedor com depuração de viagem no tempo, modo de observação e muito mais.

```bash
npx playwright test --ui
```

Confira nosso guia detalhado sobre o Modo UI para saber mais sobre seus recursos.

### Atualizando o Playwright

Para atualizar o Playwright para a versão mais recente, execute o seguinte comando:

```bash
npm install -D @playwright/test@latest
# Também baixe novos binários de navegador e suas dependências:
npx playwright install --with-deps
```

Você sempre pode verificar qual versão do Playwright você tem executando o seguinte comando:

```bash
npx playwright --version
```

### Requisitos do sistema

- Node.js 18+
- Windows 10+, Windows Server 2016+ ou Subsistema Windows para Linux (WSL).
- macOS 13 Ventura ou macOS 14 Sonoma.
- Debian 11, Debian 12, Ubuntu 20.04 ou Ubuntu 22.04, Ubuntu 24.04, em arquitetura x86-64 e arm64.