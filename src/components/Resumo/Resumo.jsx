import Badge from '../Badge/Badge';

// Filho 3: mais um irmão que lê o mesmo estado (a lista de tarefas) vindo do pai
function Resumo({ total, pendentes, concluidas }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-xl bg-white p-4 shadow-md">
      <Badge color="blue">Total: {total}</Badge>
      <Badge color="yellow">Pendentes: {pendentes}</Badge>
      <Badge color="green">Concluídas: {concluidas}</Badge>
    </div>
  );
}

export default Resumo;
