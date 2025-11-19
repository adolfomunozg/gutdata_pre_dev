import dash
from dash import html, dcc

# Inicializa la aplicación Dash
app = dash.Dash(__name__)

# Definimos los servicios (igual que en el ejemplo de Flask)
services_data = [
    {"title": "Ingeniería de Datos y Pipelines",
     "description": "Diseñamos e implementamos arquitecturas de datos robustas y pipelines automatizados para la ingesta, transformación y carga (ETL/ELT) de datos."},
    {"title": "Análisis de Datos y Business Intelligence",
     "description": "Convertimos datos crudos en insights accionables a través de análisis avanzado y dashboards interactivos para la toma de decisiones estratégicas."},
    {"title": "Machine Learning Operacional (MLOps)",
     "description": "Automatizamos el ciclo de vida de los modelos de Machine Learning, desde el desarrollo hasta el despliegue y monitoreo en producción."},
    {"title": "Automatización de Procesos con IA",
     "description": "Integramos capacidades de IA en la automatización de procesos de negocio, mejorando la eficiencia, precisión y escalabilidad de las operaciones de datos."},
    {"title": "Gobierno y Calidad de Datos",
     "description": "Establecemos marcos de gobernanza y calidad de datos para asegurar la confiabilidad, seguridad y cumplimiento normativo de tus activos de información."},
    {"title": "Desarrollo de Modelos Predictivos",
     "description": "Construimos y optimizamos modelos predictivos utilizando técnicas avanzadas de Machine Learning para pronósticos, detección de anomalías y personalización."},
]

# Estilos CSS (puedes ponerlos directamente aquí o en un archivo .css separado y cargarlo)
# Para este ejemplo, lo pondremos aquí para simplicidad
external_stylesheets = ['/assets/style.css'] # Dash busca en la carpeta 'assets' por defecto
app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

# Exponer el servidor para producción
server = app.server


# Layout de la aplicación
app.layout = html.Div(children=[
    html.Link(rel='stylesheet', href='/assets/style.css'), # Puedes cargar el CSS así también

    # Header
    html.Header(className='header', children=[
        html.Div(className='container', children=[
            html.H1(html.A("[Tu Empresa]", href="/")),
            html.Nav(children=[
                html.Ul(children=[
                    html.Li(html.A("Nuestros Servicios", href="#services")),
                    html.Li(html.A("Contacto", href="#contact")),
                ])
            ])
        ])
    ]),

    # Main Content
    html.Main(children=[
        # Hero Section
        html.Section(id='hero', className='hero-section', children=[
            html.Div(className='container', children=[
                html.H2("Potenciando el Futuro con Ciencia de Datos y Automatización"),
                html.P("Transformamos tus datos en valor, optimizando procesos y abriendo nuevas oportunidades para tu negocio."),
                html.A("Explora Nuestras Soluciones", href="#services", className="button")
            ])
        ]),

        # Services Section
        html.Section(id='services', className='services-section', children=[
            html.Div(className='container', children=[
                html.H3("Nuestras Áreas de Expertise"),
                html.Div(className='service-grid', children=[
                    html.Div(className='service-item', children=[
                        html.H4(service["title"]),
                        html.P(service["description"])
                    ]) for service in services_data # Iterando a través de los servicios
                ])
            ])
        ]),

        # Contact Section
        html.Section(id='contact', className='contact-section', children=[
            html.Div(className='container', children=[
                html.H3("Conversemos sobre tus Datos"),
                html.P("¿Interesado en cómo la ciencia de datos y la automatización pueden impulsar tu empresa? Contáctanos hoy."),
                html.P(["Email: ", html.A("info@tudominio.com", href="mailto:info@tudominio.com")]),
                html.P("Teléfono: +56 9 1234 5678"),
            ])
        ])
    ]),

    # Footer
    html.Footer(className='footer', children=[
        html.Div(className='container', children=[
            html.P(f"© 2024 [Tu Empresa]. Todos los derechos reservados.") # Puedes hacer la fecha dinámica si quieres
        ])
    ])
])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8050)