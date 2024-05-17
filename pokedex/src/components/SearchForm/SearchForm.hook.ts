import React, { useEffect } from "react";
import { pokemonListServices, pokemonDetailServices } from "../../../services";
import { usePokemonListStore } from "../../store/pokemonList";
import { useForm } from "react-hook-form";
import { generationList } from "../../../utils/optionList";
import { IPokemonDetailResponse } from "interface/pokemonDetail";

const useSearchForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const keyword = watch("keyword");
  const generation = watch("generation");
  const type = watch("type");
  const sort = watch("sort");

  //setFetch คือเราจะเอา data มาใช้ทุกครั้งเป็น data หลัก
  //setPokemonList สามารถเพิ่ม/ลดจำนวนได้แล้วแต่การ Filter
  const { setFetchPokemonList, fetchPokemon, setPokemonList } =
    usePokemonListStore();

  const callData = async (filter: {
    name: string;
    limit: number;
    offset: number;
  }) => {
    setFetchPokemonList({ data: [], loading: true, error: null });
    const responseList = await pokemonListServices.getPokemonList(
      filter.limit,
      filter.offset
    );
    const pokeList = [];

    if (responseList.status === 200) {
      const responseResult = responseList.data?.results || [];
      for (const pokemon of responseResult) {
        const response = await pokemonDetailServices.getPokemonDetail(
          pokemon.name
        );
        const pokeData = response.data;
        if (pokeData) {
          pokeList.push({
            ...pokeData,
            image:
              pokeData.sprites.other.dream_world.front_default ||
              pokeData.sprites.other["official-artwork"].front_default,
          });
        }
      }
      setFetchPokemonList({ data: pokeList, loading: false, error: null }); //หลังจาก Fetch ได้ pokeList แล้วให้เอามา Filter ด้วย
      const data = filterPokemon(pokeList, keyword, type, sort); //ก่อนจะ set ลง pokemonList ที่แสดงจะต้อง filter ก่อนแสดง
      setPokemonList({ data: data, loading: false, error: null });
    } else {
      setFetchPokemonList({
        data: [],
        loading: false,
        error: responseList.error,
      });
    }
  };

  const filterPokemon = (
    pokeList: IPokemonDetailResponse[],
    keyword: string,
    type: string,
    sort: "id" | "name"
  ) => {
    const keywordFilter = pokeList.filter((item) =>
      item.name.toLowerCase().includes(keyword?.toLowerCase())
    );
    const typeFilter =
      type !== "all types"
        ? keywordFilter.filter((item) =>
            item.types.find((f) =>
              f.type.name.toLowerCase().includes(type.toLowerCase())
            )
          )
        : keywordFilter;

    return sortBy(typeFilter, sort);
  };
  const sortBy = (data: IPokemonDetailResponse[], type: "id" | "name") => {
    switch (type) {
      case "id":
        return data.sort((a, b) => a.id - b.id); // a.id : number (- คือเครืื่องหมาย Check type)
      case "name":
        return data.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        ); // ถ้า a.name เป็น String ต้องเช็คเครื่องหมายเอง
      default:
        return data.sort((a, b) => a.id - b.id); //ถ้าไม่ใช่ก็จะกลับมาเรียงตาม id
    }
  };

  useEffect(() => {
    if (generation !== undefined) {
      //จังหวะที่เปลี่ยน generation ก็ต้องให้ข้อมูล Filter ด้วย
      callData(generationList[generation]);
    }
  }, [generation]);

  useEffect(() => {
    const data = filterPokemon(fetchPokemon.data, keyword, type, sort); //เรียกใช้ฟังก์ชัน filterPokemon ตามที่ keyword, type, sort เปลี่ยนแปลง
    setPokemonList({ data: data, loading: false, error: null }); // หลังจากได้ data มาจะมา set ลงตัวที่เก็บ pokemonList เพื่อแสดงผลที่ผ่านการ filter (set ลงตัวที่โชว์)
  }, [keyword, type, sort]);

  return {
    fieldKeyWord: register("keyword"),
    fieldGeneration: register("generation"),
    fieldType: register("type"),
    fieldSort: register("sort"),
  };
};
export { useSearchForm };
