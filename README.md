# Juego de Relacionar Columnas - Batalla del 5 de Mayo

## Descripción
Juego educativo interactivo sobre la Batalla del 5 de Mayo que permite a los usuarios relacionar personajes históricos y elementos bélicos con sus descripciones correspondientes.

## Características Principales
- ✅ **Funciona completamente offline** - No requiere conexión a internet
- 🎮 Interfaz drag & drop intuitiva
- 📱 Compatible con dispositivos táctiles (móviles y tablets)
- 🎨 Diseño responsivo y atractivo
- 🔄 Selección aleatoria de 7 elementos por partida
- 📊 Sistema de puntuación (aciertos/desaciertos)
- 🎯 Feedback visual inmediato
- 🏆 Pantalla de felicitación al completar

## Funcionalidad Offline
El proyecto incluye un sistema robusto para funcionar sin conexión:

### Sistema de Alertas Offline
- **SweetAlert2 local**: Archivos CSS y JS incluidos en `/lib/`
- **Fallback automático**: Si SweetAlert2 no está disponible, usa `alert()` nativo
- **Detector de conexión**: Notifica cuando se pierde la conexión a internet
- **DialogSystem**: Clase que maneja alertas de forma inteligente

### Archivos Incluidos
```
/lib/
├── sweetalert2.min.js    # Librería de alertas local
└── sweetalert2.min.css   # Estilos de SweetAlert2

/utils/
└── dialog.js             # Sistema de alertas offline/online
```

## Estructura del Proyecto
```
├── index.html           # Página de instrucciones
├── game.html           # Juego principal
├── estilos.css         # Estilos del juego
├── funciones.js        # Lógica del juego
├── lib/                # Librerías locales
├── utils/              # Utilidades (sistema de alertas)
├── imagenes/           # Recursos gráficos
└── README.md          # Documentación
```

## Elementos del Juego
El juego incluye 14 elementos históricos:
- **Personajes**: Ignacio Zaragoza, Benito Juárez, Charles Ferdinand Latrille, Miguel Negrete, Porfirio Díaz, Napoleón III, Ignacio Mejía
- **Armas y objetos**: Machete, Cañón, Bayoneta, Telegrama, Rifle, Soldado Zuavo, Sable

## Tecnologías Utilizadas
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)
- SweetAlert2 (local)
- Drag & Drop API
- Touch Events API

## Instalación y Uso
1. Descarga todos los archivos del proyecto
2. Abre `index.html` en cualquier navegador web
3. Lee las instrucciones y haz clic en "Jugar"
4. Arrastra los textos a las imágenes correspondientes
5. ¡Completa todas las relaciones correctas para ganar!

## Compatibilidad
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móviles y tablets
- ✅ Funciona offline completamente
- ✅ No requiere servidor web

## Características Técnicas
- **Responsive Design**: Se adapta a diferentes tamaños de pantalla
- **Touch Support**: Funcionalidad completa en dispositivos táctiles
- **Offline First**: Diseñado para funcionar sin conexión
- **Progressive Enhancement**: Funciona incluso si JavaScript falla parcialmente
- **Accessibility**: Incluye atributos ARIA y navegación por teclado

## Créditos
- **Game Design and Motion Graphics**: Ing. José Ramón Luciano Cuapio
- **Concept Art**: Dana Paola Báez Pérez  
- **Screenwriting**: C. María del Carmen Silva Vázquez
- **Agradecimientos**: Museo Interactivo de la Batalla del 5 de Mayo