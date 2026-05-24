# Showly Mobile Comparison

**Showly** es una aplicación móvil de catálogo de series desarrollada con dos tecnologías distintas: **React Native con Expo** y **Flutter**. El objetivo del proyecto es implementar la misma aplicación en ambas plataformas, usando las mismas funcionalidades, estructura general y lógica de negocio, para luego comparar su comportamiento técnico mediante métricas de rendimiento, tamaño, compilación y experiencia de uso.

Este repositorio contiene ambas implementaciones:

```txt
showly-mobile-comparison/
├── showly-react-native/
├── showly-flutter/
└── README.md
```

---

## 1. Objetivo del proyecto

El objetivo de esta actividad es comparar de manera objetiva y técnica el desarrollo de una misma aplicación móvil utilizando:

- React Native con Expo
- Flutter

Ambas versiones deben consumir información desde una API REST, manejar datos en memoria durante la ejecución, mostrar listas dinámicas, permitir navegación entre pantallas, implementar operaciones CRUD simuladas localmente y utilizar un mecanismo formal de manejo de estado.

---

## 2. Descripción general de Showly

**Showly** es una aplicación móvil para explorar, consultar y gestionar una colección local de series. La aplicación consume datos desde la API pública de TVMaze y permite al usuario visualizar series, consultar detalles, crear nuevos registros, editar información existente y eliminar series de la colección local.

La API utilizada es:

```txt
https://api.tvmaze.com/shows
```

La aplicación mantiene los datos en memoria durante la ejecución, sin usar base de datos local. Las operaciones de creación, edición y eliminación se realizan de forma simulada sobre el estado interno de la aplicación.

---

## 3. Funcionalidades implementadas

La aplicación incluye las siguientes funcionalidades:

| Funcionalidad | Descripción |
|---|---|
| Consumo de API REST | Consulta series desde `https://api.tvmaze.com/shows` |
| Almacenamiento en memoria | Los datos se mantienen en RAM durante la ejecución |
| Lista dinámica | Se muestra un catálogo visual de series |
| Scroll fluido | La lista permite desplazamiento vertical |
| Interacción con elementos | Cada serie permite abrir una pantalla de detalle |
| Pantalla principal | Muestra el catálogo, buscador, filtros y accesos principales |
| Pantalla de detalle | Muestra información ampliada de cada serie |
| Pantalla de creación/edición | Permite crear o modificar registros |
| Crear registros | Agrega una nueva serie localmente |
| Consultar registros | Lista y detalla series obtenidas desde la API |
| Actualizar registros | Modifica una serie existente en memoria |
| Eliminar registros | Elimina una serie mediante un modal de confirmación |
| Manejo de estado formal | React Native usa Context API + useReducer |

---

## 4. Arquitectura del proyecto

Ambas aplicaciones siguen una organización basada en principios de arquitectura limpia, separando responsabilidades en capas.

### 4.1 Arquitectura propuesta

```txt
src/
├── application/
│   ├── navigation/
│   └── providers/
│
├── core/
│   ├── constants/
│   ├── theme/
│   └── utils/
│
├── features/
│   └── shows/
│       ├── data/
│       │   ├── datasources/
│       │   ├── models/
│       │   └── repositories/
│       │
│       ├── domain/
│       │   ├── entities/
│       │   ├── repositories/
│       │   └── usecases/
│       │
│       └── presentation/
│           ├── components/
│           ├── screens/
│           └── state/
│
└── types/
```

### 4.2 Capas principales

| Capa | Responsabilidad |
|---|---|
| `application` | Configuración general de la app, navegación y providers |
| `core` | Constantes, tema visual, utilidades y funciones compartidas |
| `features` | Módulos funcionales de la aplicación |
| `data` | Obtención y transformación de datos externos |
| `domain` | Entidades, contratos y casos de uso |
| `presentation` | Pantallas, componentes visuales y manejo de estado |

---

## 5. Tecnologías utilizadas

### React Native con Expo

- React Native
- Expo
- TypeScript
- React Navigation
- Context API
- useReducer
- TVMaze API
- EAS Build

### Flutter

- Pendiente de implementación

---

## 6. Implementación en React Native

