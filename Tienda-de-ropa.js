function TiendaDeRopa(){ 
  let comando;
    while (comando != "salir") {
      comando = prompt("Tenes 3 opciones:\n Salir \n Ver productos \n Enviar peticiones")


      switch (comando) {
        case "Salir":
          alert("cerrando tienda de ropa...")
          break;
        default:
          alert("Prenda no encontrada")
        break;
        case "Ver productos":
          for (let remera = 1; remera <= 5; remera++)
            alert("Este es la remera n° " + remera)
          let remeras = prompt("Cual remera te gusto mas?")
            alert("Gracias por compartir tu opinion") 
          break;
        case "Enviar peticiones":
          let comentario = prompt("Que prenda te gustaria en la pagina?")
           alert("Muchas Gracias, intentaremos que entren mas " + comentario)
          }
          break;}}

