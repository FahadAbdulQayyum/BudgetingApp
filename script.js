// All important ids imported
const firstContainer = document.getElementById('first-container');
const secondContainer = document.getElementById('second-container');
const thirdContainer = document.getElementById('third-container');
const subBtnTtl = document.getElementById('subBtnTtl');
const subBtnForm = document.getElementById('subBtnForm');
const totalBudget = document.getElementById('totalBudget');
const amount = document.getElementById('amount');
const desc = document.getElementById('desc');
const select = document.getElementById('select');
const date = document.getElementById('date');

const addAgain = document.getElementById('addAgain');
const small = document.getElementById('small');

const list = document.getElementById('list');
const totalBudgetDisplay = document.getElementById('totalBudgetDisplay');
const remainingBalanceDisplay = document.getElementById('remainingBalanceDisplay');

// Form validation boolean is used
let validate = false;
// Total budget amount to store for display and calculating other functionalities
let totalBudgetAmount = 0;
// Remaining amount to store to display and calculating other functionalities
let remainingBalanceAmount = 0;
// Comparison used for validating the form's amount and deciding upon which to redirect or not to next page
let compareAmount = 0;
// Array used for collecting all objectified data
let arr = [];

// Enlisting function
function arrayEnlist(arr){
    // Different icons with the img src link
    const iconMug = () => '<img id="mug" src="./icons/mug.png"/>'
    const iconBag = () => '<img id="bag" src="./icons/bag.png"/>'
    const iconGift = () => '<img id="gift" src="./icons/gift.png"/>'
    const iconCard = () => '<img id="card" src="./icons/card.png"/>'
    const bookMark = () => '<img id="mark" src="./icons/mark.png"/>'

    // Filtering object with positive number
    let posNum = arr.filter(v=>v.amount >= 0)
    // Filtering object with negative number
    let negNum = arr.filter(v=>v.amount < 0)

    // Mapping only the positive amount array
    let posArray = posNum.map(v=>v.amount)
    // Mapping only the negative amount array
    let negArray = negNum.map(v=>v.amount)
    
    // Reducing positive array mean summing them
    let posRed = posArray.reduce((a,b)=> +a + +b,0)
    // Reding negative array mean summing them
    let negRed = negArray.reduce((a,b)=> +a + +b,0)

    // Calculating the remaining amount
    remainingBalanceAmount = +totalBudgetAmount - (posRed + negRed);

    // Displaying the total Budget entered by user
    totalBudgetDisplay.innerHTML = "<div id = 'totalDisplay'>"+ 'Balance: ' + "<h4>" + '$' + totalBudgetAmount + "</h4>" + "</div>"
    // Display the remaining amount after calculation
    remainingBalanceDisplay.innerHTML = "<div id = 'totalDisplay'>"+ 'Remaining: ' + "<h4>" + '$' + remainingBalanceAmount + "</h4>" + "</div>"

    // Emptying the 'li' to avoid dual data recycling of list
    list.innerHTML = ""

    // Displaying the list using forEach
    arr.forEach((v, i)=>{
    // Icons identified/used based on their category
    const icon = v.category === 'Restaurants & Cafe' ? iconMug() 
    : v.category === 'Clothes & Shopping' ? iconBag() 
    : v.category === 'Credit & Loans' ? iconCard()
    : v.category === 'Gifts Card' ? iconGift()
    : ''

    // Creating 'li'
    let li = document.createElement('li');
    // Appending the list each iteration
    li.innerHTML += "<div id='li'>" + "<div>" + icon + "</div>" + "<div>" + "<span>" + v.category + "</span>" + "<span>"  +  v.date + "</span>" + "</div>" + "<div id='rightmost'>" + "<span id='amountt'>" + '-$' + v.amount + "</span>" + "<span>" + bookMark() + "</span>" + "<span id='cancel' onClick='clickCancel(" + i + ")'>" + '&times' + "</span>" + "</div>" + "</div>";
    // Appending 'li' to list 
    list.appendChild(li);
    })
}

// Function used when user click the 'Cancel' or times button
function clickCancel(i){
    // Respective list is removed from the array and updated
    arr.splice(i, 1)

    // Updated array is again enlisted by sending them to arrayEnlist function
    arrayEnlist(arr)
}

// This function is firstContainer when user enters the Budget Amount
function submitBudget(){
    // Assigning budget amount
    totalBudgetAmount = totalBudget.value;
    
    // Currently secondContainer is to only display
    firstContainer.style.display = 'none'
    secondContainer.style.display = 'block'
    thirdContainer.style.display = 'none'
}

// After filling the form for adding expense this function is executed
function submitForm(e){
    e.preventDefault();

    // if form's validation is true then process proceeds otherwise does not
    if(validate){
        let obj = {
            amount: amount.value,
            desc: desc.value,
            category: select.value,
            date: date.value
        }
        
        // Obj is pushed to array
        arr.push(obj)

        // Only thirdContainer to display
        firstContainer.style.display = 'none'
        secondContainer.style.display = 'none'
        thirdContainer.style.display = 'block'

        // Enlist the array
        arrayEnlist(arr);
    }
}

// When user wants to add expense by clicking the button, this function executes
function openSecondContainer(){
    amount.value = ''
    desc.value = ''
    select.value = ''
    date.value = ''

    // Second Container display which has form for adding expense
    secondContainer.style.display = 'block';
}

// function for validating the form
function validation(){

    // Calling the small's parentElement
    let inp = small.parentElement;
    // then getting the input's tag for executing some functionalities
    let input = inp.querySelector('input') 

    // Initially small tag to be invisible to avoid user's distraction
    small.style.display = 'none'

    // Assigning to 'compareAmount' a value by applying following's condition
    compareAmount = +remainingBalanceAmount > 1 ? +remainingBalanceAmount : +totalBudgetAmount
    // If user enters 0
    if(+amount.value === 0){
        small.style.display = 'block'
        small.style.color = 'red'
        input.style.boxShadow = '1px 1px 5px 1px red'
        validate = false
        return small.innerText = `Input should be greater than zero.`
    }
    // If user enter a over budget amount
    else if(+amount.value > compareAmount){
        small.style.display = 'block'
        small.style.color = 'red'
        input.style.boxShadow = '1px 1px 5px 1px red'
        validate = false
        return small.innerText = `Your input is exceeding than ${compareAmount}`
    }
    // If valid amount is entered by user
    else {
        small.style.display = 'block'
        small.style.color = 'green'
        input.style.boxShadow = '1px 1px 5px 1px green'
        validate = true
        return small.innerText = `Your input is considerable`
    }
}

// firstContainer Budget amount when entered and button is pressed
subBtnTtl.addEventListener('click', submitBudget)
// Form's amount validation is to be performed when user inputs
amount.addEventListener('input', validation)
// When user submit the add expense form
subBtnForm.addEventListener('click',submitForm)
// When user wants to add expense by pressing button
addAgain.addEventListener('click', openSecondContainer)