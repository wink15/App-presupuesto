class Ingreso extends Dato{
    static contadorIngresos=0;

    constructor(descripcion,valor){
        super(descripcion,valor);
        //le va agreando valores al ingreso y empieza de 1 por el ++
        this._id=++Ingreso.contadorIngresos;


    }
    get id(){
        return this._id;
    }
}
