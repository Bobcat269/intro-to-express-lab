const express = require('express')
const app = express();
const PORT = 3000;
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


function randomBoi(n){
    return Math.floor(Math.random()*n)
}

function isNumber(str) {
    return !isNaN(str)
}
app.get('/', (req, res) => {
    res.render('home.ejs')
});

app.get('/greetings/:name', (req,res) =>{
    res.send(`Good Afternoon ${req.params.name}, everything is going extremely well.`)
})

app.get('/roll/:num', (req,res) =>{
    if(isNumber(req.params.num)) {
        console.log(req.params.num)
       console.log(Number.isInteger(req.params.num));       
        req.params.num++ //increment once to include the max.  Seemed more elegant than adjusting the random function
        res.send(`You rolled a ${randomBoi((req.params.num))}`)
    } else {
        console.log(typeof (req.params.num));
        res.send('You must specify a number.')    
    }
})
    //Something to do with passing a number as a string was making Number.isNaN not work.  
    //Passed the string to a function and did !isNaN(str) and that works!?  
    //One day I will understand why this is the case, but it is not this day.

//     let x = 1
//    console.log(Number.isNaN('cat'));
//    console.log(Number.isNaN('1'));
//    console.log(Number.isNaN(1));
//    console.log(Number.isNaN(x));

// console.log(Number.isInteger(1));
// console.log(Number.isInteger(x));
// console.log(Number.isInteger('cat'));


app.get('/collectibles/:item', (req,res) =>{

    if (req.params.item >= collectibles.length) {
        res.send('This item is not yet in stock. Check back soon!')
    } else {
    // console.log(collectibles);
    let item = collectibles[req.params.item]
    // console.log(collectibles[req.params.item]);
    res.send(`So you want the ${item.name}? For ${item.price} it can be yours!`)
    }
})


app.get('/shoes', (req,res) => {

let shoeRack = shoes

//kept getting errors when the parameters were min-price and max-price.  Changed them to camelcase.
shoeRack.forEach(shoe => {
    if(shoe.price < req.query.minPrice){
        shoeRack.splice(shoe.index,1)
    }
    if(shoe.price > req.query.maxPrice){
        shoeRack.splice(shoe.index,1)
    }
    if(shoe.type != req.query.type){
        shoeRack.splice(shoe.index,1)
    }   
    
});

// const shoeFilterMin = shoes.filter((shoe) => shoe.price > req.query.min-price)
// const shoeFilterMax = shoeFilterMin.filter((shoe) => shoe.price < req.query.max-price)
// const shoeFilterType = shoeFilterMax.filter((shoe) => shoe.type === req.query.type)

res.send(shoeRack)
}
)



//There has to be a better way to do this than making an if else loop for all of these.  But for now we test the concept.


app.listen(PORT);