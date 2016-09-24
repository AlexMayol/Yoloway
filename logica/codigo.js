//Variables globales necesarias para los metodos POST
var usuario,clave,nombre;
var contBoton=0, contIdFoto=0;
var crearRuta=false, puedoRegistro=false;
//Para todas las paginas
function creaMenu(){
	if(sessionStorage.nombre!=null)
		creaMenuUsuario();
	else
		creaMenuInvitado();
}
function creaMenuInvitado(){
	var div = document.getElementById("cssmenu");
	var ul = document.createElement("ul");
	//append inicio
	var li = document.createElement("li");
	var span= document.createElement("span");
	span.classList.add("icon-home");
	span.classList.add("active"); 
	
	var a=document.createElement("a");
	a.href="index.html";
	var texto = document.createTextNode("Inicio");
	a.appendChild(texto);
	
	li.appendChild(span);
	li.appendChild(a);
	ul.appendChild(li);
	
	//append login
	var li = document.createElement("li");
	var span= document.createElement("span");
	span.classList.add("icon-login");
	
	var a=document.createElement("a");
	a.href="login.html";
	var texto = document.createTextNode("Login");
	a.appendChild(texto);
	
	li.appendChild(span);
	li.appendChild(a);
	ul.appendChild(li);
	
	//append buscar rutas
	var li = document.createElement("li");
	var span= document.createElement("span");
	span.classList.add("icon-road");
	
	var a=document.createElement("a");
	a.href="rutas.html";
	var texto = document.createTextNode("Rutas");
	a.appendChild(texto);
	
	li.appendChild(span);
	li.appendChild(a);
	ul.appendChild(li);

	//append registro
	var li = document.createElement("li");
	var span= document.createElement("span");
	span.classList.add("icon-user-add");
	
	var a=document.createElement("a");
	a.href="registro.html";
	var texto = document.createTextNode("Registro");
	a.appendChild(texto);
	
	li.appendChild(span);
	li.appendChild(a);
	ul.appendChild(li);
	//Ultimo paso
	div.appendChild(ul);
}
function creaMenuUsuario(){
	var div = document.getElementById("cssmenu");
	var ul = document.createElement("ul");
	//append inicio
	var li = document.createElement("li");
	var span= document.createElement("span");
	span.classList.add("icon-home");
	span.classList.add("active");
	
	var a=document.createElement("a");
	a.href="index.html";
	var texto = document.createTextNode("Inicio");
	a.appendChild(texto);
	
	li.appendChild(span);
	li.appendChild(a);
	ul.appendChild(li);
	
	//append buscar rutas
	var li = document.createElement("li");
	var span= document.createElement("span");
	span.classList.add("icon-road");
	
	var a=document.createElement("a");
	a.href="rutas.html";
	var texto = document.createTextNode("Rutas");
	a.appendChild(texto);
	
	li.appendChild(span);
	li.appendChild(a);
	ul.appendChild(li);
	
	//append nueva ruta
	var li = document.createElement("li");
	var span= document.createElement("span");
	span.classList.add("icon-plus");
	span.classList.add("last");
	var span2= document.createElement("span");
	span2.classList.add("icon-road");
	var a=document.createElement("a");
	a.href="nueva_ruta.html";
	var texto = document.createTextNode("Nueva ruta");
	a.appendChild(texto);
	
	li.appendChild(span);
	li.appendChild(span2);
	li.appendChild(a);
	ul.appendChild(li);
	
	//append logout
	var li = document.createElement("li");
	var span= document.createElement("span");
	span.classList.add("icon-logout-1");
	
	var a=document.createElement("a");
	a.href="index.html";
	a.setAttribute('onclick', 'logout()');
	var texto = document.createTextNode("Logout");
	a.appendChild(texto);
	
	li.appendChild(span);
	li.appendChild(a);
	ul.appendChild(li);
	
	div.appendChild(ul);
}
/*function esUsuario(){ //para limitar el acceso a la pagina si no esta logueado
	if(!esUser)
		window.location.assign("index.html");
}*/
////////////////////////////Para index

