class MarvelService{
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey ='apikey=978e26dd2ad8925b8eb29d6b89e0793e'
    getResource = async(url)=>{
        
        let res = await fetch(url)
        if(!res.ok){
            throw new Error ('Error')
        }
        return await res.json()
    }
    getAllCharacters= async()=>{
      const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=200&${this._apiKey}`)
      return res.data.results.map(this._transformCharacter)
    }
    getCharacter= async (id)=>{
      const res = await this.getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=978e26dd2ad8925b8eb29d6b89e0793e`)
      return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter=(char)=>{
    
        
    return {
    name:char.name,
     description:char.description ,
    thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
    homePage:char.urls[0].url,
    wiki:char.urls[1].url
    }
    }
}

export default MarvelService
