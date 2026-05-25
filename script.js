const out    = document.getElementById('output');
const ghost  = document.getElementById('ghost-input');
const typed  = document.getElementById('typed-display');
const bgWash = document.getElementById('bgWash');
const ca     = document.getElementById('chromatic');
const term   = document.getElementById('terminal');

let locked  = false;
let history = [];
let histIdx = -1;

function addLine(text, cls, ms) {
  return new Promise(r => setTimeout(() => {
    const s = document.createElement('span');
    s.className = 'line' + (cls ? ' ' + cls : '');
    if (text === '') s.className += ' blank';
    s.textContent = text;
    out.appendChild(s);
    out.scrollTop = out.scrollHeight;
    r();
  }, ms || 0));
}

function addCodeNum(num, warnNum, glitch) {
  return new Promise(r => setTimeout(() => {
    const s = document.createElement('span');
    s.className = 'line code-num' + (warnNum ? ' warn-num' : '') + (glitch ? ' glitch' : '');
    s.textContent = num;
    out.appendChild(s);
    out.scrollTop = out.scrollHeight;
    r();
  }, 80));
}

function setAtmo(bg, op, caOn) {
  bgWash.style.background = bg;
  bgWash.style.opacity = op;
  if (caOn) {
    ca.classList.add('on');
    setTimeout(() => ca.classList.remove('on'), 700);
  }
}

function resetAtmo() {
  bgWash.style.opacity = 0;
  ca.classList.remove('on');
}

async function processError(e) {
  setAtmo(e.bg, e.bgOpacity, e.caOn);
  await addCodeNum(e.num, e.warnNum, e.glitch);
  for (let i = 0; i < e.lines.length; i++) {
    await addLine(e.lines[i].text, e.lines[i].cls, 90 + i * 55);
  }
  await addLine('', '', e.lines.length * 55 + 180);
}

async function processHidden(key, val) {
  if (val === '__CLEAR__') {
    await new Promise(r => setTimeout(r, 200));
    out.innerHTML = '';
    resetAtmo();
    return;
  }
  resetAtmo();
  for (let i = 0; i < val.length; i++) {
    const cls = val[i] === '' ? '' : (i === 0 ? 'mid' : 'muted');
    await addLine(val[i], cls, 80 + i * 70);
  }
  await addLine('', '', val.length * 70 + 120);
}

async function processUnknown(cmd) {
  resetAtmo();
  const opts = [
    `'${cmd}': command not found.`,
    `'${cmd}': not a feeling this system recognizes.`,
    `'${cmd}': undefined. like a lot of things.`,
    'command not found. neither is clarity.',
  ];
  await addLine(opts[Math.floor(Math.random() * opts.length)], 'dim', 80);
  await addLine('', '', 160);
}

async function run(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;

  history.unshift(raw.trim());
  histIdx = -1;
  locked = true;
  updateCursor();

  await addLine('> ' + raw.trim(), 'echo', 20);

  if (ERRORS[cmd]) {
    await processError(ERRORS[cmd]);
  } else if (Object.prototype.hasOwnProperty.call(HIDDEN, cmd)) {
    await processHidden(cmd, HIDDEN[cmd]);
  } else {
    await processUnknown(cmd);
  }

  locked = false;
  updateCursor();
  ghost.focus();
}

function updateCursor() {
  typed.innerHTML = (locked ? '' : ghost.value) + '<span class="cursor"></span>';
}

ghost.addEventListener('input', () => { if (!locked) updateCursor(); });

ghost.addEventListener('keydown', async e => {
  if (locked) { e.preventDefault(); return; }

  if (e.key === 'Enter') {
    const v = ghost.value;
    ghost.value = '';
    updateCursor();
    await run(v);

  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (history.length) {
      histIdx = Math.min(histIdx + 1, history.length - 1);
      ghost.value = history[histIdx];
      updateCursor();
    }

  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    histIdx = Math.max(histIdx - 1, -1);
    ghost.value = histIdx === -1 ? '' : history[histIdx];
    updateCursor();

  } else {
    setTimeout(updateCursor, 0);
  }
});

term.addEventListener('click', () => ghost.focus());

async function boot() {
  locked = true;
  const seq = [
    { text: 'emotional recovery system v0.3.1', cls: 'mid',       ms: 0    },
    { text: '────────────────────────────────', cls: 'separator', ms: 120  },
    { text: '',                                  cls: '',          ms: 200  },
    { text: 'initializing...',                  cls: 'muted',     ms: 380  },
    { text: 'scanning for stable processes...', cls: 'muted',     ms: 700  },
    { text: 'found: 0',                         cls: 'warn',      ms: 1020 },
    { text: '',                                  cls: '',          ms: 1200 },
    { text: 'recovery mode : inactive',         cls: 'muted',     ms: 1380 },
    { text: 'errors on record : several',       cls: 'muted',     ms: 1520 },
    { text: '',                                  cls: '',          ms: 1680 },
    { text: 'enter a status code or type help', cls: 'bright',    ms: 1900 },
    { text: '',                                  cls: '',          ms: 2050 },
  ];

  for (const s of seq) await addLine(s.text, s.cls, s.ms);
  setTimeout(() => { locked = false; updateCursor(); ghost.focus(); }, 2150);
}

boot();
