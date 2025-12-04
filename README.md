# GutData - Página Web Corporativa

Una página web moderna y dinámica para GutData, empresa de soluciones TI, inspirada en el diseño de Option.tech.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **Animaciones Suaves**: Efectos de scroll, hover y transiciones fluidas
- **Navegación Intuitiva**: Menú hamburguesa para móviles y navegación suave
- **Formulario de Contacto**: Validación en tiempo real y notificaciones
- **Efectos Visuales**: Tarjetas flotantes, gradientes y partículas
- **Optimización SEO**: Estructura semántica y meta tags

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Flexbox, Grid, animaciones y efectos modernos
- **JavaScript ES6+**: Interactividad y efectos dinámicos
- **Font Awesome**: Iconografía profesional
- **Google Fonts**: Tipografía Inter para mejor legibilidad

## 📁 Estructura del Proyecto

```
web-inicial/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript interactivo
└── README.md           # Documentación
```

## 🎨 Secciones de la Página

1. **Header**: Navegación fija con efecto de transparencia
2. **Hero**: Sección principal con animaciones y call-to-action
3. **Servicios**: Grid de servicios con efectos hover
4. **Nosotros**: Información corporativa con estadísticas animadas
5. **Contacto**: Formulario funcional con validación
6. **Footer**: Enlaces y información de contacto

## 🚀 Despliegue en GitHub Pages

### Opción 1: GitHub Pages Automático

1. Sube todos los archivos a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona "Deploy from a branch"
4. Elige la rama main
5. Tu sitio estará disponible en `https://tuusuario.github.io/nombre-repositorio`

### Opción 2: GitHub Actions (Recomendado)

1. Crea un archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 🎯 Funcionalidades JavaScript

- **Navegación Móvil**: Menú hamburguesa responsivo
- **Scroll Suave**: Navegación entre secciones
- **Animaciones de Entrada**: Efectos al hacer scroll
- **Formulario Inteligente**: Validación y notificaciones
- **Contadores Animados**: Estadísticas con efecto de conteo
- **Efectos Parallax**: Movimiento de elementos al scroll
- **Partículas Flotantes**: Efectos visuales en el hero

## 🎨 Personalización

### Colores
Los colores principales están definidos en CSS variables:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --accent-color: #f59e0b;
    /* ... más variables */
}
```

### Contenido
Para personalizar el contenido:
1. Edita el texto en `index.html`
2. Modifica los servicios en la sección correspondiente
3. Actualiza la información de contacto
4. Cambia las estadísticas en la sección "Nosotros"

## 📱 Responsive Design

La página está optimizada para:
- **Móviles**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Optimizaciones

- **Carga Rápida**: CSS y JS optimizados
- **SEO Friendly**: Meta tags y estructura semántica
- **Accesibilidad**: Navegación por teclado y screen readers
- **Performance**: Lazy loading y animaciones optimizadas

## 📞 Soporte

Para soporte técnico o consultas sobre la implementación, contacta al equipo de desarrollo.

---

**GutData** - Transformando datos en soluciones inteligentes
