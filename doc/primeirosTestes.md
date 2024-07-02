## Escrevendo Testes

### Introdução

Os testes do Playwright são simples, eles:

- Realizam ações, e
- Verificam o estado em relação às expectativas.

Não é necessário esperar por nada antes de realizar uma ação: o Playwright espera automaticamente que uma ampla gama de verificações de ação sejam aprovadas antes de realizar cada ação.

Também não é necessário lidar com condições de corrida ao realizar as verificações - as asserções do Playwright são projetadas de forma a descrever as expectativas que precisam ser eventualmente atendidas.

É isso! Essas escolhas de design permitem que os usuários do Playwright esqueçam de tempos limites intermitentes e verificações complicadas em seus testes.

### Você vai aprender

- Como escrever o primeiro teste
- Como realizar ações
- Como usar asserções
- Como os testes são executados isoladamente
- Como usar ganchos de teste

### Primeiro Teste

Dê uma olhada no exemplo a seguir para ver como escrever um teste.

```typescript
// tests/example.spec.ts
import { test, expect } from '@playwright/test';

test('tem título', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Espera que o título "contenha" uma substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('link de introdução', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Clica no link de introdução.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Espera que a página tenha um cabeçalho com o nome "Instalação".
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

### NOTA

Adicione `// @ts-check` no início de cada arquivo de teste ao usar JavaScript no VS Code para obter verificação de tipo automática.

### Ações

#### Navegação

A maioria dos testes começará navegando para a URL da página. Depois disso, o teste poderá interagir com os elementos da página.

```typescript
await page.goto('https://playwright.dev/');
```

O Playwright aguardará que a página alcance o estado de carregamento antes de prosseguir. Saiba mais sobre as opções de `page.goto()`.

#### Interações

Realizar ações começa com localizar os elementos. O Playwright usa a API de Locators para isso. Locators representam uma maneira de encontrar elemento(s) na página a qualquer momento, saiba mais sobre os diferentes tipos de locators disponíveis. O Playwright aguardará que o elemento esteja acionável antes de realizar a ação, então não há necessidade de esperar que ele fique disponível.

```typescript
// Cria um locator.
const getStarted = page.getByRole('link', { name: 'Get started' });

// Clica nele.
await getStarted.click();
```

Na maioria dos casos, isso será escrito em uma linha:

```typescript
await page.getByRole('link', { name: 'Get started' }).click();
```

### Ações Básicas

Esta é a lista das ações mais populares do Playwright. Note que existem muitas outras, então certifique-se de verificar a seção da API de Locators para saber mais sobre elas.

| Ação                     | Descrição                        |
|--------------------------|----------------------------------|
| `locator.check()`        | Marca a caixa de seleção         |
| `locator.click()`        | Clica no elemento                |
| `locator.uncheck()`      | Desmarca a caixa de seleção      |
| `locator.hover()`        | Passa o mouse sobre o elemento   |
| `locator.fill()`         | Preenche o campo de formulário   |
| `locator.focus()`        | Foca no elemento                 |
| `locator.press()`        | Pressiona uma tecla              |
| `locator.setInputFiles()`| Seleciona arquivos para upload   |
| `locator.selectOption()` | Seleciona opção no dropdown      |

### Asserções

O Playwright inclui asserções de teste na forma da função `expect`. Para fazer uma asserção, chame `expect(value)` e escolha um matcher que reflita a expectativa.

Existem muitos matchers genéricos como `toEqual`, `toContain`, `toBeTruthy` que podem ser usados para verificar qualquer condição.

```typescript
expect(success).toBeTruthy();
```

O Playwright também inclui matchers assíncronos que esperam até que a condição esperada seja atendida. Usar esses matchers permite que os testes não sejam falhos e resilientes. Por exemplo, este código aguardará até que a página obtenha o título contendo "Playwright":

```typescript
await expect(page).toHaveTitle(/Playwright/);
```

Aqui está a lista das asserções assíncronas mais populares. Note que existem muitas outras para se familiarizar:

| Asserção                         | Descrição                       |
|----------------------------------|---------------------------------|
| `expect(locator).toBeChecked()`  | Checkbox está marcado           |
| `expect(locator).toBeEnabled()`  | Controle está habilitado        |
| `expect(locator).toBeVisible()`  | Elemento está visível           |
| `expect(locator).toContainText()`| Elemento contém texto           |
| `expect(locator).toHaveAttribute()` | Elemento tem atributo       |
| `expect(locator).toHaveCount()`  | Lista de elementos tem tamanho  |
| `expect(locator).toHaveText()`   | Elemento corresponde ao texto   |
| `expect(locator).toHaveValue()`  | Elemento de entrada tem valor   |
| `expect(page).toHaveTitle()`     | Página tem título               |
| `expect(page).toHaveURL()`       | Página tem URL                  |

### Isolamento de Testes

O Playwright Test é baseado no conceito de fixtures de teste, como o `page` embutido, que é passado para o seu teste. As páginas são isoladas entre os testes devido ao Contexto do Navegador, que é equivalente a um novo perfil de navegador, onde cada teste obtém um ambiente novo, mesmo quando vários testes são executados em um único Navegador.

```typescript
// tests/example.spec.ts
import { test } from '@playwright/test';

test('exemplo de teste', async ({ page }) => {
  // "page" pertence a um BrowserContext isolado, criado para este teste específico.
});

test('outro teste', async ({ page }) => {
  // "page" neste segundo teste é completamente isolado do primeiro teste.
});
```

### Usando Ganchos de Teste

Você pode usar vários ganchos de teste, como `test.describe` para declarar um grupo de testes e `test.beforeEach` e `test.afterEach` que são executados antes/depois de cada teste. Outros ganchos incluem `test.beforeAll` e `test.afterAll` que são executados uma vez por worker antes/depois de todos os testes.

```typescript
// tests/example.spec.ts
import { test, expect } from '@playwright/test';

test.describe('navegação', () => {
  test.beforeEach(async ({ page }) => {
    // Vai para a URL inicial antes de cada teste.
    await page.goto('https://playwright.dev/');
  });

  test('navegação principal', async ({ page }) => {
    // Asserções usam a API expect.
    await expect(page).toHaveURL('https://playwright.dev/');
  });
});
```