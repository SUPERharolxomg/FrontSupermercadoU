# FrontSupermercado_U — SPA del Supermercado (React)

Interfaz web (Single Page Application) del sistema de supermercado de **MarketSoft**. Consume la API REST de [taller-backend-supermercado](https://github.com/kobyt0/taller-backend-supermercado) y permite **ver, crear, editar y eliminar** registros de los módulos **Productos, Proveedores, Usuarios y Ventas**.

---

## Integrantes

| Integrante | Rol | Responsabilidades |
|---|---|---|
| Harold David Garces Casas | Frontend | Arquitectura de la SPA, consumo de la API con Axios, módulos CRUD (productos, proveedores, usuarios y ventas), diseño con Bootstrap y documentación. |

---

## Tecnologías

- **React 19** + **Vite** (servidor de desarrollo y compilación)
- **react-router-dom** (navegación entre páginas sin recargar)
- **Axios** (consumo de la API REST)
- **Bootstrap 5** + **Bootstrap Icons** (estilos e interfaz responsiva)

---

## Instrucciones de ejecución

### Requisitos

- Node.js 18 o superior
- El **backend** `taller-backend-supermercado` en ejecución en `http://localhost:3000` (ver su README para configurar PostgreSQL y el `.env`).

### Pasos

```bash
git clone https://github.com/SUPERharolxomg/FrontSupermercado_U.git
cd FrontSupermercado_U
npm install
npm start
```

La aplicación abre en **<http://localhost:5173>**.

Las peticiones a `/api/...` se redirigen al backend gracias al proxy de Vite (`vite.config.js`). También se puede llamar al backend directamente (tiene CORS activo): copia `.env.example` a `.env` y define `VITE_API_URL=http://localhost:3000/api`.

> Si la app muestra *"No se pudo conectar con el servidor"*, el backend no está en ejecución. Inícialo con `npm start` en la carpeta del backend y verifica que abra `http://localhost:3000/api/products`.

Si el backend corre en otra dirección:

```bash
# PowerShell
$env:API_TARGET="http://localhost:4000"; npm start
# bash
API_TARGET=http://localhost:4000 npm start
```

Otros scripts:

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Compila la aplicación para producción en `dist/` |
| `npm run preview` | Sirve la versión compilada |

---

## Arquitectura

La aplicación separa **acceso a datos**, **lógica de estado** y **presentación**. Cada capa solo conoce a la de abajo:

```
Páginas (pages/)  ──usa──▶  Hooks (hooks/)  ──usa──▶  Servicios (services/)  ──usa──▶  Axios (api/)  ──HTTP──▶  Backend
      │
      └──usa──▶  Componentes reutilizables (components/)
```

```
src
├── main.jsx                     # Punto de entrada: Bootstrap, Router y proveedor de notificaciones
├── App.jsx                      # Definición de rutas (react-router-dom)
├── modules.js                   # Lista de módulos (menú y panel de inicio)
├── api
│   └── axiosClient.js           # Instancia única de Axios (baseURL /api)
├── services
│   ├── createCrudService.js     # Fábrica de servicios CRUD: getAll, getById, create, update, remove
│   └── index.js                 # productService, userService, providerService, saleService
├── hooks
│   ├── useResourceList.js       # Carga un listado y elimina registros
│   ├── useResourceForm.js       # Formulario de creación/edición (POST o PUT según la ruta)
│   └── useOptions.js            # Carga datos de otro módulo para los <select>
├── context
│   └── NotificationContext.jsx  # Notificaciones (toasts) globales
├── components
│   ├── layout                   # Layout y barra de navegación
│   └── common                   # DataTable, FormCard, FormField, ConfirmModal, PageHeader, Loading, AlertMessage
├── pages
│   ├── Home.jsx                 # Panel con el conteo de cada módulo y el total vendido
│   ├── products/                # ProductList, ProductForm
│   ├── providers/               # ProviderList, ProviderForm
│   ├── users/                   # UserList, UserForm, roles
│   └── sales/                   # SaleList, SaleForm, SaleLinesEditor
└── utils                        # Formato de moneda/fecha, mensajes de error, total estimado de venta
```

### Decisiones de diseño

- **Sin código duplicado en el consumo de la API:** `createCrudService('products')` genera las cinco operaciones de un recurso. Los cuatro módulos usan la misma fábrica.
- **Un solo formulario por módulo para crear y editar:** `useResourceForm` revisa si la ruta trae `:id`. Si lo trae, carga el registro con `GET /:id` y al guardar hace `PUT`; si no, hace `POST`.
- **Tabla genérica:** `DataTable` recibe la configuración de columnas y dibuja las acciones *Editar* y *Eliminar* con un modal de confirmación.
- **La lógica de negocio queda en el backend:** el total de la venta y el descuento de stock los calcula el servidor. El frontend solo muestra un *total estimado* mientras se llena el formulario (`utils/sales.js`).
- **Las páginas no llaman a Axios directamente:** solo usan hooks y servicios, así la vista no se mezcla con el acceso a datos.

### Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio (resumen) |
| `/productos`, `/productos/nuevo`, `/productos/:id/editar` | Productos |
| `/proveedores`, `/proveedores/nuevo`, `/proveedores/:id/editar` | Proveedores |
| `/usuarios`, `/usuarios/nuevo`, `/usuarios/:id/editar` | Usuarios |
| `/ventas`, `/ventas/nueva`, `/ventas/:id/editar` | Ventas |

### Endpoints consumidos

| Módulo | GET (lista) | GET `/:id` | POST | PUT `/:id` | DELETE `/:id` |
|---|---|---|---|---|---|
| Productos | `/api/products` | ✔ | ✔ | ✔ | ✔ |
| Proveedores | `/api/providers` | ✔ | ✔ | ✔ | ✔ |
| Usuarios | `/api/users` | ✔ | ✔ | ✔ | ✔ |
| Ventas | `/api/sales` | ✔ | ✔ (con `details`) | ✔ (reemplaza `details`) | ✔ |

---

## Uso recomendado

1. Crear un **proveedor**.
2. Crear **productos** y asignarles el proveedor.
3. Crear un **usuario**.
4. Registrar una **venta**: elegir el usuario y agregar uno o más productos con su cantidad. Si el precio se deja vacío, se usa el precio actual del producto.
