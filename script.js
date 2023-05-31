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


let validate = false;
let totalBudgetAmount = 0;
let remainingBalanceAmount = 0;
let compareAmount = 0;
let arr = [];

function arrayEnlist(arr){
    const iconMug = () => '<img id="mug" src="./icons/mug.png"/>'
    const iconBag = () => '<img id="bag" src="./icons/bag.png"/>'
    const iconGift = () => '<img id="gift" src="./icons/gift.png"/>'
    const iconCard = () => '<img id="card" src="./icons/card.png"/>'
    const bookMark = () => '<img id="mark" src="./icons/mark.png"/>'

    let posNum = arr.filter(v=>v.amount >= 0)
    let negNum = arr.filter(v=>v.amount < 0)

    let posArray = posNum.map(v=>v.amount)
    let negArray = negNum.map(v=>v.amount)
    
    console.log('posArray', posArray)
    console.log('negArray', negArray)

    let posRed = posArray.reduce((a,b)=> +a + +b,0)
    let negRed = negArray.reduce((a,b)=> +a + +b,0)

    console.log('posRed', posRed)
    console.log('negRed', negRed)

    remainingBalanceAmount = +totalBudgetAmount - (posRed + negRed);

    // *******************
    totalBudgetDisplay.innerHTML = "<div id = 'totalDisplay'>"+ 'Balance: ' + "<h4>" + '$' + totalBudgetAmount + "</h4>" + "</div>"
    remainingBalanceDisplay.innerHTML = "<div id = 'totalDisplay'>"+ 'Remaining: ' + "<h4>" + '$' + remainingBalanceAmount + "</h4>" + "</div>"
    // *******************

    list.innerHTML = ""

    arr.forEach((v, i)=>{
    const icon = v.category === 'Restaurants & Cafe' ? iconMug() 
    : v.category === 'Clothes & Shopping' ? iconBag() 
    : v.category === 'Credit & Loans' ? iconCard()
    : v.category === 'Gifts Card' ? iconGift()
    : ''

    let li = document.createElement('li');
    li.innerHTML += "<div id='li'>" + "<div>" + icon + "</div>" + "<div>" + "<span>" + v.category + "</span>" + "<span>"  +  v.date + "</span>" + "</div>" + "<div id='rightmost'>" + "<span id='amountt'>" + '-$' + v.amount + "</span>" + "<span>" + bookMark() + "</span>" + "<span id='cancel' onClick='clickCancel(" + i + ")'>" + '&times' + "</span>" + "</div>" + "</div>";
    list.appendChild(li);
    })
}

function clickCancel(i){
    console.log('i', i)
    arr.splice(i, 1)

    arrayEnlist(arr)
}

function submitBudget(){
    totalBudgetAmount = totalBudget.value;
    console.log('totalBudgetAmount',totalBudgetAmount)
    
    firstContainer.style.display = 'none'
    secondContainer.style.display = 'block'
    thirdContainer.style.display = 'none'
}

function submitForm(e){
    e.preventDefault();

    if(validate){
        console.log('Yes, it is valid!')

        let obj = {
            amount: amount.value,
            desc: desc.value,
            category: select.value,
            date: date.value
        }
        
        console.log('totalBudgetAmount',totalBudgetAmount)
        console.log('obj',obj)

        arr.push(obj)

        firstContainer.style.display = 'none'
        secondContainer.style.display = 'none'
        thirdContainer.style.display = 'block'

        arrayEnlist(arr);
    }

    console.log('invalidate')
}

function openSecondContainer(){
    amount.value = ''
    desc.value = ''
    select.value = ''
    date.value = ''

    secondContainer.style.display = 'block';
}

function validation(){

    let inp = small.parentElement;
    let input = inp.querySelector('input') 

    small.style.display = 'none'

    console.log('remainingAmount, totalBudget', +remainingBalanceAmount>1, totalBudgetAmount)
    compareAmount = +remainingBalanceAmount > 1 ? +remainingBalanceAmount : +totalBudgetAmount
    if(+amount.value === 0){
        small.style.display = 'block'
        small.style.color = 'red'
        input.style.boxShadow = '1px 1px 5px 1px red'
        validate = false
        return small.innerText = `Input should be greater than zero.`
    }
    else if(+amount.value > compareAmount){
        small.style.display = 'block'
        small.style.color = 'red'
        input.style.boxShadow = '1px 1px 5px 1px red'
        validate = false
        return small.innerText = `Your input is exceeding than ${compareAmount}`
    }else {
        small.style.display = 'block'
        small.style.color = 'green'
        input.style.boxShadow = '1px 1px 5px 1px green'
        validate = true
        return small.innerText = `Your input is considerable`
    }
}

subBtnTtl.addEventListener('click', submitBudget)
amount.addEventListener('input', validation)
subBtnForm.addEventListener('click',submitForm)
addAgain.addEventListener('click', openSecondContainer)