// demo logic — НИКАКИХ реальных платежей, только имитация
document.addEventListener('DOMContentLoaded', () => {
  const countryEl = document.getElementById('country');
  const phoneEl = document.getElementById('phone');
  const amountEl = document.getElementById('amount');
  const currencyEl = document.getElementById('currency');
  const payForm = document.getElementById('payForm');
  const formMsg = document.getElementById('formMsg');
  const resultModal = document.getElementById('resultModal');
  const resultContent = document.getElementById('resultContent');
  const closeResult = document.getElementById('closeResult');
  const okBtn = document.getElementById('okBtn');
  const simCTA = document.getElementById('simCTA');
  const demoFill = document.getElementById('demoFill');

  // простая таблица кодов (можно расширить)
  const countryDial = {
    US: '+1', GB: '+44', RU: '+7', UA: '+380',
    IN: '+91', DE: '+49', BR: '+55', CN: '+86',
    FR: '+33', PL: '+48'
  };

  // подсказка: при выборе страны можно автоматически проставлять placeholder
  countryEl.addEventListener('change', () => {
    const code = countryDial[countryEl.value] || '';
    phoneEl.placeholder = `Например: ${code.replace('+','')} 501234567`.replace('  ', ' ');
  });

  // демо кнопка заполняет форму
  demoFill.addEventListener('click', () => {
    countryEl.value = 'UA';
    countryEl.dispatchEvent(new Event('change'));
    phoneEl.value = '501234567';
    amountEl.value = '7.50';
    currencyEl.value = 'UAH';
    formMsg.textContent = '';
  });

  // симуляция нажатия на рекламную кнопку
  simCTA.addEventListener('click', () => {
    // простое модальное сообщение
    showModalWithHTML(`
      <h3>SIM‑карта: специальное предложение</h3>
      <p>Переход на страницу оператора (DEMO). Тарифы от 50₴/мес. Для подключения — звонок в службу.</p>
      <p style="color:var(--muted);font-size:13px">Это демо‑реклама — в реальном проекте ведёт на страницу товара или popup.</p>
    `);
  });

  payForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formMsg.textContent = '';
    const country = countryEl.value;
    const phone = phoneEl.value.trim();
    const amount = parseFloat(amountEl.value);
    const currency = currencyEl.value;

    // Валидация
    if (!phone) { formMsg.textContent = 'Введите номер телефона.'; return; }
    if (!/^\d{5,15}$/.test(phone)) { formMsg.textContent = 'Номер должен содержать 5–15 цифр без пробелов.'; return; }
    if (!amount || amount <= 0) { formMsg.textContent = 'Введите корректную сумму.'; return; }

    const dial = countryDial[country] || '';
    const fullNumber = `${dial}${phone}`;

    // имитация обработки (показываем экран отправки, затем результат)
    showModalWithHTML(`<h3>Отправка платежа...</h3>
      <p>Платёж: <strong>${amount.toFixed(2)} ${currency}</strong></p>
      <p>Получатель: <strong>${fullNumber}</strong></p>
      <p style="color:var(--muted)">Идёт соединение с платёжным шлюзом (демо)</p>
    `);

    // через короткое время показываем успешный результат (демо)
    setTimeout(() => {
      showModalWithHTML(`
        <div class="result-success">
          <div class="dot">✓</div>
          <div>
            <h3>Платёж отправлен</h3>
            <p><strong>${amount.toFixed(2)} ${currency}</strong> успешно отправлено на <strong>${fullNumber}</strong></p>
            <p style="color:var(--muted)">ID транзакции: <strong>DEMO-${Date.now().toString().slice(-6)}</strong></p>
          </div>
        </div>
      `);
    }, 1200);
  });

  // helper: показать modal с HTML
  function showModalWithHTML(html) {
    resultContent.innerHTML = html;
    resultModal.classList.remove('hidden');
    resultModal.setAttribute('aria-hidden', 'false');
  }
  function hideResult() {
    resultModal.classList.add('hidden');
    resultModal.setAttribute('aria-hidden', 'true');
  }

  closeResult.addEventListener('click', hideResult);
  okBtn.addEventListener('click', hideResult);

  // закрыть по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideResult();
  });

  // accessibility: предотвратить отправку формы при Enter в некоторых полях
  phoneEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') e.preventDefault();
  });

});
