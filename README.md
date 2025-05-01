# 🌐 Proyecto Web con Evaluación Inteligente

Este repositorio contiene un prototipo de aplicación web interactiva que guía al usuario a través de una serie de preguntas y genera automáticamente un informe personalizado utilizando inteligencia artificial.

## 🎯 Propósito

El objetivo principal es demostrar cómo una aplicación puede:
- Recopilar datos de usuario mediante formularios dinámicos.
- Procesar la información usando un modelo de IA.
- Generar y mostrar un informe adaptado con recomendaciones y recursos útiles.

## ⚙️ Tecnologías utilizadas

- **Next.js** – Framework React para aplicaciones web modernas.
- **TypeScript** – Tipado estático para mayor robustez.
- **Tailwind CSS** – Framework de estilos utilitarios.
- **IA (modelo LLM)** – Para procesar respuestas y generar reportes.
- **Zod** – Validación de esquemas de datos.
- **Node.js** – Entorno de ejecución.

## 🗂 Estructura del proyecto

```
├── public/                   # Archivos públicos y estáticos
├── src/
│   ├── ai/                  # Lógica de generación de reportes con IA
│   ├── app/                 # Rutas y páginas principales (test, resultados)
│   ├── lib/                 # Funciones auxiliares
│   └── components/          # Componentes reutilizables (si aplica)
├── .env                     # Variables de entorno
├── package.json             # Scripts y dependencias
├── tailwind.config.ts       # Configuración de Tailwind
├── tsconfig.json            # Configuración de TypeScript
└── README.md                # Este archivo
```

## 🚀 Instalación

1. Clona el repositorio:

```bash
git clone <repo-url>
cd <nombre-del-proyecto>
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` con las variables necesarias (ej. claves de API, configuración del entorno).

## ▶️ Uso en desarrollo

```bash
npm run dev
```

Visita `http://localhost:3000` para interactuar con la aplicación localmente.

## 🧠 Cómo funciona

1. El usuario responde un test desde la interfaz.
2. Las respuestas se envían a una función que usa IA para analizarlas.
3. Se genera un informe en texto (y posiblemente recursos complementarios).
4. El informe se presenta al usuario en una pantalla de resultados.

## 📦 Despliegue

Este proyecto puede desplegarse fácilmente en plataformas como:
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- Servidores Node.js propios

## 📄 Licencia

Este es un prototipo con fines educativos y de demostración. Licencia abierta o a definir según el caso de uso.

---

💡 ¿Quieres adaptarlo a un caso específico (salud mental, educación, asesoría legal, etc.)? Solo modifica las preguntas y lógica del informe.