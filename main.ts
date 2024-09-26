//SE IMPORTA LOS 3 ARCHIVOS QUE LLEVAMOS HASTA EL MOMENTO PARA PODER HACER USO DE ELLOS EN EL MAINs
import { Empresa, ListaEnlazada } from "./empresa";
import { GestionCompraYVenta } from "./gestion";
import { usuarios, contraseñas } from "./usuarios";
import { Priorizacion } from "./priorizacion";

//SE CREA UN OBJETO TIPO DICCIONARIO QUE ESPECIFICA QUE LAS CLAVES DEL OBJETO SERAN CADENAS DE TEXTO, OSEA LOS NOMBRES DE USUARIO
//ADEMAS PARA CADA INICIO DE SESION, SE INSTANCIARA UNA NUEVA LISTA ENLAZADA PARA QUE CADA USUARIO TRATE SUS EMPRESAS DE MANERA DISTINTA
//INICIALIZANDO ESTE VALOR COMO VACIO
const UserData: { [key:string]: ListaEnlazada} = {};
usuarios.forEach(user => {
    //ESTO LO HACEMOS PARA PODER RECORRER EL ARRAY DE USUARIOS Y OBTENER EL NOMBRE DE EL USUARIO PARA CADA ITERACION NUEVA
    //POR EJEMPLO SI EL USUARIO ES "jose" SE ASIGNA UNA NUEVA LISTA ANLAZADA PARA ESE USUARIO: UserData["jose"] = new ListaEnlazada();
    UserData[user] = new ListaEnlazada();
});

//CREAMOS UN NUEVO METODO PARA PODER HACER EL LOGIN DEVOLVIENDO UN VALOR VERDADERO O FALSO PARA LAS CONDICIONES QUE LE SIGUEN
function login(usuario: string, contra: string): boolean{
    //PRIMERO OBTENEMOS EL INDICE EN EL QUE SE ENCUENTRA EL USUARIO INGRESADO POR EL USUARIO, POR EJEMPLO
    //SI SE INGRESA "jose", SE VERIFICA EN EL ARRAY DE USUARIOS EN QUE POSICION ESTA, DEVOLVIENDO EL NUMERO 0
    const userIndex = usuarios.indexOf(usuario);
    //VERIFICAMOS QUE EL ARRAY NO ESTE VACIO, QUE EL USUARIO INGRESADO SI ESTE EN EL ARRAY Y QUE ADEMAS, EL INDICE DEL USUARIO INGRESADO
    //COINCIDA CON EL INDICE EN EL QUE SE ENCUENTRA LA CONTRASEÑA QUE DE MISMA MANERA INGRESA EL USUARIO
    if(userIndex !== -1 && contraseñas[userIndex] === contra){
        //EN CASO TODA LA CONDICION SE CUMPLA MOSTRARA UN MENSAJE DE BIENVENIDA Y RETORNARA UN VALOR VERDADERO
        console.log("Bienvenido!");
        return true;
    } else {
        //DE CASO CONTRARIO, ESTE NOS DEVOLVERA UN VALOR DE TIPO FALSO Y NO NOS DEJARA ENTRAR AL PROGRAMA
        console.log("Nombre de usuario y/o contraseña incorrectos");
        return false;
    }
}

//CREAMOS UN USUARIO
const usuario1 = "andres";
const contra1 = "diaz";

