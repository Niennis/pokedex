let showInfo = $('#showInfo');

function pokeSubmit() {
  $('#showInfo').empty();
  $('#moreInfo').empty();
  
  fetch('https://pokeapi.co/api/v2/pokemon/?limit=949')
    .then(function(response) {
      //Turns the the JSON into a JS object
      return response.json();
    })
    .then(function(data) {
      let pokeInput = $("#pokeInput").val();
      console.log(pokeInput);
      for (var i = 0; i < data.results.length; i++){
        if (pokeInput === data.results[i].name){    
          let pokeInfo = data.results[i].url ;
          fetch(pokeInfo).then(function(result) {
            return result.json();
          })
          .then(function(pokemon) {
            let pokeData = '';
            let types = [];
            for(let i = 0; i < pokemon.types.length; i++){
              types.push(pokemon.types[i].type.name.capitalize());
            }
              
            pokeData = `<div class="row pokeContainer">
            <div class="col-lg-6 col-md-6 offset-lg-5 offset-md-5 col-sm-12 col-xs-12">  
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row"><h2 id="pokeName">${pokemon.name.capitalize()}</h2></th>
                    <td><img src="${pokemon.sprites.front_default}" alt=""></td>
                  </tr>
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
  });
  fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=802').then(function(moreResponse) {
    return moreResponse.json();
  })
  .then(function(moreData) {
    let pokeInput = $("#pokeInput").val();
    for (var i = 0; i < moreData.results.length; i++){
      if (pokeInput === moreData.results[i].name){    
        let pokeMoreInfo = moreData.results[i].url ;
        fetch(pokeMoreInfo).then(function(result) {
          return result.json();
        })
        .then(function(pokemonPlus) {
          let plus = '';
          let flavor = '';
          for(let i = 0; i < 5; i++){
            if ( pokemonPlus.flavor_text_entries[i].language.name === 'en') {
              flavor = pokemonPlus.flavor_text_entries[i];          
            }
          }
          plus = `<div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <table class="table">
                        <tbody>
                          <tr>  
                            <th scope="row">Habitat</th>
                            <td>${pokemonPlus.habitat.name.capitalize()}</td>
                          </tr>
                          <tr>  
                            <th scope="row">Generation</th>
                            <td>${pokemonPlus.generation.name.capitalize()}</td>
                          </tr>
                          <tr>  
                            <th scope="row">About</th>
                            <td>${flavor.flavor_text}</td>
                          </tr>                
                        </tbody>
                      </table>
                      </div></div>`
          $('#moreInfo').append(plus);
        })    
      };  
    }
  });
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}