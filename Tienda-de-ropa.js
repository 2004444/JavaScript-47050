class Item{
    constructor(nombre,precio,imagen){
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const remera = new Item("Remera alien", 60, "ropa og 1.PNG")
const buzo = new Item("Buzo negro", 90, "Buzo og .PNG")
const short = new Item("Short dorado", 200, "short epico.PNG")

const billetera = [];


let oro = 1000;

const elOro = document.querySelector("#oro span");
elOro.innerText = oro; 
const laBilletera = document.getElementById("billetera");

function comprar(Item){
    if (oro - Item.precio >= 0){
      billetera.push(Item);
      oro -= Item.precio;
      actualizarHTML();
    }else{
        alert(`No tenes los suficientes pesos para comprar ${Item.nombre}.`);
    }
}

function actualizarHTML(){
  elOro.innerText = oro;
  elInventario.innerHTML = "";
  for (const Item of billetera){
    //const indice = billetera.indexOf(Item);
    const li = `<li><img src="img/ ${Item.imagen} " alt=" ${Item.imagen} " /></li>`;
    laBilletera.innerHTML += li;
  }

}