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
    types: [ "Bug", "Flying" ]}]
    
    
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
    
    pokemonRepository.add(pokemon)
    
    getAll.forEach(function(property){
      if (property.height >= 2.0) {
                document.write("<p>" +property.name+" "+property.height+ " This one is really huge!" +"</p>");
            }
            else {
            document.write("<p>" +property.name+" "+property.height+ "</p>");
            }
             });
    
    pokemonRepository();
    })();
    