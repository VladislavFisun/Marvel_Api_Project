
import { useHttp } from "../hooks/http.hook";

const useMarvelService=()=>{

  const{error,request,loading,clearError} = useHttp()
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey ='apikey=978e26dd2ad8925b8eb29d6b89e0793e'
    const _CharacterOffset = 210
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
      getCharacter
    }
}

export default useMarvelService
