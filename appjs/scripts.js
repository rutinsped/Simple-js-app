/* Seting the repository for var. Selecting three pokemon figure. Seting the names, height and types of pokemons.
then build the repository*/


var repository = [{ name: "Bulbasaur", 
height: 0.7, 
types: [ "Grass", "Poison" ]},

{ name: "Venusaur",
height: 2.0, 
types: [ "Grass", "Poison" ]},

{ name: "Butterfree",
height: 1.1, 
types: [ "Bug", "Flying" ]}]

var pokemon = respository[i];

/* Using what learned to make the loop and testing if it's working properly.*/

for (var i = 0; i < repository.length; i++) {
        
        document.write("pokemon.name: ", i, repository[i])
        
        if (repository[i].height === 2.0) {
                document.write("<p>" +pokemon.name+"This one is really huge!" +"</p>");
                }
              
                else {
                document.write("<p>Here they are!</p>");
                }
}
