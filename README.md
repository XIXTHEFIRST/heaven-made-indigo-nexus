# Heaven Made Multi-Project Workspace

This workspace contains two completely independent, decoupled projects.

## 📁 Independent Projects

### 1. [HEAVEN MADE Boutique](file:///Users/admin/Desktop/heaven-made-indigo-nexus-1/brand-site)
- **URL**: `http://localhost:8080`
- **Purpose**: High-end fashion e-commerce & boutique experience.
- **Identity**: Orange/Black brand colors, Boutique typography, Custom cursor.

### 2. [Lagos Fashion Intelligence](file:///Users/admin/Desktop/heaven-made-indigo-nexus-1/fashion-intel)
- **URL**: `http://localhost:8081`
- **Purpose**: Data-driven analytical platform for fashion stakeholders.
- **Identity**: Deep Purple/Gold intelligence colors, Standard analytical cursor, Comprehensive data visualization.

---

## 🚀 Development

You can run each project independently from the root:

### To run the Brand Site:
```bash
npm run brand:dev
```

### To run the Intelligence System:
```bash
npm run intel:dev
```

---

## ✅ Total Isolation (Top 0.001% Engineering)

- **Decoupled Identity**: Independent titles, metadata, and branding.
- **Independent URLs**: Fixed ports (8080 vs 8081) with strict port enforcement.
- **Zero Interlinking**: No shared navigation or cross-site links.
- **Individual Build Pipelines**: Separate `vite.config.ts`, `tailwind.config.ts`, and `package.json`.
- **Clean Root**: The root directory no longer contains source code; it acts purely as a workspace manager.