////////////////////////////Para login
function checkLogin(){
	obj = crearObjAjax();
	 if(obj) { // Si se ha creado el objeto, se completa la petición ...
		 var login = document.getElementById("login").value; // Argumentos
		 var pass = document.getElementById("passLogin").value;
		 var args = "usu="+login+"&pwd="+pass;
		 url = "rest/login/";
		 url += login;
		 // Se establece la función (callback) a la que llamar cuando cambie el estado:
		 obj.onreadystatechange = callbackLogin; // función callback: procesarCambio
		 obj.open("POST", url, false); // Se crea petición GET a url, asíncrona ("true")
		 obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		 obj.send(args); // Se envía la petición
		 
 	}
}
function callbackLogin(){
	var json;
	if(obj.readyState == 4){ // valor 4: respuesta recibida y lista para ser procesada
		
		 if(obj.status == 200){ // El valor 200 significa "OK"
		 // Aquí se procesa lo que se haya devuelto:
			json = parsearJSON(obj.responseText);
			clave = json.clave;
			usuario = json.login;
			nombre = json.nombre;
			sessionStorage.nombre=usuario;
			sessionStorage.clave=clave;
			confirmarLogin();
			//alert(obj.responseText);
			// json = parsearJSON(obj.responseText);
		}else{ // cualquier otra cosa significa error
			 repiteLogin();
		 }
	}

}
function afterLogin(){
	if(!true){
		confirmarLogin();
	}else{
		repiteLogin();
	}
}
function confirmarLogin(){
	document.getElementById("loginCorrecto").style.display = "initial";
	document.getElementById("loginCorrecto").className="animated slideInLeft";
}
function repiteLogin(){
	document.getElementById("loginIncorrecto").style.display = "initial";
	document.getElementById("loginIncorrecto").className="animated slideInLeft";
}
function llevarAIndex(){
	document.getElementById("loginCorrecto").className="animated slideOutRight";
	setTimeout(function(){window.location.assign("index.html")},1200);
}
function repetirLogin(){
	document.getElementById("loginIncorrecto").className="animated slideOutRight";
	setTimeout(function(){window.location.assign("login.html")},1100);
}
////////Registro comprobar disponibilidad usuario
var obj, url;
function crearObjAjax(){
	 var xmlhttp;
	 if(window.XMLHttpRequest) { // Objeto nativo
	 	xmlhttp = new XMLHttpRequest(); // Se obtiene el nuevo objeto
	 }else if (window.ActiveXObject) { // IE(Windows): objecto ActiveX
	 	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	 }
	 return xmlhttp;
}

function parsearJSON(objeto){
	var obj;
	obj = window.JSON.parse(objeto);
	return obj;
}
function checkUser(){
	obj = crearObjAjax();
	 if(obj) { // Si se ha creado el objeto, se completa la petición ...
		 var login = document.getElementById("regUsu").value; // Argumentos
		 url = "rest/login/"
		 url  += login; 
		 // Se establece la función (callback) a la que llamar cuando cambie el estado:
		 obj.onreadystatechange = callback; // función callback: procesarCambio
		 obj.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
		 obj.send(); // Se envía la petición
		 
 	}
}
function callback(){
	var json;
	if(obj.readyState == 4){ // valor 4: respuesta recibida y lista para ser procesada
		 if(obj.status == 200){ // El valor 200 significa "OK"
		 // Aquí se procesa lo que se haya devuelto:
			 json = parsearJSON(obj.responseText);
			 if(json.disponible == "true"){
			 	document.getElementById("usernook").style.display = "none";
			 	document.getElementById("userok").style.display = "inline";
				puedoRegistro=true;
			 }else{
			 	document.getElementById("userok").style.display = "none";
			 	document.getElementById("usernook").style.display = "inline"
				puedoRegistro=false;
			 }
		 }else{ // cualquier otra cosa significa error
			 alert("ERROR");
		 }
	}
 
}
//////////////////////////////////Para nueva ruta
function checkFileSize(inputId){
	var id = inputId.id;
	var size = document.getElementById(id).files[0].size;
	var padre = document.getElementById(id).parentNode;
	if(size>512000){
		document.getElementById(id).value="";
		var p = document.createElement("p");
		p.innerHTML="Imagen muy pesada";
		p.style.backgroundColor="red";
		padre.appendChild(p);
		crearRuta=false;
	}else{
		crearRuta=true;
		var p = document.createElement("p");
		p.innerHTML="Imagen correcta";
		p.style.backgroundColor="green";
		padre.appendChild(p);
		var im = id.previousSibling;
		var reader = new FileReader();
		reader.onload = function(){
		var dataURL = reader.result;
		var output = document.getElementById(im.id);
		output.src = dataURL;
		};
		reader.readAsDataURL(document.getElementById(id).files[0]);
	}
}
var obj5;
function rutaCreada(){
	obj5 = crearObjAjax();
	 if(obj5) { // Si se ha creado el objeto, se completa la petición ...
		 var fecha = document.getElementsByName("date").value;
		 var titulo = document.getElementById("title").value;
		 var recorrido = document.getElementById("recc").value;
		 var descripcion = document.getElementById("descrip").value;
		 var dificultad = 4;
		 var distancia = document.getElementById("distancia").value;
		 var piefoto = ["Hola","Hola1"];
		 var fotos = ["Hola2","Hola3"];
		 
		 var args = "clave="+clave+"&login="+usuario+
		 "&fecha="+fecha+"&nombre="+titulo+"&recorrido="+recorrido+"&descripcion="
		 +descripcion+"&dificultad="+dificultad+"&distancia="+distancia+"&piefoto="
		 +piefoto+"&fotos="+fotos;
		 url = "rest/ruta/";
		
		
		 // Se establece la función (callback) a la que llamar cuando cambie el estado:
		 obj5.onreadystatechange = callbackNuevaRuta; // función callback: procesarCambio
		 obj5.open("POST", url, false); // Se crea petición GET a url, asíncrona ("true")
		 obj5.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		 obj5.send(args); // Se envía la petición
		
			
	}
	
}
function callbackNuevaRuta(){
	var json;
	if(obj5.readyState == 4){ // valor 4: respuesta recibida y lista para ser procesada
		
		 if(obj5.status == 200){ // El valor 200 significa "OK"
			var titulo = document.getElementById("title").value;
			var desc = document.getElementById("descrip").value;
			document.getElementById("rutaCreada").style.display = "initial";
			document.getElementById("rutaCreada").className="animated slideInLeft";
			document.getElementById("nomRuta").innerHTML=titulo;
			document.getElementById("descRuta").innerHTML=desc;
		 }
	}
}

