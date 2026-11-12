import clsx from 'clsx';

function Input({ label, type = 'text', placeholder, value, onChange, error }) {
  return (
    <label className="flex flex-col gap-1">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          'rounded-lg border px-3 py-2 outline-none focus:ring-2',
          error
            ? 'border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
        )}
      />
      {error && <span className="text-sm text-red-600">{error}</span>}
    </label>
  );
}

export default Input;
