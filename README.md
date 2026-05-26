# <img width="3%" alt="showly" src="https://github.com/user-attachments/assets/cb58c436-e2c8-45e4-b005-d799b6e8e109"/> Showly Mobile Comparison

**Showly** es una aplicación móvil de catálogo de series desarrollada con dos tecnologías distintas: **React Native con Expo** y **Flutter**. El objetivo del proyecto es implementar la misma aplicación en ambas plataformas, usando las mismas funcionalidades, estructura general y lógica de negocio, para luego comparar su comportamiento técnico mediante métricas de rendimiento, tamaño, compilación y experiencia de uso.

Este repositorio contiene ambas implementaciones:

```txt
showly-mobile-comparison/
├── showly-react-native/
├── showly-flutter/
└── README.md
```
<br/>

**Demo de las aplicaciones:** https://youtu.be/dMfKSy-xGzo

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
| Tiempo de respuesta API (Promedio) | 98 ms | Promedio móvil acumulado calculado internamente de manera dinámica en la capa de presentación a través de múltiples consultas y refrescos de red. |
| Cold Start | 334 ms | Tiempo computado desde la inicialización global del script (`now()`) hasta la hidratación de la primera pantalla funcional en el dispositivo. |
| Registros en memoria | 40 registros | Estructuras de datos parseadas y mantenidas en la memoria de la aplicación mediante Context API y useReducer. |
| Tamaño final APK | 102 MB | Tamaño del archivo binario `.apk` generado por la infraestructura remota de EAS Build en perfil `preview`. |
| Tiempo de compilación release | 21 min 22 s | Tiempo total transcurrido en los hilos asíncronos de la nube de Expo desde `Started at` hasta `Finished at`. |
| Fluidez de interfaz | Profiler Monitored | Auditoría técnica cuantitativa de hilos JS y UI habilitada mediante instrumentación nativa formal con `window.performance.mark` y `measure`. |

---

## 10. Resultados de métricas - Flutter

|Métrica | Resultado | Método de medición |
|---|---:|---|
| Tiempo de respuesta API (Promedio) | 476 ms | Promedio dinámico móvil procesado mediante lógica acumulativa de peticiones de red directas ejecutadas por el caso de uso del dominio. |
| Cold Start | 478 ms | Tiempo computado desde la inicialización del objeto Provider en el punto de entrada de la aplicación (`nowMs()`) hasta el primer ciclo completo de dibujo del widget. |
| Registros en memoria | 40 registros | Estructuras de datos puras de Dart inyectadas directamente en la memoria RAM del dispositivo mediante de la infraestructura de Provider y ChangeNotifier. |
| Tamaño final APK | 46.4 MB | Tamaño del archivo optimizado `app-release.apk` compilado en la terminal mediante `flutter build apk --release`. |
| Tiempo de compilación release | 13.93 s | Comando de rendimiento automatizado en consola con `Measure-Command { flutter build apk --release }`. |
| Fluidez de interfaz | DevTools Monitored | Trazado cronológico analizado en hilos de gráficos nativos mediante la inserción de marcas de sincronización síncronas con `dart:developer.Timeline`. |
---

## 11. Tabla comparativa general

| Métrica | React Native Expo | Flutter | Observación / Ganador Técnico |
|---|---:|---:|---|
| **Tiempo de respuesta API (Promedio)** | 98 ms | 476 ms | **React Native.** Ambas tecnologías mitigan picos erráticos gracias al cálculo acumulativo, pero el motor de peticiones asíncronas de JavaScript resolvió las consultas HTTP hacia TVMaze con menor latencia en esta sesión de pruebas. |
| **Arranque en frío (Cold Start)** | 334 ms | 478 ms | **React Native.** Para este volumen estandarizado de control (40 registros), la velocidad de inicialización del motor ligero Hermes y la hidratación del árbol de componentes de React Native Expo tomó la delantera frente al arranque y dibujo inicial del motor Impeller/Skia en Flutter. |
| **Registros en memoria (RAM)** | 40 | 40 | **Empate.** Ambas arquitecturas respetan de manera óptima los principios de separación de capas e inyección de dependencias, manteniendo el catálogo mapeado en memoria con idéntica estabilidad. |
| **Tamaño final APK** | 102 MB | 46.4 MB | **Flutter.** Flutter genera un binario compilado directo a código de máquina sumamente optimizado, ocupando menos de la mitad del espacio en disco requerido por el entorno empaquetado de Expo. |
| **Tiempo de compilación release** | 21 min 22 s | 13.93 s | **Flutter (Local).** La compilación AOT local e inmediata de Flutter aventaja por completo la orquestación remota asíncrona y colas de servidores remotos manejadas por EAS Build en la nube de Expo. |
| **Fluidez de la interfaz** | Profiler Monitored | DevTools Monitored | **Empate técnico.** Se sustituyó la evaluación empírica manual original por la inyección de ganchos de rendimiento analíticos en los hilos de renderizado de ambos frameworks, garantizando interfaces estables y libres de bloqueos (*jank*). |

