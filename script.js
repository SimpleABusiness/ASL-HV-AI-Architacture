const slides = [...document.querySelectorAll('.slide')];
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const currentLabel = document.querySelector('#currentSlide');
const totalLabel = document.querySelector('#totalSlides');
const progress = document.querySelector('.deck-progress span');
const outline = document.querySelector('#outline');
const outlineNav = outline.querySelector('nav');
const outlineToggle = document.querySelector('.outline-toggle');
const outlineClose = document.querySelector('.outline-close');
const backdrop = document.querySelector('.outline-backdrop');
const selectionText = document.querySelector('#selectionText');
const decisionButtons = [...document.querySelectorAll('[data-decision]')];
const validDecisions = new Set(decisionButtons.map((button) => button.dataset.decision));
const conceptButtons = [...document.querySelectorAll('[data-concept]')];
const conceptKind = document.querySelector('#conceptKind');
const conceptTitle = document.querySelector('#conceptTitle');
const conceptText = document.querySelector('#conceptText');
const concepts = {
  skill: {
    kind: 'Skill · wiederverwendbares Können',
    title: '„Schadensmeldung verstehen“',
    text: 'Feste Fachanweisung mit Eingaben, Prüfschritten und Ausgabeformat – Anita muss den Prompt nicht jedes Mal neu formulieren.',
  },
  tool: {
    kind: 'Tool · begrenzte Systemaktion',
    title: '„Outlook-Entwurf anlegen“',
    text: 'Ein Connector oder eine geprüfte API liest oder schreibt in genau einem System – nur mit den dafür notwendigen Berechtigungen.',
  },
  workflow: {
    kind: 'Workflow · verlässliche Abfolge',
    title: '„Neue Mail → prüfen → Entwurf“',
    text: 'Power Automate startet durch ein Ereignis, ruft Skill und Tools in fester Reihenfolge auf und hält bei Ausnahmen oder Freigaben an.',
  },
  memory: {
    kind: 'Memory · bestätigter Kontext',
    title: '„Objekt, Vorgang und letzter Stand“',
    text: 'Strukturierte Fakten mit Quelle und Gültigkeit statt freiem KI-Gedächtnis. Fachdaten bleiben im führenden System.',
  },
};
const pad = (value) => String(value).padStart(2, '0');
const slideKey = 'asl-presentation-slide';
const decisionKey = 'asl-presentation-decision';
let current = 0;

function storageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The presentation remains fully usable when browser storage is blocked.
  }
}

function storageRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // No cleanup is required when browser storage is unavailable.
  }
}

function initialSlide() {
  const hashIndex = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);
  if (hashIndex >= 0) return hashIndex;
  const stored = Number.parseInt(storageGet(slideKey) ?? '0', 10);
  return Number.isFinite(stored) ? Math.max(0, Math.min(slides.length - 1, stored)) : 0;
}

function showSlide(index, { focus = false } = {}) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === current;
    slide.classList.toggle('active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });

  currentLabel.textContent = pad(current + 1);
  totalLabel.textContent = pad(slides.length);
  progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  prevButton.disabled = current === 0;
  nextButton.disabled = current === slides.length - 1;
  storageSet(slideKey, String(current));
  history.replaceState(null, '', `#${slides[current].id}`);
  slides[current].scrollTop = 0;
  window.scrollTo(0, 0);

  [...outlineNav.querySelectorAll('button')].forEach((button, buttonIndex) => {
    const isCurrent = buttonIndex === current;
    button.classList.toggle('active', isCurrent);
    if (isCurrent) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });

  if (focus) slides[current].focus({ preventScroll: true });
}

function buildOutline() {
  slides.forEach((slide, index) => {
    const button = document.createElement('button');
    const number = document.createElement('span');
    const title = document.createElement('strong');
    button.type = 'button';
    number.textContent = pad(index + 1);
    title.textContent = slide.dataset.title;
    button.append(number, title);
    button.addEventListener('click', () => {
      showSlide(index, { focus: true });
      setOutline(false);
    });
    outlineNav.append(button);
  });
}

function setOutline(open) {
  const wasOpen = outline.classList.contains('open');
  outline.classList.toggle('open', open);
  backdrop.classList.toggle('open', open);
  outline.setAttribute('aria-hidden', String(!open));
  outlineToggle.setAttribute('aria-expanded', String(open));

  if (open) {
    outlineClose.focus();
  } else if (wasOpen) {
    outlineToggle.focus();
  }
}

function trapOutlineFocus(event) {
  const focusable = [...outline.querySelectorAll('button:not([disabled]), a[href]')];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function setDecision(value) {
  const validValue = validDecisions.has(value) ? value : null;
  selectionText.textContent = validValue || 'Noch offen – gemeinsam besprechen';
  decisionButtons.forEach((button) => {
    const selected = button.dataset.decision === validValue;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  if (validValue) storageSet(decisionKey, validValue);
  else storageRemove(decisionKey);
}

function setConcept(value) {
  const concept = concepts[value];
  if (!concept || !conceptKind || !conceptTitle || !conceptText) return;
  conceptKind.textContent = concept.kind;
  conceptTitle.textContent = concept.title;
  conceptText.textContent = concept.text;
  conceptButtons.forEach((button) => {
    const selected = button.dataset.concept === value;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

prevButton.addEventListener('click', () => showSlide(current - 1));
nextButton.addEventListener('click', () => showSlide(current + 1));
outlineToggle.addEventListener('click', () => setOutline(!outline.classList.contains('open')));
outlineClose.addEventListener('click', () => setOutline(false));
backdrop.addEventListener('click', () => setOutline(false));
decisionButtons.forEach((button) => button.addEventListener('click', () => setDecision(button.dataset.decision)));
conceptButtons.forEach((button) => {
  const selectConcept = () => setConcept(button.dataset.concept);
  button.addEventListener('mouseenter', selectConcept);
  button.addEventListener('focus', selectConcept);
  button.addEventListener('click', selectConcept);
});

document.addEventListener('keydown', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const outlineIsOpen = outline.classList.contains('open');

  if (outlineIsOpen) {
    if (event.key === 'Tab') trapOutlineFocus(event);
    if (event.key === 'Escape' || event.key.toLowerCase() === 'o') {
      event.preventDefault();
      setOutline(false);
    }
    return;
  }

  if (target?.matches('input, textarea, select') || target?.isContentEditable) return;
  if (target?.matches('button, a') && event.key === ' ') return;

  if (!event.ctrlKey && !event.metaKey && !event.altKey && /^[0-9]$/.test(event.key)) {
    const slideNumber = event.key === '0' ? 10 : Number.parseInt(event.key, 10);
    if (slideNumber <= slides.length) {
      event.preventDefault();
      showSlide(slideNumber - 1, { focus: true });
    }
    return;
  }

  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
    event.preventDefault();
    showSlide(current + 1, { focus: true });
  }
  if (['ArrowLeft', 'PageUp'].includes(event.key)) {
    event.preventDefault();
    showSlide(current - 1, { focus: true });
  }
  if (event.key === 'Home') showSlide(0, { focus: true });
  if (event.key === 'End') showSlide(slides.length - 1, { focus: true });
  if (event.key.toLowerCase() === 'o') setOutline(true);
});

window.addEventListener('hashchange', () => {
  const hashIndex = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);
  if (hashIndex >= 0 && hashIndex !== current) showSlide(hashIndex);
});

buildOutline();
setDecision(storageGet(decisionKey));
setConcept('skill');
showSlide(initialSlide());
