# artistsCrudCS
Desarrollo del proyecto - implementación de un CRUD y despliegue en la nube
___________________________________________

# Integrantes

Santiago Gesamá Valencia – 2160013

Cesar Augusto Osorio Pareja - 2159927
__________________

## Descripción

Este proyecto es una API REST creada con FastAPI que permite gestionar artistas (crear, listar, actualizar y eliminar). Utiliza SQLAlchemy como ORM para la base de datos y Pydantic para la validación de datos. El proyecto tiene su componente backend donde se ha creado lo solicitado y se ha desplegado en render, y existe un componente frontend desplegado en vercel.

_____________________________________________

## Instrucciones para su ejecucion local:

1) clonar el repositorio:
   
        git clone https://github.com/gesakro/artistCrudCS.git
       

   Se debe abrir la carpeta generada con el editor de código visual studio code

2) Gestión del entorno frontend:

- Abres una terminal y se escribe:
  
            cd frontend
  Luego:

         cd crud-interface
  
- En la terminal y dentro de la carpeta crud-interface, para descargar todas las dependencias escribe:
 
          npm install
   
3) Gestión del backend

- Abres una nueva terminal y en esta escribes:
   
          pip install fastapi
  También:

            pip install uvicorn


4) Ejecución de la aplicación:

En la terminal del backend, se debe iniciar ejecutando el comando:

    python -m uvicorn main:app --reload

Se indicará que se está ejecutando correctamente, para abrir el apartado de la documentación interactiva se debe acceder a través del link:

        http://127.0.0.1:8000/docs

Luego, en la terminal del frontend (crud-interface) se debe iniciar la aplicación ejecutando el comando:

    npm start

# Explicación de endpoints get

- /docs -> genera la documentación  interactiva
- /artists -> genera todos los artistas disponibles con su id, nombre, álbum id, nombre álbum, canción id y nombre de canción
- /artists/{artist_id} -> muestra toda la información anterior de un artista en específico en base a su id (ejemplo artista con id 1)
- /artists/{artist_id}/albums -> muestra todos los álbumes que tiene un artista en específico en base a su id
- /albums/full -> muestra todos los álbumes disponibles con su título, id, artista que le pertenece y canciones dentro del mismo

  Existen otros endpoints los cuales son de creación, actualización y eliminación pero estos funcionan directamente en el apartado del frontend



## Tecnologías utilizadas

- Python 3.11
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn
- React
- Render
- Vercel

# Enlaces de despliegue:
Documentación Interactiva:

    https://artistcrudcs.onrender.com/docs

Interfaz Crud:

    https://artist-crud-cs.vercel.app/
