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

Ambas versiones consumen información desde una API REST, manejan datos en memoria durante la ejecución, muestran listas dinámicas, permiten navegación entre pantallas, implementan operaciones CRUD simuladas localmente y utilizan un mecanismo formal de manejo de estado.

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

La aplicación incluye las siguientes funcionalidades en ambas tecnologías:

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
| Buscador | Permite buscar series por título |
| Filtros | Permite filtrar por género, estado e idioma |
| Métricas internas | Muestra tiempo de respuesta API, cold start y registros en memoria |

---

## 4. Arquitectura del proyecto

Ambas aplicaciones siguen una organización basada en principios de arquitectura limpia, separando responsabilidades en capas.

### 4.1 Arquitectura propuesta

```txt
src/ o lib/
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

```

### 4.2 Capas principales

| Capa | Responsabilidad |
|---|---|
| `application` | Configuración general de la app, navegación y providers |
| `core` | Constantes, tema visual, utilidades y funciones compartidas |
| `features` | Módulos funcionales de la aplicación |
| `data` | Obtención y transformación de datos externos |
| `domain` | Entidades, contratos, repositorios abstractos y casos de uso |
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

- Flutter
- Dart
- Provider
- ChangeNotifier
- HTTP package
- TVMaze API
- Flutter build tools

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

### 6.3 CRUD local

Las operaciones CRUD se realizan sobre el estado global de la aplicación:

| Operación | Implementación |
|---|---|
| Consultar | Carga inicial desde TVMaze |
| Crear | Inserción de un nuevo registro local al inicio de la lista |
| Actualizar | Reemplazo del registro editado dentro del arreglo en memoria |
| Eliminar | Eliminación del registro seleccionado desde el arreglo en memoria |

---

## 7. Implementación en Flutter

La versión de Flutter fue desarrollada con Dart siguiendo la misma lógica funcional y visual de la versión en React Native. Para el manejo de estado se utilizó Provider junto con ChangeNotifier.

### 7.1 Pantallas principales

| Pantalla | Descripción |
|---|---|
| `ShowsScreen` | Catálogo principal de series |
| `ShowDetailScreen` | Detalle de una serie seleccionada |
| `ShowFormScreen` | Creación y edición de series |
| `MetricsScreen` | Visualización de métricas internas |

### 7.2 Manejo de estado

La aplicación utiliza un provider global encargado de manejar la lista de series, la carga de datos, los errores y las métricas internas.

El estado se maneja mediante:

```txt
ShowsProvider + Provider + ChangeNotifier
```

No se utiliza persistencia local en base de datos.

### 7.3 CRUD local

Las operaciones CRUD también se realizan sobre la lista almacenada en memoria:

| Operación | Implementación |
|---|---|
| Consultar | Carga inicial desde TVMaze |
| Crear | Inserción de un nuevo registro local al inicio de la lista |
| Actualizar | Reemplazo del registro editado dentro del arreglo en memoria |
| Eliminar | Eliminación del registro seleccionado desde el arreglo en memoria |

---

## 8. Métricas de comparación

Las métricas solicitadas para la comparación son:

| Métrica | Descripción |
|---|---|
| Tamaño final APK/AAB | Peso del archivo generado en modo release |
| Tiempo de respuesta API | Tiempo desde la solicitud al API hasta la carga de datos |
| Fluidez de interfaz | Evaluación del scroll, navegación e interacciones |
| Tiempo de compilación | Tiempo requerido para generar el build release |
| Cold Start | Tiempo desde abrir la app cerrada hasta mostrar la primera pantalla funcional |

Además, se agregó una métrica complementaria en ambas versiones:

| Métrica complementaria | Descripción |
|---|---|
| Registros en memoria | Cantidad de series mantenidas en RAM durante la ejecución |

---

## 9. Resultados de métricas - React Native Expo

| Métrica | Resultado | Método de medición |
|---|---:|---|
| Tiempo de respuesta API | 80 ms | Medición interna desde el inicio de la solicitud a TVMaze hasta la recepción de los datos y actualización del estado global |
| Cold Start | 795.6 ms | Medición aproximada desde el inicio de la aplicación hasta que la primera pantalla funcional queda lista |
| Registros en memoria | 40 registros | Cantidad de series cargadas y almacenadas en memoria mediante Context API y useReducer |
| Tamaño final APK | 102 MB | Tamaño del archivo `.apk` generado por EAS Build en perfil `preview` |
| Tiempo de compilación release | 21 min 22 s | Medido con EAS Build desde `Started at` hasta `Finished at` |
| Fluidez de interfaz | Buena | Revisión manual del scroll, navegación, filtros, formularios y operaciones CRUD |

---

## 10. Resultados de métricas - Flutter