La versión de React Native fue desarrollada con Expo y TypeScript. Para la navegación se utilizó React Navigation, mientras que el manejo de estado se implementó mediante Context API y useReducer.

### 6.1 Pantallas principales

| Pantalla | Descripción |
|---|---|
| `ShowsScreen` | Catálogo principal de series |
| `ShowDetailScreen` | Detalle de una serie seleccionada |
| `ShowFormScreen` | Creación y edición de series |
| `MetricsScreen` | Visualización de métricas internas |

### 6.2 Manejo de estado

La aplicación utiliza un estado global en memoria. Este estado contiene:

- Lista de series cargadas.
- Estado de carga.
- Mensajes de error.
- Tiempo de respuesta del API.
- Tiempo aproximado de cold start.

El estado se maneja mediante:

```txt
ShowsProvider + showsReducer
```

No se utiliza persistencia local en base de datos.

---

## 7. Métricas de comparación

Las métricas solicitadas para la comparación son:

| Métrica | Descripción |
|---|---|
| Tamaño final APK/AAB | Peso del archivo generado en modo release |
| Tiempo de respuesta API | Tiempo desde la solicitud al API hasta la carga de datos |
| Fluidez de interfaz | Evaluación del scroll, navegación e interacciones |
| Tiempo de compilación | Tiempo requerido para generar el build release |
| Cold Start | Tiempo desde abrir la app cerrada hasta mostrar la primera pantalla funcional |

Además, en la versión de React Native se agregó una métrica complementaria:

| Métrica complementaria | Descripción |
|---|---|
| Registros en memoria | Cantidad de series mantenidas en RAM durante la ejecución |

---

## 8. Resultados de métricas - React Native Expo

| Métrica | Resultado | Método de medición |
|---|---:|---|
| Tiempo de respuesta API | 80 ms | Medición interna desde el inicio de la solicitud a TVMaze hasta la recepción de los datos y actualización del estado global |
| Cold Start | 795.6 ms | Medición aproximada desde el inicio de la aplicación hasta que la primera pantalla funcional queda lista |
| Registros en memoria | 39 registros | Cantidad de series cargadas y almacenadas en memoria mediante Context API y useReducer |
| Tamaño final APK | 102 MB | Tamaño del archivo `.apk` generado por EAS Build en perfil `preview` |
| Tiempo de compilación release | 21 min 22 s | Medido con EAS Build desde `Started at` hasta `Finished at` |
| Fluidez de interfaz | Buena | Revisión manual del scroll, navegación, filtros, formularios y operaciones CRUD |

---

## 9. Explicación detallada de las métricas en React Native

### 9.1 Tiempo de respuesta del API

El tiempo de respuesta del API mide cuánto tarda la aplicación en solicitar los datos a TVMaze y dejarlos disponibles dentro del estado global de la aplicación.

El proceso usado fue el siguiente:

1. La aplicación inicia la carga de datos desde el `ShowsProvider`.
2. Antes de ejecutar la solicitud HTTP, se toma una marca de tiempo inicial usando una función auxiliar llamada `now()`.
3. Luego se ejecuta el caso de uso encargado de obtener las series.
4. El caso de uso llama al repositorio.
5. El repositorio llama al datasource remoto.
6. El datasource remoto realiza la solicitud HTTP a:

```txt
https://api.tvmaze.com/shows
```

7. Cuando la respuesta llega correctamente, los datos se transforman desde el modelo externo de TVMaze hacia la entidad interna `Show`.
8. Una vez los datos son recibidos y transformados, se toma una segunda marca de tiempo.
9. La diferencia entre la segunda marca y la primera marca corresponde al tiempo de respuesta del API.
10. Ese valor se guarda en el estado global y se muestra en la pantalla `MetricsScreen`.

El algoritmo usado puede resumirse así:

```txt
inicio = now()
datos = solicitarDatosATVMaze()
series = transformarDatos(datos)
fin = now()

tiempoRespuestaAPI = fin - inicio
```

En la ejecución registrada, el resultado fue:

```txt
Tiempo de respuesta API = 80 ms
```

Esta métrica permite comparar qué tan rápido cada tecnología obtiene y prepara los datos iniciales para mostrarlos en pantalla.