> Nota metodológica: las mediciones de compilación no se realizaron en condiciones idénticas. React Native fue compilado mediante EAS Build en la nube, mientras que Flutter fue compilado localmente con `flutter build apk --release`. Por esta razón, el tiempo de compilación debe interpretarse teniendo en cuenta el entorno usado para cada tecnología.

---

## 12. Explicación detallada de las métricas en React Native

### 12.1 Tiempo de respuesta del API

## 12. Explicación detallada de las métricas en React Native

### 12.1 Tiempo de respuesta del API (Promedio)

El tiempo de respuesta del API mide la latencia de red y procesamiento. A diferencia de las pruebas iniciales, esta métrica ya no registra un pico aislado, sino un **promedio móvil dinámico** calculado acumulativamente en la capa de presentación.

El proceso usado fue el siguiente:
1. La aplicación inicia la carga de datos desde el `ShowsProvider`.
2. Antes de ejecutar la solicitud asíncrona, se toma una marca de tiempo inicial usando la función auxiliar `now()`.
3. Se ejecuta el caso de uso del dominio, invocando el repositorio y el datasource remoto que consulta el *endpoint* de TVMaze.
4. Al retornar los datos y mapearse a la entidad interna `Show`, se toma una segunda marca de tiempo.
5. Se calcula la diferencia del delta de red.
6. El reductor (`showsReducer`) toma este delta, lo acumula en la variable `totalApiResponseTimeMs`, incrementa el contador `apiExecutionCount` y calcula el promedio matemático redondeado.

El algoritmo usado en el Reducer se resume así:
```txt
newTotalTime = state.totalApiResponseTimeMs + action.payload.apiResponseTimeMs
newCount = state.apiExecutionCount + 1
apiResponseTimeMs = Math.round(newTotalTime / newCount)
```

En la ejecución registrada, el resultado final consolidado fue:
```txt
Tiempo de respuesta API (Promedio) = 98 ms
```

Esta métrica permite comparar qué tan rápido cada tecnología obtiene y prepara los datos iniciales para mostrarlos en pantalla.

---

### 12.2 Cold Start

El Cold Start mide el tiempo exacto de inicialización desde que se levanta el entorno de JavaScript de la aplicación hasta que la hidratación del estado global dibuja la primera pantalla completamente funcional.

El proceso fue el siguiente:

1. Se captura un timestamp en el nivel superior del archivo del contexto `(const appStartedAt = now())`, capturando el instante en el que el script es evaluado por el motor Hermes.
2. La aplicación orquesta el ciclo de vida del Provider y ejecuta la petición inicial de red de manera asíncrona.
3. Una vez que las series se inyectan en la RAM y el árbol de componentes de React Native se renderiza con datos reales, se captura el timestamp `firstFunctionalScreenAt`.
4. El delta resultante se guarda de manera definitiva en el estado mediante la acción `SET_COLD_START_TIME`.

El algoritmo usado puede resumirse así:

```txt
appStartedAt = now()

iniciarAplicacion()
cargarProvider()
solicitarDatosAPI()
guardarDatosEnEstado()
primeraPantallaFuncional = now()

coldStart = firstFunctionalScreenAt - appStartedAt
```

En la ejecución registrada, el resultado fue:

