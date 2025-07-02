// Guarda os estilos originais para restauração
const originalStyles = new Map();
let initialized = false;

function initOriginalStyles() {
  if (initialized) return;
  document.querySelectorAll('path.blocklyPath').forEach(path => {
    originalStyles.set(path, {
      fill:   path.getAttribute('fill'),
      stroke: path.getAttribute('stroke'),
      filter: path.style.filter || ''
    });
  });
  initialized = true;
}

function clearHighlights() {
  initOriginalStyles();
  document.querySelectorAll('path.blocklyPath').forEach(path => {
    const style = originalStyles.get(path);
    if (style) {
      if (style.fill !== null) path.setAttribute('fill', style.fill);
      else path.removeAttribute('fill');
      if (style.stroke !== null) path.setAttribute('stroke', style.stroke);
      else path.removeAttribute('stroke');
      path.style.filter = style.filter;
    } else {
      path.style.filter = '';
    }
  });
  const countDiv = document.getElementById('bh-count');
  if (countDiv) countDiv.remove();
}

function showCount(count) {
  let div = document.getElementById('bh-count');
  if (!div) {
    div = document.createElement('div');
    div.id = 'bh-count';
    Object.assign(div.style, {
      position: 'fixed', top: '10px', right: '10px',
      background: 'rgba(255, 255, 0, 0.3)', color: '#000',
      padding: '4px 8px', borderRadius: '4px',
      zIndex: '9999', fontSize: '12px', fontFamily: 'Arial, sans-serif'
    });
    document.body.appendChild(div);
  }
  div.textContent = `${count} bloco${count === 1 ? '' : 's'} encontrado${count === 1 ? '' : 's'}`;
}

function highlightBlocks(keyword) {
  initOriginalStyles();
  const term = (keyword || '').trim().toLowerCase();
  if (!term) {
    clearHighlights();
    return;
  }
  clearHighlights();
  let count = 0;
  document.querySelectorAll('g.blocklyDraggable').forEach(block => {
    const combined = block.textContent || '';
    if (combined.toLowerCase().includes(term)) {
      count++;
      block.querySelectorAll('path.blocklyPath').forEach(path => {
        path.style.filter = 'drop-shadow(0 0 6px yellow) drop-shadow(0 0 6px yellow)';
      });
    }
  });
  showCount(count);
}

// Atalhos: Ctrl+Shift+F (buscar), Ctrl+Shift+L (limpar)
window.addEventListener('keydown', e => {
  const isMac = navigator.platform.includes('Mac');
  const ctrl = isMac ? e.metaKey : e.ctrlKey;
  if (ctrl && e.shiftKey) {
    if (e.code === 'KeyF') {
      e.preventDefault();
      const term = window.prompt('Highlight Blocks containing:', '');
      highlightBlocks(term);
    } else if (e.code === 'KeyL') {
      e.preventDefault();
      clearHighlights();
    }
  }
}, true);

initOriginalStyles();

// ============ MENSAGENS DO POPUP =============
chrome.runtime?.onMessage?.addListener((req, sender, sendResponse) => {
  if (req.action === 'clear') {
    clearHighlights();
    sendResponse({ status: 'ok' });
  } else if (req.action === 'highlight') {
    highlightBlocks(req.keyword);
    sendResponse({ status: 'ok' });
  } else {
    sendResponse({ status: 'error', message: 'Ação desconhecida: ' + req.action });
  }
  return true;
});

