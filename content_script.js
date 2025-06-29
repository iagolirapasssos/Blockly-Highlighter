// content_script.js
let originalFills = new Map();
let initialized = false;

// Armazena o fill (e opcionalmente stroke) originais de cada <path>
function initOriginalStyles() {
  if (initialized) return;
  document.querySelectorAll('path.blocklyPath').forEach(path => {
    originalFills.set(path, {
      fill:   path.getAttribute('fill'),
      stroke: path.getAttribute('stroke')
    });
  });
  initialized = true;
}

// Restaura todos os estilos originais
function clearHighlights() {
  initOriginalStyles();
  for (let [path, style] of originalFills) {
    if (style.fill !== null)   path.setAttribute('fill', style.fill);
    else                         path.removeAttribute('fill');
    if (style.stroke !== null) path.setAttribute('stroke', style.stroke);
    else                        path.removeAttribute('stroke');
  }
  return { status: 'ok' };
}

// Destaca apenas os blocos cujo texto combina
function highlightBlocks(keyword) {
  initOriginalStyles();
  clearHighlights();

  const blocks = document.querySelectorAll('g.blocklyDraggable');
  blocks.forEach(block => {
    // Textos internos concatenados
    const combined = Array.from(block.querySelectorAll('text.blocklyText'))
                          .map(t => t.textContent).join(' ');
    if (combined.toLowerCase().includes(keyword.toLowerCase())) {
      block.querySelectorAll('path.blocklyPath').forEach(path => {
        path.setAttribute('fill', '#fff59d');
      });
    }
  });
  return { status: 'ok' };
}

// Recebe mensagens do popup
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  let res;
  if (req.action === 'clear') {
    res = clearHighlights();
  } else if (req.action === 'highlight') {
    res = highlightBlocks(req.keyword);
  } else {
    res = { status: 'error', message: 'Ação desconhecida: ' + req.action };
  }
  sendResponse(res);
  return true;
});