//LLAMAMOS AL LOGIN QUE, EN CASO DE SER VERDADERO SEGUIRA EJECUTANDO TODO LO DEMAS
//DE CASO CONTRARIO SOLO NOS MOSTRARA QUE ALGUNO DE LOS DATOS INGRESADOS SON INCORRECTOS
if(login(usuario1, contra1)){
    //AQUI ACCEDEMOS A LA LISTA ENLAZADA ASOCIADA AL USUARIO INGRESADO
    const userList = UserData[usuario1];
    //Y AQUI CREAMOS UNA INSTANCIA PARA LA GESTION DE COMPRA Y VENTA DE LAS EMPRESAS
    //ASOCIADAS A EL MISMO USUARIO INGRESADO
    const gestion = new GestionCompraYVenta(userList);

    //EN BASE AL USUARIO INGRESADO, INSTANCIAMOS LA CLASE EMPRESA E INGRESAMOS 3 EMPRESAS
    //EMPEZANDO POR SU CODIGO, SU NOMBRE Y SU PRECIO INICIAL
    userList.insert(new Empresa(1111, "McDonalds", 100));
    userList.insert(new Empresa(2222, "Nana", 222));
    userList.insert(new Empresa(3333, "Google", 100));

    //LUEGO CREAMOS 3 VARIABLES, LA DE PRECIOMIN CONTIENE EL PRECIO MINIMO A PAGAR POR UNA EMPRESA
    //LA DE PRECIOMAX CONTIENE EL PRECIO MAXIMO A PAGAR POR UNA EMPRESA
    //LA DE RESULTADOS OBTIENE LAS EMPRESAS ENTRE EL RANGO DE PRECIOMIN Y PRECIOMAX
    const precioMin = 100;
    const precioMax = 200;
    const resultados = gestion.buscarPorPrecio(precioMin, precioMax);

    //RECORREMOS TODO NUESTRO ARRAY DE LOS RESULTADOS DE LAS EMPRESAS ENTRE LOS RANGOS DE PRECIOMIN Y PRECIOMAX 
    //Y LOS IMPRIMIMOS EN PANTALLA
    console.log("Empresas entre el rango que buscas son: ");
    resultados.forEach(empresa => {
        console.log(empresa.toString());
    });

    //AHORA PARA PROBAR LA PARTE DE LA COMPRA Y VENTA ACTUALIZANDO EL PRECIO CREAMOS DOS VARIABLES CONSTANTES
    //EL PRIMERO ES EL CODIGO DE LA EMPRESA QUE QUEREMOS COMPRAR Y EL SEGUNDO ES AL PRECIO QUE LO QUEREMOS COMPRAR
    const codigoEmpresa = 2222;
    const precioCompra = 300;

    //LLAMAMOS AL METODO ACTUALIZAR PRECIO PARA PODER COMPRAR LA EMPRESA Y DARLE UN NUEVO PRECIO
    //EL NUEVO PRECIO VA A SER EL PRECIO EN EL QUE COMPRAMOS LA EMPRESA
    if(gestion.actualizarPrecio(codigoEmpresa, precioCompra)){
        //EN CASO LA EMPRESA CON EL CODIGO EXISTA MOSTRAR EL CODIGO DE LA EMPRESA Y A QUE PRECIO HA SIDO COMPRADA
        //DE CASO CONTRARIO MOSTRARA QUE LA EMPRESA CON EL CODIGO INGRESA NO EXISTE!
        console.log("La empresa con codigo: ",codigoEmpresa, "ha sido comprada con un precio de: Q.",precioCompra);
    } else {
        console.log("Empresa no encotrada!");
    }

    //AQUI EMPEZAMOS CON EL EJEMPLO DE PRIORIZACION DE EMPRESAS POR SU PRECIO
    //INSTANCIAMOS EL SISTEMA DE PRIORIZACION
    const sistemaPriorizacion = new Priorizacion();

    //AGREGAMOS ALGUNAS ÓRDENES DE COMPRA Y VENTA  CON DIFERENTES PRECIOS
    sistemaPriorizacion.agregarOrdenCompra(150);
    sistemaPriorizacion.agregarOrdenCompra(200);
    sistemaPriorizacion.agregarOrdenCompra(100);
    sistemaPriorizacion.agregarOrdenCompra(90);

    //OBTENEMOS LAS MEJORES ORDENES DE COMPRA Y VENTA SEGUN LA PRIORIDAD, EN EL CASO DE QUE NO EXISTAN DEVOLVEMOS NULL
    const mejorCompra = sistemaPriorizacion.obtenerMejorCompra();
    console.log("La mejor orden de compra es por: Q."+mejorCompra);

    const mejorVenta = sistemaPriorizacion.obtenerMejorVenta();
    console.log("La mejor orden de venta es por: Q."+mejorVenta);

    //AQUI EMPIEZA LA SECCION DE EMPAREJAMIENTO
    //CREAMOS UNA VARIABLE EMPAREJADOR A LA QUE LE ASIGNAREMOS NUESTRO EMPAREJAMIENTO JUNTO CON NUESTRO SISTEMA DE PRIORIZACION
    const emparejador = new Emparejamiento(sistemaPriorizacion);

    //EJECUTAMOS EL EMPAREJAMIENTO, SI HAY ORDENES QUE COINCIDAN EN PRECIOS, SE EJECUTARÁ LA TRANSACCIÓN
    emparejador.emparejarOrdenes();
}
}
