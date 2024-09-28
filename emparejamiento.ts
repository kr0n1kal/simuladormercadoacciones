//SE IMPORTA LA CLASE PRIORIZACIÓN QUE MANEJA LOS HEAPS DE ORDENES DE COMPRA Y VENTA
import { Priorizacion } from './priorizacion';
//SE IMPORTA LA CLASE REGISTRO PARA LLEVAR EL REGISTRO DE TRANSACCIONES
import { Registro } from './registro';
//SE IMPORTA LA CLASE EMPRESA PARA PODER OBTENER EL NOMBRE DE LA EMPRESA 
import { Empresa } from './empresa';

//SE CREA LA CLASE EMPAREJAMIENTO, QUE SE ENCARGA DE EMPAREJAR ORDENES DE COMPRA Y VENTA AUTOMATICAMENTE CUANDO LOS PRECIOS
//COINCIDEN O SON COMPATIBLES. SE BASA EN EL SISTEMA DE PRIORIZACION QUE UTILIZA MAXHEAP PARA LAS ORDENES DE COMPRA Y MINHEAP
//PARA LAS DE VENTA
export class Emparejamiento {
    //CREAMOS UNA VARIABLE CON NUESTRO SISTEMA DE PRIORIZACIÓN DE ÓRDENES
    private sistemaPriorizacion: Priorizacion;
    //CREAMOS OTRA VARIABLE CON NUESTRO REGISTRO DE TRANSACCIONES
    private registro: Registro;
    //CREAMOS LA VARIABLE USUARIOCOMPRADOR, QUE POR DEFECTO ES EL USUARIO QUE INICIA SESION EN EL PROGRAMA
    private usuarioComprador: string;
    //CREAMOS LA VARIABLE USUARIOVENDEDOR, QUE POR DEFECTO ES EL SIGUIENTE USUARIO QUE TENEMOS REGISTRADO
    private usuarioVendedor: string;
    //Y POR ULTIMO CREAMOS LA VARIABLE EMPRESAS QUE MUESTRA LA LISTA DE EMPRESAS PARA LA TRANSACCION
    private empresas: Empresa[];

    //EL CONSTRUCTOR RECIBE UNA INSTANCIA DEL SISTEMA DE PRIORIZACIÓN Y DE EL REGISTRO DE TRANSACCIONES JUNTO CON LA EMPRESA
    constructor(sistemaPriorizacion: Priorizacion, registro: Registro, usuarioComprador: string, empresas: Empresa[]) {
        this.sistemaPriorizacion = sistemaPriorizacion;
        this.registro = registro;
        this.usuarioComprador = usuarioComprador;
        this.empresas = empresas;

        //SUPONEMOS QUE HAY UN SOLO OTRO USUARIO EN EL SISTEMA COMO VENDEDOR
        this.usuarioVendedor = "jose";
    }

    //CREAMOS EL METODO EMPAREJARORDENES QUE REALIZA EL EMPAREJAMIENTO ENTRE LAS ORDENES DE COMPRA Y VENTA. BUSCA EMPAREJAR ORDENES CUANDO EL PRECIO DE VENTA
    //ES MENOR O IGUAL AL PRECIO DE COMPRA. REALIZA LA TRANSACCION Y ELIMINA LAS ORDENES DEL SISTEMA UNA VEZ EJECUTADAS
    public emparejarOrdenes():void{
        //MIENTRAS HAYA ÓRDENES DE COMPRA Y VENTA EN LOS MONTICULOS 
        while(!this.sistemaPriorizacion.getOrdenesCompra().isEmpty() && !this.sistemaPriorizacion.getOrdenesVenta().isEmpty()){

            //OBTENEMOS LA MEJOR OFERTA DE COMPRA Y VENTA (LOS ELEMENTOS DE MAYOR PRIORIDAD EN LOS HEAPS)
            const mejorCompra = this.sistemaPriorizacion.getOrdenesCompra().checkTop();
            const mejorVenta = this.sistemaPriorizacion.getOrdenesVenta().checkTop();

            //SI EL PRECIO DE COMPRA ES MAYOR O IGUAL AL PRECIO DE VENTA, SE PUEDE EMPAREJAR LA TRANSACCIÓN
            if(mejorCompra >= mejorVenta){
                console.log(`Emparejando compra por Q.${mejorCompra} con venta por Q.${mejorVenta}`);

                //EXTRAEMOS LAS ÓRDENES DE LOS HEAPS, LO QUE SIGNIFICA QUE LA TRANSACCION SERA EJECUTADA
                const precioCompra = this.sistemaPriorizacion.getOrdenesCompra().extractTop();
                const precioVenta = this.sistemaPriorizacion.getOrdenesVenta().extractTop();

                //SELECCIONAMOS UNA EMPRESA ALEATORIA PARA LA TRANSACCION
                const empresa = this.empresas[0];

                //DEFINIMOS LA CANTIDAD DE ACCIONES INVOLUCRADAS (AJUSTABLE SEGUN EL CASO)
                //EJEMPLO, AJUSTAMOS LA CANTIDAD DE ACCIONES SEGUN LA LÓGICA REAL
                const cantidadAcciones = 1;

                //REGISTRAMOS LA TRANSACCION EXITOSA EN EL REGISTRO
                this.registro.registrarTransaccion(
                    empresa.get_nombre(),
                    cantidadAcciones,
                    mejorCompra,
                    cantidadAcciones,
                    this.usuarioComprador,
                    this.usuarioVendedor
                );
                console.log(`Transacción registrada: ${empresa.get_nombre()} por ${cantidadAcciones} acciones a Q.${precioCompra}`);
            } else {
                console.log("No se pueden emparejar más órdenes en este momento.");
                //DE CASO CONTRARIO, QUE NO HAYA COINCIDENCIA DE PRECIOS (COMPRA < VENTA), NO SE PODRA REALIZAR EL EMPAREJAMIENTO
                //SALIMOS DEL BUCLE, NO SE PUEDEN EMPAREJAR MÁS ÓRDENES EN ESTA ITERACIÓN
                break;
            }
        }
    }
}