function irAIndex(){
	document.getElementById("rutaCreada").className="animated slideOutRight";
	setTimeout(function(){window.location.assign("index.html")},1200);
}
function aniadeFoto(){
	var pos = document.getElementById("fotos");
	
	var div = document.createElement("div");
	div.classList.add("fichaFoto");
	pos.appendChild(div);

	var p = document.createElement("p");
	p.innerHTML="Nueva foto";
	
	var img = document.createElement("img");
	img.id=contIdFoto+"a";
	
	var input = document.createElement("input");
	input.type = "file";
	input.id = "nuevaFoto"+contIdFoto;
	contIdFoto++;
	input.setAttribute('onchange', 'checkFileSize(this)');
	
	var br = document.createElement("br");
	var pInfo = document.createElement("p");
	var boton = document.createElement("button");
	boton.innerHTML="X";
	boton.setAttribute('onclick', 'borraFicha(this)');
	boton.id=contBoton;
	contBoton++;
	
	//img.src
	
	div.appendChild(p);
	div.appendChild(img);
	div.appendChild(input);
	div.appendChild(br);
	div.appendChild(pInfo);
	div.appendChild(boton);
}
function borraFicha(elem){
	var id = elem.id;
	var x = document.getElementById(id);
	x.parentNode.parentNode.removeChild(x.parentNode);
}
//////////////////////////////////Para ruta especifica

////////////////////////////////Para registro
function checkRegistro(){
	var contra1 = document.getElementById("contra1").value;
	var contra2 = document.getElementById("contra2").value;
	if(puedoRegistro){
	if(contra1 != contra2){
			repitePass();
		}else 
			checkRegistroForm();
	}else{
		repiteReg();
	}
}
function confirmarRegistro(){
	document.getElementById("registrado").style.display = "initial";
	document.getElementById("registrado").className="animated slideInLeft";
}
function confirmarComentario(){
	document.getElementById("comentado").style.display = "initial";
	document.getElementById("comentado").className="animated slideInLeft";
}
function llevarALogin(){
		document.getElementById("registrado").className="animated slideOutRight";
		setTimeout(function(){window.location.assign("login.html")},1200);
}
function llevarARuta(){
		document.getElementById("comentado").className="animated slideOutRight";
		setTimeout(function(){window.location.assign("ruta.html")},1200);
}
function repitePass(){
	document.getElementById("passIncorrecta").style.display = "initial";
	document.getElementById("passIncorrecta").className="animated slideInLeft";
}
function repiteReg(){
	document.getElementById("NombreUso").style.display = "initial";
	document.getElementById("NombreUso").className="animated slideInLeft";
}
function intentarDeNuevo2(){
	document.getElementById("NombreUso").className="animated slideOutRight";
	setTimeout(function(){window.location.assign("registro.html")},1200);
}
function intentarDeNuevo(){
	document.getElementById("passIncorrecta").className="animated slideOutRight";
	setTimeout(function(){window.location.assign("registro.html")},1200);
}
function disponible(){
	if(estaDisponible){
		document.getElementById("nombreDisponible").style.display="initial";
		document.getElementById("nombreDisponible").style.backgroundColor="green";
		document.getElementById("nombreDisponible").innerHTML = "Nombre disponible :)";
	}else{
		document.getElementById("nombreDisponible").style.display="initial";
		document.getElementById("nombreDisponible").style.backgroundColor="red";
		document.getElementById("nombreDisponible").innerHTML = "Nombre no disponible :(";
	}
}

