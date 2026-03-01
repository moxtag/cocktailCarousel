//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('button').addEventListener('click', getDrink)

function getDrink () {

    let drink = formatDrink(document.querySelector('input').value)
    let list = document.querySelector('ul')
    list.innerText = ''

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + drink)
    .then(res => res.json()) // parse response as JSON
    .then(data => {

      console.log(data)
    
      // TODO - CREATE CAROUSEL BROUGHT UP BY SEARCH

      let item = data.drinks[0]
      document.querySelector('h2').innerText = `\n${item.strDrink}`
      document.querySelector('img').src = `${item.strDrinkThumb}`
      document.querySelector('h3').innerText = `\n${item.strInstructions}`

      let ingredients = getIngredients(item)

      ingredients.forEach(item => {
        let insert = document.createElement('li')
        list.append(insert)
        insert.innerText = item
      })
 
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

// get rid of extra spaces in drink name
function formatDrink (str) {
    return str.split(' ').filter(word => word).join(' ')
}

// make array of ingredients and their measures
function getIngredients (obj) {
    const list = filterOutNull(obj, 'strIngredient')
    const amount = filterOutNull(obj, 'strMeasure')

    return amount.reduce((items, curr, index) => {
        items[index] = `${curr}${items[index]}`
        return items
    }, list)
}

// return an array of properties with values with a given property name
function filterOutNull (obj, term) {
    return Object.keys(obj).filter(prop => 
        prop.startsWith(term) &&
        obj[prop] !== null)
        .map(key => obj[key])
}