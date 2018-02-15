let showInfo = $('#showInfo');

function pokeSubmit() {
  $('#showInfo').empty();
  
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
          let flavor;
          console.log(pokemonPlus.flavor_text_entries);
          for(let i = 0; i < pokemonPlus.flavor_text_entries.length; i++){
            if ( pokemonPlus.flavor_text_entries[i].language.name === 'en') {
              flavor = pokemonPlus.flavor_text_entries[i].flavor_text;
            }
          }

          plus = `<div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <table class="table">
                        <tbody>
                          <tr>  
                            <th scope="row">Habitat</th>
                            <td>${pokemonPlus.habitat.name}</td>
                          </tr>
                          <tr>  
                            <th scope="row">Generation</th>
                            <td>${pokemonPlus.generation.name}</td>
                          </tr>
                          <tr>  
                            <th scope="row">Description</th>
                            <td>${pokemonPlus.flavor}</td>
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

// function pokeSubmit(){
//   var param = document.getElementById("pokeInput").value;
//   var pokeURL = "http://pokeapi.co/api/v1/pokemon/" + param;

//   $.getJSON(pokeURL, function(data){
//       console.log(data);
//       console.log(JSON.stringify(data, null, "  "));

//   });
// }
