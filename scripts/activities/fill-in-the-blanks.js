/**
 * Logic for fill-in-the-blank course activities.
 */
const copyBtns = document.querySelectorAll('.copyBtn');
const outputs = document.querySelectorAll(`span[class^='output']`);
const dates = document.querySelectorAll('.outputDate')

/**
 * Format an array of HTML input values into readable dates and times.
 */
function formatDateTime(datetimeArray) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2})?$/;
    const length = datetimeArray.length;

    // Reuse heavy Intl formatter objects instead of recreating them per item
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const datetimeFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    for (let i = 0; i < length; i++) {
        const item = datetimeArray[i];

        if (dateRegex.test(item)) {
            // Fast length check: YYYY-MM-DD is exactly 10 characters
            if (item.length > 10) {
                const newDate = new Date(item);
                let formatted = datetimeFormatter.format(newDate);

                // Hyper-optimized localized suffix replacement via logical mapping
                const endsWithAM = formatted.charCodeAt(formatted.length - 2) === 65; // 'A'
                formatted = formatted.slice(0, -3) + (endsWithAM ? ' a.m.' : ' p.m.');

                datetimeArray[i] = formatted;
            } else {
                // Append T00:00 to enforce consistent local time execution safely
                datetimeArray[i] = dateFormatter.format(new Date(item + 'T00:00'));
            }
        }
    }
}
copyBtns.forEach(copyBtn => {
    copyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = e.target.parentElement;
        const inputs = parent.querySelectorAll('input,textarea');
        const liveRegion = parent.querySelector('.liveRegion');
        const textToCopy = document.createElement('textarea');
    
        // Copy input values to array
        const inputValues = Array.from(inputs).map(input => input.value);
        formatDateTime(inputValues);
    
        // Update live region with full sentence
        outputs.forEach((output, index) => {
            if (inputValues[index]) {
                output.innerHTML = inputValues[index];
            }
        });
    
        // Copy to clipboard
        textToCopy.value = liveRegion.innerText;
        textToCopy.classList.add('visually-hidden');
        document.body.appendChild(textToCopy);
        textToCopy.focus();
        textToCopy.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) console.log('Text copied!');
        } catch (err) {
            console.error('Fallback failed', err);
        }
    
        // Cleanup
        document.body.removeChild(textToCopy);
    });
});
