# Atividade React 4 - Gerenciador de Tarefas (Lifting State Up + useEffect)

App feita com React + Vite + Tailwind CSS em que vários componentes **compartilham estado via lifting state up**. Ela usa `useEffect` para dois efeitos colaterais: **atualizar o título da aba** do navegador e **contar o tempo** em que a página está aberta.

## Como rodar

```bash
npm install
npm run dev
```

## Estrutura

```
src/
├── components/
│   ├── Contador/
│   │   ├── ContadorDisplay.jsx    → Parte 1: irmão que mostra o valor
│   │   └── ContadorControles.jsx  → Parte 1: irmão com os botões
│   ├── Formulario/Formulario.jsx  → Filho 1: recebe a função onAdicionar
│   ├── Lista/Lista.jsx            → Filho 2: recebe o array de tarefas
│   ├── Resumo/Resumo.jsx          → mais um irmão que lê o mesmo estado
│   ├── Timer/Timer.jsx            → Parte 3: useEffect + setInterval + cleanup
│   └── Alert/ Badge/ Button/ Card/ Input/ Header/ Footer/  → biblioteca UI das atividades anteriores
├── App.jsx                        → componente pai: guarda o estado e o useEffect do título
├── main.jsx
└── index.css
```

## Partes do exercício

### Parte 1 - Refatorando o estado do filho para o pai

Na atividade anterior, o `Contador` tinha o próprio estado (`useState` dentro dele). Isso funciona enquanto só ele precisa do valor. Mas se outro componente precisar ler o mesmo número, o estado preso no filho não chega até ele.

**Antes:** o estado ficava dentro do filho.

```jsx
function Contador() {
  const [contador, setContador] = useState(0); // só este componente enxerga o valor
  ...
}
```

**Depois:** o estado subiu para o `App` e foi passado via props para dois componentes irmãos.

```jsx
// App.jsx (pai)
const [contador, setContador] = useState(0);

<ContadorDisplay valor={contador} />                       // recebe o DADO
<ContadorControles onAumentar={() => setContador(contador + 1)} ... />  // recebe as FUNÇÕES
```

O `ContadorDisplay` só mostra o valor, e o `ContadorControles` só avisa o pai quando há um clique. Os dois ficam sempre sincronizados porque leem a mesma fonte: o estado do `App`.

### Parte 2 - Gerenciador de tarefas

- O **App (pai)** guarda o estado `tarefas` e as funções `adicionarTarefa`, `alternarTarefa` e `removerTarefa`. Todas usam spread, `map` ou `filter`, sem mutar o estado.
- O **Formulario (filho 1)** recebe `onAdicionar` via props. Quando o usuário envia, ele chama a função e o evento sobe para o pai. Se o campo estiver vazio, mostra erro com borda vermelha.
- A **Lista (filho 2)** recebe o array `tarefas`, junto com `onAlternar` e `onRemover`, para marcar como concluída ou excluir.
- O **Resumo** é mais um irmão que recebe os totais calculados a partir do mesmo estado.
- O **useEffect** atualiza o título da aba com o número de pendentes, por exemplo "2 tarefas pendentes", e só roda de novo quando esse número muda (`[pendentes]`).

### Parte 3 - Timer com setInterval e cleanup

O `Timer` usa `useEffect` com array de dependências vazio (`[]`), então o `setInterval` é criado uma única vez, quando o componente aparece na tela. A cada segundo ele soma 1 com `setSegundos((anterior) => anterior + 1)`. No `return` do efeito está a **função de cleanup**, `clearInterval(intervalo)`, que para o timer quando o componente sai da tela e evita vazamento de memória e timers duplicados.

### Parte 4 - Reflexão abaixo.

## Reflexão

### O que acontece se omitirmos o array de dependências do `useEffect`?

O array de dependências diz ao React **quando** o efeito deve rodar:

| Forma | Quando o efeito roda |
|---|---|
| `useEffect(fn)`, **sem array** | Depois de **toda** renderização |
| `useEffect(fn, [])`, array vazio | Só uma vez, quando o componente é montado (e o cleanup roda quando ele é desmontado) |
| `useEffect(fn, [a, b])` | Na montagem e sempre que `a` ou `b` mudarem |

Sem o array, o efeito roda depois de **cada** renderização. Isso causa problemas:

- **Trabalho desnecessário:** no caso do título da aba, ele seria reescrito a cada render, mesmo quando o número de pendentes não mudou.
- **Loop infinito:** se o efeito atualizar um estado, por exemplo `setSegundos`, essa atualização causa uma nova renderização, que roda o efeito de novo, que atualiza o estado de novo, e assim por diante.
- **Timers e listeners duplicados:** no `Timer`, sem o array, um novo `setInterval` seria criado a cada segundo, porque cada atualização gera um render. Mesmo com o cleanup, o timer seria destruído e recriado o tempo todo. Sem o cleanup, os timers se acumulariam, o contador aceleraria e haveria vazamento de memória.

Por isso o array de dependências deve listar exatamente os valores usados dentro do efeito: o efeito roda só quando realmente precisa.

### Como funciona o fluxo de dados no lifting state up?

O React tem **fluxo de dados unidirecional**: os dados descem e os eventos sobem.

1. **O estado fica no ancestral comum mais próximo** de todos os componentes que precisam dele. Aqui é o `App`, que é pai do `Formulario`, da `Lista` e do `Resumo`.
2. **Os dados descem via props:** o `App` passa `tarefas` para a `Lista` e os totais para o `Resumo`. Os filhos só leem esses valores, não os alteram.
3. **Os eventos sobem via funções passadas como props:** o `App` passa `adicionarTarefa` para o `Formulario`. Quando o usuário envia o formulário, o filho chama `onAdicionar(texto)` e "avisa" o pai.
4. **O pai atualiza o estado** com `setTarefas`. O React re-renderiza o `App`, e todos os filhos recebem as novas props automaticamente. A `Lista`, o `Resumo` e o título da aba ficam sincronizados.

```
                 App (estado: tarefas)
         ┌──────────┼───────────────┐
  onAdicionar ↑   tarefas ↓     totais ↓
    Formulario      Lista          Resumo
```

Assim existe **uma única fonte da verdade**: os irmãos nunca se comunicam diretamente, sempre passam pelo pai. Isso deixa o app previsível e fácil de depurar.
