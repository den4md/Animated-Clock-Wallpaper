/**
 * Allows LivelyWallpaper to configure parameters dynamically.
 * @param {string} name - The name of the parameter to configure.
 * @param {*} val - The value to set for the parameter.
 */
const livelyPropertyListener = (name, val) => {
    switch(name) {
        case "clock-size":
            // Set the font size of the clock symbols.
            document.getElementsByClassName('symbols')[0].style.setProperty('--font-size', `${val}pt`);
            break;
        case "bg-image":
            // Set the background image of the clock.
            if (val) {
                document.getElementsByTagName('body')[0].style.setProperty('--bg-image', `url('${val.replaceAll('\\', '/')}')`);
            } else {
                document.getElementsByTagName('body')[0].style.setProperty('--bg-image', 'linear-gradient(135deg, #3498DB, #8E44AD)');
            }
            break;
        case "enable-am-pm":
            // Enable or disable the 12-hour format for the clock.
            USE_12_HOURS = val;
            break;
        case "show-seconds":
            // Show or hide the seconds part of the clock.
            SHOW_SECONDS = val;
            break;
        case "number-separator":
            // Set the separator character for the clock digits.
            NUMBER_SEPARATOR = val.substring(0, 1) || ':';
            break;
        case "bg-image-extended-height":
            // Adjust the height of the background image for better fit.
            document.getElementsByTagName('body')[0].style.setProperty('--bg-image-height', val ? '105%' : '101%');
            break;
        case "clock-animation-speed":
            // Set the animation speed for the clock symbols.
            document.getElementsByClassName('symbols')[0].style.setProperty('--animation-duration', `${val}ms`);
            ANIMATION_DURATION = val;
            break;
    }
}

// Default settings for the clock
let USE_12_HOURS = false;
let SHOW_SECONDS = true;
let NUMBER_SEPARATOR = ':';
let ANIMATION_DURATION = 400;

/**
 * Get the current symbol of a clock element.
 * @param {HTMLElement} element - The clock element.
 * @return {string} - The symbol of the clock element.
 */
const getElementSymbol = element => {
    return window.getComputedStyle(element).getPropertyValue('--symb').slice(1, -1);
}

/**
 * Set the symbol of a clock element with animation.
 * @param {HTMLElement} element - The clock element.
 * @param {string} newSymbol - The new symbol to set.
 * @param {boolean} replaceAnyway - Whether to replace the symbol even if it's the same.
 */
const setElementSymbol = (element, newSymbol, replaceAnyway) => {
    const oldSymbol = getElementSymbol(element);
    const newSymbolLength = newSymbol.length;

    if (replaceAnyway || oldSymbol !== newSymbol) {
        newSymbol = `"${newSymbol}"`;
        element.style.setProperty('--next-symb', newSymbol);
        element.classList.add('transition');
        setTimeout(() => {
            element.style.setProperty('--symb', newSymbol);
            element.classList.remove('transition');
            element.style.setProperty('--next-symb', `"${new Array(newSymbolLength).fill('-').join('')}"`);
        }, ANIMATION_DURATION);
    }
}

/**
 * Get the hour in 12-hour format.
 * @param {number} hour - The hour in 24-hour format.
 * @returns {number} - The hour in 12-hour format.
 */
const getAmPmModHour = hour => {
    return hour % 12 || 12;
}

// Time offset (obsolete)
let OFFSET = 0;

/**
 * Get the symbols representing the current time.
 * @returns {Array.<string>} - An array of symbols representing the current time.
 */ 
