function pokeSubmit() {
  $('#showInfo').empty();
  $('#moreInfo').empty();  
  let pokeInput = $("#pokeInput").val();  
//   Promise.all([fetch("flower.jpg"), fetch("chair.jpg")]).then((results)=>{
//     results[1]
// }).catch((falloTodo)=>{
// });
  async function pokedex(){
    let pokeData = '';
    let types = [];
    let depiction = '';
    try{
      let results = await Promise.all([fetch("https://pokeapi.co/api/v2/pokemon/?limit=949"), fetch("https://pokeapi.co/api/v2/pokemon-species/?limit=802")]);
      
      let pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=949");
      let dataPkmn = await pokemon.json();

      let pokemonSp = await fetch("https://pokeapi.co/api/v2/pokemon-species/?limit=802");
      let dataPkmnSp = await pokemonSp.json();  
      
      for (var i = 0; i < data.results.length; i++){
        let pokeInput = $("#pokeInput").val();  
  
        if (pokeInput === data.results[i].name){    
          let pokeInfo = data.results[i].url ;
          fetch(pokeInfo).then(function(result) {
            return result.json();
          })
          .then(function(pokemon) {
            let pokeData = '';
            let types = [];
            for(let i = 0; i < pokemon.types.length; i++){
              types.push(pokemon.types[i].type.name);
            }
              
            pokeData = `<div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">            
              <h2 id="pokeName">${pokemon.name}</h2>
              <img src="${pokemon.sprites.front_default}" alt="">
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row">ID</th>
                    <td>${pokemon.id}</td>
                  </tr>
                  <tr>
                    <th scope="row">Types</th>
                    <td>${types}</td>
                  </tr>                   
                  <tr>  
                    <th scope="row">Height</th>
                    <td>${pokemon.height}</td>
                  </tr>
                  <tr>  
                    <th scope="row">Weight</th>
                    <td>${pokemon.weight}</td>
                  </tr>
                  <tr>  
                    <th scope="row">Base experience</th>
                    <td>${pokemon.base_experience}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>`
              showInfo.append(pokeData);
        })
      }
    } 
      
    }catch(error){
      
    }
  }
  pokedex();
}

