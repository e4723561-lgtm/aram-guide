// 版本：14.8（最後更新：2026-04-20）
// server.js 回傳 { fallback: true } 時，app.js 讀取此資料

const FALLBACK_DATA = {
  Lux: {
    items: [
      { id: 3285, name: '魯登的風暴' },
      { id: 4645, name: '暗影火焰' },
      { id: 3089, name: '拉巴頓的法術之冠' },
      { id: 3135, name: '虛空法杖' },
      { id: 3157, name: '宙納的沙漏' },
      { id: 6655, name: '洛奇恩之怒' }
    ],
    runes: { keystone: { name: '奧術彗星' }, primaryPath: '巫術', secondaryPath: '靈感' },
    skillOrder: ['Q', 'E', 'W']
  },
  Jinx: {
    items: [
      { id: 6672, name: '克拉肯獵手' },
      { id: 3085, name: '魯南的颶風' },
      { id: 3031, name: '無盡之刃' },
      { id: 3094, name: '疾速火砲' },
      { id: 3036, name: '領主督軍之甲' },
      { id: 3072, name: '血飲者' }
    ],
    runes: { keystone: { name: '致命節奏' }, primaryPath: '精密', secondaryPath: '主宰' },
    skillOrder: ['Q', 'W', 'E']
  },
  Ezreal: {
    items: [
      { id: 3004, name: '茂凱的馬納罩' },
      { id: 3042, name: '馬納穿刺者' },
      { id: 3071, name: '黑色切割者' },
      { id: 3134, name: '謝利達的傲慢' },
      { id: 6333, name: '龍之利爪' },
      { id: 3156, name: '瑪莫提斯' }
    ],
    runes: { keystone: { name: '征服者' }, primaryPath: '精密', secondaryPath: '巫術' },
    skillOrder: ['Q', 'E', 'W']
  },
  Ashe: {
    items: [
      { id: 6672, name: '克拉肯獵手' },
      { id: 3085, name: '魯南的颶風' },
      { id: 3124, name: '鬼索的狂暴之刃' },
      { id: 3091, name: '智者之末' },
      { id: 3110, name: '冰霜之心' },
      { id: 3072, name: '血飲者' }
    ],
    runes: { keystone: { name: '致命節奏' }, primaryPath: '精密', secondaryPath: '主宰' },
    skillOrder: ['W', 'Q', 'E']
  },
  Sona: {
    items: [
      { id: 6617, name: '月石復甦者' },
      { id: 3504, name: '炙熱香爐' },
      { id: 6616, name: '流水法杖' },
      { id: 3107, name: '救贖' },
      { id: 3222, name: '梅開隆的活力' },
      { id: 4005, name: '帝國命令' }
    ],
    runes: { keystone: { name: '相位衝擊' }, primaryPath: '巫術', secondaryPath: '靈感' },
    skillOrder: ['Q', 'W', 'E']
  },
  MissFortune: {
    items: [
      { id: 3031, name: '無盡之刃' },
      { id: 3094, name: '疾速火砲' },
      { id: 3036, name: '領主督軍之甲' },
      { id: 6672, name: '克拉肯獵手' },
      { id: 3085, name: '魯南的颶風' },
      { id: 3072, name: '血飲者' }
    ],
    runes: { keystone: { name: '致命一擊' }, primaryPath: '精密', secondaryPath: '主宰' },
    skillOrder: ['Q', 'E', 'W']
  },
  Ziggs: {
    items: [
      { id: 3285, name: '魯登的風暴' },
      { id: 4645, name: '暗影火焰' },
      { id: 3089, name: '拉巴頓的法術之冠' },
      { id: 3135, name: '虛空法杖' },
      { id: 3165, name: '莫雷洛秘典' },
      { id: 4629, name: '隕落之火' }
    ],
    runes: { keystone: { name: '奧術彗星' }, primaryPath: '巫術', secondaryPath: '靈感' },
    skillOrder: ['Q', 'W', 'E']
  },
  Veigar: {
    items: [
      { id: 3165, name: '莫雷洛秘典' },
      { id: 3285, name: '魯登的風暴' },
      { id: 4645, name: '暗影火焰' },
      { id: 3089, name: '拉巴頓的法術之冠' },
      { id: 3135, name: '虛空法杖' },
      { id: 3157, name: '宙納的沙漏' }
    ],
    runes: { keystone: { name: '電擊' }, primaryPath: '主宰', secondaryPath: '巫術' },
    skillOrder: ['Q', 'W', 'E']
  },
  Seraphine: {
    items: [
      { id: 6617, name: '月石復甦者' },
      { id: 3504, name: '炙熱香爐' },
      { id: 6616, name: '流水法杖' },
      { id: 3107, name: '救贖' },
      { id: 3165, name: '莫雷洛秘典' },
      { id: 3222, name: '梅開隆的活力' }
    ],
    runes: { keystone: { name: '相位衝擊' }, primaryPath: '巫術', secondaryPath: '靈感' },
    skillOrder: ['Q', 'E', 'W']
  },
  Thresh: {
    items: [
      { id: 3190, name: '萊安卓的酷刑架' },
      { id: 3109, name: '騎士誓約' },
      { id: 3107, name: '救贖' },
      { id: 3050, name: '傑瓦的迴護之冕' },
      { id: 3222, name: '梅開隆的活力' },
      { id: 3504, name: '炙熱香爐' }
    ],
    runes: { keystone: { name: '後盾堡壘' }, primaryPath: '決心', secondaryPath: '啟迪' },
    skillOrder: ['E', 'Q', 'W']
  },
  Caitlyn: {
    items: [
      { id: 3031, name: '無盡之刃' },
      { id: 3094, name: '疾速火砲' },
      { id: 3085, name: '魯南的颶風' },
      { id: 6672, name: '克拉肯獵手' },
      { id: 3036, name: '領主督軍之甲' },
      { id: 3072, name: '血飲者' }
    ],
    runes: { keystone: { name: '致命一擊' }, primaryPath: '精密', secondaryPath: '主宰' },
    skillOrder: ['Q', 'E', 'W']
  },
  Brand: {
    items: [
      { id: 4645, name: '暗影火焰' },
      { id: 3285, name: '魯登的風暴' },
      { id: 3165, name: '莫雷洛秘典' },
      { id: 3089, name: '拉巴頓的法術之冠' },
      { id: 3135, name: '虛空法杖' },
      { id: 3116, name: '瑞蕾的冰晶節杖' }
    ],
    runes: { keystone: { name: '召喚：阿黎' }, primaryPath: '主宰', secondaryPath: '巫術' },
    skillOrder: ['W', 'Q', 'E']
  }
};

if (typeof module !== 'undefined') module.exports = { FALLBACK_DATA };