///////////////////Para los comentarios
function cargarComentarios(){
	obj2 = crearObjAjax();
	 if(obj2) { // Si se ha creado el objeto, se completa la petición ...
		 url = "rest/comentario/?u=10";
		 // Se establece la función (callback) a la que llamar cuando cambie el estado:
		 obj2.onreadystatechange = callbackComment; // función callback: callbackComment
		 obj2.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
		 obj2.send(); // Se envía la petición
		 
 	}
}
function callbackComment(){
	var json;
	var i;

	if(obj2.readyState == 4){ // valor 4: respuesta recibida y lista para ser procesada
		
		 if(obj2.status == 200){ // El valor 200 significa "OK"
		 // Aquí se procesa lo que se haya devuelto:
			json = parsearJSON(obj2.responseText);
			document.getElementsByClassName("comments")[0].innerHTML = "";
			for(i = 0;i<json.length;i++){
				var a = document.createElement("A");
				a.setAttribute("href","ruta.html#"+json[i].ID_RUTA);
				var article = document.createElement("ARTICLE");
				var span1 = document.createElement("SPAN");
				var span2 = document.createElement("SPAN");
				var h3 = document.createElement("H3");
				var p = document.createElement("P");
				var usuario = document.createTextNode(json[i].LOGIN+" el ");
				var fecha = document.createTextNode(json[i].FECHA);
				var titulo = document.createTextNode(json[i].TITULO);
				var texto = document.createTextNode(json[i].TEXTO);
				span1.appendChild(usuario);
				span2.appendChild(fecha);
				h3.appendChild(titulo);
				p.appendChild(texto);
				article.appendChild(span1);
				article.appendChild(span2);
				article.appendChild(h3);
				article.appendChild(p);
				var aux = document.getElementsByClassName("comments");//.appendChild(p);
				a.appendChild(article);
				aux[0].appendChild(a);
				//alert(aux[0].firstElementChild.firstElementChild.firstElementChild.innerHTML);	

				//elemento.classList.add("nombreClase");
			}
			//alert(obj.responseText);
			// json = parsearJSON(obj.responseText);
		}else{ // cualquier otra cosa significa error
			 alert("Error");
		 }
	}

}
////////////Para el buscador rutas.html
function crearObjetoRutas(){
	var ruta = new Object()
	ruta.tit = document.getElementsByName("btitulo")[0].value;
	ruta.getTitulo = function(){
		return ruta.tit;
	}
	ruta.rec = document.getElementsByName("brecorrido")[0].value;
	ruta.getRecorrido = function(){
		return ruta.rec;
	}
	ruta.desc = document.getElementsByName("bdescripcion")[0].value;
	ruta.getDescripcion = function(){
		return ruta.desc;
	}
	ruta.fini = document.getElementsByName("bfechaini")[0].value;
	ruta.getFechaInicio = function(){
		return ruta.fini;
	}
	ruta.ffin = document.getElementsByName("bfechafin")[0].value;
	ruta.getFechaFin = function(){
		return ruta.ffn;
	}
	ruta.dfmin = document.getElementsByName("bmindificultad")[0].value;
	ruta.getDificultadMin = function(){
		return ruta.dfmin;
	}
	ruta.dfmax = document.getElementsByName("bmaxdificultad")[0].value;
	ruta.getDificultadMax = function(){
		return ruta.dfmax;
	}
	ruta.dmin = document.getElementsByName("bdistanciamin")[0].value;
	ruta.getDistanciaMin = function(){
		return ruta.dmin;
	}
	ruta.dmax = document.getElementsByName("bdistanciamax")[0].value;
	ruta.getDistanciaMax = function(){
		return ruta.dmax;
	}
	ruta.autor = document.getElementsByName("bautor")[0].value;
	ruta.getAutor = function(){
		return ruta.autor;
	}
	return ruta;
}
var arrayRutas = [];
function getRutas(){
	obj = crearObjAjax();
	ruta = crearObjetoRutas();
	var primero = true;
	 if(obj) { // Si se ha creado el objeto, se completa la petición ...
		  // Argumentos
		 url = "rest/ruta/?";
		 if(ruta.getTitulo() != ""){
		 	if(primero == false){
		 		url+= "&";
		 	}else{
		 		primero = false;
		 	}
		 	url += "t=" + ruta.getTitulo();
		 }
		 if(ruta.getRecorrido() != ""){
		 	if(primero == false){
		 		url+= "&";
		 	}else{
		 		primero = false;
		 	}
		 	url += "r=" + ruta.getRecorrido();
		 }
		 if(ruta.getDescripcion() != ""){
		 	if(primero == false){
		 		url+= "&";
		 	}else{
		 		primero = false;
		 	}
		 	url += "d=" + ruta.getDescripcion();
		 }
		 if(ruta.getFechaInicio() != ""){
		 	if(primero == false){
		 		url+= "&";
		 	}else{
		 		primero = false;
		 	}
		 	url += "fi=" + ruta.getFechaInicio();
		 }
		 if(ruta.getFechaFin() != ""){
		 	if(primero == false){
		 		url+= "&";
		 	}else{
		 		primero = false;
		 	}
		 	url += "ff=" + ruta.getFechaFin();
		 }
		 if(ruta.getDistanciaMin() != ""){
		 	if(primero == false){
		 		url+= "&";
		 	}else{
		 		primero = false;
		 	}
		 	url += "di=" + ruta.getDistanciaMin();
		 }
		 if(ruta.getDistanciaMax() != ""){
		 	if(primero == false){
		 		url+= "&";
		 	}else{
		 		primero = false;
		 	}
		 	url += "df=" + ruta.getDistanciaMax();
		 }
		 if(ruta.getDificultadMin() != ""){
		 	if(primero == false){
		 		url+= "&";
		 	}else{
		 		primero = false;
		 	}
		 	url += "dfi=" + ruta.getDificultadMin();
		 }
		 if(ruta.getDificultadMax() != ""){
		 	if(primero == false){
		 		url+= "&";
		 	}else{
		 		primero = false;
		 	}
		 	url += "dff=" + ruta.getDificultadMax();
		 }
		 // Se establece la función (callback) a la que llamar cuando cambie el estado:
		 obj.onreadystatechange = callbackRutas; // función callback: procesarCambio
		 obj.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
		 obj.send(); // Se envía la petición
		 
 	}
}
function callbackRutas(){
	var json;
	if(obj.readyState == 4){ // valor 4: respuesta recibida y lista para ser procesada
		 if(obj.status == 200){ // El valor 200 significa "OK"
		 // Aquí se procesa lo que se haya devuelto:
		
			 arrayRutas = parsearJSON(obj.responseText);
			/* for(var i=0;i<json.length;i++){
			 	arrayRutas[i] = json[i];
			 }*/
			 ordenarRutas();
		 }else{ // cualquier otra cosa significa error
			 alert("ERROR");
		 }
	}
}
function ordenarRutas(){
	var patron;
	var radPatron;
	var ascdesc;
	var radAscdesc;
	var boolasc;
	radPatron = document.getElementsByName("radPatron");
	radAscdesc = document.getElementsByName("radAscdesc");
	for(var i=0;i<radPatron.length;i++){
		if(radPatron[i].checked == true){
			patron = radPatron[i].value;
		}
	}
	for(var i=0;i<radAscdesc.length;i++){
		if(radAscdesc[i].checked == true){
			ascdesc = radAscdesc[i].value;
		}
	}
	if(ascdesc == "Ascendente"){
		boolasc = true;
	}else{
		boolasc = false;
	}
	var arPatron = [];
	var arAux = [];
	if(patron == "Titulo"){
		for(var i=0;i<arrayRutas.length;i++){
			arPatron[i] = arrayRutas[i].NOMBRE;
		}
		arPatron.sort();
		if(boolasc == true){
			arPatron.reverse();
		}
		var cont = 0;
		for(var i =0;i<arPatron.length;i++){
			for(var j=0;j<arrayRutas.length;j++){
				if(arPatron[i] == arrayRutas[j].NOMBRE){
					arAux[cont] = arrayRutas[j];
					cont++;
				}
			}
		}
		for(var i=0;i<arAux.length;i++){
			arrayRutas[i] = arAux[i];
		}
	}else if(patron == "Fecha"){
		for(var i=0;i<arrayRutas.length;i++){
			arPatron[i] = arrayRutas[i].FECHA;
		}
		arPatron.sort();
		if(boolasc == true){
			arPatron.reverse();
		}
		var string = "";
		
		var cont = 0;
		for(var i =0;i<arPatron.length;i++){
			for(var j=0;j<arrayRutas.length;j++){
				if(arPatron[i] == arrayRutas[j].FECHA){
					arAux[cont] = arrayRutas[j];
					cont++;
				}
			}
		}
		for(var i=0;i<arAux.length;i++){
			arrayRutas[i] = arAux[i];
		}
		 
	}else if(patron =="Dificultad"){
		for(var i=0;i<arrayRutas.length;i++){
				arPatron[i] = arrayRutas[i].DIFICULTAD;
			}
			arPatron.sort();
			if(boolasc == true){
				arPatron.reverse();
			}
			var string = "";
			
			var cont = 0;
			for(var i =0;i<arPatron.length;i++){
				for(var j=0;j<arrayRutas.length;j++){
					if(arPatron[i] == arrayRutas[j].DIFICULTAD){
						arAux[cont] = arrayRutas[j];
						cont++;
					}
				}
			}
			for(var i=0;i<arAux.length;i++){
				arrayRutas[i] = arAux[i];
			}
	}else{
		for(var i=0;i<arrayRutas.length;i++){
			arPatron[i] = arrayRutas[i].DISTANCIA;
		}
		arPatron.sort();
		if(boolasc == true){
			arPatron.reverse();
		}
		
		var cont = 0;
		for(var i =0;i<arPatron.length;i++){
			for(var j=0;j<arrayRutas.length;j++){
				if(arPatron[i] == arrayRutas[j].DISTANCIA){
					arAux[cont] = arrayRutas[j];
					cont++;
				}
			}
		}
		for(var i=0;i<arAux.length;i++){
			arrayRutas[i] = arAux[i];
		}
	}
	document.getElementsByClassName("sectionRutas")[0].innerHTML = "";
	for(var z=0;z<arrayRutas.length;z++){
		var figure = document.createElement("FIGURE");
		var img = document.createElement("IMG");
		var figcaption = document.createElement("FIGCAPTION");
		var p1 = document.createElement("P");
		var p2 = document.createElement("P");
		var p3 = document.createElement("P");
		var p4 = document.createElement("P");
		var p5 = document.createElement("P");
		var texto1 = document.createTextNode("Fecha: "+arrayRutas[z].FECHA);
		var texto2 = document.createTextNode("Distancia: "+arrayRutas[z].DISTANCIA);
		var texto3 = document.createTextNode("Num. Fotos: "+arrayRutas[z].NFOTOS);
		var texto4 = document.createTextNode("Num. Comentarios: "+arrayRutas[z].NCOMENTARIOS);
		var texto5 = document.createTextNode("Dificultad: "+arrayRutas[z].DIFICULTAD);
		p1.appendChild(texto1);
		p2.appendChild(texto2);
		p3.appendChild(texto3);
		p4.appendChild(texto4);
		p5.appendChild(texto5);
		figcaption.appendChild(p1);
		figcaption.appendChild(p2);
		figcaption.appendChild(p3);
		figcaption.appendChild(p4);
		figcaption.appendChild(p5);
		img.setAttribute("href","ruta.html#"+arrayRutas[z].ID);
		img.setAttribute("src","img/"+arrayRutas[z].ARCHIVO);
		figure.appendChild(img);
		figure.appendChild(figcaption);
		document.getElementsByClassName("sectionRutas")[0].appendChild(figure);

	}
	
}
///Para cargar las 6 ultimas rutas en index
function cargarRutasIndex(){
	obj = crearObjAjax();
	 if(obj) { // Si se ha creado el objeto, se completa la petición ...
		 url = "rest/ruta/?u=6";
		 // Se establece la función (callback) a la que llamar cuando cambie el estado:
		 obj.onreadystatechange = callbackRutasIndex; // función callback: callbackComment
		 obj.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
		 obj.send(); // Se envía la petición
		 
 	}
}
var fotosIndex;
function callbackRutasIndex(){
	if(obj.readyState == 4){ // valor 4: respuesta recibida y lista para ser procesada
		 if(obj.status == 200){ // El valor 200 significa "OK"
		 // Aquí se procesa lo que se haya devuelto:
			fotosIndex = parsearJSON(obj.responseText);
			mostrarImagenesIndex();
		}else{
			alert("ERROR! HTTP Error "+obj.status);
		}
	}	
}
function mostrarImagenesIndex(){
	document.getElementsByClassName("sectionIndex")[0].innerHTML="";
	for(var z=0;z<fotosIndex.length;z++){
		var a = document.createElement("A");
		var figure = document.createElement("FIGURE");
		var img = document.createElement("IMG");
		var figcaption = document.createElement("FIGCAPTION");
		var p1 = document.createElement("P");
		var p2 = document.createElement("P");
		var p3 = document.createElement("P");
		var p4 = document.createElement("P");
		var p5 = document.createElement("P");
		var texto1 = document.createTextNode("Fecha: "+fotosIndex[z].FECHA);
		var texto2 = document.createTextNode("Distancia: "+fotosIndex[z].DISTANCIA);
		var texto3 = document.createTextNode("Num. Fotos: "+fotosIndex[z].NFOTOS);
		var texto4 = document.createTextNode("Num. Comentarios: "+fotosIndex[z].NCOMENTARIOS);
		var texto5 = document.createTextNode("Dificultad: "+fotosIndex[z].DIFICULTAD);
		p1.appendChild(texto1);
		p2.appendChild(texto2);
		p3.appendChild(texto3);
		p4.appendChild(texto4);
		p5.appendChild(texto5);
		figcaption.appendChild(p1);
		figcaption.appendChild(p2);
		figcaption.appendChild(p3);
		figcaption.appendChild(p4);
		figcaption.appendChild(p5);
		a.setAttribute("href","ruta.html");
		a.setAttribute("onClick","guardarIdRuta("+fotosIndex[z].ID+")");
		img.setAttribute("src","img/"+fotosIndex[z].ARCHIVO);
		figure.appendChild(img);
		figure.appendChild(figcaption);
		a.appendChild(figure);
		document.getElementsByClassName("sectionIndex")[0].appendChild(a);

	}
}
function onLoadIndex(){
	cargarComentarios();
	cargarRutasIndex();
}
/////// Para comprobar si esta logueado en registro
function checkLogeado(){
	if(sessionStorage.nombre==null){
		window.location = "index.html";
	}
}
function checkRegistrado(){
	if(sessionStorage.nombre!=null){
		window.location = "index.html";
	}
}
//////submit ruta

