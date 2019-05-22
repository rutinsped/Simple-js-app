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

repository.forEach(function(property){
    if (property.height >= 2.0) {
              document.write("<p>" +property.name+" "+property.height+ " This one is really huge!" +"</p>");
          }
          else {
          document.write("<p>" +property.name+" "+property.height+ "</p>");
          }
  });
  