//LA CLASE HEAP PUEDE FUNCIONAR COMO UN MAX HEAP O UN MIN HEAP DEPENDIENDO LAS NECESIDADES DEL USUARIO
//EL MAX HEAP PRIORIZA LOS VALORES MAS GRANDES, MIENTRAS QUE EL MIN HEAP LOS DE MENOR VALOR
export class Heap{
    //LA VARIABLE HEAP ALMACENA LOS DATOS INGRESADOS AL HEAP
    private heap: number[];
    //LA VARIABLE N ES EL NUMERO DE ELEMENTOS ACTUALES EN EL HEAP
    private n: number;
    //LA VARIABLE ISMAXHEAP DEFINE SI EL HEAP QUE NECESITAMOS ES MAX (TRUE) O MIN (FALSE)
    private isMaxHeap: boolean;

    constructor(size: number, isMaxHeap: boolean = true){
        //INICIALIZAMOS NUESTRAS 3 VARIABLES
        this.heap = new Array(size + 1);
        this.n = 0;
        this.isMaxHeap = isMaxHeap;
    }

    public checkTop(): number{
        //LA FUNCION CHEKTOP DEVUELVE EL VALOR EN LA PARTE SUPERIOR DEL HEAP (MAXIMO O MINIMO DEPENDIENDO EL HEAP)
        return this.heap[1];
    }

    public isEmpty(): boolean{
        //LA FUNCION ISEMPTY VERIFICA SI EL HEAP ESTA VACIO
        return this.n == 0;
    }

    public getQuantity(): number{
        //LA FUNCION GETQUANTITY OBTIENE LA CANTIDAD DE ELEMENTOS ACTUALES EN EL HEAP
        return this.n;
    }

    //LA FUNCION INSERT, INSERTA UN NUEVO VALOR EN EL HEAP AJUSTANDO SU POSICION PARA MANTENER LAS PROPIEDADES DEL HEAP
    public insert(value: number):void{
        if(this.n == this.heap.length - 1)
            //SI EL HEAP ESTA LLENO, LO REDIMENSIONAMOS PARA QUE TENGA EL DOBLE DE CAPACIDAD
            this.resize(2*this.heap.length);
        //EN TODO CASO NO SEA NECESARIA LA PRIMERA CONDICION, AUMENTAMOS EN 1 LA POSICION Y EL CONTADOR DE ELEMENTOS
        this.n++;
        //ADEMAS INSERTAMOS EL NUEVO VALOR EN LA ULTIMA POSICION HABILITADA
        this.heap[this.n] = value;
        //Y POR ULTIMO AJUSTAMOS EL HEAP PARA QUE MANTENGA EL ORDEN
        this.swap(this.n);
    }

    //LA FUNCION SWAP AJUSTA LA POSICION DEL NUEVO ELEMENTO INSERTADO, MOVIENDOLO HACIA ARRIBA SI ES NECESARIO
    private swap(i: number):void{
        //CALCULAMOS EL INDICE DEL PADRE
        let padre: number = Math.floor(i/2);
        //MIENTRAS QUE NO ESTEMOS EN LA RAIZ Y DEBA HACERSE EL SWAP, HACEMOS LO SIGUIENTE:
        while(i>1 && this.shouldSwap(padre, i)){
            //INTERCAMBIAMOS EL HIJO CON EL PADRE
            let temp: number = this.heap[i];
            this.heap[i] = this.heap[padre];
            this.heap[padre] = temp;
            //ACTUALIZAMOS i PARA SUBIR EM EL ARBOL
            i = padre;
            //RECALCULAMOS AL PADRE
            padre = Math.floor(i/2);
        }
    }

    //LA FUNCION SHOULDSWAP VERIFICA SI SE DEBE INTERCAMBIAR LOS NODOS DEPENDIENDO DE SI ES UN MAXHEAP O MINHEAP 
    private shouldSwap(parentIdx: number, childIdx: number): boolean {
        if (this.isMaxHeap) {
            //EN UN MAXHEAP, EL HIJO DEBE SER MAYOR QUE EL PADRE PARA HACER EL SWAP
            return this.heap[parentIdx] < this.heap[childIdx];
        } else {
            //EN CAMBIO EN EL MINHEAP, EL HIJO DEBE SER MENOR PARA HACER EL SWAP
            return this.heap[parentIdx] > this.heap[childIdx];
        }
    }

    //LA FUNCION RESIZE REDIMENSIONA EL ARRAY DEL HEAP CUANDO ESTÉ LLENO
    private resize(newSize: number): void {
        //CREAMOS UN NUEVO ARRAY CON MAYOR TAMAÑO
        let newHeap: number[] = new Array(newSize + 1);
        for (let i = 1; i < this.heap.length; i++) {
            //COPIAMOS LOS VALORES AL NUEVO ARRAY
            newHeap[i] = this.heap[i];
        }
        //REASIGNAMOS EL HEAP AL NUEVO ARRAY
        this.heap = newHeap;
    }

    //LA FUNCION EXTRACTTOP EXTRAE EL VALOR EN LA PARTE SUPERIOR DEL HEAP
    public extractTop(): number {
        //OBTENEMOS EL VALOR EN LA RAIZ DEL HEAP
        let top: number = this.heap[1];
        //REEMPLAZAMOS LA RAIZ CON EL ULTIMO ELEMENTO
        this.heap[1] = this.heap[this.n];
        //LIMPIAMOS EL ULTIMO ELEMENTO
        this.heap[this.n] = 0;
        //REDUCIMOS EL NUMERO DE ELEMENTOS
        this.n--;
        //AJUSTAMOS EL HEAP PARA QUE MANTENGA SU ORDEN
        this.sink(1);
        //DEVOLVEMOS EL VALOR EXTRAIDO
        return top;
    }

    //LA FUNCION SINK AJUSTA LA POSICION DEL ELEMENTO EN LA RAIZ MOVIENDOLO HACIA ABAJO SI ES NECESARIO
    private sink(i: number): void {
        //MIENTRAS EXISTAN HIJOS
        while (2 * i <= this.n) {
            //OBTENEMOS EL INDICE DEL HIJO IZQUIERDO
            let j: number = 2 * i;
            if (j < this.n && this.shouldSwap(j, j + 1)) {
                //SI EL HIJO DERECHO ES MAYOR O MENOR (DEPENDIENDO DEL HEAP), AUMENTAMOS LA POSICION DEL HIJO EN 1
                j++;
            }
            if (!this.shouldSwap(i, j)) {
                //SI NO SE DEBE HACER EL SWAP, SALIMOS DEL BUCLE
                break;
            }
            //INTERCAMBIAMOS EL PADRE CON EL HIJO ADECUADO
            let temp: number = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            //ACTUALIZAMOS EL INDICE PARA BAJAR EN EL ARBOL
            i = j;
        }
    }
}