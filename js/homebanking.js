//Declaración de variables
var nombreUsuario = "Vanessa López";
var saldoCuenta = 40000;
var limiteExtraccion = 10000;
var contraseña = "0911";


//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function () {
    iniciarSesion();
};

//Funciones usadas en otras funciones para reciclar código
function validarMonto(monto) {
    if (Number.isNaN(monto) || monto == null || monto <= 0) {
        alert("Ingrese una cifra válida");
        return false;
    } return true;
}

function sumarDinero(monto) {
     saldoCuenta += monto;
}

function restarDinero(monto) {
     saldoCuenta -= monto;
}
//Funciones que retornar valores booleanos para validaciones requeridas en la consigna del proyecto
function dineroDisponible(monto) {
    if (monto < saldoCuenta) {
         return true;
    } else {
        alert("El saldo de su cuenta no es suficiente para realizar esta transacción");
        return false;
    }
}

function montoMenorAlimiteDeExtraccion(monto) {
    if (monto < limiteExtraccion) {
        return true;
    } else {
        alert("El monto ingresado supera el límite de extracción diario.");
        return false;
    }
}

function montoEnBilletesDe100(monto) {
    if (monto % 100 === 0) {
        return true;
    } else {
        alert("Solo puede extraer billetes de 100");
        return false;
    }
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var monto = parseInt(prompt("Ingrese su nuevo límite de extracción"));
    if (validarMonto(monto) && monto !== limiteExtraccion) {
            limiteExtraccion = monto;
            alert("Su límite de extracción ha sido modificado con éxito. \n Su nuevo límite de extracción es de $" + limiteExtraccion);
            actualizarLimiteEnPantalla();
    } else {
             alert("Su operación no puede ser realizada.");
    }
}

function extraerDinero() {
    var monto = parseInt(prompt("Ingrese monto a extraer"));
    var saldoAntesDeExtraer = saldoCuenta;
    if (validarMonto(monto) && 
        dineroDisponible(monto) && 
        montoMenorAlimiteDeExtraccion(monto) && 
        montoEnBilletesDe100(monto)) {
            restarDinero(monto);
            alert("Su operación ha sido realizada con éxito. \n Has retirado: $" + monto + "\n Saldo Anterior: $" + saldoAntesDeExtraer + "\n Su saldo actual es: $" + saldoCuenta);
            actualizarSaldoEnPantalla();
    }
}

function depositarDinero() {
    var monto = parseInt(prompt("Ingrese monto a depositar"));
    if (validarMonto(monto)) {
        var saldoAnterior = saldoCuenta;
        sumarDinero(monto);
        actualizarSaldoEnPantalla();
        alert("Has realizado tu deposito con éxito.\n  El monto depositado es de: $" + monto + "\n Saldo anterior: $" + saldoAnterior + "\n Su saldo actual es: $" + saldoCuenta);
    }
}

function pagarServicio() {
    var servicioAPagar = parseInt(prompt("Indique el número correspondiente al servicio que desea pagar: \n 1-Agua \n 2-Telefono \n 3-Luz \n 4-Internet"));
    var agua = 350;
    var telefono = 425;
    var luz = 210;
    var internet = 570;
    var saldoAnterior = saldoCuenta;
    var verificarSaldo = function (servicioAPagar){
        if (servicioAPagar <= saldoCuenta) {
            saldoCuenta -= servicioAPagar;
        } else {
            alert("El saldo de su cuenta es insuficiente para realizar la transacción.");
        }
    };
    var imprimirMensajeDeTransaccion = function (servicioAPagar) {
        alert("Su pago del servicio ha sido realizado con éxito. \n Saldo anterior: $" + saldoAnterior + "\n Monto pagado: $" + servicioAPagar + "\n Saldo actual: $" + saldoCuenta);
    };
    switch (servicioAPagar) {
        case 1: 
            servicioAPagar = agua;
            verificarSaldo(servicioAPagar);
        imprimirMensajeDeTransaccion(servicioAPagar);
            actualizarSaldoEnPantalla();
        break;
        case 2: 
            servicioAPagar = telefono;
            verificarSaldo(servicioAPagar);
            imprimirMensajeDeTransaccion(servicioAPagar);
            actualizarSaldoEnPantalla();
        break;
        case 3: 
            servicioAPagar = luz;
            verificarSaldo(servicioAPagar);
            imprimirMensajeDeTransaccion(servicioAPagar);
            actualizarSaldoEnPantalla();
        break;
        case 4: 
            servicioAPagar = internet;
            verificarSaldo(servicioAPagar);
            imprimirMensajeDeTransaccion(servicioAPagar);
            actualizarSaldoEnPantalla();
        break;
        default: alert("El servicio seleccionado no existe");
            break;
    }
}

function transferirDinero() {
    var monto = parseInt(prompt("Ingrese el monto a transferir"));
    var saldoAnterior = saldoCuenta;
    var cuentaAmiga1 = 1234567;
    var cuentaAmiga2 = 7654321;

    if (monto < saldoCuenta && validarMonto(monto)) {
        var cuentaATransferir = parseInt(prompt("Seleccione la cuenta a la cual desea realizar la transferencia. \n 1-Cuenta Amiga 1 \n 2-Cuenta Amiga 2"));
        switch (cuentaATransferir) {
            case 1: 
                restarDinero(monto);
                alert("Su pago ha sido realizado con éxito. \n Saldo anterior: $" + saldoAnterior + "\n Monto pagado: $" + monto + "\n Saldo actual: $" + saldoCuenta);
                actualizarSaldoEnPantalla();
            break;
            case 2: 
                restarDinero(monto);
                alert("Su pago ha sido realizado con éxito. \n Saldo anterior: $" + saldoAnterior + "\n Monto pagado: $" + monto + "\n Saldo actual: $" + saldoCuenta);
                actualizarSaldoEnPantalla();
            break;
            default: alert("El valor ingresado no corresponde a ninguna cuenta registrada");
            break;
        }
    } else if (monto > saldoCuenta) {
        alert("Su saldo es insuficiente para realizar esta operación.");
    } else {
        alert("Su operación no puede ser realizada. Ingrese un monto válido.");
    }
}

function iniciarSesion() {
    var contraseñaIngresada = (prompt("Ingrese su contraseña para iniciar sesión"));
    if (contraseñaIngresada === contraseña) {
        alert("Bienvenido/a " + nombreUsuario + ", ya puedes comenzar a realizar operaciones.");
        cargarNombreEnPantalla();
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
    } else {
        alert("Código incorrecto. El ingreso no ha sido exitoso. El saldo ha sido retenido por seguridad");
        saldoCuenta = 0;
        actualizarSaldoEnPantalla();
    }
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}