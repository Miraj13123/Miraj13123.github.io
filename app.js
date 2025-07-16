/**
 * app.js
 *
 * This single script dynamically creates a complete "Fancy Calculator" web application.
 * It handles setting the page title, injecting fonts, defining all styles,
 * creating every HTML element, and managing the calculator's interactive logic.
 */

// --- Style Definitions ---
const styles = 
{
    body: 
    {
        margin: '0',
        padding: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        fontFamily: "'Poppins', sans-serif",
    },
    calculatorContainer: 
    {
        width: '320px',
        padding: '20px',
        borderRadius: '25px',
        backgroundColor: '#e0e0e0',
        boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
    },
    display: 
    {
        width: '100%',
        height: '70px',
        border: 'none',
        outline: 'none',
        borderRadius: '20px',
        marginBottom: '20px',
        padding: '0 20px',
        boxSizing: 'border-box',
        fontSize: '2.5em',
        textAlign: 'right',
        color: '#333',
        backgroundColor: '#e0e0e0',
        boxShadow: 'inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff',
    },
    buttonsContainer: 
    {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '15px',
    },
    button: 
    {
        border: 'none',
        outline: 'none',
        height: '60px',
        borderRadius: '15px',
        fontSize: '1.5em',
        fontWeight: 'bold',
        color: '#555',
        cursor: 'pointer',
        backgroundColor: '#e0e0e0',
        boxShadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff',
        transition: 'all 0.1s ease-in-out',
    },
    buttonHover: 
    {
        boxShadow: '6px 6px 12px #bebebe, -6px -6px 12px #ffffff',
    },
    buttonActive: 
    {
        boxShadow: 'inset 8px 8px 16px #bebebe, inset -8px -8px 16px #ffffff',
    },
    specialButtons: 
    {
        color: '#fff',
        backgroundColor: '#ff9500',
    },
    clearButton: 
    {
        color: '#fff',
        backgroundColor: '#ff3b30',
    },
    equalsButton: 
    {
        color: '#fff',
        backgroundColor: '#34c759',
        gridColumn: 'span 2',
    },
    zeroButton: 
    {
        gridColumn: 'span 2',
    },
};

// --- Helper Functions ---

/**
 * Applies a set of CSS styles to a DOM element.
 * @param {HTMLElement} element The element to style.
 * @param {object} styleObject An object with camelCase CSS properties.
 */
function applyStyles(element, styleObject) {
    Object.assign(element.style, styleObject);
}

/**
 * Injects the Google "Poppins" font link into the document's head.
 */
function loadGoogleFont() {
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = "true";

    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
    fontLink.rel = 'stylesheet';

    document.head.append(preconnect1, preconnect2, fontLink);
}


// --- Main Application Logic ---

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Prepare the Document ---
    document.title = 'Fancy JS Calculator';
    loadGoogleFont();
    const body = document.body;
    body.innerHTML = ''; // Clear any existing content
    applyStyles(body, styles.body);

    // --- 2. Create Calculator Elements ---
    const calculator = document.createElement('div');
    applyStyles(calculator, styles.calculatorContainer);

    const display = document.createElement('input');
    display.type = 'text';
    display.readOnly = true;
    display.value = '0';
    applyStyles(display, styles.display);

    const buttonsContainer = document.createElement('div');
    applyStyles(buttonsContainer, styles.buttonsContainer);

    // --- 3. Define Button Layout and Create Buttons ---
    const buttonLayout = [
        'C', 'DEL', '%', '/',
        '7', '8', '9', '*',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '0', '.', '='
    ];

    buttonLayout.forEach(label => {
        const button = document.createElement('button');
        button.textContent = label;
        
        // Combine base and special styles for each button
        let currentStyles = {...styles.button};
        if (['/', '*', '-', '+', '%'].includes(label)) Object.assign(currentStyles, styles.specialButtons);
        if (label === 'C') Object.assign(currentStyles, styles.clearButton);
        if (label === '=') Object.assign(currentStyles, styles.equalsButton);
        if (label === '0') Object.assign(currentStyles, styles.zeroButton);
        
        applyStyles(button, currentStyles);

        // Add hover and active effects
        button.addEventListener('mouseenter', () => applyStyles(button, styles.buttonHover));
        button.addEventListener('mouseleave', () => applyStyles(button, currentStyles));
        button.addEventListener('mousedown', () => applyStyles(button, styles.buttonActive));
        button.addEventListener('mouseup', () => applyStyles(button, styles.buttonHover));
        
        buttonsContainer.appendChild(button);
    });

    // --- 4. Assemble and Render the Calculator ---
    calculator.appendChild(display);
    calculator.appendChild(buttonsContainer);
    body.appendChild(calculator);

    // --- 5. Calculator Logic (Event Delegation) ---
    buttonsContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (!target.matches('button')) return;

        const key = target.textContent;
        let displayValue = display.value;

        if (key === 'C') {
            display.value = '0';
        } else if (key === 'DEL') {
            display.value = displayValue.length > 1 ? displayValue.slice(0, -1) : '0';
        } else if (key === '=') {
            try {
                // Security note: eval() is used for simplicity. It's safe for this use case.
                const result = eval(displayValue.replace(/%/g, '/100'));
                display.value = parseFloat(result.toFixed(10)); // Fix floating point issues
            } catch (error) {
                display.value = 'Error';
            }
        } else {
            if (displayValue === '0' || displayValue === 'Error') {
                display.value = key;
            } else {
                display.value += key;
            }
        }
    });
});

