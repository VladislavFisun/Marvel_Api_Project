
import { useHttp } from "../hooks/http.hook";

const useMarvelService=()=>{

  const{error,request,loading,clearError} = useHttp()
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey ='apikey=978e26dd2ad8925b8eb29d6b89e0793e'
    const _CharacterOffset = 240
    // const getResource = async(url)=>{
        
    //     let res = await fetch(url)
    //     if(!res.ok){
    //         throw new Error ('Error')
    //     }
    //     return await res.json()
    // }
    const getAllCharacters= async(offset=_CharacterOffset)=>{
      const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
      return res.data.results.map(_transformCharacter)
    }
    const getCharacter= async (id)=>{
      const res = await request(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=978e26dd2ad8925b8eb29d6b89e0793e`)
      return _transformCharacter(res.data.results[0]);
    }
    const getAllComics = async(offset=_CharacterOffset)=>{
      const res = await request(`https://gateway.marvel.com:443/v1/public/comics?orderBy=modified&limit=8&offset=${offset}&apikey=978e26dd2ad8925b8eb29d6b89e0793e`)
        return res.data.results.map(_transformComics)
    }
   
    const getComics= async (id)=>{
      const res = await request(`https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=978e26dd2ad8925b8eb29d6b89e0793e`)
      return _transformComics(res.data.results[0]);
    }

    

    const showArr =(id)=>{
      console.log(getComics(id))
    }
    const _transformComics=(comics)=>{
      return{
        id: comics.id,
        title: comics.title,
        description: comics.description || "There is no description",
        pageCount: comics.pageCount
          ? `${comics.pageCount} p.`
          : "No information about the number of pages",
        thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
        language: comics.textObjects[0]?.language || "en-us",
        // optional chaining operator
        price: comics.prices[0].price
          ? `${comics.prices[0].price}$`
          : "not available",
      }

    }
         
    const _transformCharacter=(char)=>{
    
        
    return {
      comics:char.comics.items,
      id:char.id,
    name:char.name,
     description:char.description ,
    thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
    homePage:char.urls[0].url,
    wiki:char.urls[1].url
    }
    }
    return{
      loading,
      error,
      clearError,
      getAllCharacters,
      getCharacter,
      getAllComics,
      getComics,
      showArr
    }
}

export default useMarvelService
