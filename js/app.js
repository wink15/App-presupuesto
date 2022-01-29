const ingresos= [
new Ingreso('Sueldo',2100.00),
new Ingreso('Venta coche',1500)
];

const egresos=[
    new Egreso('Renta',900),
    new Egreso('Ropa',400)
];

let cargarApp=()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = ()=>{
    let totalIngreso=0;
    for(let ingreso of ingresos){
        totalIngreso+=ingreso.valor;

    }
    return totalIngreso;
}


let totalEgresos = ()=>{
    let totalEgreso=0;
    for(let egreso of egresos){
        totalEgreso+=egreso.valor;

    }
    return totalEgreso;
}

let cargarCabecero=()=>{
    let presupuesto= totalIngresos()- totalEgresos();
    let porcentajeEgreso= totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML= formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML=formatoPorcentaje(porcentajeEgreso); 
    document.getElementById('ingresos').innerHTML=formatoMoneda(totalIngresos());  
    document.getElementById('egresos').innerHTML=formatoMoneda(totalEgresos());

}

const formatoMoneda=(valor)=>{
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});

}
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

const cargarIngresos= ()=>{
    let ingresosHTML='';
    for(let ingreso of ingresos){
        //llama a la funcion crearingreso que lo que hace
        //es crear codigo html pasandole como parametro 
        //el ingreso que se obtuvo

        ingresosHTML+=crearIngresoHTML(ingreso);

    }
    //se agrega en el html el codigo generado abajo
    document.getElementById('lista-ingresos').innerHTML=ingresosHTML;

}


const crearIngresoHTML=(ingreso)=>{
    //se le pasa en las llaves el valor necesario y se crea el html
    let ingresoHTML=`
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
            <ion-icon name='close-circle-outline' 
            onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>  
    `;
    return ingresoHTML;
}

const cargarEgresos= ()=>{
    let egresosHTML='';
    for(let egreso of egresos){
        //llama a la funcion crearingreso que lo que hace
        //es crear codigo html pasandole como parametro 
        //el ingreso que se obtuvo

        egresosHTML+=crearEgresoHTML(egreso);

    }
    //se agrega en el html el codigo generado abajo
    document.getElementById('lista-egresos').innerHTML=egresosHTML;

}

const crearEgresoHTML=(egreso)=>{
    
    let egresoHTML=`
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
            <ion-icon name='close-circle-outline' 
            onclick='eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>`;
return egresoHTML;
}

const eliminarIngreso=(id)=>{
    //recorre el array de ingresos y si se cumple la cond devuelve el index
  let indice=  ingresos.findIndex(ingreso=>ingreso.id===id);
  //esta funcion sirve para eliminar, se le pasa el numero y la cantidad
    ingresos.splice(indice,1);
    cargarCabecero();
    cargarIngresos();

}

const eliminarEgreso=(id)=>{
    //recorre el array de ingresos y si se cumple la cond devuelve el index
  let indice=  egresos.findIndex(egreso=>egreso.id===id);
  //esta funcion sirve para eliminar, se le pasa el numero y la cantidad
    egresos.splice(indice,1);
    cargarCabecero();
    cargarEgresos();

}
let agregarDato=()=>{
    let forma=document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion=forma['descripcion'];
    let valor= forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value==='ingreso'){
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        }else if (tipo.value==='egreso'){
            egresos.push(new Egreso(descripcion.value,Number(valor.value)))
            cargarCabecero();
            cargarEgresos();
        }
    }
}