document.addEventListener('DOMContentLoaded', () => {
    const jsonInput = document.getElementById('jsonInput');
    const lineNumbers = document.querySelector('.line-numbers');
    const cursorPosition = document.querySelector('.cursor-position');
    const formatBtn = document.getElementById('formatBtn');
    const validateBtn = document.getElementById('validateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const errorContainer = document.getElementById('errorContainer');
    let isAltPressed = false;

    // Update line numbers and cursor position
    function updateLineNumbers() {
        const lines = jsonInput.value.split('\n');
        lineNumbers.innerHTML = Array(lines.length)
            .fill()
            .map((_, i) => `<span>${i + 1}</span>`)
            .join('');
    }

    // Update cursor position display
    function updateCursorPosition() {
        const text = jsonInput.value;
        const startPos = jsonInput.selectionStart;
        
        // Calculate line and column
        const lines = text.substr(0, startPos).split('\n');
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;
        
        cursorPosition.textContent = `Line: ${line}, Column: ${column}`;
    }

    // Handle Alt key for column selection
    function handleAltSelection(e) {
        if (e.altKey && e.type === 'mousedown') {
            e.preventDefault();
            const start = jsonInput.selectionStart;
            jsonInput.addEventListener('mousemove', handleColumnSelect);
            jsonInput.addEventListener('mouseup', () => {
                jsonInput.removeEventListener('mousemove', handleColumnSelect);
            });
        }
    }

    // Column selection handler
    function handleColumnSelect(e) {
        const rect = jsonInput.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate character position from coordinates
        const computedStyle = window.getComputedStyle(jsonInput);
        const lineHeight = parseInt(computedStyle.lineHeight);
        const charWidth = 8; // Approximate monospace character width
        
        const line = Math.floor(y / lineHeight);
        const column = Math.floor(x / charWidth);
        
        const text = jsonInput.value;
        const lines = text.split('\n');
        let pos = 0;
        
        for (let i = 0; i < line; i++) {
            pos += lines[i].length + 1; // +1 for newline character
        }
        pos = Math.min(pos + column, text.length);
        
        jsonInput.selectionStart = pos;
        jsonInput.selectionEnd = pos;
    }

    // Event Listeners
    jsonInput.addEventListener('input', () => {
        updateLineNumbers();
        updateCursorPosition();
    });

    // Add copy button handler
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.addEventListener('click', () => {
        if (jsonInput.value) {
            navigator.clipboard.writeText(jsonInput.value)
                .then(() => {
                    errorContainer.classList.remove('error', 'show');
                    errorContainer.classList.add('success', 'show');
                    errorContainer.textContent = '✓ Copied to clipboard';
                    setTimeout(() => {
                        errorContainer.classList.remove('show');
                    }, 2000);
                })
                .catch(err => {
                    errorContainer.classList.remove('success', 'show');
                    errorContainer.classList.add('error', 'show');
                    errorContainer.textContent = '✗ Failed to copy to clipboard';
                });
        }
    });

    jsonInput.addEventListener('scroll', () => {
        lineNumbers.scrollTop = jsonInput.scrollTop;
    });

    jsonInput.addEventListener('keyup', updateCursorPosition);
    jsonInput.addEventListener('click', updateCursorPosition);
    jsonInput.addEventListener('mousedown', handleAltSelection);
    
    document.addEventListener('keydown', (e) => {
        isAltPressed = e.altKey;
    });

    document.addEventListener('keyup', (e) => {
        isAltPressed = e.altKey;
    });

    // Button handlers
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.altKey) {
            switch (e.key.toUpperCase()) {
                case 'F':
                    formatBtn.click();
                    break;
                case 'V':
                    validateBtn.click();
                    break;
                case 'C':
                    clearBtn.click();
                    break;
                case 'P':
                    copyBtn.click();
                    break;
                case 'I':
                    pasteBtn.click();
                    break;
            }
        }
    });

    // Add paste button handler
    const pasteBtn = document.getElementById('pasteBtn');
    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            jsonInput.value = text;
            updateLineNumbers();
            updateCursorPosition();
            errorContainer.classList.remove('error', 'show');
            errorContainer.classList.add('success', 'show');
            errorContainer.textContent = '✓ Pasted from clipboard';
            setTimeout(() => {
                errorContainer.classList.remove('show');
            }, 2000);
        } catch (err) {
            errorContainer.classList.remove('success', 'show');
            errorContainer.classList.add('error', 'show');
            errorContainer.textContent = '✗ Failed to paste from clipboard';
        }
    });

    formatBtn.addEventListener('click', () => {
        try {
            const original = jsonInput.value;
            const parsed = JSON.parse(original);
            const formatted = JSON.stringify(parsed, null, 4);
            jsonInput.value = formatted;
            
            errorContainer.classList.remove('error', 'show');
            errorContainer.classList.add('success', 'show');
            errorContainer.innerHTML = `
                ✓ Successfully formatted JSON
                <div class="json-details">
                    ${formatted.split('\n').length} lines |
                    ${formatted.length} characters |
                    ${Object.keys(parsed).length} root keys
                </div>
            `;
            updateLineNumbers();
        } catch (err) {
            errorContainer.classList.remove('success');
            errorContainer.classList.add('error', 'show');
            errorContainer.innerHTML = `
                ✗ Format Error: ${err.message}
                ${err.stack ? `<div class="error-context">${err.stack}</div>` : ''}
                ${jsonInput.value ? `<div class="suggestion">Try validating the JSON first</div>` : ''}
            `;
        }
    });

    validateBtn.addEventListener('click', () => {
        try {
            JSON.parse(jsonInput.value);
            errorContainer.classList.remove('error', 'show');
            errorContainer.classList.add('success', 'show');
            errorContainer.innerHTML = '✓ JSON is valid';
            setTimeout(() => {
                errorContainer.classList.remove('show');
            }, 2000);
        } catch (err) {
            errorContainer.classList.remove('success');
            errorContainer.classList.add('error', 'show');
            errorContainer.innerHTML = `
                ✗ Validation Error: ${err.message}
                <div class="suggestion">Check line ${err.message.match(/line (\d+)/)?.[1] || 'unknown'}</div>
                <div class="suggestion">Common issues: Missing commas, quotes, or braces</div>
            `;
        }
    });

    clearBtn.addEventListener('click', () => {
        jsonInput.value = '';
        errorContainer.classList.remove('show', 'success', 'error');
        errorContainer.textContent = '';
        updateLineNumbers();
        updateCursorPosition();
    });

    // Initialize line numbers
    updateLineNumbers();
    updateCursorPosition();
});