# Drag-Drop-Enosta

🎯 **Drag-Drop-Enosta** is a dynamic and intuitive web application that allows users to **create custom survey forms** effortlessly using a **drag-and-drop interface**. Designed for speed and flexibility, it enables users to visually build forms by simply dragging components like text inputs, radio buttons, checkboxes, and more into a canvas area.

Whether you're building a feedback form, questionnaire, or data collection tool, Drag-Drop-Enosta provides the foundation to get up and running quickly with a clean, modern interface.

---

## ✨ Features

- ✅ Drag-and-drop form builder with real-time canvas
- 🧩 Supports multiple field types: text input, textarea, checkbox, radio, etc.
- 🖼️ Preview form structure dynamically
- 🧱 Built with modern component architecture (React)
- 🎨 Styled with **TailwindCSS** for a responsive and clean UI
- ⚙️ Built-in support for **dndtoolkit** (powered by `@dnd-kit/core`) for performant and flexible drag-and-drop
- 📤 Export form structure as JSON (coming soon)

---

## 🧪 Tech Stack

This project uses the following technologies:

- [React](https://reactjs.org) – For building the user interface
- [TailwindCSS](https://tailwindcss.com) – For utility-first styling
- [dndtoolkit](https://github.com/clauderic/dnd-kit) – Lightweight drag-and-drop toolkit
- [pnpm](https://pnpm.io/) or npm – Package manager

---

## 📥 Getting Started

To get started with Drag-Drop-Enosta, follow the steps below:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Drag-Drop-Enosta.git
cd Drag-Drop-Enosta
```

### 2. Install dependencies

You can use either `pnpm` or `npm`:

```bash
pnpm install
# or
npm install
```

### 3. Start the development server

```bash
pnpm dev
# or
npm run dev
```

The app should now be running on `http://localhost:5173` or similar (depending on your setup).

---

## 🗂️ Project Structure

Here’s a general overview of the folder structure for this project:

```
Drag-Drop-Enosta/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable UI components (e.g., form fields, toolbox, preview)
|   ├── assets/
|   ├── types/
│   ├── pages/              # Page-level components or routes
│   ├── utils/              # Utility functions or helpers
│   ├── App.jsx             # Root application component
│   └── main.jsx            # Entry point
├── tailwind.config.js      # TailwindCSS configuration
├── package.json            # Project metadata and scripts
└── README.md               # This file
```

---

## 💡 How to Use

1. **Drag** components (e.g., input fields, radio groups) from the sidebar toolbox
2. **Drop** them into the form canvas area
3. **Click** on an element in the canvas to edit its label, placeholder, or other attributes
4. **Reorder** elements via drag-and-drop to customize the form layout
5. **Preview** the form or prepare for export
