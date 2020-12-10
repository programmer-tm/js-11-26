'use strict';

let text = document.querySelector('span').innerText;
const button = document.querySelector('button');
button.addEventListener("click", (event) => {
    const spText = text.split(' ');
    let modifiedText = '';
    const regex = /^'|'(?=\W)/g;
    for (let i = 0; i < spText.length; i++) {
        const element = spText[i];
        let newElement = element.replace(regex, '"');
        modifiedText += newElement + ' ';
    }
    document.querySelector('span').textContent = modifiedText;
});