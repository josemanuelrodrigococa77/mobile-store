
# Mobile Store

Aplicación web SPA desarrollada con React para consultar dispositivos móviles, ver sus características y añadir configuraciones de productos al carrito.

El proyecto ha sido desarrollado como solución a la prueba técnica Front-End.

## Tecnologías utilizadas

- React
- JavaScript ES6
- Vite
- React Router
- Fetch API
- LocalStorage
- Vitest
- React Testing Library
- ESLint

## Requisitos

Para ejecutar el proyecto es necesario disponer de:

- Node.js
- npm

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

## Ejecutar la aplicación

Para iniciar la aplicación en modo desarrollo:

```bash
npm run start
```

La aplicación estará disponible por defecto en:

```text
http://localhost:5173
```

También puede utilizarse:

```bash
npm run dev
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
npm run test
```

Los tests están implementados utilizando Vitest y React Testing Library.

## Lint

Para comprobar la calidad del código mediante ESLint:

```bash
npm run lint
```

## Funcionalidades

La aplicación dispone de las siguientes funcionalidades:

- Listado de dispositivos obtenido desde la API.
- Visualización de imagen, marca, modelo y precio.
- Búsqueda en tiempo real por marca y modelo.
- Diseño responsive con un máximo de cuatro productos por fila.
- Navegación SPA mediante React Router.
- Vista de detalle de cada producto.
- Visualización de las principales características técnicas.
- Selección de almacenamiento.
- Selección de color.
- Añadir productos al carrito.
- Contador global del carrito.
- Persistencia del contador mediante LocalStorage.
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

## Caché

Las respuestas de las peticiones GET se almacenan en LocalStorage.

La caché tiene una duración máxima de una hora. Si los datos almacenados superan ese tiempo, se eliminan y se realiza una nueva petición al API.

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
├── pages/
│   ├── ProductListPage.jsx
│   └── ProductDetailPage.jsx
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

| Comando | Descripción |
|---|---|
| `npm run start` | Inicia la aplicación en modo desarrollo |
| `npm run dev` | Inicia Vite en modo desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run test` | Ejecuta los tests |
| `npm run lint` | Ejecuta ESLint |

## Autor

Prueba técnica Front-End.
JOSÉ MANUEL RODRIGO COCAjose.rodrigo@globant.com