| Métrica | Resultado | Método de medición |
|---|---:|---|
| Tiempo de respuesta API | 1595 ms | Medición interna desde el inicio de la solicitud a TVMaze hasta la recepción de los datos y actualización del estado global |
| Cold Start | 1596 ms | Medición aproximada desde el inicio de la aplicación hasta que la primera pantalla funcional queda lista |
| Registros en memoria | 40 registros | Cantidad de series cargadas y almacenadas en memoria mediante Provider y ChangeNotifier |
| Tamaño final APK | 46.4 MB | Tamaño del archivo `app-release.apk` generado con `flutter build apk --release` |
| Tiempo de compilación release | 13.93 s | Medido con `Measure-Command { flutter build apk --release }` |
| Fluidez de interfaz | Buena | Revisión manual del scroll, navegación, filtros, formularios y operaciones CRUD |

---

## 11. Tabla comparativa general

| Métrica | React Native Expo | Flutter | Observación |
|---|---:|---:|---|
| Tamaño final APK | 102 MB | 46.4 MB | Flutter generó un APK más liviano en esta prueba |
| Tiempo de respuesta API | 80 ms | 1595 ms | React Native registró menor tiempo interno de respuesta API |
| Fluidez de interfaz | Buena | Buena | Ambas interfaces respondieron de forma estable |
| Tiempo de compilación release | 21 min 22 s | 13.93 s | Flutter compiló mucho más rápido en la medición local |
| Cold Start | 795.6 ms | 1596 ms | React Native registró menor tiempo aproximado de arranque |
| Registros en memoria | 40 | 40 | Ambas versiones almacenan los datos en RAM |

> Nota metodológica: las mediciones de compilación no se realizaron en condiciones idénticas. React Native fue compilado mediante EAS Build en la nube, mientras que Flutter fue compilado localmente con `flutter build apk --release`. Por esta razón, el tiempo de compilación debe interpretarse teniendo en cuenta el entorno usado para cada tecnología.

---

## 12. Explicación detallada de las métricas en React Native

### 12.1 Tiempo de respuesta del API

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

### 12.2 Cold Start

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

### 12.3 Registros en memoria

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
Registros en memoria = 40 registros
```

Esto confirma que la aplicación mantiene los datos en memoria durante la ejecución y no depende de una base de datos local.

---

### 12.4 Tamaño final del APK

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

### 12.5 Tiempo de compilación release

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

### 12.6 Fluidez de interfaz

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

## 13. Explicación detallada de las métricas en Flutter

### 13.1 Tiempo de respuesta del API

El tiempo de respuesta del API en Flutter mide cuánto tarda la aplicación en solicitar los datos a TVMaze, recibirlos, transformarlos y almacenarlos dentro del estado global manejado por Provider.

El proceso usado fue el siguiente:

1. La aplicación inicia la carga de datos desde `ShowsProvider`.
2. Antes de ejecutar la solicitud HTTP, se toma una marca de tiempo inicial usando la función auxiliar `nowMs()`.
3. Luego se ejecuta el caso de uso `GetShows`.
4. El caso de uso llama al repositorio.
5. El repositorio llama al datasource remoto.
6. El datasource remoto realiza la solicitud HTTP a:

```txt
https://api.tvmaze.com/shows
```

7. Cuando la respuesta llega correctamente, los datos JSON se decodifican.
8. Cada registro se transforma desde `ShowModel` hacia la entidad interna `Show`.
9. Una vez recibidos y transformados los datos, se toma una segunda marca de tiempo.
10. La diferencia entre ambas marcas corresponde al tiempo de respuesta API.
11. El valor se almacena en el provider y se presenta en `MetricsScreen`.

El algoritmo usado puede resumirse así:

```txt
inicio = nowMs()
datos = solicitarDatosATVMaze()
series = transformarDatos(datos)
fin = nowMs()

tiempoRespuestaAPI = fin - inicio
```

En la ejecución registrada, el resultado fue:

```txt
Tiempo de respuesta API = 1595 ms
```

---

### 13.2 Cold Start

El Cold Start en Flutter mide el tiempo aproximado desde que se crea el provider principal hasta que la primera pantalla funcional queda lista con los datos cargados.

El proceso usado fue el siguiente:

1. Al crear `ShowsProvider`, se toma una marca de tiempo inicial llamada `_appStartedAt`.
2. Se inicia la aplicación mediante `runApp`.
3. Se monta la estructura principal de la aplicación.
4. Se registra el provider dentro de `AppProviders`.
5. Se ejecuta `loadShows()` como carga inicial.
6. Se solicita la información a la API de TVMaze.
7. Se transforman los registros recibidos.
8. Se almacenan las series en memoria dentro del provider.
9. Al finalizar la carga inicial, se toma una segunda marca de tiempo.
10. La diferencia entre esa segunda marca y `_appStartedAt` se registra como Cold Start aproximado.

El algoritmo usado puede resumirse así:

```txt
appStartedAt = nowMs()

