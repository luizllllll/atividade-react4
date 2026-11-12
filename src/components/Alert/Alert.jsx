import clsx from 'clsx';

const variantes = {
  success: 'bg-green-100 text-green-800 border-green-500',
  error: 'bg-red-100 text-red-800 border-red-500',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
};

const titulos = {
  success: 'Sucesso!',
  error: 'Erro!',
  warning: 'Atenção!',
};

function Alert({ variant = 'success', children }) {
  return (
    <div role="alert" className={clsx('rounded-lg border-l-4 p-4', variantes[variant])}>
      <strong className="mr-1">{titulos[variant]}</strong>
      {children}
    </div>
  );
}

export default Alert;
