
const historyScreenElem = document.querySelector('.history-screen');
const inputScreenElem = document.querySelector('.input-screen');
const btnSectionElem = document.querySelector('.btn-section');

const backspaceBtnElem = btnSectionElem.querySelector('#backspace');
const equalBtnElem = btnSectionElem.querySelector('#equal');
const acBtnElem = btnSectionElem.querySelector('#ac');

const typeElem = inputScreenElem.querySelector('.typing');
let userInput = '', history = '';
const mapBtn = {
    1 : "one",2 : "two",3 : "three",4 : "four",5 : "five",6 : "six",7 : "seven",8 : "eight",
    9 : "nine",0 : "zero", "." : "dot", "+" : "plus", "-" : "minus", "*" : "multiply", "/" : "divide",
    Backspace : "backspace", Enter : "equal", "(" : "open-par", ")" : "close-par",
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
    const postfix = toPostfix(infixEx);
    let result = postfixCalc(postfix);
    if(isNaN(result)){
        alert('bạn nhập không đúng biểu thức, bạn bị ngu à');
        return;
    }else{
        history = userInput;
        userInput = result + "";
        typeElem.textContent = userInput;
        historyScreenElem.textContent = history;
    }
    
});

document.body.addEventListener('keydown', e=>{
    if(mapBtn[e.key] !== undefined){
        const elem = document.querySelector(`#${mapBtn[e.key]}`);
        elem.dispatchEvent(new Event('click', {bubbles: true}));
        elem.classList.add('btn-active');
    }
});
document.body.addEventListener('keyup', e=>{
    if(mapBtn[e.key] !== undefined){
        const elem = document.querySelector(`#${mapBtn[e.key]}`);
        elem.dispatchEvent(new Event('click', {bubbles: true}));
        elem.classList.remove('btn-active');
    }
});
const operatorRegEx = ['+', '-', '*', '/', '(', ')'];
function seperExpression(str){
    const ans = [];
    let curr = '';
    for(let i = 0; i < str.length; i++){
        if(operatorRegEx.includes(str[i])){
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
const priorityOperator = {
    '*':1,
    '/':1,
    '+':2,
    '-':2,
}

function toPostfix(infix, obj = {start : 0}){
    let result = [];
    const oper = [];
    while(obj.start < infix.length){
        if(infix[obj.start] === '('){
            obj.start++;
            const anotherExpress = toPostfix(infix, obj);
            result = [...result, ...anotherExpress];
        }else if(infix[obj.start] === ')'){
            break;
        }else{
            if(operatorRegEx.includes(infix[obj.start])){
                if(oper.length !== 0 && priorityOperator[oper[oper.length - 1]] < priorityOperator[infix[obj.start]]){
                    result.push(oper.pop());
                }
                oper.push(infix[obj.start]);
            }else result.push(infix[obj.start]);
        }
        obj.start++;
    }
    while(oper.length !== 0){
        result.push(oper.pop());
    }
    return result;
}

function calcCustom(a, b, oper){
    let ans = 0;
    switch(oper){
        case '+': ans = a + b; break;
        case '-': ans = a - b; break;
        case '*': ans = a*b; break;
        case '/': ans = a/b;
    }
    return +ans.toFixed(4);
}

function postfixCalc(postfix){
    const stack = [];
    for(let i = 0; i < postfix.length; i++){
        if(operatorRegEx.includes(postfix[i])){
            let secondElem = stack.pop(), firstElem = stack.pop();
            stack.push(calcCustom(firstElem,secondElem, postfix[i]));
        }else{
            stack.push(+postfix[i]);
        }
    }
    return stack.pop();
}
