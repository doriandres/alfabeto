export const languages = {};

function setUpVoices(){
    languages.spanish = speechSynthesis.getVoices().filter(v => v.lang === "es-MX").reverse().find(v => true)
}

speechSynthesis.onvoiceschanged = () => setUpVoices();

export function speak(text, voice, rate = 1, pitch = 1) {
    if (text && voice) {
        const utter = new SpeechSynthesisUtterance(text);        
        utter.voice = voice;
        utter.rate = rate;
        utter.pitch = pitch;
        speechSynthesis.speak(utter);        
    }
}

setUpVoices();

const vowels = [ "a", "e", "i", "o", "u" ];

const consonants = [ "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "ñ", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z" ];

const vowelsContainer = document.querySelector('.vowels');
vowels.forEach(vowel => {
    const vowelElement = document.createElement("th");
    vowelElement.textContent = vowel;
    vowelElement.setAttribute("class", "silabo");
    vowelElement.setAttribute("scope", "col")
    vowelsContainer.appendChild(vowelElement);
});

const consonantsContainer = document.querySelector('.consonants');
consonants.forEach(consonant => {
    const consonantRowElement = document.createElement("tr");
    const consonantElement = document.createElement("th");
    consonantElement.textContent = consonant;
    consonantElement.setAttribute("scope", "row");
    consonantRowElement.appendChild(consonantElement);
    vowels.forEach(vowel => {
        if(consonant === "q"){
            if(["a", "o", "u"].includes(vowel)){
                consonantRowElement.appendChild(document.createElement("th")); 
                return;
            }
            vowel = "u" + vowel;
        }
        

        const vowelElement = document.createElement("th");
        vowelElement.textContent = consonant+vowel;
        vowelElement.setAttribute("class", "silabo");
        consonantRowElement.appendChild(vowelElement);
    });
    consonantsContainer.appendChild(consonantRowElement);
});

[...document.querySelectorAll('.silabo')].forEach(silabo => {
    silabo.addEventListener('click', () => {
        speak(silabo.textContent, languages.spanish);
    });
})