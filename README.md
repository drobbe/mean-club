# mean-club

El proyecto esta actualizado a las ultimas versionas de la librerias, pense que node 12 una version que no ha tenido soporte en mucho tiempo, por lo cual se require node v20.6.1 o superior para poder levantar, se que no es la version lts actual pero quise probar leer env. directamente con la nueva funcionalidad de node.

Por el lado de Angular esta desde la Version 16, vi el proyecto con un enfoque mas en red social, por lo que hize un infinite scroll en vez de listar en una tablas los clubs disponibles.

Agrege validaciones de jwt, codificar el password, un diseño responsive sencillo. Tambien agrege logger en la parte del back y restructure un poco todo. ademas de cambiar ciertas cosas debido a las versiones mas actuales de las librerias. Adicionalmente agrege la opción de crear un club mientras estes logeado.

Vi que desde el front habia endpoint para listar eliminar y editar usarios. Pero imagine que requeria acceso Basado en Role, asi que por terminos de tiempo los comente.

El proyecto apunta a una bd moongo creada por mi en Atlas sin embargo puede cambiarse desde el archivo .env.dev del back

Cualquier duda me pueden comentar por correo edgard1394@gmail.com o telefono 643216057

Para Levantar el back

```
npm run start
```

Para Levantar el front

````
```
npm run start
```
````