//PARA RUTA.html
function mostrarRuta(){
	if(sessionStorage.nombre != null){
		cargarSlide();
		cargarRuta();
		comentariosRuta();
		mostrarForm();
	}else{
		document.body.innerHTML="";
		alert("Debes iniciar sesión para ver este contenido, se te redirijirá a INICIO");
		window.location = "index.html";
	}
}
function comentariosRuta(){
	if(sessionStorage.ruta == null){
		window.location = "index.html";
	}
	obj2 = crearObjAjax();
	if(obj2) { // Si se ha creado el objeto, se completa la petición ...
		 url = "rest/comentario/?idr=";
		 url += sessionStorage.ruta;
		 // Se establece la función (callback) a la que llamar cuando cambie el estado:
		 obj2.onreadystatechange = callbackCommentRuta; // función callback: callbackComment
		 obj2.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
		 obj2.send(); // Se envía la petición
		 
 	}
}
function cargarRuta(){
	if(sessionStorage.ruta == null){
		window.location = "index.html";
	}
	obj = crearObjAjax();
	 if(obj) { // Si se ha creado el objeto, se completa la petición ...
		 url = "rest/ruta/";
		 url += sessionStorage.ruta;
		 // Se establece la función (callback) a la que llamar cuando cambie el estado:
		 obj.onreadystatechange = callbackRuta; // función callback: callbackComment
		 obj.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
		 obj.send(); // Se envía la petición
		 
 	}
}

