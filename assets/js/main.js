const historyScreenElem = document.querySelector('.history-screen');
const inputScreenElem = document.querySelector('.input-screen');
const btnSectionElem = document.querySelector('.btn-section');

const backspaceBtnElem = btnSectionElem.querySelector('#backspace');
const equalBtnElem = btnSectionElem.querySelector('#equal');
const acBtnElem = btnSectionElem.querySelector('#ac');

const typeElem = inputScreenElem.querySelector('.typing');
let userInput = '', history = '';

btnSectionElem.addEventListener('click', e=>{
    if([...e.target.classList].includes('row')) return;
    switch(e.target){
        case backspaceBtnElem:
        case equalBtnElem:
        case acBtnElem:
            return;
    }
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
    e.preventDefault();
    if(userInput.length > 0){
        const tmp = [...userInput];
        tmp.pop();
        userInput = tmp.join('');
        typeElem.textContent = userInput;
    }
});

equalBtnElem.addEventListener('click', e=>{
    
});
