const els = {
  length: document.querySelector('#length'),
  lengthValue: document.querySelector('#lengthValue'),
  lower: document.querySelector('#lower'),
  upper: document.querySelector('#upper'),
  numbers: document.querySelector('#numbers'),
  symbols: document.querySelector('#symbols'),
  ambiguous: document.querySelector('#ambiguous'),
  result: document.querySelector('#passwordResult'),
  strength: document.querySelector('#strengthText'),
  lengthText: document.querySelector('#lengthText'),
  meter: [...document.querySelectorAll('.meter i')]
};

function randomInt(max) {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] % max;
}

function generate() {
  if (!els.result) return;
  els.result.classList.remove('flash');
  void els.result.offsetWidth;
  els.result.classList.add('flash');

  let sets = [];
  if (els.lower.checked) sets.push('abcdefghijklmnopqrstuvwxyz');
  if (els.upper.checked) sets.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  if (els.numbers.checked) sets.push('0123456789');
  if (els.symbols.checked) sets.push('!@#$%^&*()-_=+[]{};:,.?');

  if (!sets.length) {
    els.result.textContent = 'Выберите хотя бы один набор';
    return;
  }

  let all = sets.join('');
  if (els.ambiguous.checked) all = all.replace(/[O0Il1|]/g, '');
  sets = sets.map(s => s.replace(/[O0Il1|]/g, ''));

  let chars = sets.map(s => s[randomInt(s.length)]);
  while (chars.length < +els.length.value) {
    chars.push(all[randomInt(all.length)]);
  }

  for (let i = chars.length - 1; i > 0; i--) {
    let j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  els.result.textContent = chars.slice(0, +els.length.value).join('');
  els.lengthText.textContent = `${els.result.textContent.length} символов`;

  let score = 0;
  if (els.result.textContent.length >= 12) score++;
  if (els.result.textContent.length >= 20) score++;
  if (sets.length >= 3) score++;
  if (sets.length === 4) score++;

  els.meter.forEach((x, i) => x.classList.toggle('on', i < score));
  els.strength.textContent = score >= 4 ? 'Очень сильный' : score >= 3 ? 'Сильный' : score >= 2 ? 'Средний' : 'Слабый';
}

if (els.length) {
  els.length.addEventListener('input', () => {
    els.lengthValue.textContent = els.length.value;
    generate();
  });
  [els.lower, els.upper, els.numbers, els.symbols, els.ambiguous].forEach(x => x && x.addEventListener('change', generate));
  
  const refreshBtn = document.querySelector('#refreshPassword');
  if (refreshBtn) refreshBtn.addEventListener('click', generate);

  const copyBtn = document.querySelector('#copyPassword');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      await navigator.clipboard.writeText(els.result.textContent);
      const old = copyBtn.textContent;
      copyBtn.textContent = 'Скопировано ✓';
      setTimeout(() => copyBtn.textContent = old, 1200);
    });
  }

  generate();
}