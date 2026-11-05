/* ============================================================
   У-Син: баланс пяти элементов
   Данные, логика, localStorage, Chart.js
   ============================================================ */

/* ---------- 1. ДАННЫЕ ЭЛЕМЕНТОВ ---------- */

const ELEMENTS = {
  wood:  { key: 'wood',  name: 'Дерево',  organ: 'Печень и Желчный пузырь', color: '#3a7d44' },
  fire:  { key: 'fire',  name: 'Огонь',   organ: 'Сердце и Тонкий кишечник', color: '#c0392b' },
  earth: { key: 'earth', name: 'Земля',   organ: 'Селезёнка и Желудок',      color: '#d4a017' },
  metal: { key: 'metal', name: 'Металл',  organ: 'Лёгкие и Толстый кишечник',color: '#8e9aa6' },
  water: { key: 'water', name: 'Вода',    organ: 'Почки и Мочевой пузырь',   color: '#1f3a5f' }
};

const ORDER = ['wood', 'fire', 'earth', 'metal', 'water'];

/* ---------- 2. ВОПРОСЫ (5 блоков × 10) ---------- */

const QUESTIONS = {
  wood: {
    title: 'Дерево',
    key: 'застой, напряжение, гнев, планирование',
    items: [
      'Раздражаюсь по мелочам, вспышки гнева',
      'Чувство внутреннего напряжения, «сжатия» в груди или горле',
      'Вздутие, метеоризм, чередование запора и диареи',
      'ПМС с раздражительностью и набуханием груди (для женщин)',
      'Головные боли в висках, напряжение в шее и плечах',
      'Чувство фрустрации, «всё не так, как хочу»',
      'Трудности с гибкостью планов, злюсь при изменениях',
      'Проблемы с глазами: сухость, покраснение, усталость',
      'Спазмы, судороги, тики, подёргивание века',
      'Ощущение «комка» или застоя в горле'
    ]
  },
  fire: {
    title: 'Огонь',
    key: 'радость, сон, эмоциональный контакт',
    items: [
      'Трудно заснуть из-за «перевозбуждённого» ума',
      'Просыпаюсь ночью (особенно 23:00–3:00) и не могу уснуть',
      'Ощущение жара, потливость, приливы',
      'Тревога, беспокойство, «сердце не на месте»',
      'Сердцебиение, перебои в работе сердца',
      'Трудно радоваться, ощущение пустоты или апатии',
      'Яркие или тревожные сны, часто просыпаюсь разбитым',
      'Проблемы с речью: запинки, трудно подобрать слова',
      'Язвочки во рту, покраснение языка',
      'Чувство изоляции, нехватка близкого контакта'
    ]
  },
  earth: {
    title: 'Земля',
    key: 'пищеварение, забота, «пережёвывание» мыслей',
    items: [
      'Вздутие и тяжесть после еды, особенно после сладкого или мучного',
      'Стул неоформленный, склонность к диарее',
      'Усталость после еды, «туман» в голове',
      'Навязчивые мысли, «пережёвываю» одну и ту же проблему',
      'Тяга к сладкому, особенно в стрессе',
      'Отёчность, пастозность, ощущение тяжести в теле',
      'Снижение аппетита или, наоборот, переедание',
      'Трудно сказать «нет», беру на себя лишнюю заботу о других',
      'Слабость мышц, чувство «ватных» ног',
      'Склонность к кровоподтёкам, долго заживают'
    ]
  },
  metal: {
    title: 'Металл',
    key: 'дыхание, границы, отпускание, порядок',
    items: [
      'Частые простуды, слабый иммунитет, долго выздоравливаю',
      'Сухость кожи, слизистых, кашель без мокроты',
      'Аллергии, заложенность носа, проблемы с носом',
      'Запоры, трудности с опорожнением',
      'Печаль, грусть, трудно «отпустить» прошлое',
      'Ощущение нехватки воздуха, поверхностное дыхание',
      'Склонность к перфекционизму, жёстким правилам',
      'Трудно плакать или выражать эмоции, «держу всё в себе»',
      'Потливость по ночам, особенно в области груди',
      'Чувствительность к сухости воздуха, плохо переношу осень'
    ]
  },
  water: {
    title: 'Вода',
    key: 'воля, страх, жизненная сила, покой',
    items: [
      'Постоянная усталость, особенно утром, трудно встать',
      'Страхи, тревога о будущем, ощущение незащищённости',
      'Холод в пояснице, коленях, стопах',
      'Частое мочеиспускание, особенно ночью',
      'Снижение либидо, сексуальной энергии',
      'Боль или слабость в пояснице, коленях',
      'Шум в ушах, снижение слуха',
      'Отёки под глазами, тёмные круги',
      'Ощущение «выгорания», нет сил на желания',
      'Трудно доводить начатое до конца, нет воли'
    ]
  }
};

