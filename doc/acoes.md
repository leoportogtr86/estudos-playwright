## Ações

### Introdução

O Playwright pode interagir com elementos HTML de entrada, como campos de texto, caixas de seleção, botões de rádio, opções de seleção, cliques do mouse, digitação de caracteres, teclas e atalhos, bem como fazer upload de arquivos e focar em elementos.

### Entrada de Texto

Usar `locator.fill()` é a maneira mais fácil de preencher campos de formulário. Ele foca o elemento e dispara um evento de entrada com o texto inserido. Funciona para elementos `<input>`, `<textarea>` e `[contenteditable]`.

```javascript
// Entrada de texto
await page.getByRole('textbox').fill('Peter');

// Entrada de data
await page.getByLabel('Data de nascimento').fill('2020-02-02');

// Entrada de hora
await page.getByLabel('Hora da consulta').fill('13:15');

// Entrada de data e hora local
await page.getByLabel('Hora local').fill('2020-03-02T05:15');
```

### Caixas de Seleção e Botões de Rádio

Usar `locator.setChecked()` é a maneira mais fácil de marcar e desmarcar uma caixa de seleção ou um botão de rádio. Este método pode ser usado com elementos `input[type=checkbox]`, `input[type=radio]` e `[role=checkbox]`.

```javascript
// Marque a caixa de seleção
await page.getByLabel('Eu concordo com os termos acima').check();

// Verifique o estado marcado
expect(page.getByLabel('Assinar newsletter')).toBeChecked();

// Selecione o botão de rádio
await page.getByLabel('XL').check();
```

### Seleção de Opções

Seleciona uma ou várias opções no elemento `<select>` com `locator.selectOption()`. Você pode especificar o valor da opção ou o rótulo a ser selecionado. Várias opções podem ser selecionadas.

```javascript
// Seleção única correspondente ao valor ou rótulo
await page.getByLabel('Escolha uma cor').selectOption('blue');

// Seleção única correspondente ao rótulo
await page.getByLabel('Escolha uma cor').selectOption({ label: 'Blue' });

// Itens selecionados múltiplos
await page.getByLabel('Escolha várias cores').selectOption(['red', 'green', 'blue']);
```

### Clique do Mouse

Realiza um clique simples de humano.

```javascript
// Clique genérico
await page.getByRole('button').click();

// Clique duplo
await page.getByText('Item').dblclick();

// Clique direito
await page.getByText('Item').click({ button: 'right' });

// Shift + clique
await page.getByText('Item').click({ modifiers: ['Shift'] });

// Ctrl + clique ou Windows e Linux
// Meta + clique no macOS
await page.getByText('Item').click({ modifiers: ['ControlOrMeta'] });

// Passa o mouse sobre o elemento
await page.getByText('Item').hover();

// Clique no canto superior esquerdo
await page.getByText('Item').click({ position: { x: 0, y: 0 } });
```

### Sob o Capô

Esses métodos relacionados ao ponteiro:

- Esperam que o elemento com o seletor dado esteja no DOM
- Esperam que ele se torne exibido, ou seja, não vazio, sem `display:none`, sem `visibility:hidden`
- Esperam que ele pare de se mover, por exemplo, até que a transição CSS termine
- Rolam o elemento para a visualização
- Esperam que ele receba eventos de ponteiro no ponto de ação, por exemplo, aguardam até que o elemento não seja obscurecido por outros elementos
- Tentam novamente se o elemento for destacado durante qualquer uma das verificações acima

### Forçando o Clique

Às vezes, aplicativos usam lógica não trivial onde passar o mouse sobre o elemento sobrepõe ele com outro elemento que intercepta o clique. Esse comportamento é indistinguível de um bug onde o elemento é coberto e o clique é despachado para outro lugar. Se você sabe que isso está acontecendo, você pode ignorar as verificações de acionabilidade e forçar o clique:

```javascript
await page.getByRole('button').click({ force: true });
```

### Clique Programático

Se você não estiver interessado em testar seu aplicativo sob condições reais e quiser simular o clique por qualquer meio possível, pode acionar o comportamento `HTMLElement.click()` simplesmente despachando um evento de clique no elemento com `locator.dispatchEvent()`:

```javascript
await page.getByRole('button').dispatchEvent('click');
```

### Digitação de Caracteres

**ATENÇÃO**: Na maioria das vezes, você deve inserir texto com `locator.fill()`. Veja a seção de Entrada de Texto acima. Você só precisa digitar caracteres se houver um manuseio especial do teclado na página.

Digite no campo caractere por caractere, como se fosse um usuário com um teclado real, com `locator.pressSequentially()`.

```javascript
// Pressione teclas uma por uma
await page.locator('#area').pressSequentially('Hello World!');
```

Este método emitirá todos os eventos de teclado necessários, com todos os eventos de `keydown`, `keyup`, `keypress` em vigor. Você pode até especificar o atraso opcional entre as pressões de teclas para simular o comportamento real do usuário.

### Teclas e Atalhos

```javascript
// Pressione Enter
await page.getByText('Submit').press('Enter');

// Despachar Control+Right
await page.getByRole('textbox').press('Control+ArrowRight');

// Pressione o símbolo de dólar no teclado
await page.getByRole('textbox').press('$');
```

O método `locator.press()` foca no elemento selecionado e produz uma única tecla pressionada. Ele aceita os nomes de teclas lógicas que são emitidos na propriedade `keyboardEvent.key` dos eventos de teclado:

