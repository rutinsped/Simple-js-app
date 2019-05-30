(function (){pokemonRepository = (function ()
  {
  var repository = [{ name: "Bulbasaur",
  height: 0.7,
  types: [ "Grass", "Poison" ]},
 
  { name: "Venusaur",
  height: 2.0,
  types: [ "Grass", "Poison" ]},
 
  { name: "Butterfree",
  height: 1.1,
  types: [ "Bug", "Flying" ]},

  { name: "Poliwrath",
  height: 1.3,
  types: [ "Water", "Fighting" ]},

  { name: "Nidoking",
  height: 1.4,
  types: [ "Poison", "Ground" ]}]

  function add(pokemon) {
    repository.push(pokemon);
  }
 
  function getAll() {
    return repository;
  }
 
  return {
    add: add,
    getAll: getAll
  }
  })();
 
  var pokemon = { name: "Arbok",
  height: 3.5,
  types: [ "Poison" ]};
 
  var getAll= pokemonRepository.getAll();
  var $pokelist = document.querySelector('.pokelist');
 
  function showDetails(pokemon) {
    var pokemon = pokemon.name;
    console.log(pokemon, name);
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
 
 
  pokemonRepository.add(pokemon)
 
  getAll.forEach(addListItem);
 
 
  })();