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

function arrayEnlist(){
    arr.forEach((v, i)=>{
        let li = document.createElement('li');
        // li.innerHTML += v.amount +' --- ' + v.category;
        li.innerHTML += "<div>" + "<div>" + "<img src='' />" + "</div>" + "<div>" + "<p>" + v.category + "</p>" + "<span>" + v.date + "</span>" + "</div>" + "<div>" + v.amount + "</div>" + "</div>";
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