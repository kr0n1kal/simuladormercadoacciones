//IMPORTAMOS LAS DOS CLASES DE NUESTRO ARCHIVO empresa.ts
import { Empresa, ListaEnlazada } from './empresa';

//EXPORTAMOS LA CLASE DE GESTION PARA PODER UTILIZARLA EN EL MAIN
export class GestionCompraYVenta{
    //POR CADA USUARIO SE CREARA UNA NUEVA LISTA ENLAZADA PARA QUE SOLO ESE USUARIO
    //PUEDA MODIFICAR LO QUE TENGA DENTRO DE ESTO
    lista: ListaEnlazada;

    constructor(lista: ListaEnlazada){
        this.lista = lista;
    }

    //EN LA GESTION SE VUELVE A CREAR UN METODO DE BUSCAR POR PRECIO, COMPLEMENTANDO EL DEL ARCHIVO empresa.ts
    //PARA QUE EL MANTENIMIENTO PUEDA SER MAS CLARO
    public buscarPorPrecio(precioMin: number, precioMax: number): Empresa[]{
        let current = this.lista.head;
        const resultados: Empresa[] = [];

        while(current !== null){
            const precioEmpresa = current.empresa.get_precio();
            if(precioEmpresa >= precioMin && precioEmpresa <= precioMax){
                //SI LA EMPRESA ESTA ENTRE EL RANGO DE PRECIOMIN Y PRECIOMAX HARA UN PUSH PARA QUE
                //LA CLASE EMPRESA SE ENCARGUE DE MOSTRAR CUALES SERAN LAS EMPRESAS QUE PUEDA COMPRAR O VENDER
                resultados.push(current.empresa);
            }
            current = current.next;
        }
        return resultados;
    }

    //DE MISMA MANERA AQUI, SE PODRA LLAMAR AL METODO ACTUALIZARPRECIO Y ASI PODER LLAMAR AL ARCHIVO
    //empresa.ts PARA COMPLEMENTAR LO QUE LE ENVIEMOS DE ESTE METODO
    public actualizarPrecio(codigo: number, nuevoPrecio: number): boolean{
        let current = this.lista.head;
        while(current !== null){
            if(current.empresa.get_codigo() === codigo){
                //MIENTRAS QUE EL CODIGO QUE TIENE LA EMPRESA SEA IGUAL AL CODIGO INGRESADO POR EL USUARIO
                //SE INSTANCIARA UNA NUEVA EMPRESA EN LA QUE LE DAREMOS UN NUEVO VALOR AL PRECIO
                current.empresa = new Empresa(
                    current.empresa.get_codigo(),
                    current.empresa.get_nombre(),
                    nuevoPrecio
                );
                return true;
            }
            current = current.next;
        }
        return false;
    }
}