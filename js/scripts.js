const lupa = document.getElementById('lupa');
const iconos = document.getElementById('img');
const papel =  document.getElementById('papel');
const tijera = document.getElementById('tijera');
const piedra = document.getElementById('piedra');
const user = document.getElementById('user');
const com = document.getElementById('com');
const userImg = document.getElementById('user-img');
const comImg = document.getElementById('com-img');
const jugar = document.getElementById('jugar');

let opcionUsuario, opcionMaquina;

const resetLupa = () => {
    iconos.style.display = "block";
    lupa.style.display = "none";
}

const reset = () => {
    iconos.style.display = "none";
    comImg.style.display = "none";
    userImg.style.display = "none";
    jugar.style.display = "block";
}

const resetWin = () => {
    lupa.style.display = "block";
    jugar.style.display = "none";
    comImg.style.display = "block";
    userImg.style.display = "block";
    com.style.background = "hsla(20, 100%, 60%, .5) no-repeat center center";
    user.style.background = "hsla(20, 100%, 60%, .5) no-repeat center center";
}

const cargar = () => {
    opcionMaquina = aleatorio(0,2);

    if (opcionMaquina === 0) com.style.backgroundImage = "url('img/piedra.png')"; 
    if (opcionMaquina === 1) com.style.backgroundImage = "url('img/papel.png')";
    if (opcionMaquina === 2) com.style.backgroundImage = "url('img/tijera.png')";
}

const ganador = (opUser, opCom) => {
    if (opUser === opCom) mensajeEmpate();
    if (opUser === 0) {
        if (opCom === 1) mensajePierde(); 
        if (opCom === 2) mensajeGana();    
    }     
    if (opUser === 1) {
        if (opCom === 0) mensajeGana();
        if (opCom === 2) mensajePierde();      
    } 
    if (opUser === 2) {
        if (opCom === 0) mensajePierde(); 
        if (opCom === 1) mensajeGana();  
    }
}

const lupaDebounce = debounce(resetLupa, 200);

lupa.addEventListener('click', () => {
    lupaDebounce();
})

piedra.addEventListener('click', () => {
    reset(); 
    user.style.backgroundImage = "url('img/piedra.png')"; 
    cargar();
    opcionUsuario = 0;
})

papel.addEventListener('click', () => {
    reset();
    user.style.backgroundImage = "url('img/papel.png')";
    cargar();
    opcionUsuario = 1;
})

tijera.addEventListener('click', () => {
    reset();   
    user.style.backgroundImage = "url('img/tijera.png')";
    cargar();
    opcionUsuario = 2;
})

jugar.addEventListener('click', () => {      
    ganador(opcionUsuario, opcionMaquina);
    resetWin();
})

// Genera un número aleatorio entre un rango de enteros
function aleatorio(minimo, maximo) {
	var numero = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
	return numero;
}

function debounce(funcion, tiempo) {
    let timeoutId;
    return function() {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const context = this;
        const args = arguments;
        timeoutId = setTimeout(() => {
            funcion.apply(context, args);
        }, tiempo);
    }
}

const mensajeGana = () => {
    Swal.fire({
        title: "Ganaste 😎", 
        text: "Intentalo de nuevo", 
        type: "success",
        showConfirmButton: false,
        timer: 1500,
        backdrop: 'rgba(43, 165, 137, .45)',
        padding: '2rem'
    });
}

const mensajeEmpate = () => {
    Swal.fire({
        title: "Empate 😐", 
        text: "Intentalo de nuevo", 
        type: "warning",
        showConfirmButton: false,
        timer: 1500,
        backdrop: 'rgba(244, 220, 56, .45)',
        padding: '2rem'
    });
}
 
const mensajePierde = () => {
    Swal.fire({
        title: "Perdiste 😢", 
        text: "Intentalo de nuevo", 
        type: "error",
        showConfirmButton: false,
        timer: 1500,
        backdrop: 'rgba(255, 5, 5, 0.45)',
        padding: '2rem'
    });
}