const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const inputOriginal = document.getElementById('input-original');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');
const cifrarBtn = document.getElementById('cifrar-btn'); 
const descifrarBtn = document.getElementById('descifrar-btn'); 

cifrarBtn.addEventListener('click', () => {
    submit(true); 
});

descifrarBtn.addEventListener('click', () => {
    submit(false); 
});

const shifMessage = (cipher) => {
    const wordArray = [...inputOriginal.value]; 
    printChar(0, wordArray, cipher);
}

const printChar = (currentLetterIndex, wordArray, cipher) => {
    if (currentLetterIndex >= wordArray.length) {
        return;
    }
    const charSinCodificar = wordArray[currentLetterIndex];
    const spanChar = document.createElement("span");
    resultado.appendChild(spanChar);
    animateChar(spanChar)
        .then(() => {
            const isUpperCase = charSinCodificar === charSinCodificar.toUpperCase();
            const index = alfabeto.indexOf(charSinCodificar.toUpperCase()); 
            spanChar.innerHTML = index !== -1 ? 
                (cipher ?
                    alfabeto[(index + parseInt(rango.value)) % alfabeto.length] :
                    alfabeto[(index - parseInt(rango.value) + alfabeto.length) % alfabeto.length]) :
                charSinCodificar;
            if (!isUpperCase) {
                spanChar.innerHTML = spanChar.innerHTML.toLowerCase(); 
            }
            printChar(currentLetterIndex + 1, wordArray, cipher);
        });
}

const animateChar = spanChar => {
    let cambiosDeLetra = 0;
    return new Promise(resolve => {
        const intervalo = setInterval(() => {
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambiosDeLetra++;
            if (cambiosDeLetra === 3) {
                clearInterval(intervalo);
                resolve();
            }
        }, 50);
    });
}

const submit = (cipher) => {
    resultado.innerHTML = '';
    shifMessage(cipher);
}