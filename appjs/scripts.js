(function (){
  
  pokemonRepository = (function (){
    var repository = []
  
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  
    function add(pokemon) {
      repository.push(pokemon);
    }
  
    function getAll() {
      return repository;
    }
  
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }
  
    function loadDetails(pokemon) {
      var url = item.detailsUrl;
      return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          pokemon.imageUrl = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.types = Object.keys(details.types);
        })
        .catch(function (e) {
          console.error(e);
        });
    }
  
    return {
      add: add,
      getAll: getAll,
      loadList: loadList,
      loadDetails: loadDetails,
      //showDetails: showDetails
    }

  })();


  var $pokelist = document.querySelector('.pokelist');
 
  function showDetails(pokemon) {

    console.log(pokemon.name, pokemon.detailsUrl);
  }
 
  function addListItem(pokelist) {
    
    var pokemon = pokelist;
    var listItemElement = document.createElement('li');
    var btn = document.createElement("BUTTON");
    btn.innerText = pokemon.name;
 
    listItemElement.innerText = pokemon.name;
    listItemElement.appendChild(btn);

    btn.addEventListener ("click", function() {
      showDetails(pokemon);
    });
 
    $pokelist.appendChild(listItemElement);
  }
  
 
 // pokemonRepository.add(pokemon)
 
 // Calls the loadList function and then call the getAll function
 // to get all pokemons in the repository array inside the
 // pokemonRepository IIFE

  pokemonRepository.loadList().then(function() {

    var getAll = pokemonRepository.getAll();
    getAll.forEach(addListItem);
    
  });
 
 
 })();
 