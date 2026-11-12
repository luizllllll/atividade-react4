function Card({ titulo, descricao, imagem, children }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-md transition-shadow hover:shadow-lg">
      {imagem && <img src={imagem} alt={titulo} className="mb-3 w-full rounded-md" />}
      <h2 className="mb-2 text-xl font-bold text-gray-900">{titulo}</h2>
      <p className="text-gray-600">{descricao}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default Card;
