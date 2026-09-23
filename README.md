# Mobile Store

Aplicación web SPA desarrollada con React para consultar dispositivos móviles, ver sus características y añadir configuraciones de productos al carrito.

El proyecto ha sido desarrollado como solución a la prueba técnica Front-End.

## Tecnologías utilizadas

- React 19
- JavaScript ES6+
- Vite
- React Router
- Fetch API
- LocalStorage
- PropTypes
- Vitest
- React Testing Library
- ESLint
- Prettier
- Husky
- lint-staged

## Requisitos

Para ejecutar el proyecto es necesario disponer de:

- Node.js
- npm

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

La instalación ejecuta también el script `prepare`, encargado de inicializar Husky para los hooks de Git.

## Ejecutar la aplicación

Para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible por defecto en:

```text
http://localhost:5173
```

## Build

Para generar la versión de producción:

```bash
npm run build
```

Los archivos generados se almacenarán en:

```text
dist/
```

## Tests

Para ejecutar los tests:

```bash
npm test
```

Los tests están implementados utilizando Vitest y React Testing Library.

Actualmente la suite contiene 16 tests distribuidos en 6 archivos de test.

## Lint

Para comprobar la calidad del código mediante ESLint:

```bash
npm run lint
```

## Formateo

El proyecto utiliza Prettier para mantener un formato de código consistente.

Para formatear automáticamente el proyecto:

```bash
npm run format
```

Para comprobar el formato sin modificar archivos:

```bash
npm run format:check
```

Además, Husky y lint-staged ejecutan automáticamente ESLint y Prettier sobre los archivos preparados para commit mediante un hook `pre-commit`.

## Funcionalidades

La aplicación dispone de las siguientes funcionalidades:

- Listado de dispositivos obtenido desde la API.
- Visualización de imagen, marca, modelo y precio.
- Búsqueda en tiempo real por marca y modelo.
- Búsqueda tolerante a datos incompletos recibidos desde la API.
- Diseño responsive con un máximo de cuatro productos por fila.
- Navegación SPA mediante React Router.
- Vista de detalle de cada producto.
- Visualización de las principales características técnicas.
- Selección de almacenamiento.
- Selección de color.
- Añadir productos al carrito.
- Contador global del carrito.
- Persistencia del contador mediante LocalStorage.
- Sincronización del contador del carrito entre pestañas del navegador.
- Caché de las peticiones GET durante una hora.
- Breadcrumbs de navegación.
- Gestión de productos sin precio.
- Mensaje cuando una búsqueda no devuelve resultados.

## API

La aplicación utiliza la siguiente API:

```text
https://itx-frontend-test.onrender.com
```

Endpoints utilizados:

```text
GET  /api/product
GET  /api/product/:id
POST /api/cart
```

Para añadir un producto al carrito se envían:

```json
{
  "id": "productId",
  "colorCode": 1000,
  "storageCode": 2000
}
```

### Normalización de datos

La aplicación no utiliza directamente en la interfaz los objetos recibidos desde la API.

La función `toProduct()` situada en `services/api.js` actúa como capa de normalización entre el contrato externo y el modelo utilizado por la aplicación.

Entre otras cosas:

- normaliza `primaryCamera` como un array;
- normaliza `secondaryCamera` como un array;
- mantiene compatibilidad con el campo incorrecto `secondaryCmera` del API;
- normaliza `dimensions`, manteniendo compatibilidad con `dimentions`;
- garantiza valores por defecto para `brand`, `model` y `options`.

De esta forma, los componentes de la interfaz trabajan con un modelo consistente y quedan menos acoplados a posibles inconsistencias o cambios del API externo.

## Gestión de peticiones asíncronas

La lógica común de carga de datos se ha extraído al hook reutilizable `useAsync`.

Este hook centraliza los estados de carga, datos y error utilizados por las páginas de listado y detalle.

También evita actualizar el estado con el resultado de una operación asíncrona cuando el efecto correspondiente ya ha sido limpiado, reduciendo posibles condiciones de carrera al navegar entre vistas.

## Caché

Las respuestas de las peticiones GET se almacenan en LocalStorage.

La caché tiene una duración máxima de una hora. Si los datos almacenados superan ese tiempo, se eliminan y se realiza una nueva petición al API.

## Validación de propiedades

Los componentes que reciben propiedades utilizan PropTypes para documentar y validar sus contratos en tiempo de desarrollo.

Se ha definido un `productPropType` reutilizable para representar el modelo normalizado de producto y evitar duplicar su definición entre componentes.

## Estructura del proyecto

```text
src/
├── components/
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   └── SearchBar.jsx
│
├── context/
│   ├── cartContext.js
│   ├── CartContext.jsx
│   └── useCart.js
│
├── hooks/
│   └── useAsync.js
│
├── pages/
│   ├── ProductListPage.jsx
│   └── ProductDetailPage.jsx
│
├── propTypes/
│   └── productPropTypes.js
│
├── services/
│   └── api.js
│
├── test/
│   └── setup.js
│
├── utils/
│   └── cache.js
│
├── App.jsx
├── main.jsx
└── index.css
```

## Scripts disponibles

| Comando                | Descripción                                 |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Inicia Vite en modo desarrollo              |
| `npm run build`        | Genera el build de producción               |
| `npm test`             | Ejecuta los tests                           |
| `npm run lint`         | Ejecuta ESLint                              |
| `npm run format`       | Formatea el proyecto con Prettier           |
| `npm run format:check` | Comprueba el formato sin modificar archivos |

## Notas

### Comportamiento del carrito

El API devuelve actualmente `count: 1` en cada operación de añadir al carrito. Dado que este valor no se comporta como se describe en la especificación original del API, el cliente no depende de él para mantener el estado del carrito.

En su lugar, el contador del carrito se incrementa localmente en `+1` después de cada operación de añadido realizada correctamente. De esta forma, el comportamiento de la interfaz es predecible y se evita acoplar el cliente a una respuesta del API que no es fiable.

El contador del carrito se persiste en `localStorage` y se sincroniza entre distintas pestañas del navegador mediante el evento `storage`.

### React 19

El uso de React 19 no obliga a utilizar `use`, Suspense, Server Components o Actions.

Este proyecto es una pequeña aplicación SPA (_Single Page Application_) construida con Vite y React Router que consume una API REST. Introducir estas funcionalidades de React 19 sin una necesidad concreta añadiría complejidad innecesaria, por lo que se ha optado deliberadamente por un enfoque convencional de obtención de datos y gestión de estado en el cliente.

## Autor

Prueba técnica Front-End.
JOSÉ MANUEL RODRIGO COCA
jose.rodrigo@globant.com