/* ---------- 3. РАСШИРЕННЫЕ РЕКОМЕНДАЦИИ ---------- */

const RECOMMENDATIONS = {
  wood: {
    title: '🌳 Дерево — Печень и Желчный пузырь',
    when: 'При избытке: раздражительность, застой, напряжение. При недостатке: апатия, нет планов, трудности с началом.',
    items: [
      'Движение и растяжка: ежедневная прогулка 20–30 мин, мягкая йога, растяжка боков тела и шеи.',
      'Дыхание: медленный выдох длиннее вдоха (4 вдох / 6 выдох) — снимает «сжатие».',
      'Творчество и выражение: рисование, письмо, музыка — выпустить то, что копится.',
      'Питание: зелень, кислое умеренно (лимон, квашеная капуста), меньше алкоголя и жирного.',
      'Режим: не подавляйте гнев — проговаривайте, двигайтесь, «выдыхайте» его.',
      'Планирование: разбивайте большие задачи на маленькие шаги, чтобы не было застоя.'
    ]
  },
  fire: {
    title: '🔥 Огонь — Сердце и Тонкий кишечник',
    when: 'При избытке: бессонница, тревога, жар. При недостатке: апатия, нет радости, изоляция.',
    items: [
      'Тёплые отношения: живой контакт, разговоры, объятия — «топливо» для Огня.',
      'Ритуалы радости: смех, музыка, любимое дело — ежедневно хотя бы 15 минут.',
      'Сон: ложиться до 23:00, за час до сна — без экранов, тёплый душ, спокойное дыхание.',
      'Питание: горькое умеренно (зелёный чай, руккола), красные продукты (помидоры, ягоды).',
      'При перевозбуждении: тёплые ванны для ног, дыхание с длинным выдохом, медитация.',
      'При апатии: маленькие социальные шаги — звонок другу, короткая встреча.'
    ]
  },
  earth: {
    title: '🏔 Земля — Селезёнка и Желудок',
    when: 'При избытке: тяжесть, навязчивые мысли, отёки. При недостатке: слабость, плохой аппетит, тревога о других.',
    items: [
      'Режим питания: 3 раза в день, тёплая еда, не на бегу, тщательно пережёвывать.',
      'Меньше сладкого и мучного — они перегружают Землю. Сладкое — из тыквы, моркови, батата.',
      'Тёплые блюда: каши, супы, тушёные овощи — легче усваиваются.',
      'Забота о себе: учитесь говорить «нет», не брать на себя лишнюю ответственность.',
      'Мысли: если «пережёвываете» проблему — запишите её на бумагу и отложите.',
      'Движение: спокойная ходьба после еды 10–15 минут помогает пищеварению.'
    ]
  },
  metal: {
    title: '⚔️ Металл — Лёгкие и Толстый кишечник',
    when: 'При избытке: жёсткость, перфекционизм, запоры. При недостатке: частые простуды, грусть, слабые границы.',
    items: [
      'Дыхательные практики: медленное глубокое дыхание 5–10 минут в день, дыхание животом.',
      'Границы: учитесь говорить «нет», защищайте личное пространство и время.',
      'Отпускание: практика «выписывания» обид и прошлого, прощение — в том числе себя.',
      'Питание: острое умеренно (имбирь, перец), белые продукты (рис, чечевица, редька).',
      'Порядок: разберите шкаф, стол — внешний порядок успокаивает Металл.',
      'Влажность: при сухости — увлажнитель, тёплые паровые ингаляции, больше воды.'
    ]
  },
  water: {
    title: '💧 Вода — Почки и Мочевой пузырь',
    when: 'При избытке: страхи, холод, частые мочеиспускания. При недостатке: упадок сил, нет воли, выгорание.',
    items: [
      'Сон: ложиться до 23:00, спать 7–8 часов — Вода восстанавливается во сне.',
      'Тепло: держите в тепле поясницу, колени, стопы. Тёплые ванны, грелка на поясницу.',
      'Отдых: не «дожимайте» себя до истощения — планируйте восстановление.',
      'Питание: тёмные продукты (чёрные бобы, водоросли, кунжут), солёное умеренно, тёплые бульоны.',
      'Страхи: практика заземления — стопы на полу, дыхание, ощущение опоры.',
      'Воля: маленькие ежедневные обещания себе и их выполнение укрепляют Воду.'
    ]
  }
};

