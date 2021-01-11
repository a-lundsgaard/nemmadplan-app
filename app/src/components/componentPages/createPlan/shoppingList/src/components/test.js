const { reject } = require("lodash");

const str = 'skyllede, afdryppede røde kidneybønner (ca. 240 g)'


function matchBest(array) {
    console.log(array);
    console.log(array.length);

    let last = array.pop();
    console.log(array);
    console.log(array.length);
    if (last.match(/\d|\(|\)/)) {
        console.log('Matched expr')
        return matchBest(array);
    } else {
        console.log('Found best word : ' + last);
        return last
    }
}



function matchBest(array) {
    console.log(array);
    console.log(array.length);

    //let last = array.pop();
    console.log(array);
    let i = array.length;
    while (i--) {
        if (!array[i].match(/\d|\(|\)/)) {
            return array[i];
        }
    }
}

console.log(str.match(/[a-zA-Z\u00C0-\u00ff]{4,20}/g))

/*const ingredientSplit = str.split(' ');
const simpleIngredient = matchBest2(ingredientSplit);

console.log('FOUND SIMPLE INGREDIENT: ' + simpleIngredient);*/



