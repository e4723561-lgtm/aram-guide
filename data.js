// ARAM: Mayhem（隨機單中：大亂鬥）攻略資料
// 版本：26.8（最後更新：2026-04-21）
// tier：S+ > S > A > B > C，依勝率與強度評定

const TIER_ORDER = ['S+', 'S', 'A', 'B', 'C'];

const FALLBACK_DATA = {
  Lillia: {
    tier: 'S+',
    items: [
      { id: 3116, name: '瑞蕾的冰晶節杖' },
      { id: 3285, name: '魯登的風暴' },
      { id: 3089, name: '拉巴頓的法術之冠' },
      { id: 3135, name: '虛空法杖' },
      { id: 4645, name: '暗影火焰' },
      { id: 3157, name: '宙納的沙漏' }
    ],
    augments: {
      prismatic: ['極度邪惡', '魔法導彈'],
      gold: ['處刑者', '阿嬤的辣油'],
      silver: ['魔力傳遞', '技能急速']
    },
    skillOrder: ['E', 'Q', 'W']
  },
  Brand: {
    tier: 'S+',
    items: [
      { id: 4645, name: '暗影火焰' },
      { id: 3285, name: '魯登的風暴' },
      { id: 3165, name: '莫雷洛秘典' },
      { id: 3089, name: '拉巴頓的法術之冠' },
      { id: 3135, name: '虛空法杖' },
      { id: 3116, name: '瑞蕾的冰晶節杖' }
    ],
    augments: {
      prismatic: ['魔法導彈', '極度邪惡'],
      gold: ['處刑者', '超狙武器'],
      silver: ['痛打一頓', '技能急速']
    },
    skillOrder: ['W', 'Q', 'E']
  },
  Morgana: {
    tier: 'S',
    items: [
      { id: 3165, name: '莫雷洛秘典' },
      { id: 4645, name: '暗影火焰' },
      { id: 3135, name: '虛空法杖' },
      { id: 3089, name: '拉巴頓的法術之冠' },
      { id: 3157, name: '宙納的沙漏' },
      { id: 3116, name: '瑞蕾的冰晶節杖' }
    ],
    augments: {
      prismatic: ['吸血迷信', '極度邪惡'],
      gold: ['阿嬤的辣油', '處刑者'],
      silver: ['魔力傳遞', '技能急速']
    },
    skillOrder: ['W', 'Q', 'E']
  },
  Vayne: {
    tier: 'S',
    items: [
      { id: 3153, name: '破敗之刃' },
      { id: 6672, name: '克拉肯獵手' },
      { id: 3124, name: '鬼索的狂暴之刃' },
      { id: 3091, name: '智者之末' },
      { id: 3031, name: '無盡之刃' },
      { id: 3072, name: '血飲者' }
    ],
    augments: {
      prismatic: ['寶石手套', '吸血迷信'],
      gold: ['超狙武器', '致命節奏'],
      silver: ['攻速提升', '痛打一頓']
    },
    skillOrder: ['Q', 'E', 'W']
  },
  Yasuo: {
    tier: 'S',
    items: [
      { id: 3031, name: '無盡之刃' },
      { id: 3085, name: '魯南的颶風' },
      { id: 3036, name: '領主督軍之甲' },
      { id: 3072, name: '血飲者' },
      { id: 3139, name: '水銀彎刀' },
      { id: 3134, name: '謝利達的傲慢' }
    ],
    augments: {
      prismatic: ['寶石手套', '黑暗收割'],
      gold: ['致命節奏', '處刑者'],
      silver: ['攻速提升', '痛打一頓']
    },
    skillOrder: ['Q', 'E', 'W']
  },
  Jinx: {
    tier: 'A',
    items: [
      { id: 6672, name: '克拉肯獵手' },
      { id: 3085, name: '魯南的颶風' },
      { id: 3031, name: '無盡之刃' },
      { id: 3094, name: '疾速火砲' },
      { id: 3036, name: '領主督軍之甲' },
      { id: 3072, name: '血飲者' }
    ],
    augments: {
      prismatic: ['吸血迷信', '極度邪惡'],
      gold: ['超狙武器', '致命節奏'],
      silver: ['攻速提升', '魔力傳遞']
    },
    skillOrder: ['Q', 'W', 'E']
  },
  Lux: {
    tier: 'A',
    items: [
      { id: 3285, name: '魯登的風暴' },
      { id: 4645, name: '暗影火焰' },
      { id: 3089, name: '拉巴頓的法術之冠' },
      { id: 3135, name: '虛空法杖' },
      { id: 3157, name: '宙納的沙漏' },
      { id: 6655, name: '洛奇恩之怒' }
    ],
    augments: {
      prismatic: ['魔法導彈', '極度邪惡'],
      gold: ['處刑者', '寶石手套'],
      silver: ['技能急速', '魔力傳遞']
    },
    skillOrder: ['Q', 'E', 'W']
  },
  Ashe: {
    tier: 'A',
    items: [
      { id: 6672, name: '克拉肯獵手' },
      { id: 3085, name: '魯南的颶風' },
      { id: 3124, name: '鬼索的狂暴之刃' },
      { id: 3091, name: '智者之末' },
      { id: 3110, name: '冰霜之心' },
      { id: 3072, name: '血飲者' }
    ],
    augments: {
      prismatic: ['吸血迷信', '寶石手套'],
      gold: ['超狙武器', '致命節奏'],
      silver: ['攻速提升', '痛打一頓']
    },
    skillOrder: ['W', 'Q', 'E']
  },
  Ezreal: {
    tier: 'A',
    items: [
      { id: 3078, name: '三相之力' },
      { id: 3042, name: '馬納穿刺者' },
      { id: 6672, name: '克拉肯獵手' },
      { id: 3153, name: '破敗之刃' },
      { id: 3071, name: '黑色切割者' },
      { id: 6333, name: '死亡之舞' }
    ],
    augments: {
      prismatic: ['極度邪惡', '吸血迷信'],
      gold: ['超狙武器', '處刑者'],
      silver: ['攻速提升', '技能急速']
    },
    skillOrder: ['Q', 'E', 'W']
  },
  Ziggs: {
    tier: 'A',
    items: [
      { id: 3285, name: '魯登的風暴' },
      { id: 4645, name: '暗影火焰' },
      { id: 3089, name: '拉巴頓的法術之冠' },
      { id: 3135, name: '虛空法杖' },
      { id: 3165, name: '莫雷洛秘典' },
      { id: 4629, name: '隕落之火' }
    ],
    augments: {
      prismatic: ['魔法導彈', '極度邪惡'],
      gold: ['寶石手套', '處刑者'],
      silver: ['技能急速', '魔力傳遞']
    },
    skillOrder: ['Q', 'W', 'E']
  },
  Caitlyn: {
    tier: 'A',
    items: [
      { id: 3031, name: '無盡之刃' },
      { id: 3094, name: '疾速火砲' },
      { id: 3085, name: '魯南的颶風' },
      { id: 6672, name: '克拉肯獵手' },
      { id: 3036, name: '領主督軍之甲' },
      { id: 3072, name: '血飲者' }
    ],
    augments: {
      prismatic: ['吸血迷信', '寶石手套'],
      gold: ['超狙武器', '處刑者'],
      silver: ['攻速提升', '痛打一頓']
    },
    skillOrder: ['Q', 'E', 'W']
  },
  MissFortune: {
    tier: 'A',
    items: [
      { id: 6691, name: '暮光之刃' },
      { id: 6692, name: '日蝕' },
      { id: 3814, name: '蛇之毒牙' },
      { id: 3036, name: '領主督軍之甲' },
      { id: 6333, name: '死亡之舞' },
      { id: 3072, name: '血飲者' }
    ],
    augments: {
      prismatic: ['黑暗收割', '吸血迷信'],
      gold: ['處刑者', '超狙武器'],
      silver: ['痛打一頓', '攻速提升']
    },
    skillOrder: ['Q', 'E', 'W']
  },
  Veigar: {
    tier: 'A',
    items: [
      { id: 3165, name: '莫雷洛秘典' },
      { id: 3285, name: '魯登的風暴' },
      { id: 4645, name: '暗影火焰' },
      { id: 3089, name: '拉巴頓的法術之冠' },
      { id: 3135, name: '虛空法杖' },
      { id: 3157, name: '宙納的沙漏' }
    ],
    augments: {
      prismatic: ['極度邪惡', '魔法導彈'],
      gold: ['寶石手套', '處刑者'],
      silver: ['技能急速', '魔力傳遞']
    },
    skillOrder: ['Q', 'W', 'E']
  },
  Sona: {
    tier: 'B',
    items: [
      { id: 6617, name: '月石復甦者' },
      { id: 3504, name: '炙熱香爐' },
      { id: 6616, name: '流水法杖' },
      { id: 3107, name: '救贖' },
      { id: 3222, name: '梅開隆的活力' },
      { id: 4005, name: '帝國命令' }
    ],
    augments: {
      prismatic: ['阿嬤的辣油', '吸血迷信'],
      gold: ['魔法導彈', '技能急速'],
      silver: ['魔力傳遞', '攻速提升']
    },
    skillOrder: ['Q', 'W', 'E']
  },
  Seraphine: {
    tier: 'B',
    items: [
      { id: 6617, name: '月石復甦者' },
      { id: 3504, name: '炙熱香爐' },
      { id: 6616, name: '流水法杖' },
      { id: 3107, name: '救贖' },
      { id: 3165, name: '莫雷洛秘典' },
      { id: 3222, name: '梅開隆的活力' }
    ],
    augments: {
      prismatic: ['阿嬤的辣油', '極度邪惡'],
      gold: ['魔法導彈', '處刑者'],
      silver: ['技能急速', '魔力傳遞']
    },
    skillOrder: ['Q', 'E', 'W']
  },
  Thresh: {
    tier: 'B',
    items: [
      { id: 3190, name: '萊安卓的酷刑架' },
      { id: 3109, name: '騎士誓約' },
      { id: 3107, name: '救贖' },
      { id: 3050, name: '傑瓦的迴護之冕' },
      { id: 3222, name: '梅開隆的活力' },
      { id: 3504, name: '炙熱香爐' }
    ],
    augments: {
      prismatic: ['痛打一頓', '吸血迷信'],
      gold: ['阿嬤的辣油', '處刑者'],
      silver: ['技能急速', '魔力傳遞']
    },
    skillOrder: ['E', 'Q', 'W']
  }
};

if (typeof module !== 'undefined') module.exports = { FALLBACK_DATA, TIER_ORDER };
