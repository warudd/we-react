import { usePokemonListStore } from "../../store/pokemonList";
import SearchForm from "../../components/SearchForm";
import PokemonCard from "../../components/PokemonCard";
import ReactLoading from "react-loading";

const homePage = () => {
  const { pokemon , fetchPokemon } = usePokemonListStore(); //เอา pokemonList มาแสดง

  return (
    <div className="w-[90%] m-[auto] max-w-[1100px]">
      <div className="flex justify-center">
        <img
          src="/images/logo.webp"
          className="max-h-[80px] mt-[20px]"
          alt=""
        ></img>
      </div>
      <SearchForm />
      {fetchPokemon.loading && ( //ถ้า fetch ข้อมูลยังไม่มาจะแสดง loading
        <div className="h-[600px] flex justify-center items-center">
          <ReactLoading type="spin" color="#fff" />
        </div>
      )}
      {!fetchPokemon.loading && ( //ถ้า fetch ข้อมูลมาแล้วจะแสดง PokemonCard
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-[20px] mt-[40px] justify-center">
          {pokemon.data?.map((item) => {
            return (
              <PokemonCard
                image={item.image || ""} //อาจจะมีค่าเป็น undefined value
                name={item.name}
                id={item.id}
                types={item.types}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default homePage;
