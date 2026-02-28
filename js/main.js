//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('button').addEventListener('click', getDrink)

function getDrink () {

    let drink = formatDrink(document.querySelector('input').value)

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drink)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

      console.log(data)
    
      // TODO - CREATE CAROUSEL BROUGHT UP BY SEARCH

      let item = data.drinks[0]
      document.querySelector('h2').innerText = `\n${item.strDrink}`
      document.querySelector('img').src = `${item.strDrinkThumb}`
      document.querySelector('h3').innerText = `\n${item.strInstructions}`

      // TO DO - INSERT INGREDIENTS AND INGREDIENTS AS WELL
 
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

function formatDrink (str) {
    return str.split(' ').filter(word => word).join(' ')
}