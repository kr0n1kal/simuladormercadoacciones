export class Empresa{
    //SE CREA Y EXPORTA UNA CLASE EMPRESA, CON TODOS SUS ATRIBUTOSS
    private codigo: number;
    private nombre: string;
    private precio: number;

    //SE INICIALIZA LOS VALORES DE LOS ATRIBUTOS PRIVADOS DE NUESTRA EMPRESAS
    constructor(codigo: number, nombre: string, precio: number){
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
    }

    //HACEMOS 4 METODOS PARA OBTENER EL VALOR DE NUESTROS ATRIBUTOS, SUMADO UN TOSTRING PARA OBTENER
    //UNA VISTA GENERAL DE LAS EMPRESAS QUE TENEMOS AGREGADAS A NUESTRA CLASE
    public get_codigo(): number{
        return this.codigo;
    }

    public get_nombre(): string{
        return this.nombre;
    }

    public get_precio(): number{
        return this.precio;
    }

    public toString(): string{
        return `${this.codigo} - ${this.nombre} - Q.${this.precio}`;
    }
}

class Nodo{
    //CREAMOS NUESTRA CLASE NODO PARA PODER UTILIZARLA EN LA CLASE LISTA ENLAZADA
    //Y EVITAR COLISIONES POR RANGO DE PRECIOS
    empresa: Empresa;
    next: Nodo | null;

    constructor(empresa: Empresa){
        this.empresa = empresa;
        this.next = null;
    }
}

//CREAMOS UNA CLASE LISTA ENLAZADA PARA EVITAR COLISIONES DE PRECIOS IGUALES ENTRE LAS EMPRESASSS
export class ListaEnlazada{
    head: Nodo | null;

    constructor(){
        this.head = null;
    }

    public insert(empresa: Empresa): void{
        const nuevoNodo = new Nodo(empresa);
        if(this.head === null){
            this.head = nuevoNodo;
        } else {
            let current = this.head;
            while(current.next != null){
                current = current.next;
            }
            current.next = nuevoNodo;
        }
    }

    public toArray(): Empresa[]{
        const array: Empresa[] = [];
        let actual = this.head;
        while(actual){
            array.push(actual.empresa);
            actual = actual.next;
        }
        return array;
    }

    //EL USUARIO DARA UN PRECIO MINIMO Y MAXIMO POR COMPRA O VENTA DE UNA EMPRESA, POR TANTO 
    //SE OFRECE UN METODO PARA MOSTRAR EMPRESAS QUE SE ENCUENTREN ENTRE ESE RANGO DE VALORES
    public buscarPorPrecio(precioMin: number, precioMax: number): Empresa[]{
        let current = this.head;
        const resultados: Empresa[] = [];

        while(current !== null){
            const precioEmpresa = current.empresa.get_precio();
            if(precioEmpresa >= precioMin && precioEmpresa < precioMax){
                resultados.push(current.empresa);
            }
            current = current.next;
        }
        return resultados;
    }

    //AL COMPRAR UNA EMPRESA, EL PRECIO DE ESTA CAMBIA AUTOMATICAMENTE AL PRECIO DE LA COMPRA O LA VENTA DE LA MISMA
    //POR TANTO TENEMOS QUE ACTUALIZARLA PARA QUE AL QUERER BUSCAR DE NUEVO LA EMPRESA ANTERIOR, YA NO APAREZCA
    //EN LOS MISMOS FILTROS DE PRECIOSSSS
    public actualizarPrecio(codigo: number, nuevoPrecio: number):string{
        let current = this.head;

        while(current !== null){
            if(current.empresa.get_codigo() === codigo){
                current.empresa = new Empresa(
                    current.empresa.get_codigo(),
                    current.empresa.get_nombre(),
                    nuevoPrecio
                );
                return "Precio actualizado correctamente";
            }
            current = current.next;
        }
        return "Empresa no encontrada";
    }
}