const getCurrentTimeSymbols = () => {
    const now = new Date(Date.now() + OFFSET + ANIMATION_DURATION);

    let hour = now.getHours();
    const isPastTwelve = hour >= 12;
    if (USE_12_HOURS) {
        hour = getAmPmModHour(hour);
    }
    const hourTen = Math.floor(hour / 10);
    const hourOne = hour % 10;

    const mins = now.getMinutes();
    const minsTen = Math.floor(mins / 10);
    const minsOne = mins % 10;

    const secs = now.getSeconds();
    const secsTen = Math.floor(secs / 10);
    const secsOne = secs % 10;

    let timeArray = [hourTen, hourOne, NUMBER_SEPARATOR, minsTen, minsOne];

    if (SHOW_SECONDS) {
        timeArray = timeArray.concat([NUMBER_SEPARATOR, secsTen, secsOne]);
    }

    if (USE_12_HOURS) {
        const amPmPostfix = ' ' + (isPastTwelve ? 'PM' : 'AM');
        timeArray = timeArray.concat(Array.from(amPmPostfix));

        if (hourTen === 0) {
            timeArray = timeArray.slice(1);
        }
    }

    return timeArray.map(val => String(val));
}

/**
 * Obsolete
 * @returns Array.<string>
 */ 
const getRandomSymbols = len => {
    let arr = [];

    for (let i = 0; i < len; i++) {
        arr.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    }

    return arr;
}

let SYMBOLS_ELEMENTS = null;

/**
 * Set the current time on the clock symbols.
 * @param {boolean} simultaneously - Whether to change symbols simultaneously or one after another.
 */
const setCurrentTime = simultaneously => {
    const values = getCurrentTimeSymbols();
    
    if (SYMBOLS_ELEMENTS.length !== values.length) {
        initSymbols(values.length);
    }
    
    const REVERSED_SYMBOLS_ELEMENTS = Array.from(SYMBOLS_ELEMENTS).reverse();
    const TIMEOUT_INCREMENTOR = simultaneously ? 0 : Math.floor(ANIMATION_DURATION / 4);
    let timeout = 0;

    values.reverse().map((val, i) => {
        setTimeout(setElementSymbol, timeout, REVERSED_SYMBOLS_ELEMENTS[i], val);
        timeout += TIMEOUT_INCREMENTOR;
    });
}

/**
 * Initialize clock symbols.
 * @param {number} numberOfElements - The number of elements to initialize.
 */
const initSymbols = numberOfElements => {
    const SYMBOLS_ELEMENT = document.getElementsByClassName('symbols')[0];
    let currentLength = SYMBOLS_ELEMENT.children.length;
    let diff = numberOfElements - currentLength;
    if (diff > 0) {
        new Array(diff).fill(null).forEach(_ => SYMBOLS_ELEMENT.appendChild(document.createElement('div')));
    }
    if (diff < 0) {
        Array.from(SYMBOLS_ELEMENT.children).slice(diff).forEach(elem => SYMBOLS_ELEMENT.removeChild(elem));
    }
    SYMBOLS_ELEMENTS = SYMBOLS_ELEMENT.children;
}

/**
 * Init function.
 */
const init = () => {
    SYMBOLS_ELEMENTS = document.getElementsByClassName('symbols')[0].children;
}

window.addEventListener("load", (event) => {
    init();
    // Timeout for LivelyWallpaper to set initial values
    setTimeout(() => {
        setCurrentTime(); // initializes the clock
        EXPECTED = Date.now() + INTERVAL - Date.now() % INTERVAL; // round up to next second
        setTimeout(setIntervalWithDrift, EXPECTED - Date.now(), setCurrentTime, true); // start the interval
    }, 100);
});

// Auxiliary constants
const INTERVAL = 1000; // ms
let EXPECTED = null;

/**
 * Set an interval with drift compensation.
 * @param {Function} fn - The function to call.
 * @param  {...any} args - The arguments to pass to the function.
 */
const setIntervalWithDrift = (fn, ...args) => {
    const dt = Date.now() - EXPECTED; // the drift (positive for overshooting)
    fn(...args);
    EXPECTED += INTERVAL;
    setTimeout(setIntervalWithDrift, Math.max(0, INTERVAL - dt), fn, ...args); // take into account drift
}
