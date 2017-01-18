window.addEventListener("load", function(){
  var contentList = document.getElementById("contentList");
  var wrapperList = document.getElementById("wrapperList");
  var lista = document.getElementById("lista");
  var addCard = document.getElementById("addCard");
  var nameList = document.getElementById("nameList");
  var closeName = document.getElementById("closeName");
  var botonGuardar = document.getElementById("botonGuardar");
  var contador = 1;

  lista.addEventListener("click", añadir);
  nameList.addEventListener("keyup", validarInput);
  botonGuardar.addEventListener("click", boxForm);
  closeName.addEventListener("click", closeNameHidden);

  function añadir(e){
    lista.classList.add("hidden");
    addCard.classList.remove("hidden");
    nameList.focus();
  }

  function validarInput(){
    var long = nameList.value.length;
    if(long <= 0){
      botonGuardar.disabled = true;
    }else if(long >= 1){
      botonGuardar.disabled = false;
    }  
  }
  function boxForm(e){
    e.preventDefault();
    addCard.classList.add("hidden");
    lista.classList.remove("hidden");

    var padre = this.parentElement.parentElement;

    var mensajeTrello = document.createElement("div");
    var anadirCard= document.createElement("div");
    var contenedor = document.createElement("div");

    contenedor.classList.add("contenedor");
    mensajeTrello.classList.add("mensajeTrello");
    anadirCard.classList.add("añadirCard");
    padre.setAttribute("draggable", "true");

    mensajeTrello.innerText = nameList.value;
    nameList.value = "";

    anadirCard.innerText = "Añadir una Tarjeta...";
    
    contentList.appendChild(contenedor);
    padre.appendChild(anadirCard);
    padre.insertBefore(mensajeTrello,padre.childNodes[0]);
    contenedor.insertBefore(lista,contenedor.childNodes[0]);
    contenedor.insertBefore(addCard,contenedor.childNodes[0]);
    
    this.addEventListener("dragover", dragSobre);
    this.addEventListener("drop", dragSoltar);

    anadirCard.addEventListener("click", anadirTarjeta);

    function anadirTarjeta(){
      this.classList.add("hidden");

      var formulario = document.createElement("form");
      var textArea= document.createElement("textarea");
      var botonAnadir = document.createElement("button");
      var iconoLista= document.createElement("i");

      formulario.classList.add("contenedorTarjeta");
      textArea.classList.add("textArea");
      botonAnadir.classList.add("botonGuardar");
      iconoLista.classList.add("fa-times", "iconoLista");
      
      iconoLista.setAttribute("id", "iconoLista");
      botonAnadir.setAttribute("type","button");
      botonAnadir.setAttribute("disabled", "true");
      botonAnadir.textContent = "Añadir";

      formulario.insertBefore(textArea, formulario.childNodes[0]);
      formulario.insertBefore(botonAnadir, formulario.childNodes[1]);
      formulario.insertBefore(iconoLista, formulario.childNodes[2]);
      this.parentElement.appendChild(formulario);

      textArea.focus();
      textArea.addEventListener("keyup", validarTextArea)
      function validarTextArea(){
        var long = textArea.value.length;
        if(long <= 0){
          botonAnadir.disabled = true;
        }else if(long >= 1){
          botonAnadir.disabled = false;
        }
      }

      botonAnadir.addEventListener("click", tarjetaWhite);
      iconoLista.addEventListener("click", iconoListaHidden);
    }
    function iconoListaHidden(){
      this.parentElement.classList.add("hidden");
      this.parentElement.previousSibling.classList.remove("hidden");
    }
    function tarjetaWhite(){
      var post = document.createElement("div");

      post.classList.add("post");
      anadirCard.classList.remove("hidden");
      this.parentElement.classList.add("hidden");
      
      post.setAttribute("draggable", "true");
      post.setAttribute("id", contador++);
      
      post.innerText = this.previousSibling.value;

      this.parentElement.parentElement.insertBefore(post,this.parentElement);
      this.parentElement.parentElement.appendChild(anadirCard);

      post.addEventListener("dragstart", dragIniciado);
      post.addEventListener("dragleave", dragSalir);
    }
    function dragIniciado(e){
      e.dataTransfer.setData("text", e.target.id);
      this.classList.add("borderPost");
    }
    function dragSobre(e){
      e.preventDefault();
    }
    function dragSalir(e) {
      e.preventDefault();
      this.classList.remove("borderPost");
    }
    function dragSoltar(e){
      e.preventDefault();
      var idElementoArrastrado = e.dataTransfer.getData("text");
      this.insertBefore(document.getElementById(idElementoArrastrado),e.target);
    }
  }
  function closeNameHidden(e){
    addCard.classList.add("hidden");
    lista.classList.remove("hidden");
  }

});