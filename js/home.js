(() => {
  const passwordEl = document.querySelector('#livePassword');
  const metaEl = document.querySelector('#livePasswordMeta');
  const statusEl = document.querySelector('#liveStatus');
  if (!passwordEl) return;

  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{};:,.?';
  const all = lower + upper + nums + symbols;

  function randomInt(max) {
    const a = new Uint32Array(1);
    crypto.getRandomValues(a);
    return a[0] % max;
  }

  function makePassword() {
    const length = 14 + randomInt(9);
    let out = '';
    out += lower[randomInt(lower.length)];
    out += upper[randomInt(upper.length)];
    out += nums[randomInt(nums.length)];
    out += symbols[randomInt(symbols.length)];
    while (out.length < length) out += all[randomInt(all.length)];
    return [...out].sort(() => randomInt(2) - 0.5).join('');
  }

  let timer;
  function animatePassword() {
    const target = makePassword();
    passwordEl.classList.remove('live-changing');
    void passwordEl.offsetWidth;
    passwordEl.classList.add('live-changing');

    let i = 0;
    clearInterval(timer);
    timer = setInterval(() => {
      if (i <= target.length) {
        passwordEl.textContent = target.slice(0, i) + (i < target.length ? '▌' : '');
        i++;
      } else {
        clearInterval(timer);
        passwordEl.textContent = target;
        if (metaEl) metaEl.textContent = `Сильный пароль · ${target.length} символов`;
        if (statusEl) statusEl.textContent = 'готово · следующий через 2 сек';
        setTimeout(() => {
          if (statusEl) statusEl.textContent = 'создаём новый ключ…';
          animatePassword();
        }, 2000);
      }
    }, 38);
  }

  animatePassword();
})();