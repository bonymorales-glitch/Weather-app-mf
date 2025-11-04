interface SearchFormProps{
    inputSearch : React.RefObject<HTMLInputElement | null>;
    setCity: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm = ({inputSearch, setCity}: SearchFormProps) => {
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputSearch.current?.value.trim()) return;
    setCity(inputSearch.current.value.trim());
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
        <input
          ref={inputSearch}
          type="search"
          placeholder="Escribe la ciudad..."
          className="px-3 py-2 rounded-lg border border-amber-500 bg-amber-200 text-black placeholder-black"
        />
        <button className="cursor-pointer bg-white/80 text-black font-semibold px-4 py-2 rounded-xl shadow hover:bg-black hover:text-white transition-all duration-300">
          Consultar
        </button>
      </form>
  )
}

export default SearchForm
