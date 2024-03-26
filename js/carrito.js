// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso);

      // Cuando se elimina un curso del carrito
      carrito.addEventListener('click', eliminarCurso);

      // NUEVO: Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || []  ;
        // console.log(articulosCarrito);
        carritoHTML();
   });

    // Al Vaciar el carrito
      vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito =[];
        vaciarCarrito();
      });

       
}

// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
    e.preventDefault();
    // Delegation para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

// Lee los datos del curso que damos click y extrae la info del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // revisa si un elemento existe en el carrito
         if (articulosCarrito.some(curso => curso.id === infoCurso.id)) {
             const cursos = articulosCarrito.map(curso => {
                 if (curso.id === infoCurso.id) {
                     curso.cantidad++;
                     return curso; // retorna el objeto actualizado
                 } else {
                     return curso; // retorna el objeto no duplicado
                 }
             })
             articulosCarrito = [...cursos];
         } else {
            // agrega los elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
         }
   
    carritoHTML();
}

// Elimina el curso del carrito en el DOM
 function eliminarCurso(e) {
     e.preventDefault();
     if (e.target.classList.contains('borrar-curso')) {
         // e.target.parentElement.parentElement.remove();
         const cursoId = e.target.getAttribute('data-id')

         // Eliminar del arreglo del carrito
         articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
     }
 }


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {
    vaciarCarrito();
    //recorre el carrito y genera el html
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
         <td><img src="${curso.imagen}" width=100></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad} </td>
        <td>
         <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
        //agrega el html del carrito al tbody
        contenedorCarrito.appendChild(row);
    });

 // NUEVO: agregra arreglo al storage
     sincronizarStorage();
}

// NUEVO: 
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
    //     // forma lenta
    //     // contenedorCarrito.innerHTML = '';

    // forma rapida (recomendada)
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        sincronizarStorage();
    }
    
}
