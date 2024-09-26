//SE IMPORTA LA CLASE PRIORIZACIÓN QUE MANEJA LOS HEAPS DE ORDENES DE COMPRA Y VENTA
import { Priorizacion } from './priorizacion';

//SE CREA LA CLASE EMPAREJAMIENTO, QUE SE ENCARGA DE EMPAREJAR ORDENES DE COMPRA Y VENTA AUTOMATICAMENTE CUANDO LOS PRECIOS
//COINCIDEN O SON COMPATIBLES. SE BASA EN EL SISTEMA DE PRIORIZACION QUE UTILIZA MAXHEAP PARA LAS ORDENES DE COMPRA Y MINHEAP
//PARA LAS DE VENTA
export class Emparejamiento {
    //CREAMOS UNA VARIABLE CON NUESTRO SISTEMA DE PRIORIZACIÓN DE ÓRDENES
    private sistemaPriorizacion: Priorizacion;

    //EL CONSTRUCTOR RECIBE UNA INSTANCIA DEL SISTEMA DE PRIORIZACIÓN
    constructor(sistemaPriorizacion: Priorizacion) {
        this.sistemaPriorizacion = sistemaPriorizacion;
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

                //POR ULTIMO SIMPLEMENTE REALIZAMOS LA TRANSACCION Y SE MUESTRA EN PANTALLA
                console.log(`Transacción completada: Compra por Q.${precioCompra} y Venta por Q.${precioVenta}`);
            } else {
                //DE CASO CONTRARIO, QUE NO HAYA COINCIDENCIA DE PRECIOS (COMPRA < VENTA), NO SE PODRA REALIZAR EL EMPAREJAMIENTO
                //SALIMOS DEL BUCLE, NO SE PUEDEN EMPAREJAR MÁS ÓRDENES EN ESTA ITERACIÓN
                break;
            }
        }
    }
}