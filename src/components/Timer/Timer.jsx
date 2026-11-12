import { useEffect, useState } from 'react';

function formatarTempo(totalSegundos) {
  const minutos = String(Math.floor(totalSegundos / 60)).padStart(2, '0');
  const segundos = String(totalSegundos % 60).padStart(2, '0');
  return `${minutos}:${segundos}`;
}

// Parte 3: conta há quanto tempo a página está aberta
function Timer() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    // Cria o timer UMA vez, quando o componente aparece na tela (array de dependências vazio)
    const intervalo = setInterval(() => {
      // Atualização com função: sempre usa o valor mais recente do estado
      setSegundos((anterior) => anterior + 1);
    }, 1000);

    // Cleanup: roda quando o componente sai da tela, para o timer não continuar rodando
    // (sem isso haveria vazamento de memória e vários timers ao mesmo tempo)
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="rounded-xl bg-gray-900 p-4 text-center shadow-md">
      <p className="text-sm text-gray-400">Página aberta há</p>
      <p className="font-mono text-3xl font-bold text-cyan-400">{formatarTempo(segundos)}</p>
    </div>
  );
}

export default Timer;
