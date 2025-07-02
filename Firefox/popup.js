const keywordInput = document.getElementById('keyword');
const highlightBtn = document.getElementById('highlightBtn');
const clearBtn     = document.getElementById('clearBtn');
const closeBtn     = document.getElementById('closeBtn');
const langSelect   = document.getElementById('langSelect');
const titleText    = document.getElementById('titleText');

const translations = {
  en: {
    title:       'Blockly Highlighter',
    placeholder: 'Enter keyword...',
    highlight:   'Highlight',
    clear:       'Clear'
  },
  pt: {
    title:       'Destacador de Blockly',
    placeholder: 'Digite a palavra...',
    highlight:   'Destacar',
    clear:       'Desmarcar'
  },
  es: {
    title:       'Resaltador Blockly',
    placeholder: 'Ingrese palabra...',
    highlight:   'Resaltar',
    clear:       'Borrar'
  }
};

function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  titleText.textContent    = t.title;
  keywordInput.placeholder = t.placeholder;
  highlightBtn.textContent = t.highlight;
  clearBtn.textContent     = t.clear;
}

function sendMessage(action, payload = {}) {
  // Compatível com Chrome/Firefox
  (chrome.tabs || browser.tabs).query({ active: true, currentWindow: true }, tabs => {
    (chrome.tabs || browser.tabs).sendMessage(
      tabs[0].id,
      { action, ...payload },
      response => {
        if (chrome.runtime.lastError) {
          alert(`Error: ${chrome.runtime.lastError.message}`);
        } else if ((action === 'highlight' || action === 'clear') 
                   && response && response.status === 'error') {
          alert(`Error: ${response.message}`);
        }
      }
    );
  });
}

highlightBtn.addEventListener('click', () => {
  const kw = keywordInput.value.trim();
  if (kw) sendMessage('highlight', { keyword: kw });
});
clearBtn.addEventListener('click', () => {
  sendMessage('clear');
  keywordInput.value = '';
});

keywordInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    highlightBtn.click();
  }
});
langSelect.addEventListener('change', () => applyLanguage(langSelect.value));
closeBtn.addEventListener('click', () => window.close());

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') e.stopPropagation(), e.preventDefault();
});
window.addEventListener('blur', e => {
  e.stopPropagation(); e.preventDefault(); window.focus();
});

applyLanguage('en');