---

### 9.2 Cold Start

El Cold Start mide el tiempo aproximado desde que la aplicación inicia hasta que la primera pantalla funcional está disponible para el usuario.

En esta implementación, el valor se obtuvo mediante una medición interna aproximada. El proceso fue el siguiente:

1. Al cargarse el módulo del provider de estado, se registra una marca de tiempo inicial llamada `appStartedAt`.
2. La aplicación empieza su proceso de arranque.
3. Se monta el provider global de series.
4. Se ejecuta la carga inicial de datos.
5. Se realiza la solicitud a la API de TVMaze.
6. Los datos se reciben, transforman y almacenan en el estado global.
7. Cuando la carga inicial finaliza y la pantalla principal ya puede funcionar con datos, se toma una segunda marca de tiempo.
8. La diferencia entre esa segunda marca y `appStartedAt` se guarda como tiempo aproximado de Cold Start.
9. El valor se muestra en la pantalla interna de métricas.

El algoritmo usado puede resumirse así:

```txt
appStartedAt = now()

iniciarAplicacion()
cargarProvider()
solicitarDatosAPI()
guardarDatosEnEstado()
primeraPantallaFuncional = now()

coldStart = primeraPantallaFuncional - appStartedAt
```

En la ejecución registrada, el resultado fue:

```txt
Cold Start = 795.6 ms
```

Esta medición es aproximada porque se calcula desde la lógica interna de la aplicación. Sin embargo, es útil para comparar ambas versiones si se aplica el mismo criterio en Flutter.

---

### 9.3 Registros en memoria

La métrica de registros en memoria indica cuántos elementos fueron cargados desde la API y mantenidos en RAM durante la ejecución de la aplicación.

Aunque esta no es una métrica principal de comparación solicitada, se incluyó como evidencia de que la aplicación cumple con el requisito de almacenamiento en memoria.

El proceso fue el siguiente:

1. La aplicación realiza la solicitud a TVMaze.
2. La respuesta retorna una lista de series.
3. Para mantener el catálogo controlado y facilitar la prueba visual, la implementación toma una cantidad limitada de registros.
4. Cada registro se transforma a la entidad interna `Show`.
5. Los registros transformados se guardan en el estado global manejado por Context API y useReducer.
6. La pantalla de métricas lee la longitud del arreglo de series almacenado en memoria.
7. Ese número se presenta como `Items in Memory`.

El algoritmo usado puede resumirse así:

```txt
datosAPI = solicitarDatosATVMaze()
series = transformarDatos(datosAPI)
estado.shows = series

registrosEnMemoria = estado.shows.length
```

En la ejecución registrada, el resultado fue:

```txt
Registros en memoria = 39 registros
```

Esto confirma que la aplicación mantiene los datos en memoria durante la ejecución y no depende de una base de datos local.

---

### 9.4 Tamaño final del APK

El tamaño final del APK mide el peso del archivo instalable generado para Android.

El proceso usado fue el siguiente:

1. Se configuró EAS Build para generar una versión Android en perfil `preview`.
2. Se ejecutó el comando de build:

```powershell
npx eas build -p android --profile preview
```

3. EAS generó el archivo `.apk` de la aplicación.
4. Al finalizar el build, EAS entregó una URL de descarga del archivo instalable.
5. El APK fue descargado en Windows.
6. Luego se abrió la ventana de propiedades del archivo.
7. En la propiedad `Tamaño`, Windows mostró el peso del APK.
8. Ese valor se registró como tamaño final del APK.

El procedimiento puede resumirse así:

```txt
ejecutar build en EAS
descargar APK generado
abrir propiedades del archivo
leer tamaño del archivo
registrar tamaño en MB
```

El resultado obtenido fue:

```txt
Tamaño final APK = 102 MB
```

Esta métrica permite comparar el peso final de la aplicación generada en React Native con el peso final de la versión en Flutter.

---

### 9.5 Tiempo de compilación release

El tiempo de compilación release mide cuánto tarda el proceso de generación del archivo instalable de la aplicación.

En este caso se usó EAS Build para generar el APK de Android. El proceso fue el siguiente:

1. Desde la carpeta `showly-react-native`, se ejecutó el comando:

