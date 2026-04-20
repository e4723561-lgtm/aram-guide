function esc(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

let ddVersion = '';
let allChampions = [];

async function init() {
  try {
    const versions = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(r => r.json());
    ddVersion = versions[0];
    const data = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/zh_TW/champion.json`).then(r => r.json());

    allChampions = Object.values(data.data).map(c => ({
      id: c.id,
      zhName: c.name,
      image: `https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${c.id}.png`
    }));

    renderGrid(allChampions);
  } catch (e) {
    showError('無法載入英雄列表，請檢查網路連線。');
  }
}

function renderGrid(champions) {
  const grid = document.getElementById('champion-grid');
  const noResult = document.getElementById('no-result');

  grid.innerHTML = '';
  noResult.style.display = champions.length === 0 ? 'block' : 'none';

  champions.forEach(c => {
    const card = document.createElement('div');
    card.className = 'champion-card';
    card.dataset.id = c.id;
    const img = document.createElement('img');
    img.src = c.image;
    img.alt = c.zhName;
    img.loading = 'lazy';
    const span = document.createElement('span');
    span.textContent = c.zhName;
    card.append(img, span);
    card.addEventListener('click', () => onChampionClick(c));
    grid.appendChild(card);
  });
}

document.getElementById('search').addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) { renderGrid(allChampions); return; }
  const filtered = allChampions.filter(c =>
    c.zhName.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
  );
  renderGrid(filtered);
});

function onChampionClick(champ) {
  document.querySelectorAll('.champion-card').forEach(el => el.classList.remove('active'));
  document.querySelector(`.champion-card[data-id="${champ.id}"]`)?.classList.add('active');

  document.getElementById('detail-panel').classList.remove('visible');
  document.getElementById('error-msg').style.display = 'none';

  useFallback(champ);
}

function useFallback(champ) {
  const fb = FALLBACK_DATA[champ.id];
  if (fb) {
    renderPanel(champ, fb, true);
  } else {
    showError('目前無此英雄的備援資料。');
  }
}

function renderPanel(champ, data, isFallback) {
  const panel = document.getElementById('detail-panel');

  const itemsHtml = (data.items || []).map(item => `
    <div class="item-slot">
      <img src="https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${item.id}.png"
           alt="${esc(item.name)}" onerror="this.style.opacity='0.3'">
      <span>${esc(item.name)}</span>
    </div>
  `).join('');

  const runes = data.runes || {};
  const skillOrder = data.skillOrder || ['Q', 'W', 'E'];

  const skillHtml = skillOrder.map((s, i) =>
    `${i > 0 ? '<span class="skill-arrow">›</span>' : ''}<div class="skill-badge">${s}</div>`
  ).join('');

  const badge = isFallback ? `<span class="fallback-badge">備援資料</span>` : '';

  panel.innerHTML = `
    <h2>${esc(champ.zhName)} ${badge}</h2>
    <div class="section">
      <h3>推薦出裝</h3>
      <div class="items-row">${itemsHtml || '<span style="color:#666">無資料</span>'}</div>
    </div>
    <div class="section">
      <h3>符文</h3>
      <div class="rune-block">
        <div class="rune-keystone">${esc(runes.keystone?.name || '—')}</div>
        <div class="rune-paths">${[runes.primaryPath, runes.secondaryPath].filter(Boolean).map(esc).join(' / ') || '—'}</div>
      </div>
    </div>
    <div class="section">
      <h3>技能加點順序</h3>
      <div class="skill-order">${skillHtml}</div>
    </div>
  `;
  panel.classList.add('visible');
}

function showError(msg) {
  const errorMsg = document.getElementById('error-msg');
  errorMsg.style.display = 'block';
  errorMsg.textContent = msg;
}

init();
