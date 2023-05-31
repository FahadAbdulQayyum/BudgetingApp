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

const list = document.getElementById('list');
const totalBudgetDisplay = document.getElementById('totalBudgetDisplay');
const remainingBalanceDisplay = document.getElementById('remainingBalanceDisplay');


let totalBudgetAmount = 0;
let arr = [];

function arrayEnlist(arr){
    const iconMug = () => '<img id="mug" src="./icons/mug.png"/>'
    const iconBag = () => '<img id="bag" src="./icons/bag.png"/>'
    const iconGift = () => '<img id="gift" src="./icons/gift.png"/>'
    const iconCard = () => '<img id="card" src="./icons/card.png"/>'
    const bookMark = () => '<img id="mark" src="./icons/mark.png"/>'

    let posNum = arr.filter(v=>v.amount >= 0)
    let negNum = arr.filter(v=>v.amount < 0)

    console.log('posNum', posNum)
    console.log('negNum', negNum)
    
    let posArray = posNum.map(v=>v.amount)
    let negArray = negNum.map(v=>v.amount)
    
    console.log('posArray', posArray)
    console.log('negArray', negArray)

    

    remainingBalanceAmount = 0;

    // *******************
    totalBudgetDisplay.innerHTML = "<div id = 'totalDisplay'>"+ 'Balance: ' + "<h4>" + '$' + totalBudgetAmount + "</h4>" + "</div>"
    remainingBalanceDisplay.innerHTML = "<div id = 'totalDisplay'>"+ 'Remaining: ' + "<h4>" + '$' + remainingBalanceAmount + "</h4>" + "</div>"
    // *******************

    arr.forEach((v, i)=>{
    const icon = v.category === 'Restaurants & Cafe' ? iconMug() 
    : v.category === 'Clothes & Shopping' ? iconBag() 
    : v.category === 'Credit & Loans' ? iconCard()
    : v.category === 'Gifts Card' ? iconGift()
    : ''

    let li = document.createElement('li');
    li.innerHTML += "<div id='li'>" + "<div>" + icon + "</div>" + "<div>" + "<span>" + v.category + "</span>" + "<span>"  +  v.date + "</span>" + "</div>" + "<div id='rightmost'>" + "<span id='amountt'>" + '-$' + v.amount + "</span>" + "<span>" + bookMark() + "</span>" + "<span id='cancel'>" + '&times' + "</span>" + "</div>" + "</div>";
    list.appendChild(li);
    })
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

subBtnTtl.addEventListener('click', submitBudget)
subBtnForm.addEventListener('click',submitForm)