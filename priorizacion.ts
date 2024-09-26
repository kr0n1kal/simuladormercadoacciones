//IMPORTAMOS LA CLASE HEAP
import { Heap } from './heap';

//LA CLASE PRIORIZACION GESTIONA LA PRIORIZACION DE ORDENES DE COMPRA Y VENTA USANDO MAXHEAP Y MINHEAP
export class Priorizacion{
    //LA VARIABLE ORDENESCOMPRA ES EL MAXHEAP PARA PRIORIZAR ORDENES DE COMPRA
    private ordenesCompra: Heap;
    //LA VARIABLE ORDENESVENTA ES EL MINHEAP PARA PRIORIZAR ORDENES DE VENTA
    private ordenesVenta: Heap;

    constructor(){
        //ORDENES COMPRA SIGNIFICA PRECIOS MAS ALTOS, MAS PRIORIDAD
        this.ordenesCompra = new Heap(10, true);
        //ORDENES VENTA SIGNIFICA PRECIOS MAS BAJOS, MAS PRIORIDAD
        this.ordenesVenta = new Heap(10, false);
    }

    //LA FUNCION AGREGARORDENCOMPRA, AGREGA UNA NUEVA ORDEN DE COMPRA AL MAXHEAP
    public agregarOrdenCompra(precio: number): void{
        this.ordenesCompra.insert(precio);
    }

    // LA FUNCION AGREGARORDENVENTA, AGREGA UNA NUEVA ORDEN DE VENTA AL MINHEAP
    public agregarOrdenVenta(precio: number): void{
        this.ordenesVenta.insert(precio);
    }

    //LA FUNCION OBTENER MEJORCOMPRA, OBTIENE LA ORDEN DE COMPRA CON MAYOR PRIORIDAD, OSEA, EL PRECIO MAS ALTO
    public obtenerMejorCompra(): number | null {
        return this.ordenesCompra.isEmpty() ? null : this.ordenesCompra.extractTop();
    }

    //LA FUNCION OBTENERMEJORVENTA, OBTEIENE LA ORDEN DE VENTA CON MAYOR PRIORIDAD, OSEA, EL PRECIO MAS BAJO
    public obtenerMejorVenta(): number | null {
        return this.ordenesVenta.isEmpty() ? null : this.ordenesVenta.extractTop();
    }

        //SE OBTIENE LA ORDEN DE COMPRA PARA EL EMPAREJAMIENTO
    public getOrdenesCompra(): Heap{
        return this.ordenesCompra;
    }

    //SE OBTIENE LA ORDEN DE VENTA PARA EL EMPAREJAMIENTO
    public getOrdenesVenta(): Heap{
        return this.ordenesVenta;
    }
}
