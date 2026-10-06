(() => {
  const currentPathEl = document.getElementById('currentPath');
  if (currentPathEl) {
    currentPathEl.textContent = window.location.pathname || '/unknown-route';
  }

  const bruteText = document.getElementById('bruteText');
  const termReason = document.getElementById('termReason');
  const nextExcuseBtn = document.getElementById('nextExcuse');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  const excuses = [
    "Причина: Эту страницу зашифровали 64-символьным ключом и забыли пароль.",
    "Причина: Хеш запроса не совпал с контрольной суммой сервера.",
    "Причина: Слишком сильный пароль заблокировал доступ даже для разработчиков.",
    "Причина: Ключ генератора был сброшен во время обновления алгоритмов.",
    "Причина: Страница защищена 2FA, но код выслан на несуществующий пейджер."
  ];

  let excuseIdx = 0;

  // Эффект беспрерывного подбора пароля
  if (bruteText) {
    setInterval(() => {
      let res = '';
      for (let i = 0; i < 14; i++) {
        res += chars[Math.floor(Math.random() * chars.length)];
      }
      bruteText.textContent = res;
    }, 70);
  }

  // Генерация новой причины
  if (nextExcuseBtn && termReason) {
    nextExcuseBtn.addEventListener('click', () => {
      excuseIdx = (excuseIdx + 1) % excuses.length;
      termReason.textContent = excuses[excuseIdx];
      termReason.classList.remove('flash');
      void termReason.offsetWidth;
      termReason.classList.add('flash');
    });
  }
})();