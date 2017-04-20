# Device simulator

Creado para simular el comportamiento plug and play.
Para el tercer corte de Sistemas operativos..
Prof. Andreina Calderon
**Universidad Rafael Belloso Chacin (Urbe)**

### ¿Que  tecnologias se usaron en este proyecto?
- [Nodejs](https://nodejs.org/es/) .- que es el runtime de JavaScript
- [Electron](https://electron.atom.io/) .- Libreria de JavaScript para aplicaciones de escritorio
- Bundlers como Rollup y gulp
- [jetpack](https://github.com/szwacz/fs-jetpack) para un manejo facil de el sistema de archivos.
- Se uso un template para setear el modo de trabajo con electron.

Cabe destacar que estas tecnologias permiten que la aplicacion sea la misma en Windows MacOs y Linux

### ¿Como empezar a desarrollar?

- Primero que todo, debes tener [nodejs](https://nodejs.org/es/) instalado en tu maquina.
- git para clonar
- En tu consola adentro del proyecto ingresa los siguientes comandos para instalar dependencias.
```
npm install
npm start
```

Y listo, empieza a codear.
# Estructura del proyecto

La aplicacion esta dividida en dos carpetas

`src` - Esta carpeta es para archivos que necesitan ser transpilados o compilados (Archivos que no pueden ser usados por electron).

`app` -contiene todos los archivos estaticos (pon aqui  imagens, css, html etc.)que no necesitan ningun pre-procesado.

El build proccess compila todo lo de la carpeta `src` y lo pone dentro de la carpeta `app` luego que el build termina la carpeta `app` contiene la aplicacion ejecutable

# Para generar un instalador:

```
npm run release
```

Solo puedes crear un instalador para windows si estas en windows, lo mismo para Linux y MacOs.

Todas las acciones de empaquetado son hechas por [electron-builder](https://github.com/electron-userland/electron-builder). Tiene un monton de [opciones](https://github.com/electron-userland/electron-builder/wiki/Options), que puedes declarar en ["build" key en el archivo package.json]

Si quieres hacer aportes sientete libre de hacer un pull request.
ponte en contacto conmigo en mi correo sebassdc@gmail.com
o en twitter @sebassdc

# Creditos
- [Creating a device- -  driver](http://web.archive.org/web/20111204011222/http://www.rcnp.osaka-u.ac.jp/unix/DOCUMENTATION/HTML/AA-PUBVD-TE_html/drivertut5.html#DesSimple) Ideas sobre como crear drivers de dispositivos.
- [Connie Canelon](https://twitter.com/comi_canelon) Diseño logo e ideas.


# Licencia

Released under the MIT license.
