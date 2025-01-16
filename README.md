# Evaluación módulo 2 - Claudia Rodríguez Hernández - Clautrópolis

## Búsqueda de series anime

Este proyecto consiste en la creación de una página web que sirva para buscar animes, agregarlos a favoritos, eliminarlos y gestionarlos de manera interactiva. Para trabajar con los datos de búsqueda los hemos guardado en el navegador mediante localStorge.
La información para llevar a cabo el proyecto se obtiene de la API pública **Jikan** a la que se accede mediante este link: [Jikan] https://api.jikan.moe/v4/anime?q= y se puede encontrar toda la información sobre como utilizar la API en este enlace: [API] https://docs.api.jikan.moe/#section/Information

### Características
* Búsqueda de animes: Permite buscar animes por nombre y mostrar los resultados de la búsqueda
* Favoritos: Puedes agregar los animes a favoritos y verlos en una columna exclusiva de los elementos favoritos.
* Almacenamiento: Los favoritos se almacenan en el localStorage para que al hacer otra búsqueda o reiniciar la página no se pierda lo marcado.
* Resetear: Existe la opción de resetear la columna de favoritos exclusivamente o de resetear la página por completo, incluyendo el input de búsqueda y la columna de resultados.
* Paginación: *Actualmente en desarrollo.* Si la información que devuelve la API tiene más de una página, se pueden navegar entre ellas.

### Funcionalidad
1. Buscar animes: Al ingresar un nombre en el input de búsqueda y clicar sobre el botón **buscar**, se realiza la solicitud a la API de Jikan. Los resultados se muestran en la sección de *resultados* con el título y la imagen del anime.
2. Agregar favoritos: Haciendo click sobre cualquiera de los animes de los resultados, se marcan como favoritos (se cambia el color de texto y de fondo para resaltar su categoría de favorito) y se pintan en una columna exclusiva para los animes favoritos. 
3. Eliminar de favoritos. Existen dos opciones para eliminar un anime de *favoritos*. La primera es clicando en el botón de la **X** que aparece al lado de la imagen del anime en la columna de favoritos, y la otra es clicando sobre el anime en la columna de búsqueda. Es decir, al igual que al hacer click en la columna de búsqueda se añadía a favoritos, si hacemos click una vez más se elimina. No solo se elimina de la columna de favoritos, sino que también vuelve a su estilo inicial, sin el fondo y el borde resaltados, propio de los elementos marcados como favoritos.
4. Almacenamiento. Cuando guardamos los elementos en favoritos, se guarda la información en el loclStorage, con el fin de que al hacer otra búsqueda o vovler a cargar la página, no se pierdan los elementos seleccionados. Este almacenamiento se va actualizando según se añaden o se eliminan los animes de favoritos. 
5. Resetear los favoritos y la página. Existe un botón de **Reset favoritos** que sirve para borrar todos los favoritos de golpe. Como ocurría antes, esta información se actualiza en el localStorage para que en ese caso no aparezca ningún favorito al recargar la página. Así mismo, existe un botón de **Reset** cuya función es la de resetear la página al completo. Se vacían tanto las columnas de favoritos y búsqueda como el input de búsqueda. La información también se elimina del localStorage para que la página quede totalmente limpia.

### Estructura del proyecto
Para llevar a cabo el proyecto hemos utilizado el Adalab Web Starter Kit, que define una estructura de proyecto concreta.
* index.html: Al ser un proyecto con pocos elementos en el html (ya que la mayoría se pintan mediante JS) no hemos utilizado partials, sino que hemos puesto toda la información en el index.html. Aquí también hemos enlazado los ficheros necesarios de JavaScript y de scss.
* Scss: En este caso hemos utilizado algunos partials para mejorar la claridad del proyecto. Hemos creado un archivo de reset y varibales, que se almacenan en el core, y otro de body, donde hemos puesto las especificaciones de estilo como tal.
* Javascript: La mayor parte del proyecto se ha centrado en el desarrollo de Javascript. Hemos creado un único archivo de main.js en el que encontramos toda la información relacionada con la funcionalidad de la web.
* README: En este archivo se documenta toda la información sobre el proyecto.

### Cómo ejecutar el proyecto
Para ejecutar el proyecto, clona este repositorio en tu ordenador con **git clone <URL>**. Al haberse realizado con el Adalab Web Starter Kit, deberás hacer un **npm install** en tu consola y con un **npm start** se ejecutará en el servidor para ver los cambios en tiempo real.

### Tecnologías utilizadas
* HTML5: Para llevar a cabo la estructura de la web.
* SCSS: Para definir los estilos y toda la parte visual del proyecto.
* JavaScript: Para definir toda la lógica de interacción, las funcionalidades de los distintos elementos de la web, así como las llamadas a la API y el almacenamiento local.