function callbackRuta(){
	var json;
	if(obj.readyState == 4){ // valor 4: respuesta recibida y lista para ser procesada
		
		 if(obj.status == 200){ // El valor 200 significa "OK"
		 // Aquí se procesa lo que se haya devuelto:
			json = parsearJSON(obj.responseText);
			var span1 = document.createElement("SPAN");
			var span2 = document.createElement("SPAN");
			var span3 = document.createElement("SPAN");
			var span4 = document.createElement("SPAN");
			var span5 = document.createElement("SPAN");
			var span6 = document.createElement("SPAN");
			var texto1 = document.createTextNode("Fecha");
			var texto2 = document.createTextNode("Titulo");
			var texto3 = document.createTextNode("Recorrido");
			var texto4 = document.createTextNode("Descripcion");
			var texto5 = document.createTextNode("Distancia");
			var texto6 = document.createTextNode("Dificultad");
			var p1 = document.createElement("P");
			var p2 = document.createElement("P");
			var p3 = document.createElement("P");
			var p4 = document.createElement("P");
			var p5 = document.createElement("P");
			var p6 = document.createElement("P");
			var valor1 = document.createTextNode(json[0].FECHA);
			var valor2 = document.createTextNode(json[0].NOMBRE);
			var valor3 = document.createTextNode(json[0].RECORRIDO);
			var valor4 = document.createTextNode(json[0].DESCRIPCION);
			var valor5 = document.createTextNode(json[0].DISTANCIA);
			var string="";
			for(var x=0;x<json[0].DIFICULTAD;x++){
				string+="P";
			}
			if(string==""){
				string="U"
			}
			var valor6 = document.createTextNode(string);
			span1.appendChild(texto1);
			span2.appendChild(texto2);
			span3.appendChild(texto3);
			span4.appendChild(texto4);
			span5.appendChild(texto5);
			span6.appendChild(texto6);
			p1.appendChild(valor1);
			p2.appendChild(valor2);
			p3.appendChild(valor3);
			p4.appendChild(valor4);
			p5.appendChild(valor5);
			p6.appendChild(valor6);
			p6.setAttribute("class","stars")
			var padre = document.getElementById("divRuta");
			padre.appendChild(span1);
			padre.appendChild(p1);
			padre.appendChild(span2);
			padre.appendChild(p2);
			padre.appendChild(span3);
			padre.appendChild(p3);
			padre.appendChild(span4);
			padre.appendChild(p4);
			padre.appendChild(span5);
			padre.appendChild(p5);
			padre.appendChild(span6);
			padre.appendChild(p6);
		}
	}
}
function callbackCommentRuta(){
	var json;
	if(obj2.readyState == 4){ // valor 4: respuesta recibida y lista para ser procesada
		
		 if(obj2.status == 200){ // El valor 200 significa "OK"
		 // Aquí se procesa lo que se haya devuelto:
			json = parsearJSON(obj2.responseText);
			for(i = 0;i<json.length;i++){
				var a = document.createElement("A");
				a.setAttribute("href","ruta.html");
				var article = document.createElement("ARTICLE");
				var span1 = document.createElement("SPAN");
				var span2 = document.createElement("SPAN");
				var h3 = document.createElement("H3");
				var p = document.createElement("P");
				var usuario = document.createTextNode(json[i].LOGIN+" el ");
				var fecha = document.createTextNode(json[i].FECHA);
				var titulo = document.createTextNode(json[i].TITULO);
				var texto = document.createTextNode(json[i].TEXTO);
				span1.appendChild(usuario);
				span2.appendChild(fecha);
				h3.appendChild(titulo);
				p.appendChild(texto);
				article.appendChild(span1);
				article.appendChild(span2);
				article.appendChild(h3);
				article.appendChild(p);
				var aux = document.getElementsByClassName("commentsRuta");//.appendChild(p);
				a.appendChild(article);
				aux[0].appendChild(a);
			}
		}
	}
}
function guardarIdRuta(idr){
	sessionStorage.ruta = idr;	
}
function mostrarForm(){
	if(sessionStorage.nombre == null){
		document.getElementById("formcomment").setAttribute("hidden",true);

	}
}
///PETICION POST comentarios ruta
var obj3;
function sendComment(){
	obj3 = crearObjAjax();
	 if(obj3) { // Si se ha creado el objeto, se completa la petición ...
		 var titulo = document.getElementsByName("titulo")[0].value; // Argumentos
		 var texto = document.getElementsByName("comentario")[0].value;
		 var idruta = sessionStorage.ruta;
		 var clave = sessionStorage.clave;
		 var nombre = sessionStorage.nombre;
		 var args = "clave="+clave+"&login="+nombre+"&titulo="+titulo+"&texto="+texto+"&idruta="+idruta;
		 url = "rest/comentario/";
		 // Se establece la función (callback) a la que llamar cuando cambie el estado:
		 obj3.onreadystatechange = callbackSendComment; // función callback: procesarCambio
		 obj3.open("POST", url, false); // Se crea petición GET a url, asíncrona ("true")
		 obj3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		 obj3.send(args); // Se envía la petición
		 
 	}
}
function callbackSendComment(){
	var json;
	if(obj3.readyState == 4){ // valor 4: respuesta recibida y lista para ser procesada
		
		 if(obj3.status == 200){ // El valor 200 significa "OK"
			confirmarLogin();
			//alert(obj.responseText);
			// json = parsearJSON(obj.responseText);
		}else{ // cualquier otra cosa significa error
			 alert("Http Error "+obj3.status);
		 }
	}

}
function logout(){
	sessionStorage.clear();
}
/////SLIDE
var arrayFotos;
var obj4;
function cargarSlide(){
	obj4 = crearObjAjax();
	 if(obj4) { // Si se ha creado el objeto, se completa la petición ...
		 url = "rest/foto/?idr=" + sessionStorage.ruta;
		 // Se establece la función (callback) a la que llamar cuando cambie el estado:
		 obj4.onreadystatechange = callbackSlide; // función callback: procesarCambio
		 obj4.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
		 obj4.send(); // Se envía la petición
		 
 	}
}
function callbackSlide(){
	var json;
	if(obj4.readyState == 4){ // valor 4: respuesta recibida y lista para ser procesada
		
		 if(obj4.status == 200){ // El valor 200 significa "OK"
			arrayFotos = parsearJSON(obj4.responseText);
			for(var i=0; i<arrayFotos.length; i++){
					cargarFotos(arrayFotos[i]);
				}
			// 
		}else{ // cualquier otra cosa significa error
			 alert("Http Error "+obj4.status);
		 }
	}

}
function cargarFotos(obj){
		var fig = document.createElement("figure");
		fig.setAttribute("id", "miniatura"+obj.ID);

		var a = document.createElement("a");
		a.setAttribute("href", "javascript:crearSlide("+obj.ID+");");

		var img = document.createElement("img");
		//img.setAttribute("class", "miniatura");
		img.setAttribute("height","200");
		img.setAttribute("width","200");
		img.setAttribute("src", "img/"+obj.ARCHIVO);
		img.setAttribute("alt", obj.DESCRIPCION);

		var figCap = document.createElement("figcaption");

		var h2 = document.createElement("h2");
		var textH2 = document.createTextNode("Descripción: ");
		h2.appendChild(textH2);

		var p = document.createElement("p");
		var textP = document.createTextNode(obj.DESCRIPCION);
		p.appendChild(textP);

		figCap.appendChild(h2);
		figCap.appendChild(p);

		fig.appendChild(img);
		fig.appendChild(figCap);

		a.appendChild(fig);

		document.getElementById("miniFotos").appendChild(a);
}

