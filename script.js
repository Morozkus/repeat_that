'use strict'

const score = document.querySelector('#score');
const red = document.querySelector('#game__item_red');
const blue = document.querySelector('#game__item_blue');
const green = document.querySelector('#game__item_green');
const colors = ['1', '2', '3', '4', '5', '6', '7', '8', '9']; // Для функции рандома
let max = 0;
let step = 0;


const first = document.querySelector('#one')
const second = document.querySelector('#two')
const third = document.querySelector('#three')
const four = document.querySelector('#four')
const five = document.querySelector('#five')
const six = document.querySelector('#six')
const seven = document.querySelector('#seven')
const eight = document.querySelector('#eight')
const nine = document.querySelector('#nine')
const object = {
    '1': first,
    '2': second,
    '3': third,
    '4': four,
    '5': five,
    '6': six,
    '7': seven,
    '8': eight,
    '9': nine
}

const colorList = []; // Целевые цвета
const colorListPlayer = []; // Цвета, которые выбирает игрок

const gameItem = document.querySelectorAll('.game__item');

const btn = document.querySelector('#btn');
btn.addEventListener('click', firstStep)

function addColor(e) {
    colorListPlayer.push(e.target.textContent)

    for (let i = 0; i < colorListPlayer.length; i++) {
        if (colorListPlayer[i] !== colorList[i]) {
            return error()
        }
    }

    e.target.classList.add('click')
    setTimeout(() => {
        e.target.classList.remove('click')

    }, 200)

    if (colorListPlayer.length == colorList.length) {
        computerStep()
        colorListPlayer.length = 0;
    }


}

function computerStep() {
    gameItem.forEach(el => {
        el.removeEventListener('click', addColor)
    })

    const computer = getRndInteger(0, max)

    colorList.push(colors[computer])
    console.log(colorList);

    step++
    score.textContent = `Раунд: ${step}`
    setTimeout(() => {
        active(colorList)
    }, 500);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function error() {
    colorList.length = 0;
    colorListPlayer.length = 0;
    step = 0
    computerStep()
}

function firstStep() {
    dif()
    computerStep()

    gameItem.forEach(el => {
        el.addEventListener('click', addColor)
    })

    btn.classList.add('none')
}

function active(color) {
    const array = [...color];
    object[array[0]].classList.add('active')
    setTimeout(() => {
        document.querySelectorAll('.active').forEach(el => {
            el.classList.remove('active');
        })
    }, 700);

    setTimeout(() => {
        array.shift()

        if (array.length) active(array)
        else {
            gameItem.forEach(el => {
                el.addEventListener('click', addColor)
            })
        }
    }, 1000)
};

function dif() {
    const dificult = document.querySelector('.radio:checked').value
    if (dificult === '1') {
        const activeted = [...document.querySelectorAll('.easy')]
        activeted.forEach(el => {
            el.classList.remove('hidden')
        })
        max = 2
    }
    else if (dificult === '2') {
        const activeted = [...document.querySelectorAll('.easy'), ...document.querySelectorAll('.medium')]
        activeted.forEach(el => {
            el.classList.remove('hidden')
        })
        max = 5
    }
    else if (dificult === '3') {
        const activeted = [...document.querySelectorAll('.easy'), ...document.querySelectorAll('.medium'), ...document.querySelectorAll('.hard')]
        activeted.forEach(el => {
            el.classList.remove('hidden')
        })
        max = 8
    }

    document.querySelector('.exp').classList.add('hidden')
}