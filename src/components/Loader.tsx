const Loader = () => {
  const hour = new Date().getHours();
  return (
    <div
      className={`flex ${
        hour < 18 ? 'border-yellow-400' : 'border-indigo-500'
      } flex-col items-center gap-4`}
    >
      <div className="w-10 h-10 border-4  border-t-transparent rounded-full animate-spin"></div>
      <p className="text-black/90 text-2xl">Cargando Informacion hacerca del clima ...</p>
      <img src="./img/nube-sol.png" alt="Clima" />
    </div>
  );
};
export default Loader;