function crearSlide(id){
	var foto;
	for(var i=0; i<arrayFotos.length; i++){
		if(arrayFotos[i].ID==id){
			posImg=i;
			foto = document.getElementById("imagenSlide");			
			foto.setAttribute("src", "img/"+arrayFotos[i].ARCHIVO);
			foto.setAttribute("alt", arrayFotos[i].DESCRIPCION);
			cambiarSlide();
		}
	}
}

function cambiarImgSlide(direccion){
	foto = document.getElementById("imagenSlide");	
	if(direccion==0){
		if(posImg-1>=0){					
			posImg=posImg-1;
		}
		else{
			posImg=arrayFotos.length-1;
		}
	}else if(direccion==1){
		if(posImg+1<arrayFotos.length){		
			posImg=posImg+1;
		}
		else{
			posImg=0;
		}
	}


	foto.setAttribute("src", "img/"+arrayFotos[posImg].ARCHIVO);
	foto.setAttribute("alt", arrayFotos[posImg].DESCRIPCION);	
}

function cambiarSlide(){
	document.getElementById("slide").classList.toggle("slideOculto");
	document.getElementById("slide").classList.toggle("slideAparece");
}

//reg
var obj4;
function checkRegistroForm(){
	obj4 = crearObjAjax();
	 if(obj4) { // Si se ha creado el objeto, se completa la petición ...
		 var pass = document.getElementById("contra1").value;
		 var nom = document.getElementById("regUsu").value;
		 var email = document.getElementsByName("email")[0].value;
		 var nombre = document.getElementsByName("nombrereal")[0].value;
		 
		 var args = "usu="+nom+"&pwd1="+pass+"&nombre="+nombre+"&email="+email;
		 url = "rest/registro/";
		
		 // Se establece la función (callback) a la que llamar cuando cambie el estado:
		 obj4.onreadystatechange = callbackReg; // función callback: procesarCambio
		 obj4.open("POST", url, false); // Se crea petición GET a url, asíncrona ("true")
		 obj4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		 obj4.send(args); // Se envía la petición
		 
 	}
}
function callbackReg(){
	
	var json;
	if(obj4.readyState == 4){ // valor 4: respuesta recibida y lista para ser procesada
		alert(obj4.responseText);
		 if(obj4.status == 200){ // El valor 200 significa "OK"
			confirmarRegistro();
		 }
	}

}
