// Componente irmão 1: só MOSTRA o valor que recebe do pai via props (dados descem)
function ContadorDisplay({ valor }) {
  return (
    <div className="rounded-xl bg-white p-6 text-center shadow-md">
      <p className="text-sm font-medium text-gray-500">Valor atual</p>
      <p className="text-5xl font-bold text-gray-900">{valor}</p>
    </div>
  );
}

export default ContadorDisplay;
