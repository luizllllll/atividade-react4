import Button from '../Button/Button';

// Componente irmão 2: não tem estado próprio. Só avisa o pai quando o usuário clica (eventos sobem)
function ContadorControles({ onDiminuir, onZerar, onAumentar }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 rounded-xl bg-white p-6 shadow-md">
      <Button variant="danger" onClick={onDiminuir}>
        - Diminuir
      </Button>
      <Button variant="secondary" onClick={onZerar}>
        Zerar
      </Button>
      <Button variant="success" onClick={onAumentar}>
        + Aumentar
      </Button>
    </div>
  );
}

export default ContadorControles;
