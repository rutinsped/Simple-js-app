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

/* Using what learned to make the loop and testing if it's working properly.*/

for (var i = 0; i < repository.length; i++) {
        var pokemon = repository[i];

        if (pokemon.height >= 2.0) {
            document.write("<p>" +pokemon.name+ +pokemon.height+ " This one is really huge!" +"</p>");
        }
        else {
        document.write("<p>" +pokemon.name+ +pokemon.height+ "</p>");
        }
}