const btnDark = document.getElementById('modo')
const iconDark = btnDark.firstElementChild
let htmlIngreso = document.getElementById('ingreso')
let htmlDisponible = document.getElementById('disponible')
let htmlGastos = document.getElementById('gastos')
const btnIngresaDisponible = document.getElementById('ingresaDisponible')
const btnIngresaGasto = document.getElementById('ingresaGasto')

let inputIngresaDisponible = document.getElementById('dineroDisponible')
let gastos = 0
let dineroDisponible = 0


let montosHTML = [htmlIngreso, htmlDisponible, htmlGastos]
let montosGuardados = [0, 0, 0]

let nombreGasto = document.getElementById('gasto')
let montoGasto = document.getElementById('monto')
const listaGastos = [[],[]]

const toggleModo = () => { 
    document.body.classList.toggle('dark');
    iconDark.classList.toggle('bi-moon-stars-fill')
    iconDark.classList.toggle('bi-sun-fill')
}

let labIngreso = document.getElementById('labIngreso')
let labGasto = document.getElementById('labGasto')
let labMonto = document.getElementById('labMonto')

/*
const labelChico = (a) => {
    if(a=='labIngreso'){
        labIngreso.classList.toggle('sinFocus')
        alert("wtf")
    } else if (a =='labGasto'){
        labGasto.classList.toggle('sinFocus')
    } else {
        labMonto.classList.toggle('sinFocus')
    }
}
*/

const formatoPesos = (a) => {
    let pesos = Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    });
    return (pesos.format(a));
}

let valor = 0
const imprimePesos = (a) => {
    valor = formatoPesos(a)
    return valor
}


const nuevosSaldos = (a) => {
    //Calculo disponible restando los gastos a los ingresos
    montosGuardados[1] = montosGuardados[0]-montosGuardados[2]
    //Recorro los html para poder agregarles el valor a cada uno
    for (let i = 0; i < montosHTML.length; i++) {
        //A cada HTML le pido su valor en pesos
        montosHTML[i].innerText = imprimePesos(montosGuardados[i])    
    }
    labIngreso.classList.remove('sinFocus')
    inputIngresaDisponible.value= ''
    montoGasto.value = ''
    nombreGasto.value = ''
}


const ingresaDinero = () => {
    dineroDisponible = parseFloat(inputIngresaDisponible.value)
    montosGuardados[0] = dineroDisponible
    nuevosSaldos(dineroDisponible)
}

const ingresaGasto = (parametro) => {
    montosGuardados[2] += parseFloat(montoGasto.value)
    listaGastos[0][0] = nombreGasto.value
    listaGastos[0][1] = montoGasto.value
    console.log(listaGastos[0][0])
    console.log(listaGastos[0][1])
    nuevosSaldos()
    
}

btnDark.addEventListener('click', toggleModo)
btnIngresaDisponible.addEventListener('click', ingresaDinero)
btnIngresaGasto.addEventListener('click', ingresaGasto)


//Detecta focus out y focus in en los inputs y genera una clase en el label para que no vuelva al lugar del input. No lo pude hacer llamando a una función porque no me tomaba el parámetro, por eso lo hice con una función anónima
inputIngresaDisponible.addEventListener('focusout', function (){
    if(this.value!=''){
        this.previousElementSibling.classList.toggle('sinFocus')
    }
})
inputIngresaDisponible.addEventListener('focusin', function () {
    this.previousElementSibling.classList.remove('sinFocus')
})

nombreGasto.addEventListener('focusout', function () {
    if (this.value != '') {
        this.previousElementSibling.classList.toggle('sinFocus')
    }
})
nombreGasto.addEventListener('focusin', function () {
    this.previousElementSibling.classList.remove('sinFocus')
})

montoGasto.addEventListener('focusout', function () {
    if (this.value != '') {
        this.previousElementSibling.classList.toggle('sinFocus')
    }
})
montoGasto.addEventListener('focusin', function () {
    this.previousElementSibling.classList.remove('sinFocus')
})
