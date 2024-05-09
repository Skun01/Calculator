const historyScreenElem = document.querySelector('.history-screen');
const inputScreenElem = document.querySelector('.input-screen');
const btnSectionElem = document.querySelector('.btn-section');

const backspaceBtnElem = btnSectionElem.querySelector('#backspace');
const equalBtnElem = btnSectionElem.querySelector('#equal');
const acBtnElem = btnSectionElem.querySelector('#ac');

const typeElem = inputScreenElem.querySelector('.typing');
let userInput = '', history = '';

const mapBtn = {
    1 : "one",
    2 : "two",
    3 : "three",
    4 : "four",
    5 : "five",
    6 : "six",
    7 : "seven",
    8 : "eight",
    9 : "nine",
    0 : "zero",
    "." : "dot",
    "+" : "plus",
    "-" : "minus",
    "*" : "multiply",
    "/" : "divide",
    Backspace : "backspace",
    Enter : "equal",
    "(" : "open-par",
    ")" : "close-par",
}

btnSectionElem.addEventListener('click', e=>{
    if(![...e.target.classList].includes('display-btn')) return;
    if(userInput.length >= 39) alert('Full');
    else{
        userInput += e.target.textContent;
        typeElem.textContent = userInput;
    }
});

acBtnElem.addEventListener('click', e=>{
    userInput = '';
    history = '';
    typeElem.textContent = '';
    historyScreenElem.textContent = '';
});

backspaceBtnElem.addEventListener('click', e=>{
    if(userInput.length > 0){
        const tmp = [...userInput];
        tmp.pop();
        userInput = tmp.join('');
        typeElem.textContent = userInput;
    }
});

equalBtnElem.addEventListener('click', e=>{
    const infixEx = seperExpression(userInput);
    console.log(infixEx);
});

document.body.addEventListener('keydown', e=>{
    if(mapBtn[e.key] !== undefined){
        console.log(mapBtn[e.key]);
        const elem = document.querySelector(`#${mapBtn[e.key]}`);
        elem.dispatchEvent(new Event('click', {bubbles: true}));
    }
});

function seperExpression(str){
    const ans = [];
    const regex = /[\+\-\*\/]/g;
    let curr = '';
    for(let i = 0; i < str.length; i++){
        if(regex.test(str[i])){
            if(curr){
                ans.push(curr);
                curr = '';
            }
            ans.push(str[i]);
        }else curr += str[i];
    }
    if(curr) ans.push(curr);
    return ans;
}
