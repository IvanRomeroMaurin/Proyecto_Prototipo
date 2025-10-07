# 🌐 Proyecto Next.js – Lair Pur

Este es un proyecto creado con **Next.js + TypeScript**.  
Incluye configuración inicial, dependencias comunes y estructura base (`src/`, `public/`, etc.).

---

## 📂 Estructura del proyecto

- `src/` → Código fuente principal (páginas, componentes, estilos).  
- `public/` → Archivos estáticos (imágenes, íconos, etc.).  
- `.next/` → Archivos generados automáticamente por Next.js (⚠️ no se versiona).  
- `node_modules/` → Dependencias instaladas con NPM/PNPM (⚠️ no se versiona).  
- `package.json` → Configuración del proyecto y dependencias.  
- `tsconfig.json` → Configuración de TypeScript.  
- `.gitignore` → Exclusiones para GitHub.  

---

## 🛠️ Requisitos previos

Antes de empezar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión recomendada: **18+**)  
- [npm](https://www.npmjs.com/) o [pnpm](https://pnpm.io/)  

---

## 🚀 Instalación

Clona el repositorio en tu máquina:

```bash
git clone https://github.com/IvanRomeroMaurin/Proyecto_Prototipo.git
cd TU_REPO

***IMPORTANTE***
Instala las dependencias: introduce el siguiente comando en la raiz del prouecto

npm install

Una vez instaladas las dependencias solo queda iniciar el servidor

Para iniciar el servidor local:

npm run dev

El proyecto quedará disponible en 👉 http://localhost:3000

📌 Notas

No se suben las carpetas node_modules/ ni .next/ al repositorio porque se regeneran automáticamente en cada entorno.

Si alguien clona este repo, solo necesita hacer npm install y npm run dev para levantarlo.

Variables de entorno deben configurarse en un archivo .env.local (no incluido en el repo).

✍️ Autor: []
📅 Fecha: 2025
