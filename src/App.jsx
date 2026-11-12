import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ContadorDisplay from './components/Contador/ContadorDisplay';
import ContadorControles from './components/Contador/ContadorControles';
import Formulario from './components/Formulario/Formulario';
import Lista from './components/Lista/Lista';
import Resumo from './components/Resumo/Resumo';
import Timer from './components/Timer/Timer';

function App() {
  // ===== Parte 1: estado do contador "subiu" do filho para o pai =====
  const [contador, setContador] = useState(0);

  // ===== Parte 2: o pai guarda a lista de tarefas e passa para os filhos =====
  const [tarefas, setTarefas] = useState([
    { id: 1, texto: 'Ler o enunciado da atividade', concluida: true },
    { id: 2, texto: 'Estudar lifting state up', concluida: false },
    { id: 3, texto: 'Praticar useEffect', concluida: false },
  ]);

  function adicionarTarefa(texto) {
    const nova = { id: Date.now(), texto, concluida: false };
    setTarefas([...tarefas, nova]);
  }

  function alternarTarefa(id) {
    setTarefas(
      tarefas.map((tarefa) => (tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa))
    );
  }

  function removerTarefa(id) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

  const pendentes = tarefas.filter((tarefa) => !tarefa.concluida).length;
  const concluidas = tarefas.length - pendentes;

  // useEffect: sincroniza o título da aba do navegador (sistema externo) com o estado.
  // Só roda de novo quando o número de pendentes muda.
  useEffect(() => {
    if (pendentes === 0) {
      document.title = 'Tudo feito! ✓';
    } else if (pendentes === 1) {
      document.title = '1 tarefa pendente';
    } else {
      document.title = `${pendentes} tarefas pendentes`;
    }
  }, [pendentes]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header titulo="Gerenciador de Tarefas" />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-8">
        <section>
          <h2 className="mb-1 text-2xl font-bold text-gray-800">Parte 1 - Contador com lifting state up</h2>
          <p className="mb-4 text-sm text-gray-500">
            O estado fica no App. O display recebe o valor e os controles recebem as funções.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <ContadorDisplay valor={contador} />
            <ContadorControles
              onDiminuir={() => setContador(contador - 1)}
              onZerar={() => setContador(0)}
              onAumentar={() => setContador(contador + 1)}
            />
          </div>
        </section>

        <section>
          <h2 className="mb-1 text-2xl font-bold text-gray-800">Parte 2 e 3 - Gerenciador de tarefas</h2>
          <p className="mb-4 text-sm text-gray-500">
            Veja o título da aba do navegador mudar conforme as tarefas pendentes.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-4">
              <Formulario onAdicionar={adicionarTarefa} />
              <Timer />
            </div>
            <div className="flex flex-col gap-4 md:col-span-2">
              <Resumo total={tarefas.length} pendentes={pendentes} concluidas={concluidas} />
              <Lista tarefas={tarefas} onAlternar={alternarTarefa} onRemover={removerTarefa} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