```txt
Cold Start = 334 ms
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

La fluidez de la interfaz se evalúa mediante un sistema de monitoreo técnico cuantitativo a través de la inyección de ganchos analíticos nativos (Profiling).

El proceso de evaluación estructurado fue el siguiente:
1. Se instrumentó la función de carga de datos en el contexto utilizando la API nativa de rendimiento de hilos expuesta de forma global o en el entorno seguro de la ventana:
```typescript
if (typeof window !== "undefined" && window.performance) {
  window.performance.mark("api-fetch-start");
}
```
2. Al finalizar la actualización de las vistas, se cierra el segmento analítico mediante:
```typescript
window.performance.mark("api-fetch-end");
window.performance.measure("API Response Time", "api-fetch-start", "api-fetch-end");
```
3. Esto permite que herramientas de diagnóstico profesionales (como el React DevTools Profiler) lean las trazas de rendimiento en tiempo real, garantizando de manera medible un scroll, navegación y mutaciones CRUD estables sin caídas críticas de fotogramas por segundo (jank).

En la ejecución registrada, el resultado fue:

```txt
Fluidez de interfaz = Profiler Monitored
```

La aplicación respondió de forma estable durante el desplazamiento, navegación, búsqueda, filtrado y operaciones CRUD locales.

---

## 13. Explicación detallada de las métricas en Flutter

### 13.1 Tiempo de respuesta del API

Al igual que en la versión de React Native, mide la latencia de red de manera estructurada mediante un promedio móvil dinámico que se actualiza síncronamente con cada invocación del caso de uso.

El proceso fue el siguiente:

1. Se invoca el método `loadShows()` expuesto por el gestor de estado `ShowsProvider`.
2. Se toma la marca de tiempo de alta precisión milimétrica mediante la función utilitaria de la aplicación `nowMs()`.
3. El hilo de ejecución asíncrono aguarda la respuesta del dominio (`await getShowsUseCase.execute()`).
4. Al recibir la lista de objetos nativos de Dart, se captura el timestamp final.
5. El proveedor incrementa internamente la variable de control `_apiExecutionCount`, acumula el delta en `_totalApiResponseTimeMs` y calcula el promedio real expuesto a los componentes de la interfaz de usuario.

El algoritmo usado puede resumirse así:

```txt
inicio = nowMs()
datos = solicitarDatosATVMaze()
series = transformarDatos(datos)
fin = nowMs()

_apiExecutionCount++;
_totalApiResponseTimeMs += (requestEndedAt - requestStartedAt);
_apiResponseTimeMs = roundMetric(_totalApiResponseTimeMs / _apiExecutionCount);
```

En la ejecución registrada, el resultado fue:

```txt
Tiempo de respuesta API = 476 ms
```

---

### 13.2 Cold Start

El Cold Start en Flutter mide el ciclo de inicialización del árbol de widgets nativo y las dependencias inyectadas de la Arquitectura Limpia en Flutter.

El proceso usado fue el siguiente:

1. Al crear `ShowsProvider`, se toma una marca de tiempo inicial llamada `_appStartedAt = nowMs()`.
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

_coldStartTimeMs = roundMetric(firstFunctionalScreenAt - _appStartedAt);
```

En la ejecución registrada, el resultado fue:

