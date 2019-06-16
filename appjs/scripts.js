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
      var url = pokemon.detailsUrl;
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
      }

  })();

  var $pokelist = document.querySelector('.pokelist');
  var $modalContainer = document.querySelector('#modal-container');



  function showDetails(pokemon) {

    //check in the browser console to see the pokemons you click on.
    console.log('First pokemon details',pokemon)

     // you pass the pokemon clicked to the loadDetails
     pokemonRepository.loadDetails(pokemon)
     .then(function() {
      var modal    = document.createElement('div');
      var image    = document.createElement('img');
      var name     = document.createElement('h1');
      var height   = document.createElement('p');
      var types    = document.createElement('p');
      var closeBtn = document.createElement('button');
      var exist    = $modalContainer.querySelector('#modal-container');
       //uncomment this code and continue with the rest. ask me when you are stuck
       console.log('Second pokemon details',pokemon)
     });
 
   }

   function addListItem(pokelist) {

    var pokemon = pokelist;
    var listItemElement = document.createElement('li');
    var btn = document.createElement("BUTTON");
    btn.innerText = pokemon.name;

    //listItemElement.innerText = pokemon.name; no need to put the
    // name inside the li element any more since the button displays
    // it well

    listItemElement.appendChild(btn);

    btn.addEventListener ("click", function() {
      showDetails(pokemon);
    });

    $pokelist.appendChild(listItemElement);
  }

  (function () {
    var dialogPromiseReject;

    function showModal(title, text) {
      $modalContainer.innerHTML = '';
      
      var modal = document.createElement('div');
      modal.classList.add('modal');
      
      var closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);
      
      var titleElement = document.createElement('h1');
      titleElement.innerText = title;
      
      var contentElement = document.createElement('p');
      contentElement.innerText = text;
      
      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      $modalContainer.appendChild(modal);
      
      $modalContainer.classList.add('is-visible');
    }
    
    function hideModal() {
      $modalContainer.classList.remove('is-visible');
      
      if (dialogPromiseReject) {
        dialogPromiseReject();
        dialogPromiseRejct = null;
      }
    }
    
    function showDialog(title, text) {
      showModal(title, text);

      var modal =  $modalContainer.querySelector('.modal');
      
      var confirmButton = document.createElement('button');
      confirmButton.classList.add('modal-confirm');
      confirmButton.innerText = 'Confirm';
      
      var cancelButton = document.createElement('button');
      cancelButton.classList.add('modal-cancel');
      cancelButton.innerText = 'Cancel';
      
      modal.appendChild(confirmButton);
      modal.appendChild(cancelButton);
      
      
      
     confirmButton.focus();
      
      return new Promise((resolve, reject) => {
        cancelButton.addEventListener('click', hideModal);
        confirmButton.addEventListener('click', () => {
          dialogPromiseReject = null; 
          hideModal();
          resolve();
        });
      
        dialogPromiseReject = reject;
      });
    }
  
    
    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('Modal title', 'This is the modal content!');
    });
    
    document.querySelector('#show-dialog').addEventListener('click', () => {
      showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
        alert('confirmed!');
      }, () => {
        alert('not confirmed');
      });
    }); 
      
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
    
 // pokemonRepository.add(pokemon)
 
 // Calls the loadList function and then call the getAll function
 // to get all pokemons in the repository array inside the
 // pokemonRepository IIFE

  pokemonRepository.loadList().then(function() {

    var pokemons = pokemonRepository.getAll();
    console.log(pokemons)
    pokemons.forEach(addListItem);
    
  });
  
 })();

 