/* ---------- 4. КЛАССИЧЕСКИЕ ПАТТЕРНЫ ДИСБАЛАНСА ---------- */

/* ---------- 4. КЛАССИЧЕСКИЕ ПАТТЕРНЫ ДИСБАЛАНСА ---------- */

function detectPattern(percents) {
  // Все элементы с максимальным процентом (может быть несколько)
  const maxVal = Math.max(...ORDER.map(k => percents[k]));
  const minVal = Math.min(...ORDER.map(k => percents[k]));
  const highKeys = ORDER.filter(k => percents[k] === maxVal);
  const lowKeys  = ORDER.filter(k => percents[k] === minVal);

  const highNames = highKeys.map(k => ELEMENTS[k].name).join(', ');
  const lowNames  = lowKeys.map(k => ELEMENTS[k].name).join(', ');

  // Если max === min — все элементы равны
  if (maxVal === minVal) {
    return {
      high: highKeys[0],
      low: lowKeys[0],
      highKeys,
      lowKeys,
      text: `Все пять элементов имеют одинаковый балл (${maxVal}%). Полный баланс — редкий и хороший результат.`
    };
  }

  const diff = maxVal - minVal;
  let text = '';

  if (diff < 15) {
    text = `Все пять элементов относительно сбалансированы. Наибольший балл: <b>${highNames}</b> (${maxVal}%), наименьший: <b>${lowNames}</b> (${minVal}%). Разница небольшая, выраженного дисбаланса нет.`;
  } else {
    // Ищем известные паттерны: перебираем ВСЕ комбинации high × low
    const patterns = [
      { h: 'wood',  l: 'earth', txt: 'Избыток Дерева «атакует» Землю: стресс и напряжение бьют по пищеварению. Типично при тревоге и проблемах с ЖКТ.' },
      { h: 'water', l: 'fire',  txt: 'Вода «гасит» Огонь: страхи и упадок сил подавляют радость и сон.' },
      { h: 'earth', l: 'metal', txt: 'Земля перегружает Металл: забота о других в ущерб себе, слабый иммунитет и границы.' },
      { h: 'metal', l: 'wood',  txt: 'Избыток Металла подавляет Дерево: жёсткость и контроль мешают гибкости и спонтанности.' },
      { h: 'wood',  l: 'metal', txt: 'Дерево «атакует» Металл: напряжение и раздражительность ослабляют дыхание и иммунитет.' },
      { h: 'fire',  l: 'water', txt: 'Огонь истощает Воду: перевозбуждение и тревога расходуют жизненную силу.' }
    ];

    const found = [];
    highKeys.forEach(h => {
      lowKeys.forEach(l => {
        const p = patterns.find(pt => pt.h === h && pt.l === l);
        if (p) found.push(p.txt);
      });
    });

    // Убираем дубли текстов (если несколько пар дали одинаковый паттерн)
    const uniqueFound = [...new Set(found)];

    if (uniqueFound.length > 0) {
      text = '<b>Паттерн:</b> ' + uniqueFound.join('<br><br><b>Паттерн:</b> ');
    } else {
      text = `Наиболее выражены: <b>${highNames}</b> (${maxVal}%), наиболее ослаблены: <b>${lowNames}</b> (${minVal}%). Обратите внимание на поддержку этих элементов.`;
    }

    // Дополнительная заметка о слабой Воде
    if (lowKeys.includes('water')) {
      text += ' <br><br><b>Важно:</b> слабая Вода — базовый дефицит жизненной силы. Поддержка Почек и достаточный отдых — приоритет.';
    }
  }

  return {
    high: highKeys[0],
    low: lowKeys[0],
    highKeys,
    lowKeys,
    text
  };
}

/* ---------- 5. СОСТОЯНИЕ И ХРАНИЛИЩЕ ---------- */

const LS_HISTORY = 'usin_history';
const LS_DRAFT   = 'usin_draft';

let draft = {};        // { wood: [0..4 x10], ... }
let lastResult = null; // { date, scores, percents }
let radarChart = null;

/* ---------- 6. НАВИГАЦИЯ ---------- */

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const map = {
    home: 'screen-home',
    quiz: 'screen-quiz',
    result: 'screen-result',
    history: 'screen-history',
    detail: 'screen-detail'
  };
  document.getElementById(map[name]).classList.add('active');
  window.scrollTo(0, 0);

  if (name === 'history') renderHistory();
}

