# Web de Noticias Resumidas con IA

Una aplicación web completa que agrega noticias de múltiples fuentes RSS y genera resúmenes automáticos usando IA, permitiendo a los usuarios mantenerse informados de manera eficiente.

## 🚀 Características

- **Agregación automática de noticias** desde múltiples fuentes RSS
- **Resúmenes generados por IA** en formato bullets y párrafos
- **Filtrado por categorías** (Tecnología, Deportes, España, Mundo, etc.)
- **Interfaz responsive** optimizada para móvil y desktop
- **Enlaces directos** a fuentes originales
- **API REST completa** para integración
- **Base de datos SQLite** para almacenamiento local

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **Lucide React** para iconografía
- **Vite** como bundler

### Backend
- **Node.js** con Express
- **SQLite** con sqlite3
- **RSS Parser** para agregación de noticias
- **Axios + Cheerio** para web scraping
- **CORS, Helmet, Morgan** para middleware

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd news-summarizer
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. **Iniciar en modo desarrollo**
```bash
# Ejecutar frontend y backend simultáneamente
npm run dev:full

# O ejecutar por separado:
npm run dev      # Frontend (puerto 5173)
npm run server   # Backend (puerto 3001)
```

## 🔧 API Endpoints

### Noticias
- `GET /api/news` - Obtener artículos con filtros
- `GET /api/news/:id` - Obtener artículo específico
- `POST /api/news/fetch-news` - Disparar scraping manual
- `GET /api/news/sources` - Listar fuentes configuradas
- `GET /api/news/stats` - Estadísticas del sistema

### Parámetros de filtrado
```
GET /api/news?topic=tecnologia&country=espana&limit=10&offset=0
```

## 🗄️ Estructura de Base de Datos

### Tabla `sources`
```sql
CREATE TABLE sources (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  rss_url TEXT NOT NULL,
  lang TEXT DEFAULT 'es',
  country TEXT DEFAULT 'mundo',
  source_score INTEGER DEFAULT 5,
  active BOOLEAN DEFAULT 1,
  last_checked_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla `articles`
```sql
CREATE TABLE articles (
  id TEXT PRIMARY KEY,
  source_id TEXT,
  title TEXT NOT NULL,
  canonical_url TEXT UNIQUE NOT NULL,
  published_at DATETIME NOT NULL,
  summary_bullets TEXT, -- JSON array
  summary_paragraph TEXT,
  topics TEXT, -- JSON array
  country TEXT,
  lang TEXT DEFAULT 'es',
  reading_time INTEGER DEFAULT 3,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (source_id) REFERENCES sources (id)
);
```

## 🔄 Pipeline de Procesamiento

1. **Ingesta RSS**: Cada 15 minutos se consultan las fuentes RSS configuradas
2. **Extracción de contenido**: Se obtiene el texto principal usando Cheerio
3. **Deduplicación**: Se evitan artículos duplicados por URL canónica
4. **Generación de resúmenes**: Mock de IA que simula resúmenes estructurados
5. **Clasificación temática**: Detección automática de categorías
6. **Almacenamiento**: Persistencia en SQLite con estado "published"

## 🎯 Fuentes Configuradas por Defecto

- **El País** (España)
- **El Mundo** (España)  
- **Marca** (Deportes)
- **TechCrunch** (Tecnología)
- **BBC Mundo** (Internacional)
- **CoinDesk** (Economía/Crypto)

## 🚀 Despliegue en Producción

### Variables de entorno requeridas
```bash
NODE_ENV=production
PORT=3001
DATABASE_URL=/path/to/production.sqlite
OPENAI_API_KEY=your_openai_key # Para resúmenes reales
```

### Comandos de producción
```bash
npm run build        # Construir frontend
npm run server:prod  # Ejecutar servidor en producción
```

## 🔮 Roadmap

### Fase 1 (Actual - MVP)
- ✅ Agregación RSS básica
- ✅ Resúmenes mock
- ✅ Interfaz responsive
- ✅ Filtrado por categorías

### Fase 2 (Próxima)
- 🔄 Integración con OpenAI para resúmenes reales
- 🔄 Sistema de usuarios y favoritos
- 🔄 Newsletter automático
- 🔄 Búsqueda por texto

### Fase 3 (Futuro)
- 📋 Panel de administración
- 📋 Métricas y analytics
- 📋 API pública
- 📋 Monetización

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Para soporte y preguntas:
- Crear un [Issue](https://github.com/your-repo/issues)
- Email: support@your-domain.com

---

**Desarrollado con ❤️ para democratizar el acceso a información de calidad**