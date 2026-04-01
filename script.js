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
let intervalId = 0;

SliderUpdate();

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
    if(generateButton.innerHTML == "Random Chords")
    {
        RandomChord() 
        // Necessario perche set interval aspetta i secondi e poi inizia
        // Non inizia immediatamente quando lo starti
        intervalId = setInterval(RandomChord,1/(slider.value/60)*1000*4) 
        generateButton.innerHTML = "Stop Chords"
    }
    else
    {
        clearInterval(intervalId)
        generateButton.innerHTML = "Random Chords"
        chordplace.innerHTML = ""
        nextchordplace.innerHTML = ""
    }
    
}

function SliderUpdate()
{
    setInterval(()=>{tempovalue.innerHTML = slider.value},10)
}