/* ---------- 7. ОПРОСНИК ---------- */

function startQuiz() {
  // Загружаем черновик, если есть
  const saved = localStorage.getItem(LS_DRAFT);
  if (saved) {
    try { draft = JSON.parse(saved); } catch (e) { draft = {}; }
  }

  const container = document.getElementById('quiz-blocks');
  container.innerHTML = '';

  ORDER.forEach(elKey => {
    const el = ELEMENTS[elKey];
    const block = QUESTIONS[elKey];
    const blockDiv = document.createElement('div');
    blockDiv.className = 'block ' + elKey;

    let html = `<h3>${block.title} — ${el.organ}</h3>
                <div class="key">${block.key}</div>`;

    block.items.forEach((q, i) => {
      const name = `${elKey}_${i}`;
      const val = (draft[elKey] && draft[elKey][i] !== undefined) ? draft[elKey][i] : null;

      html += `<div class="question">
        <p>${i + 1}. ${q}</p>
        <div class="opts">`;

      for (let v = 0; v <= 4; v++) {
        const checked = val === v ? 'checked' : '';
        html += `<label>
          <input type="radio" name="${name}" value="${v}" ${checked}
                 onchange="setAnswer('${elKey}', ${i}, ${v})">
          <span>${v}</span>
        </label>`;
      }

      html += `</div></div>`;
    });

    blockDiv.innerHTML = html;
    container.appendChild(blockDiv);
  });

  updateProgress();
  showScreen('quiz');
}

function setAnswer(elKey, idx, value) {
  if (!draft[elKey]) draft[elKey] = new Array(10).fill(null);
  draft[elKey][idx] = value;
  localStorage.setItem(LS_DRAFT, JSON.stringify(draft));
  updateProgress();
}

