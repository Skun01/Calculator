const historyScreenElem = document.querySelector('.history-screen');
const inputScreenElem = document.querySelector('.input-screen');
const btnSectionElem = document.querySelector('.btn-section');

const backspaceBtnElem = btnSectionElem.querySelector('#backspace');
const equalElem = btnSectionElem.querySelector('#equal')

const typeElem = inputScreenElem.querySelector('.typing');
let userInput = '';

btnSectionElem.addEventListener('click', e=>{
    if([...e.target.classList].includes('row') || e.target === btnSectionElem) return;
    if(userInput.length >= 39) alert('Full');
    else{
        userInput += e.target.textContent;
        typeElem.textContent = userInput;
    }
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
