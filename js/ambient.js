(() => {
  const root = document.documentElement;
  let x = 50, y = 50;

  document.addEventListener('pointermove', e => {
    x = (e.clientX / innerWidth) * 100;
    y = (e.clientY / innerHeight) * 100;
    root.style.setProperty('--mx', x + '%');
    root.style.setProperty('--my', y + '%');
  });

  document.querySelectorAll('.panel, .btn').forEach(el => {
    el.addEventListener('pointerenter', () => el.classList.add('is-hovering'));
    el.addEventListener('pointerleave', () => el.classList.remove('is-hovering'));
  });
})();