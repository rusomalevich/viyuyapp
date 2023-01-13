const btnDark = document.getElementById("modo")
const iconDark = btnDark.firstElementChild

const ingreso = document.getElementById("ingreso")
const disponible = document.getElementById("disponible")
const gastos = document.getElementById("gastos")

/*
    ingreso
    disponible
    gastos
*/

const toggleModo = () => { 
    document.body.classList.toggle('dark');
    iconDark.classList.toggle('bi-moon-stars-fill')
    iconDark.classList.toggle('bi-sun-fill')
}

const formatoPesos = (a) => {
    
    
}

btnDark.addEventListener('click', toggleModo)