Backquote, Minus, Equal, Backslash, Backspace, Tab, Delete, Escape, ArrowDown, End, Enter, Home, Insert, PageDown, PageUp, ArrowRight, ArrowUp, F1 - F12, Digit0 - Digit9, KeyA - KeyZ, etc.

Você pode alternativamente especificar um único caractere que gostaria de produzir, como "a" ou "#".
Os seguintes atalhos de modificação também são suportados: Shift, Control, Alt, Meta.
A versão simples produz um único caractere. Este caractere é sensível a maiúsculas e minúsculas, então "a" e "A" produzirão resultados diferentes.

```javascript
// <input id=name>
await page.locator('#name').press('Shift+A');

// <input id=name>
await page.locator('#name').press('Shift+ArrowLeft');
```

Atalhos como "Control+o" ou "Control+Shift+T" também são suportados. Quando especificado com o modificador, o modificador é pressionado e mantido enquanto a tecla subsequente é pressionada.

Observe que você ainda precisa especificar o A maiúsculo em Shift-A para produzir o caractere maiúsculo. Shift-a produz um minúsculo como se você tivesse ativado o CapsLock.

### Upload de Arquivos

Você pode selecionar arquivos de entrada para upload usando o método `locator.setInputFiles()`. Ele espera que o primeiro argumento aponte para um elemento de entrada com o tipo "file". Vários arquivos podem ser passados em um array. Se alguns dos caminhos dos arquivos forem relativos, eles serão resolvidos em relação ao diretório de trabalho atual. Array vazio limpa os arquivos selecionados.

```javascript
// Seleciona um arquivo
await page.getByLabel('Upload file').setInputFiles(path.join(__dirname, 'myfile.pdf'));

// Seleciona vários arquivos
await page.getByLabel('Upload files').setInputFiles([
  path.join(__dirname, 'file1.txt'),
  path.join(__dirname, 'file2.txt'),
]);

// Seleciona um diretório
await page.getByLabel('Upload directory').setInputFiles(path.join(__dirname, 'mydir'));

// Remove todos os arquivos selecionados
await page.getByLabel('Upload file').setInputFiles([]);

// Faz upload de buffer da memória
await page.getByLabel('Upload file').setInputFiles({
  name: 'file.txt',
  mimeType: 'text/plain',
  buffer: Buffer.from('this is test')
});
```

Se você não tiver o elemento de entrada em mãos (ele é criado dinamicamente), pode lidar com o evento `page.on('filechooser')` ou usar um método de espera correspondente à sua ação:

```javascript
// Começa a esperar pelo seletor de arquivos antes de clicar. Não use await.
const fileChooserPromise = page.waitForEvent('filechooser');
await page.getByLabel('Upload file').click();
const fileChooser = await fileChooserPromise;
await fileChooser.setFiles(path.join(__dirname, 'myfile.pdf'));
```

### Focar no Elemento

Para páginas dinâmicas que lidam com eventos de foco, você pode focar no elemento dado com `locator.focus()`.

```javascript
await page.getByLabel('Password').focus();
```

### Arrastar e Soltar

Você pode realizar a operação de arrastar e soltar com `locator.dragTo()`. Este método irá:

- Passar o mouse sobre o elemento que será arrastado.
- Pressionar o botão esquerdo do mouse.
- Mover o mouse para o elemento que receberá a queda.
- Soltar o botão esquerdo do mouse.

```javascript
await page.locator('#item-to-be-dragged').dragTo(page.locator('#item

-to-drop-at'));
```

### Arrastando Manualmente

Se você quiser controle preciso sobre a operação de arrastar, use métodos de nível mais baixo como `locator.hover()`, `mouse.down()`, `mouse.move()` e `mouse.up()`.

```javascript
await page.locator('#item-to-be-dragged').hover();
await page.mouse.down();
await page.locator('#item-to-drop-at').hover();
await page.mouse.up();
```

**NOTA**: Se sua página depende do evento `dragover` sendo despachado, você precisa de pelo menos dois movimentos do mouse para acioná-lo em todos os navegadores. Para emitir o segundo movimento do mouse de maneira confiável, repita seu `mouse.move()` ou `locator.hover()` duas vezes. A sequência de operações seria: passe o mouse sobre o elemento de arrastar, pressione o botão do mouse, passe o mouse sobre o elemento de soltar, passe o mouse sobre o elemento de soltar uma segunda vez, solte o botão do mouse.

### Rolagem

Na maioria das vezes, o Playwright rolará automaticamente para você antes de realizar qualquer ação. Portanto, você não precisa rolar explicitamente.

```javascript
// Rolagem automática para que o botão esteja visível
await page.getByRole('button').click();
```

No entanto, em casos raros, você pode precisar rolar manualmente. Por exemplo, você pode querer forçar uma "lista infinita" a carregar mais elementos ou posicionar a página para uma captura de tela específica. Nesse caso, a maneira mais confiável é encontrar um elemento que você deseja tornar visível na parte inferior e rolá-lo para a visualização.

```javascript
// Rola o rodapé para a visualização, forçando uma "lista infinita" a carregar mais conteúdo
await page.getByText('Footer text').scrollIntoViewIfNeeded();
```

Se você deseja controlar a rolagem de maneira mais precisa, use `mouse.wheel()` ou `locator.evaluate()`:

```javascript
// Posicione o mouse e role com a roda do mouse
await page.getByTestId('scrolling-container').hover();
await page.mouse.wheel(0, 10);

// Alternativamente, programe a rolagem de um elemento específico
await page.getByTestId('scrolling-container').evaluate(e => e.scrollTop += 100);
```