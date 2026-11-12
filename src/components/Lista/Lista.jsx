import clsx from 'clsx';
import Button from '../Button/Button';

// Filho 2: recebe o array de tarefas do pai e as funções para avisar quando algo muda
function Lista({ tarefas, onAlternar, onRemover }) {
  if (tarefas.length === 0) {
    return (
      <div className="rounded-xl bg-white p-5 text-center text-gray-500 shadow-md">
        Nenhuma tarefa cadastrada. Adicione uma no formulário.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 rounded-xl bg-white shadow-md">
      {tarefas.map((tarefa) => (
        <li key={tarefa.id} className="flex items-center justify-between gap-3 p-4">
          <label className="flex flex-1 cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={tarefa.concluida}
              onChange={() => onAlternar(tarefa.id)}
              className="h-5 w-5 accent-green-600"
            />
            <span className={clsx(tarefa.concluida ? 'text-gray-400 line-through' : 'text-gray-900')}>
              {tarefa.texto}
            </span>
          </label>
          <Button size="sm" variant="danger" onClick={() => onRemover(tarefa.id)}>
            Remover
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Lista;
