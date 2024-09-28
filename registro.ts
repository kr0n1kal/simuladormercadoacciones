//DEFINIMOS UNA CLASE TRANSACCION PARA REPRESENTAR UNA TRANSACCIÓN INDIVIDUAL
class Transaccion{
    compañia: string;
    accionesIntercambiadas: number;
    precioTransaccion: number;
    cantidadAcciones: number;
    comprador: string;
    vendedor: string;

    constructor(compañia: string, accionesIntercambiadas: number, precioTransaccion: number, cantidadAcciones: number, comprador: string, vendedor: string){
        this.compañia = compañia;
        this.accionesIntercambiadas = accionesIntercambiadas;
        this.precioTransaccion = precioTransaccion;
        this.cantidadAcciones = cantidadAcciones;
        this.comprador = comprador;
        this.vendedor = vendedor;
    }

    //CREAMOS UN METODO TOSTRING PARA PODER CONVERTIR LA TRANSACCION EN UNA CADENA LEGIBLE
    public toString(): string{
        return `Compañía: ${this.compañia}, Acciones Intercambiadas: ${this.accionesIntercambiadas}, 
                Precio: Q.${this.precioTransaccion}, Cantidad: ${this.cantidadAcciones}, 
                Comprador: ${this.comprador}, Vendedor: ${this.vendedor}`;
    }
}

//CREAMOS UNA CLASE REGISTRO LA CUAL MANEJARÁ EL HISTORIAL DE TODAS LAS TRANSACCIONES REALIZADAS
export class Registro {
    //DENTRO DE LA CLASE CREAMOS UN ARREGLO PARA ALMACENAR TODAS LAS TRANSACCIONES
    private historial: Transaccion[];

    constructor() {
        //INICIALIZAMOS EL ARREGLO VACIO
        this.historial = [];
    }

    //EN ESTA FUNCION REGISTRAMOS UNA NUEVA TRANSACCIÓN EN EL HISTORIAL
    public registrarTransaccion(
        //EL NOMBRE DE LA COMPAÑIA INVOLUCRADA
        compania: string, 
        //EL NUMERO DE TRANSACCIONES INTERCAMBIADAS
        accionesIntercambiadas: number, 
        //EL PRECIO POR ACCION EN LA TRANSACCION
        precioTransaccion: number, 
        //LA CANTIDAD TOTAL DE ACCIONES INTERCAMBIADAS
        cantidadAcciones: number, 
        //EL NOMBRE DEL COMPRADOR
        comprador: string, 
        //EL NOMBRE DEL VENDEDOR
        vendedor: string
    ): void {
        //CREAMOS UN OBJETO DE TIPO TRANSACCION Y LO AGREGAMOS AL HISTORIAL
        const nuevaTransaccion = new Transaccion(
            compania, 
            accionesIntercambiadas, 
            precioTransaccion, 
            cantidadAcciones, 
            comprador, 
            vendedor
        );
        //GUARDAMOS LA TRANSACCION EN EL ARREGLO DEL HISTORIAL
        this.historial.push(nuevaTransaccion);
        //E IMPRIMIMOS UN MENSAJE DICIENDO QUE LA TRANSACCION FUE REGISTRADA CORRECTAMENTE
        console.log("Transacción registrada: ", nuevaTransaccion.toString());
    }

    //CON LA FUNCION MOSTRARHISTORIAL MOSTRAMOS TODO EL HISTORIAL DE TRANSACCIONES REGISTRADAS EN NUESTRO ARREGLO E IMPRIMIMOS EN CONSOLA
    public mostrarHistorial(): void {
        console.log("Historial de transacciones:");
        this.historial.forEach((transaccion, index) => {
            console.log(`${index + 1}. ${transaccion.toString()}`);
        });
    }

    //CREAMOS EL METODO PARA OBTENER EL HISTORIAL COMPLETO
    public getHistorial(): Transaccion[]{
        return this.historial;
    }
}