function updateProgress() {
  let answered = 0;
  ORDER.forEach(k => {
    const arr = draft[k] || [];
    for (let i = 0; i < 10; i++) {
      if (arr[i] !== null && arr[i] !== undefined) answered++;
    }
  });
  const total = 50;
  const pct = Math.round((answered / total) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent = `${answered} / ${total}`;
}

function submitQuiz() {
  // Проверка полноты
  let missing = 0;
  ORDER.forEach(k => {
    const arr = draft[k] || [];
    for (let i = 0; i < 10; i++) {
      if (arr[i] === null || arr[i] === undefined) missing++;
    }
  });
  if (missing > 0) {
    const ok = confirm(`Вы ответили не на все вопросы. Осталось ${missing}. Показать результат по текущим ответам? (Неотвеченные будут считаться как 0.)`);
    if (!ok) return;
  }

  // Подсчёт
  const scores = {};
  const percents = {};
  ORDER.forEach(k => {
    const arr = draft[k] || new Array(10).fill(0);
    const sum = arr.reduce((a, v) => a + (v || 0), 0);
    scores[k] = sum;
    percents[k] = Math.round((sum / 40) * 100);
  });

  lastResult = {
    date: new Date().toISOString(),
    scores,
    percents
  };

  renderResult(lastResult);
  showScreen('result');
}

/* ---------- 8. РЕЗУЛЬТАТ ---------- */

function renderResult(result) {
  const { percents } = result;

  // Таблица
  const table = document.getElementById('result-table');
  let rows = '';
  ORDER.forEach(k => {
    const p = percents[k];
    let tag = '';
    if (p > 60) tag = '<span class="tag high">выражен</span>';
    else if (p >= 40) tag = '<span class="tag norm">умеренно</span>';
    else tag = '<span class="tag low">низкий</span>';

    rows += `<div class="result-row">
      <span class="name">${ELEMENTS[k].name}</span>
      <span class="val">${p}%${tag}</span>
    </div>`;
  });
  table.innerHTML = rows;

  // Паттерн
  const pattern = detectPattern(percents);
  document.getElementById('result-pattern').innerHTML = pattern.text;

  // Рекомендации — показываем для высокого и низкого
  const recContainer = document.getElementById('result-recommendations');
  const recKeys = [...new Set([...pattern.highKeys, ...pattern.lowKeys])];
  let recHtml = '<h3 style="margin-top:18px;margin-bottom:10px;">Рекомендации</h3>';

  recKeys.forEach(k => {
    const r = RECOMMENDATIONS[k];
    const isHigh = pattern.highKeys.includes(k);
    recHtml += `<div class="rec-item" style="border-left:4px solid ${ELEMENTS[k].color};">
      <h4>${r.title} <small style="color:#6b6b6b;font-weight:normal;">(${isHigh ? 'избыток' : 'недостаток'} внимания)</small></h4>
      <p style="font-size:13px;color:#6b6b6b;">${r.when}</p>
      <ul>${r.items.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>`;
  });
  recContainer.innerHTML = recHtml;

  // Радар-диаграмма
  const ctx = document.getElementById('radarChart').getContext('2d');
  if (radarChart) radarChart.destroy();

  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ORDER.map(k => ELEMENTS[k].name),
      datasets: [{
        label: 'Ваш профиль, %',
        data: ORDER.map(k => percents[k]),
        backgroundColor: 'rgba(31, 58, 95, 0.18)',
        borderColor: '#1f3a5f',
        borderWidth: 2,
        pointBackgroundColor: ORDER.map(k => ELEMENTS[k].color),
        pointBorderColor: '#fff',
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: { stepSize: 20, backdropColor: 'transparent', font: { size: 10 } },
          pointLabels: { font: { size: 13, weight: '600' } },
          grid: { color: '#e2ddd4' },
          angleLines: { color: '#e2ddd4' }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

/* ---------- 9. СОХРАНЕНИЕ И ИСТОРИЯ ---------- */

function saveResult() {
  if (!lastResult) return;
  const history = loadHistory();
  history.push(lastResult);
  localStorage.setItem(LS_HISTORY, JSON.stringify(history));
  localStorage.removeItem(LS_DRAFT);
  draft = {};
  alert('Результат сохранён в историю.');
  showScreen('history');
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(LS_HISTORY) || '[]');
  } catch (e) {
    return [];
  }
}

function renderHistory() {
  const list = document.getElementById('history-list');
  const history = loadHistory();

  if (history.length === 0) {
    list.innerHTML = '<p class="empty">Пока нет сохранённых прохождений.</p>';
    return;
  }

  // Новые сверху
  const sorted = [...history].reverse();
  let html = '';
  sorted.forEach((h, idx) => {
    const realIdx = history.length - 1 - idx;
    const d = new Date(h.date);
    const dateStr = d.toLocaleDateString('ru-RU', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    const stats = ORDER.map(k =>
      `<span style="border-left:3px solid ${ELEMENTS[k].color};">${ELEMENTS[k].name}: ${h.percents[k]}%</span>`
    ).join('');

    html += `<div class="history-item" onclick="showDetail(${realIdx})">
      <div class="hdate">${dateStr}</div>
      <div class="hstats">${stats}</div>
    </div>`;
  });
  list.innerHTML = html;
}

function showDetail(idx) {
  const history = loadHistory();
  const h = history[idx];
  if (!h) return;

  const d = new Date(h.date);
  document.getElementById('detail-date').textContent = d.toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const pattern = detectPattern(h.percents);

  let html = '<div class="chart-wrap"><canvas id="detailChart"></canvas></div>';
  html += ORDER.map(k => {
    const p = h.percents[k];
    let tag = p > 60 ? '<span class="tag high">выражен</span>'
            : p >= 40 ? '<span class="tag norm">умеренно</span>'
            : '<span class="tag low">низкий</span>';
    return `<div class="result-row">
      <span class="name">${ELEMENTS[k].name}</span>
      <span class="val">${p}%${tag}</span>
    </div>`;
  }).join('');
  html += `<div class="pattern-box">${pattern.text}</div>`;

  document.getElementById('detail-content').innerHTML = html;
  showScreen('detail');

  // Диаграмма деталей
  const ctx = document.getElementById('detailChart').getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ORDER.map(k => ELEMENTS[k].name),
      datasets: [{
        label: 'Профиль, %',
        data: ORDER.map(k => h.percents[k]),
        backgroundColor: 'rgba(31, 58, 95, 0.18)',
        borderColor: '#1f3a5f',
        borderWidth: 2,
        pointBackgroundColor: ORDER.map(k => ELEMENTS[k].color),
        pointBorderColor: '#fff',
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true, max: 100,
          ticks: { stepSize: 20, backdropColor: 'transparent', font: { size: 10 } },
          pointLabels: { font: { size: 13, weight: '600' } },
          grid: { color: '#e2ddd4' },
          angleLines: { color: '#e2ddd4' }
        }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function clearHistory() {
  if (!confirm('Удалить всю историю прохождений? Это действие нельзя отменить.')) return;
  localStorage.removeItem(LS_HISTORY);
  renderHistory();
}

/* ---------- 10. СТАРТ ---------- */

document.addEventListener('DOMContentLoaded', () => {
  showScreen('home');
});