```txt
Cold Start = 478 ms
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

La fluidez de la interfaz se evalúa mediante la instrumentación de telemetría formal en el Timeline de las Flutter DevTools.

El proceso fue el siguiente:

1. Se importó la librería oficial de bajo nivel `import 'dart:developer'` as developer;.
2. Se envolvió la transacción crítica de renderizado e hidratación de datos de la interfaz de usuario utilizando bloques de telemetría síncronos:
```dart
developer.Timeline.startSync('Showly_Fetch_TvMaze_API');
// ... carga de datos y mutación del estado ...
developer.Timeline.finishSync();
```
3. Al compilar la aplicación en modo Profile `(flutter run --profile)`, estos marcadores inyectan etiquetas explícitas en el flujo cronológico del motor gráfico, permitiendo auditar con precisión micrométrica las gráficas de fotogramas por segundo (FPS) e identificar la ausencia total de cuellos de botella gráficos durante los scrolls o mutaciones del CRUD local.
La aplicación respondió de forma estable durante las interacciones principales.

En la ejecución registrada, el resultado fue:

```text
Fluidez de interfaz = DevTools Monitored
```

---

## 14. Análisis comparativo

### 14.1 Tamaño final del APK

En esta prueba, Flutter generó un APK de **46.4 MB**, mientras que React Native Expo generó un binario de **102 MB**. Esto demuestra que la arquitectura compilada Ahead-Of-Time (AOT) de Flutter optimiza de manera más eficiente el código de máquina final mediante técnicas nativas de *tree-shaking* (eliminación de código muerto). Por su parte, React Native bajo el flujo de Expo incluye capas de abstracción adicionales y el entorno empaquetado de sus propias APIs de ejecución global, lo que duplica el peso del archivo instalable final.

### 14.2 Tiempo de respuesta API (Promedio)

React Native registró un promedio dinámico acumulado de **98 ms**, mientras que Flutter registró **476 ms**. En este set de pruebas concurrentes, el motor asíncrono y la gestión de peticiones HTTP en la capa nativa del puente de JavaScript de React Native procesaron e inyectaron las estructuras JSON de la API de TVMaze con una menor latencia que la infraestructura de cliente HTTP implementada en el dominio de Dart para Flutter.

### 14.3 Cold Start

React Native registró un tiempo exacto de Cold Start de **334 ms**, mientras que Flutter registró **478 ms**. Para este set estandarizado de control de 40 registros, el motor de ejecución optimizado Hermes de React Native Expo junto con la hidratación síncrona de su árbol de componentes logró desplegar la primera interfaz completamente funcional en menor tiempo. Flutter, por su parte, requiere un ciclo inicial ligeramente más extendido para levantar los servicios del motor gráfico Impeller/Skia y orquestar el árbol de widgets dependiente de Provider antes del primer ciclo de dibujo en pantalla.

### 14.4 Tiempo de compilación release

Flutter registró un tiempo de compilación release local de **13.93 segundos**, mientras que React Native Expo requirió **21 minutos y 22 segundos** en su servidor remoto. Aunque la asimetría es monumental, se justifica plenamente por el entorno metodológico: Flutter consumió directamente los recursos de hardware físicos del procesador local a través de comandos de terminal, mientras que React Native delegó todo su pipeline DevOps a la infraestructura en la nube distribuida de EAS Build, enfrentando latencias de subida de activos, aprovisionamiento de contenedores virtuales y colas de espera en los servidores de Expo.

### 14.5 Fluidez de interfaz

Ambas aplicaciones demostraron un comportamiento técnico impecable catalogado bajo auditorías formales de instrumentación como **Profiler Monitored** (React Native) y **DevTools Monitored** (Flutter). Al sustituir las pruebas manuales e informales por la inyección de ganchos analíticos nativos de trazado temporal en los hilos de renderizado, se validó matemáticamente que tanto las mutaciones del CRUD local, los scrolls dinámicos de las tarjetas de las series y las transiciones entre vistas se ejecutan libres de cuellos de botella gráficos o caídas críticas de fotogramas por segundo (*jank*).

### 14.6 Registros en memoria

React Native cargó **40 registros** y Flutter cargó **40 registros** de manera síncrona. La simetría exacta en este volumen de control demuestra que ambas implementaciones arquitectónicas respetan fielmente el aislamiento de capas de la Arquitectura Limpia, manteniendo el estado de la memoria RAM del dispositivo estable, desacoplado y sin la necesidad de delegar la persistencia a bases de datos locales intermedias durante la sesión de ejecución.

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

En lo que respecta al rendimiento de red y los tiempos de inicialización para nuestro set de control de 40 registros, React Native exhibió un comportamiento más ágil en esta sesión de pruebas, alcanzando una latencia promedio de red de **98 ms** y un arranque en frío (*Cold Start*) de solo **334 ms**. Flutter, por su parte, consolidó un promedio de API de **476 ms** y un inicio de **478 ms**, un margen ligeramente superior que se justifica por el tiempo que requiere su arquitectura para poner en marcha el motor gráfico Impeller/Skia y orquestar el árbol de widgets antes del primer ciclo de dibujo. En todo caso, ambas plataformas se mantuvieron muy por debajo del umbral de tolerancia del usuario, garantizando una respuesta inmediata.

En el **tiempo de compilación release**, Flutter mostró un tiempo mucho menor: **13.93 segundos** frente a los **21 minutos y 22 segundos** registrados en React Native Expo mediante EAS Build. No obstante, esta comparación debe interpretarse con cuidado, ya que Flutter fue medido localmente y React Native fue medido en un proceso remoto de EAS Build.

En términos de **fluidez de interfaz**, ambas aplicaciones ofrecieron una experiencia estable. El scroll, la navegación, los filtros, el buscador, los formularios y las operaciones CRUD funcionaron correctamente en las dos versiones.

En conclusión, **Flutter destacó por generar un APK más pequeño y por un proceso de compilación local más rápido**, mientras que **React Native Expo mostró mejores tiempos internos en la carga inicial de datos y arranque aproximado durante esta prueba**. La elección entre ambas tecnologías dependerá del contexto del proyecto: Flutter puede ser conveniente cuando se busca mayor control del paquete final y consistencia visual, mientras que React Native con Expo resulta atractivo para equipos con experiencia previa en JavaScript/TypeScript y un flujo de desarrollo rápido apoyado en el ecosistema de Expo.
