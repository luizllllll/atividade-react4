import clsx from 'clsx';

const cores = {
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  red: 'bg-red-100 text-red-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  gray: 'bg-gray-300 text-gray-800',
};

function Badge({ children, color = 'blue' }) {
  return (
    <span className={clsx('inline-block rounded-full px-3 py-1 text-xs font-semibold', cores[color])}>
      {children}
    </span>
  );
}

export default Badge;
