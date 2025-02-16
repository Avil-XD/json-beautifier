# JSON Formatter & Validator

A web-based tool that allows users to format and validate JSON data with an intuitive interface.

## Features

**Core Functionality**
- Format JSON with 2/4 space indentation
- Validate JSON with detailed error highlighting
- Syntax highlighting for JSON structures
- Tree view visualization for complex JSON

**UX Features**
- Light/dark theme toggle (system-aware)
- Responsive design with mobile-first approach
- Accessible interface with ARIA labels
- Interactive error panel with line numbers
- Smart auto-formatting on paste

**Productivity**
- Keyboard shortcuts:
  - Ctrl+Alt+F: Format JSON
  - Ctrl+Alt+V: Validate JSON
  - Ctrl+Alt+P: Copy formatted JSON
  - Ctrl+Alt+C: Clear input
- History stack (last 10 entries)
- Full clipboard support (text/images/files)

**PWA Features**
- Offline functionality via service worker
- Installable as native app
- Automatic updates
- Network resilience strategies

## Usage

**Web Version**
🌐 [Live Demo](https://avil-xd.github.io/json-formatter-validator)

**Local Installation**
```bash
git clone https://github.com/Avil-XD/json-formatter-validator.git
cd json-formatter-validator
```

**Keyboard Shortcuts**
- Ctrl + Alt + F: Format JSON
- Ctrl + Alt + V: Validate JSON
- Ctrl + Alt + P: Copy formatted JSON
- Ctrl + Alt + Backspace: Clear input

**Basic Flow**
1. Input JSON via:
   - Direct typing
   - File upload (drag & drop supported)
   - Clipboard paste (Ctrl+V)
2. Choose formatting options:
   - Indentation: 2/4 spaces
   - Compact/expanded mode
   - Sort keys alphabetically
3. Click/toggle between:
   - Format (beautify)
   - Validate (with error highlighting)
   - Export (copy/download)
5. Use the Copy/Paste buttons to transfer JSON between applications

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/Avil-XD/json-formatter-validator.git
```

2. Open the project directory:
```bash
cd json-formatter-validator
```

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python 3
python -m http.server

# Using Node.js
npx serve
```

## Technologies Used

**Core Stack**
- HTML5 Semantic Elements
- CSS3 (Flexbox/Grid)
- JavaScript ES2022
- Service Workers (sw.js)
- Web App Manifest

**Key APIs**
- Clipboard API
- File System Access API
- IndexedDB (offline storage)
- Web Share API

**Tooling**
- Lighthouse CI (PWA optimization)
- Workbox (service worker toolkit)
- Prettier (code formatting)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.