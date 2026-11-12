import { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

// Filho 1: recebe a função onAdicionar do pai via props.
// O texto digitado é um estado local, porque só o formulário precisa dele.
function Formulario({ onAdicionar }) {
  const [texto, setTexto] = useState('');
  const [erro, setErro] = useState('');

  function handleSubmit(evento) {
    evento.preventDefault();

    if (texto.trim() === '') {
      setErro('Digite o nome da tarefa.');
      return;
    }

    onAdicionar(texto.trim()); // evento sobe para o App
    setTexto('');
    setErro('');
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 rounded-xl bg-white p-5 shadow-md">
      <h2 className="text-xl font-bold text-gray-900">Nova tarefa</h2>
      <Input
        label="Tarefa"
        placeholder="Ex.: Estudar useEffect"
        value={texto}
        onChange={(e) => {
          setTexto(e.target.value);
          setErro('');
        }}
        error={erro}
      />
      <Button type="submit" variant="primary">
        Adicionar tarefa
      </Button>
    </form>
  );
}

export default Formulario;
