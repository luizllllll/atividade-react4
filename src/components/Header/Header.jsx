function Header({ titulo }) {
  return (
    <header className="bg-gray-900 p-6 text-center">
      <h1 className="text-3xl font-bold text-cyan-400">{titulo}</h1>
    </header>
  );
}

export default Header;