iniciarAplicacion()
crearProvider()
solicitarDatosAPI()
guardarDatosEnEstado()
primeraPantallaFuncional = nowMs()

coldStart = primeraPantallaFuncional - appStartedAt
```

En la ejecución registrada, el resultado fue:

```txt
Cold Start = 1596 ms
```

Esta medición es aproximada, ya que se calcula desde la lógica interna de la aplicación. Aun así, sirve para comparar ambas versiones bajo un criterio similar.

---

### 13.3 Registros en memoria

La métrica de registros en memoria indica cuántas series fueron cargadas y guardadas en RAM durante la ejecución de la app Flutter.

El proceso usado fue el siguiente:

1. La aplicación solicita los datos a TVMaze.
2. La respuesta entrega una lista de series.
3. La implementación toma una cantidad limitada de registros para mantener el catálogo controlado.
4. Los registros se transforman a entidades `Show`.
5. La lista resultante se asigna al estado interno de `ShowsProvider`.
6. La pantalla de métricas lee `provider.shows.length`.
7. Ese valor se muestra como `Items in Memory`.

El algoritmo usado puede resumirse así:

```txt
datosAPI = solicitarDatosATVMaze()
series = transformarDatos(datosAPI)
provider.shows = series

registrosEnMemoria = provider.shows.length
```

En la ejecución registrada, el resultado fue:

```txt
Registros en memoria = 40 registros
```

---

### 13.4 Tamaño final del APK

El tamaño final del APK en Flutter mide el peso del archivo instalable generado para Android.

El proceso usado fue el siguiente:

1. Desde la carpeta `showly-flutter`, se ejecutó el comando:

```powershell
flutter build apk --release
```

2. Flutter generó el APK release.
3. El archivo fue ubicado en la ruta:

```txt
showly-flutter/build/app/outputs/flutter-apk/app-release.apk
```

4. Se abrió la ventana de propiedades del archivo en Windows.
5. En la propiedad `Tamaño`, Windows mostró el peso del APK.
6. Ese valor se registró como tamaño final de la aplicación Flutter.

El procedimiento puede resumirse así:

```txt
ejecutar flutter build apk --release
ubicar app-release.apk
abrir propiedades del archivo
leer tamaño del archivo
registrar tamaño en MB
```

El resultado obtenido fue:

```txt
Tamaño final APK = 46.4 MB
```

---

### 13.5 Tiempo de compilación release

El tiempo de compilación release en Flutter mide cuánto tarda el proceso local de generación del APK.

El proceso usado fue el siguiente:

1. Desde la carpeta `showly-flutter`, se ejecutó el comando en PowerShell:

```powershell
Measure-Command { flutter build apk --release }
```

2. PowerShell inició la medición del tiempo.
3. Flutter ejecutó el proceso de compilación release.
4. Al finalizar el build, PowerShell mostró la duración total.
5. Se tomó el valor `TotalSeconds` como métrica de compilación.

El resultado mostrado fue:

```txt
TotalSeconds: 13.9251959
```

El resultado se reportó redondeado como:

```txt
Tiempo de compilación release = 13.93 s
```

> Nota: esta medición corresponde a una ejecución local posterior, con dependencias y caché de Gradle ya preparadas. Por ello, puede ser menor que un primer build completamente limpio.

---

### 13.6 Fluidez de interfaz

La fluidez de interfaz en Flutter se evaluó mediante revisión manual de las interacciones principales, usando el mismo criterio aplicado a la versión de React Native.

El proceso de evaluación fue el siguiente:

1. Se abrió la aplicación Flutter.
2. Se verificó la carga inicial del catálogo.
3. Se probó el scroll vertical en la lista de series.
4. Se revisó la estabilidad visual de las tarjetas.
5. Se abrió la pantalla de detalle de varias series.
6. Se regresó desde el detalle hacia la pantalla principal.
7. Se utilizó el buscador por título.
8. Se probaron los filtros desplegables de género, estado e idioma.
9. Se abrió el formulario de creación de serie.
10. Se creó un nuevo registro local.
11. Se editó un registro existente.
12. Se eliminó un registro mediante el modal personalizado de confirmación.
13. Se observó si había bloqueos, saltos visuales, lentitud o errores.

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

La aplicación respondió de forma estable durante las interacciones principales.

---

## 14. Análisis comparativo

### 14.1 Tamaño final del APK

En esta prueba, Flutter generó un APK de **46.4 MB**, mientras que React Native Expo generó un APK de **102 MB**. Esto muestra que la versión de Flutter resultó más liviana en el archivo instalable final. La diferencia puede estar relacionada con el tipo de build generado, las dependencias incluidas por Expo y el empaquetado propio de cada tecnología.

### 14.2 Tiempo de respuesta API

React Native registró un tiempo de respuesta API de **80 ms**, mientras que Flutter registró **1595 ms**. En esta medición específica, React Native obtuvo un tiempo considerablemente menor. Sin embargo, esta métrica puede verse afectada por factores externos como la conexión de red, caché, momento exacto de la solicitud, carga del servicio remoto y entorno de ejecución. Por ello, para una comparación más robusta, lo ideal sería repetir la medición varias veces y calcular un promedio.

### 14.3 Cold Start

React Native registró un Cold Start aproximado de **795.6 ms**, mientras que Flutter registró **1596 ms**. Según estas mediciones internas, React Native inició más rápido hasta llegar a la primera pantalla funcional. Sin embargo, ambas mediciones son aproximadas porque fueron calculadas desde la lógica interna de cada aplicación, no mediante herramientas externas de profiling.

### 14.4 Tiempo de compilación release

Flutter registró un tiempo de compilación release de **13.93 segundos** en una ejecución local posterior con caché preparada. React Native Expo registró **21 minutos y 22 segundos** mediante EAS Build en la nube. La diferencia es significativa, pero debe interpretarse con cuidado porque no se midieron bajo el mismo entorno: Flutter se compiló localmente y React Native se compiló remotamente con EAS.

### 14.5 Fluidez de interfaz

Ambas aplicaciones obtuvieron una evaluación cualitativa de **buena**. En las dos versiones, el scroll del catálogo, la navegación entre pantallas, el uso del buscador, los filtros, los formularios y las operaciones CRUD respondieron de forma estable durante la revisión manual.

### 14.6 Registros en memoria

React Native cargó **40 registros** y Flutter cargó **40 registros**. En ambos casos, los datos se almacenan en memoria durante la ejecución y no se utiliza base de datos local.

---

## 15. Comandos principales - React Native

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

## 16. Comandos principales - Flutter

### Instalar dependencias

```powershell
flutter pub get
```

### Ejecutar en desarrollo

```powershell
flutter run
```

### Generar build release Android

```powershell
flutter build apk --release
```

### Medir tiempo de compilación release

```powershell
Measure-Command { flutter build apk --release }
```

### Ruta del APK generado

```txt
showly-flutter/build/app/outputs/flutter-apk/app-release.apk
```

---

## 17. Conclusiones

Después de implementar **Showly** en React Native con Expo y en Flutter, se pudo comprobar que ambas tecnologías permiten desarrollar una aplicación móvil funcional, visualmente atractiva y organizada bajo una arquitectura limpia. Las dos versiones cumplieron con los requisitos principales: consumo de API REST, manejo de datos en memoria, visualización de listas dinámicas, navegación entre pantallas, operaciones CRUD simuladas localmente y uso de un mecanismo formal de estado.

En cuanto al **tamaño final del APK**, Flutter obtuvo un resultado más favorable, generando un archivo de **46.4 MB** frente a los **102 MB** de React Native Expo. Esto indica que, bajo las condiciones de esta prueba, Flutter produjo una aplicación más liviana para Android.

Respecto al **tiempo de respuesta del API** y el **Cold Start**, React Native obtuvo mejores resultados en las mediciones internas realizadas, con **80 ms** para el consumo API y **795.6 ms** para el arranque aproximado. Flutter registró **1595 ms** para el consumo API y **1596 ms** para Cold Start. Sin embargo, estas métricas pueden variar según la red, el dispositivo, la caché, el entorno de ejecución y el momento de la medición.

En el **tiempo de compilación release**, Flutter mostró un tiempo mucho menor: **13.93 segundos** frente a los **21 minutos y 22 segundos** registrados en React Native Expo mediante EAS Build. No obstante, esta comparación debe interpretarse con cuidado, ya que Flutter fue medido localmente y React Native fue medido en un proceso remoto de EAS Build.

En términos de **fluidez de interfaz**, ambas aplicaciones ofrecieron una experiencia estable. El scroll, la navegación, los filtros, el buscador, los formularios y las operaciones CRUD funcionaron correctamente en las dos versiones.

En conclusión, **Flutter destacó por generar un APK más pequeño y por un proceso de compilación local más rápido**, mientras que **React Native Expo mostró mejores tiempos internos en la carga inicial de datos y arranque aproximado durante esta prueba**. La elección entre ambas tecnologías dependerá del contexto del proyecto: Flutter puede ser conveniente cuando se busca mayor control del paquete final y consistencia visual, mientras que React Native con Expo resulta atractivo para equipos con experiencia previa en JavaScript/TypeScript y un flujo de desarrollo rápido apoyado en el ecosistema de Expo.