```powershell
npx eas build -p android --profile preview
```

2. EAS inició el proceso de compilación en la nube.
3. Al consultar el historial de builds con:

```powershell
npx eas build:list
```

4. EAS mostró los datos del build finalizado.
5. En el registro se identificó la hora de inicio:

```txt
Started at: 24/5/2026, 1:04:59 p. m.
```

6. También se identificó la hora de finalización:

```txt
Finished at: 24/5/2026, 1:26:21 p. m.
```

7. Se calculó la diferencia entre ambas horas.
8. El resultado se registró como tiempo de compilación release.

El cálculo fue:

```txt
1:26:21 p. m. - 1:04:59 p. m. = 21 min 22 s
```

El resultado obtenido fue:

```txt
Tiempo de compilación release = 21 min 22 s
```

Esta métrica representa el tiempo requerido para generar el archivo `.apk` instalable en modo de distribución.

---

### 9.6 Fluidez de interfaz

La fluidez de interfaz se evaluó mediante revisión manual de las interacciones principales de la aplicación.

El proceso de evaluación fue el siguiente:

1. Se abrió la aplicación en el entorno de prueba.
2. Se verificó la carga inicial del catálogo.
3. Se probó el scroll vertical en la lista de series.
4. Se revisó si las tarjetas se desplazaban de forma estable.
5. Se abrió la pantalla de detalle de varias series.
6. Se verificó la navegación entre la pantalla principal y la pantalla de detalle.
7. Se probó el buscador por título.
8. Se probaron los filtros desplegables de género, estado e idioma.
9. Se abrió el formulario de creación de serie.
10. Se creó un nuevo registro local.
11. Se editó un registro existente.
12. Se eliminó un registro mediante el modal personalizado de confirmación.
13. Se verificó que los cambios se reflejaran visualmente sin bloquear la interfaz.

El procedimiento puede resumirse así:

```txt
probar scroll
probar navegación
probar búsqueda
probar filtros
probar creación
probar edición
probar eliminación
observar estabilidad visual y respuesta de la interfaz
```

El resultado cualitativo fue:

```txt
Fluidez de interfaz = Buena
```

La aplicación respondió de forma estable durante el desplazamiento, navegación, búsqueda, filtrado y operaciones CRUD locales.

---

## 10. Tabla comparativa general

Esta tabla se completará cuando la versión de Flutter esté implementada y medida.

| Métrica | React Native Expo | Flutter |
|---|---:|---:|
| Tamaño final APK/AAB | 102 MB | Pendiente |
| Tiempo de respuesta API | 80 ms | Pendiente |
| Fluidez de interfaz | Buena | Pendiente |
| Tiempo de compilación release | 21 min 22 s | Pendiente |
| Cold Start | 795.6 ms | Pendiente |

---

## 11. Comandos principales - React Native

### Instalar dependencias

```powershell
npm install
```

### Ejecutar en desarrollo

```powershell
npx expo start
```

### Ejecutar limpiando caché

```powershell
npx expo start -c
```

### Generar build Android con EAS

```powershell
npx eas build -p android --profile preview
```

### Consultar builds generados

```powershell
npx eas build:list
```

---

## 12. Estado actual del proyecto

| Plataforma | Estado |
|---|---|
| React Native Expo | Implementado |
| Flutter | Pendiente |
| Comparación final | Pendiente |

---

## 13. Conclusión parcial

La implementación de **Showly en React Native con Expo** permitió construir una aplicación visual, funcional y organizada mediante arquitectura limpia. La aplicación consume datos desde una API REST pública, mantiene los registros en memoria, permite navegar entre pantallas y ejecuta operaciones CRUD simuladas localmente.

A nivel de métricas, la versión de React Native obtuvo un tiempo de respuesta API de **80 ms**, un Cold Start aproximado de **795.6 ms**, un tamaño final de APK de **102 MB** y un tiempo de compilación release de **21 minutos y 22 segundos** usando EAS Build. La fluidez de la interfaz fue evaluada manualmente y se consideró buena durante las operaciones principales.

La comparación completa se realizará una vez se implemente la versión equivalente en Flutter, usando las mismas funcionalidades y criterios de medición.
