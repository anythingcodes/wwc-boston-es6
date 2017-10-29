function transpile(inputEl, outputEl) {
    try {
        const transformed = Babel.transform(inputEl.innerText, {
            presets: ['es2015', 'stage-0']
        });
        if (outputEl.classList.contains('error')) {
            outputEl.classList.remove('error');
        }
        outputEl.innerHTML = transformed.code;
        if(window.hljs) {
            window.hljs.highlightBlock(outputEl);
        }
    } catch (ex) {
        if (!outputEl.classList.contains('error')) {
            outputEl.classList.add('error');
        }
        outputEl.innerText = 'ERROR: ' + ex.message;
    }
}

function addListenerMulti(el, s, fn) {
    const events = s.split(' ');
    for(var i = 0; i < events.length; i++) {
        el.addEventListener(events[i], fn, false)
    }
}

function ready() {
    const transpilers = document.getElementsByClassName('transpiler');
    [].forEach.call(transpilers, function(transpiler) {
        const input = transpiler.querySelectorAll('.transpiler__input')[0];
        const output = transpiler.querySelectorAll('.transpiler__output')[0];
        addListenerMulti(input, 'keyup keydown', function (e) {
            const code = (e.keyCode || e.which);
            if(!code || code !== 37 && code !== 38 && code !== 39 && code !== 40) {
                transpile(input, output);
            }
        });
        transpile(input, output);
    });
}

if (document.readyState === 'complete' || document.readyState !== 'loading') {
    ready();
} else {
    document.addEventListener('DOMContentLoaded', ready);
}
