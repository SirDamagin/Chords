let notes = ["Ab","A","Bb","B","C","Db","D","Eb","E","F","Gb","G"]
let modes = ["Δ","m","","Ø"]
let number = []
let chordplace = document.querySelector(".chord");
let nextchordplace = document.querySelector(".nextchord");
let checkbox9 = document.querySelector(".checkbox9")
let checkbox11 = document.querySelector(".checkbox11")
let checkbox13 = document.querySelector(".checkbox13")
let next = FirstChord();
let slider = document.querySelector(".slider")
let tempovalue = document.querySelector(".tempovalue")
let generateButton = document.querySelector(".generateButton")
let intervalId,tickId = 0;
let tick = new Audio("tick.mp3")
let tempoToSec = 4000

slider.addEventListener("input",SliderUpdate)
tempovalue.addEventListener("input",SliderUpdate2)
generateButton.addEventListener("click",Randomization)

function FirstChord()
{
    let l = AddNumbers();
    let x = Math.floor(Math.random()*12)
    let y = Math.floor(Math.random()*4)
    let z = Math.floor(Math.random()*l)
    return notes[x] + modes[y] + number[z]
}

function RandomChord()
{
    chordplace.innerHTML = next
    let l = AddNumbers();
    let x = Math.floor(Math.random()*12)
    let y = Math.floor(Math.random()*4)
    let z = Math.floor(Math.random()*l)
    next = notes[x] + modes[y] + number[z]
    nextchordplace.innerHTML = next
}

function AddNumbers()
{       
    while(number.length != 0)
    {
        number.pop();
    }

    number.push("7")

    if(checkbox9.checked == true)
    {
        number.push("9");
    } 

    if(checkbox11.checked == true)
    {
        number.push("11");
    } 

    if(checkbox13.checked == true)
    {
        number.push("13");
    } 

    return number.length
}

function Randomization()
{
    // Check che il valore inserito dall'user per il tempo 
    // nella textbox sia compreso tra 60 e 240

    if(tempovalue.value<60)
    {
        tempovalue.value = 60
        tempoToSec = 4000
    }
    else if(tempovalue.value>240)
    {
        tempovalue.value = 240
        tempoToSec = 1000
    }

    if(generateButton.innerHTML == "Random Chords")
    {
        RandomChord() 
        tick.cloneNode().play()
        // Necessario perche set interval aspetta i secondi e poi inizia
        // Non inizia immediatamente quando lo starti
        tickId = setInterval(()=>{tick.cloneNode().play()},tempoToSec/4)
        intervalId = setInterval(RandomChord,tempoToSec) 
        generateButton.innerHTML = "Stop Chords"
    }
    else
    {
        clearInterval(intervalId)
        clearInterval(tickId)
        generateButton.innerHTML = "Random Chords"
        chordplace.innerHTML = ""
        nextchordplace.innerHTML = ""
    }
    
}

function SliderUpdate()
{
    tempovalue.value = slider.value
    tempoToSec = 1/(slider.value/60)*1000*4
}

function SliderUpdate2()
{
    tempoToSec = 1/(tempovalue.value/60)*1000*4
    slider.value = tempovalue.value
}