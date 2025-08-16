# Akhlaq Digital Editor

It is a web application designed to provide a rich text editor experience. It integrates various Tiptap extensions for enhanced text editing capabilities, including support for mentions, images, lists, and more. The application is built using Next.js and leverages Radix UI components for dropdowns and popovers.

## 🚀 Features

- Simple JavaScript API for initializing the editor
- Auto-initialization via `data-*` attributes
- NPM support
- React-based rendering

---

## 📦 Installation (NPM)

```bash
npm install @akhlaqdigital/editor
```

### Usage

```jsx
import AppEditor from "@akhlaqdigital/editor";

<AppEditor />;
```

---

## 🌐 Usage via CDN

Add the following script to your HTML page:

```html
<script
  id="ad-editor"
  src="https://cdn.jsdelivr.net/npm/@akhlaqdigital/editor/dist/ad-editor.js"
></script>
```

### What happens:

- A `div` with the ID `ad-editor` will be created (if not already present).

---

## 🛠 Development

Make sure you have React and ReactDOM available in your environment when developing locally.

## 📄 License

ISC

# akhlaqdigital
