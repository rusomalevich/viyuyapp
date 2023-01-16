//Guardo en variables botones modo oscuro/claro
const btnDark = document.getElementById('modo')
const iconDark = btnDark.firstElementChild

//Guardo los html donde se muestra cada monto
let htmlIngreso = document.getElementById('ingreso')
let htmlDisponible = document.getElementById('disponible')
let htmlGastos = document.getElementById('gastos')

//Guardo los HTML de cada botón de ingreso de datos
const btnIngresaDisponible = document.getElementById('ingresaDisponible')
const btnIngresaGasto = document.getElementById('ingresaGasto')

//Defino variables a usar después
let gastos = 0
let dineroDisponible = 0

//Array con los HTML a modificar
let montosHTML = [htmlIngreso, htmlDisponible, htmlGastos]
//Creo array para guardar cada monto
let montosGuardados = [0, 0, 0]

//Inputs 
let inputIngresaDisponible = document.getElementById('dineroDisponible')
let nombreGasto = document.getElementById('gasto')
let montoGasto = document.getElementById('monto')

//Creo array bidimensional para tener nombre y monto del gasto
const listaGastos = [[],[]]

//Guardo los labels
let labIngreso = document.getElementById('labIngreso')
let labGasto = document.getElementById('labGasto')
let labMonto = document.getElementById('labMonto')


let txtError = document.getElementById('txtError')
let txtError2 = document.getElementById('txtError2')

const toggleModo = () => { 
    document.body.classList.toggle('dark');
    iconDark.classList.toggle('bi-moon-stars-fill')
    iconDark.classList.toggle('bi-sun-fill')
}


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
        if (montosHTML[i] == htmlDisponible){
            if (montosGuardados[i] > 0) {
                htmlDisponible.classList.remove('rojo')
                htmlDisponible.classList.add('verde')
            } else if (montosGuardados[i] < 0){
                htmlDisponible.classList.remove('verde')
                htmlDisponible.classList.add('rojo')
            }
        }
    }
    labIngreso.classList.remove('sinFocus')
    inputIngresaDisponible.value= ''
    montoGasto.value = ''
    nombreGasto.value = ''
}

const agregaError = (a, b) => {
    let mensaje = ''
    if ( b = 'numero') {
        mensaje = "Tenés que agregar un ingreso"
    } else if (b = 'monto'){
        mensaje = "Tenés que agregar un monto"
    } else {
        mensaje = "Escribí algo :/"
    }

    if ( a == 0 ){
        //PARA INGRESA DISPONIBLE
        if (inputIngresaDisponible.classList.contains('error')) {
            //Se reinicia la animación de resaltar
            inputIngresaDisponible.style.animationName = 'none'
            setTimeout(() => {
                inputIngresaDisponible.style.animationName = 'errorAnim'
                inputIngresaDisponible.style.animationPlayState = 'running'
            }, 5);

        } else {
            //Agrega formato de error y mensaje
            inputIngresaDisponible.classList.add('error')
            inputIngresaDisponible.style.animationPlayState = 'running';
            txtError.style.display = "inline"
            txtError.innerText = mensaje
        }
    } else if ( a == 1){
        if (nombreGasto.classList.contains('error')) {
            //Se reinicia la animación de resaltar
            nombreGasto.style.animationName = 'none'
            setTimeout(() => {
                nombreGasto.style.animationName = 'errorAnim'
                nombreGasto.style.animationPlayState = 'running'
            }, 5);

        } else {
            //Agrega formato de error y mensaje
            nombreGasto.classList.add('error')
            nombreGasto.style.animationPlayState = 'running';
            txtError2.style.display = "inline"
            txtError2.innerText = mensaje
        }


    } else {

    }
    
}

const validacion = (a) => {
    //primero evalúa si está intentando ingresar monto disponible o gasto 
    if (a=='disponible') {
        //chequea que no esté vacío
        if (inputIngresaDisponible.value.length != 0){
            //TODO OK
            inputIngresaDisponible.classList.remove('error')
            txtError.style.display = "none"
            nombreGasto.focus()
            return true
            
        } else {
            //Chequea si ya se avisó previamente al usuario del error
            agregaError(0, 'numero')
            return false
        }
    } else {
        //Si se ingresó gasto va a realizar las comprobaciones en ambos input
        if (nombreGasto.value!=0){
            //Chequea el monto ingresado
            if (/^(\d+-)*(\d+)$/.test(montoGasto.value)) {
                //Todo OK
                return true
            } else {
                agregaError(2, 'monto')
                console.log('No ingresó el monto')
                return false
            }
        } else {
            agregaError(1, 'gasto')
            console.log('No ingresó el nombre del gasto')
            return false
            //AVISAR AL USUARIO QUE DEBE INGRESAR ALGÚN NOMBRE
            //RESALTAR EL INPUT
        }
    }
}

const ingresaDinero = () => {

    if (validacion('disponible')){
        dineroDisponible = parseFloat(inputIngresaDisponible.value)
        montosGuardados[0] = dineroDisponible
        nuevosSaldos(dineroDisponible)
    }
}

const ingresaGasto = () => {
    if (validacion('gasto')) {
        montosGuardados[2] += parseFloat(montoGasto.value)
        listaGastos[0][0] = nombreGasto.value
        listaGastos[0][1] = montoGasto.value
        nuevosSaldos()
    }
}

btnDark.addEventListener('mousedown', toggleModo)

//Al cliquear en el botón + se ingresa dinero o gasto
btnIngresaDisponible.addEventListener('mousedown', ingresaDinero)
btnIngresaGasto.addEventListener('mousedown', ingresaGasto)

//Hago que el ingreso de disponible y de gastos funcione con Enter
inputIngresaDisponible.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        btnIngresaDisponible.mousedown(); //uso mousedown en vez de disparar la función directamente para que siga funcionando si cambio el nombre de la función
    }
});

montoGasto.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        btnIngresaGasto.mousedown();
    }
});

nombreGasto.addEventListener('keypress', function (event){
    if (event.key === 'Enter') {
        btnIngresaGasto.mousedown()        
    }
})



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
