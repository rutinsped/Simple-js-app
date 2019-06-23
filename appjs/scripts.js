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
    
    // When called loads the list of pokemons from the API
    // to the repository variable.
    function loadList() {
        return fetch(apiUrl).then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
    }
  
    function loadDetails(pokemon) {     
      var url = pokemon.detailsUrl;
      return fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (details) {
          pokemon.imageUrl = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.types = details.types.map(pokemon => pokemon.type.name); 
        })
        .catch(function (e) {
          console.log(e);
        });
    }
  
    // to access any method, function or variable
    // in the function it has to be returned.
    return {
      add: add,
      getAll: getAll,
      loadList: loadList,
      loadDetails: loadDetails,
    }

  })();
  // pokeRepository Function.

  // We first call the loadlist fuction
  // and call the addListItem function 
  // passing each pokemon to it.
  pokemonRepository.loadList().then(function(){
    var pokemons = pokemonRepository.getAll()
    pokemons.forEach(addListItem);
  });


  var $pokelist = document.querySelector('.pokelist');
  var $modalContainer = document.querySelector('#modal-container');

  // addListItem takes the pokemons and creates
  // a list element and a button for each.
  // Then creates a click event for each button
  // when then calls the showDetails function
  // passing it the pokemon.
  function addListItem(pokemon) {
    var listItemElement = document.createElement('li');
    var btn = document.createElement("BUTTON");
    btn.innerText = pokemon.name;
    
    listItemElement.appendChild(btn);

    btn.addEventListener ("click", function() {
      showDetails(pokemon);
    });

    $pokelist.appendChild(listItemElement);
  }

  /* The showDetails recieves the pokemon
      and then passes it to the loadDetails
      function
  */
  function showDetails(pokemon) {
   pokemonRepository.loadDetails(pokemon)
    .then(function() {
      var modal = document.createElement('div');
      var image = document.createElement('img');
      var h1 = document.createElement('h1');
      var height = document.createElement('p');
      var types = document.createElement('p');
      var closeBtn = document.createElement('button');
      var exist = $modalContainer.querySelector('.modal');

      pokemon.types.map(type => {
        var span = document.createElement('span');
            span.innerText = type;
          return types.appendChild(span);
        
      });
      
      if (exist) {
        $modalContainer.removeChild(exist);
      }

      $modalContainer.appendChild(modal);
      $modalContainer.classList.add('is-visible')
    
      modal.classList.add('modal');
      image.classList.add('pokemon-img');
      types.classList.add('pokemon-types');
      closeBtn.classList.add('modal-close');
      h1.classList.add('h1');
      height.classList.add('height')
      h1.innerText   = pokemon.name;
      height.innerText = 'Height - ' + pokemon.height;
      closeBtn.innerText = 'Close';
      image.setAttribute('src',pokemon.imageUrl);
      closeBtn.addEventListener('click', hideModal);
      
      modal.appendChild(h1);
      modal.appendChild(closeBtn);
      modal.appendChild(types);
      modal.appendChild(image);
      modal.appendChild(height);

      });
  }
    
  
  function hideModal() {
    $modalContainer.classList.remove('is-visible');
  };   
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });
  
  $modalContainer.addEventListener('click', (e) => {
    
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  }); 
     
 })();

 
