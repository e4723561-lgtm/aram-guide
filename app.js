function esc(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const TIER_COLOR = {
  'S+': { bg: '#e84057', cls: 'tier-Sp', text: '#fff' },
  'S':  { bg: '#ff6b35', cls: 'tier-S',  text: '#fff' },
  'A':  { bg: '#f5a623', cls: 'tier-A',  text: '#000' },
  'B':  { bg: '#7ed321', cls: 'tier-B',  text: '#000' },
  'C':  { bg: '#4a90e2', cls: 'tier-C',  text: '#fff' }
};

let ddVersion = '';
let allChampions = [];
let activeTier = '全部';

async function init() {
  try {
    const versions = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(r => r.json());
    ddVersion = versions[0];
    const data = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/zh_TW/champion.json`).then(r => r.json());

    allChampions = Object.values(data.data).map(c => {
      const fb = FALLBACK_DATA[c.id];
      return {
        id: c.id,
        zhName: c.name,
        image: `https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/champion/${c.id}.png`,
        tier: fb ? fb.tier : null
      };
    });

    // 有T級資料的排前面（依 S+ > S > A > B > C），其餘排後
    allChampions.sort((a, b) => {
      const ai = TIER_ORDER.indexOf(a.tier);
      const bi = TIER_ORDER.indexOf(b.tier);
      if (ai === -1 && bi === -1) return 0;
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

    renderGrid(allChampions);
  } catch (e) {
    showError('無法載入英雄列表，請檢查網路連線。');
  }
}

function renderGrid(champions) {
  const grid = document.getElementById('champion-grid');
  const noResult = document.getElementById('no-result');

  const searchQ = document.getElementById('search').value.trim().toLowerCase();

  let filtered = champions.filter(c => {
    const matchSearch = !searchQ || c.zhName.toLowerCase().includes(searchQ) || c.id.toLowerCase().includes(searchQ);
    const matchTier = activeTier === '全部' || c.tier === activeTier;
    return matchSearch && matchTier;
  });

  grid.innerHTML = '';
  noResult.style.display = filtered.length === 0 ? 'block' : 'none';

  filtered.forEach(c => {
    const card = document.createElement('div');
    card.className = 'champion-card';
    card.dataset.id = c.id;

    if (c.tier && TIER_COLOR[c.tier]) {
      const badge = document.createElement('span');
      badge.className = `tier-badge ${TIER_COLOR[c.tier].cls}`;
      badge.textContent = c.tier;
      card.appendChild(badge);
    }

    const img = document.createElement('img');
    img.src = c.image;
    img.alt = c.zhName;
    img.loading = 'lazy';

    const span = document.createElement('span');
    span.className = 'champ-name';
    span.textContent = c.zhName;

    card.append(img, span);
    card.addEventListener('click', () => onChampionClick(c));
    grid.appendChild(card);
  });
}

document.getElementById('search').addEventListener('input', () => renderGrid(allChampions));

document.querySelectorAll('.tier-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tier-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeTier = btn.dataset.tier;
    renderGrid(allChampions);
  });
});

function onChampionClick(champ) {
  document.querySelectorAll('.champion-card').forEach(el => el.classList.remove('active'));
  document.querySelector(`.champion-card[data-id="${champ.id}"]`)?.classList.add('active');
  document.getElementById('detail-panel').classList.remove('visible');
  document.getElementById('error-msg').style.display = 'none';

  const fb = FALLBACK_DATA[champ.id];
  if (fb) {
    renderPanel(champ, fb);
  } else {
    showError('目前無此英雄的攻略資料。');
  }
}

function renderPanel(champ, data) {
  const panel = document.getElementById('detail-panel');
  const tc = TIER_COLOR[data.tier] || { bg: '#555', text: '#fff' };

  const itemsHtml = (data.items || []).map(item => `
    <div class="item-slot">
      <img src="https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${item.id}.png"
           alt="${esc(item.name)}" onerror="this.style.opacity='0.3'">
      <span>${esc(item.name)}</span>
    </div>
  `).join('');

  const aug = data.augments || {};
  const augRows = [
    { cls: 'aug-prismatic', label: '稜彩', items: aug.prismatic || [] },
    { cls: 'aug-gold',      label: '金色', items: aug.gold || [] },
    { cls: 'aug-silver',    label: '銀色', items: aug.silver || [] }
  ].map(row => `
    <div class="augment-row">
      <span class="augment-tier-label ${row.cls}">${row.label}</span>
      ${row.items.map(a => `<span class="augment-tag">${esc(a)}</span>`).join('')}
    </div>
  `).join('');

  const skillOrder = data.skillOrder || ['Q', 'W', 'E'];
  const skillHtml = skillOrder.map((s, i) =>
    `${i > 0 ? '<span class="skill-arrow">›</span>' : ''}<div class="skill-badge">${esc(s)}</div>`
  ).join('');

  panel.innerHTML = `
    <h2>
      ${esc(champ.zhName)}
      <span class="panel-tier-badge" style="background:${tc.bg};color:${tc.text}">${esc(data.tier)}</span>
    </h2>
    <div class="section">
      <h3>推薦出裝</h3>
      <div class="items-row">${itemsHtml || '<span style="color:#666">無資料</span>'}</div>
    </div>
    <div class="section">
      <h3>推薦增強符文</h3>
      <div class="augments-grid">${augRows}</div>
    </div>
    <div class="section">
      <h3>技能加點順序</h3>
      <div class="skill-order">${skillHtml}</div>
    </div>
  `;
  panel.classList.add('visible');
}

function showError(msg) {
  const el = document.getElementById('error-msg');
  el.style.display = 'block';
  el.textContent = msg;
}

init();
