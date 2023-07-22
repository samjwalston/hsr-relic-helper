const Relic = (function() {
  let mainStatValues = {
    'SPD': {'2': {base: 1.6128, per: 1}, '3': {base: 2.4192, per: 1}, '4': {base: 3.2256, per: 1.1}, '5': {base: 4.032, per: 1.4}},
    'HP_Flat': {'2': {base: 45.1584, per: 15.80544}, '3': {base: 67.7376, per: 23.70816}, '4': {base: 90.3168, per: 31.61088}, '5': {base: 112.896, per: 39.5136}},
    'ATK_Flat': {'2': {base: 22.5792, per: 7.90272}, '3': {base: 33.8688, per: 11.85408}, '4': {base: 45.1584, per: 15.80544}, '5': {base: 56.448, per: 19.7568}},
    'HP': {'2': {base: 2.7648, per: 0.9677}, '3': {base: 4.1472, per: 1.4515}, '4': {base: 5.5296, per: 1.9354}, '5': {base: 6.912, per: 2.4192}},
    'ATK': {'2': {base: 2.7648, per: 0.9677}, '3': {base: 4.1472, per: 1.4515}, '4': {base: 5.5296, per: 1.9354}, '5': {base: 6.912, per: 2.4192}},
    'DEF': {'2': {base: 3.456, per: 1.2096}, '3': {base: 5.184, per: 1.8144}, '4': {base: 6.912, per: 2.4192}, '5': {base: 8.64, per: 3.024}},
    'Break Effect': {'2': {base: 4.1472, per: 1.4515}, '3': {base: 6.2208, per: 2.1773}, '4': {base: 8.2944, per: 2.903}, '5': {base: 10.368, per: 3.6277}},
    'Effect Hit Rate': {'2': {base: 2.7648, per: 0.9677}, '3': {base: 4.1472, per: 1.4515}, '4': {base: 5.5296, per: 1.9354}, '5': {base: 6.912, per: 2.4192}},
    'Energy Regen Rate': {'2': {base: 1.2442, per: 0.4355}, '3': {base: 1.8662, per: 0.6532}, '4': {base: 2.4883, per: 0.8709}, '5': {base: 3.1104, per: 1.0886}},
    'Outgoing Healing Boost': {'2': {base: 2.2118, per: 0.7741}, '3': {base: 3.3178, per: 1.1612}, '4': {base: 4.4237, per: 1.5483}, '5': {base: 5.5296, per: 1.9354}},
    'CRIT Rate': {'2': {base: 2.0736, per: 0.7258}, '3': {base: 3.1104, per: 1.0886}, '4': {base: 4.1472, per: 1.4515}, '5': {base: 5.184, per: 1.8144}},
    'CRIT DMG': {'2': {base: 4.1472, per: 1.4515}, '3': {base: 6.2208, per: 2.1773}, '4': {base: 8.2944, per: 2.9030}, '5': {base: 10.368, per: 3.6288}},
    'Physical DMG Boost': {'2': {base: 2.4883, per: 0.8709}, '3': {base: 3.7325, per: 1.3064}, '4': {base: 4.9766, per: 1.7418}, '5': {base: 6.2208, per: 2.1773}},
    'Fire DMG Boost': {'2': {base: 2.4883, per: 0.8709}, '3': {base: 3.7325, per: 1.3064}, '4': {base: 4.9766, per: 1.7418}, '5': {base: 6.2208, per: 2.1773}},
    'Ice DMG Boost': {'2': {base: 2.4883, per: 0.8709}, '3': {base: 3.7325, per: 1.3064}, '4': {base: 4.9766, per: 1.7418}, '5': {base: 6.2208, per: 2.1773}},
    'Wind DMG Boost': {'2': {base: 2.4883, per: 0.8709}, '3': {base: 3.7325, per: 1.3064}, '4': {base: 4.9766, per: 1.7418}, '5': {base: 6.2208, per: 2.1773}},
    'Lightning DMG Boost': {'2': {base: 2.4883, per: 0.8709}, '3': {base: 3.7325, per: 1.3064}, '4': {base: 4.9766, per: 1.7418}, '5': {base: 6.2208, per: 2.1773}},
    'Quantum DMG Boost': {'2': {base: 2.4883, per: 0.8709}, '3': {base: 3.7325, per: 1.3064}, '4': {base: 4.9766, per: 1.7418}, '5': {base: 6.2208, per: 2.1773}},
    'Imaginary DMG Boost': {'2': {base: 2.4883, per: 0.8709}, '3': {base: 3.7325, per: 1.3064}, '4': {base: 4.9766, per: 1.7418}, '5': {base: 6.2208, per: 2.1773}}
  };

  let subStatValues = {
    'SPD': {'2': 1.2, '3': 1.4, '4': 2, '5': 2.6},
    'HP': {'2': 16.935, '3': 25.402506, '4': 33.87, '5': 42.33751},
    'ATK': {'2': 8.4675, '3': 12.701252, '4': 16.935, '5': 21.168754},
    'DEF': {'2': 8.4675, '3': 12.701252, '4': 16.935, '5': 21.168754},
    'HP_': {'2': 1.728, '3': 2.592, '4': 3.456, '5': 4.32},
    'ATK_': {'2': 1.728, '3': 2.592, '4': 3.456, '5': 4.32},
    'DEF_': {'2': 2.16, '3': 3.24, '4': 4.32, '5': 5.4},
    'Break Effect_': {'2': 2.592, '3': 3.888, '4': 5.184, '5': 6.48},
    'Effect Hit Rate_': {'2': 1.728, '3': 2.592, '4': 3.456, '5': 4.32},
    'Effect RES_': {'2': 1.728, '3': 2.592, '4': 3.456, '5': 4.32},
    'CRIT Rate_': {'2': 1.296, '3': 1.944, '4': 2.592, '5': 3.24},
    'CRIT DMG_': {'2': 2.592, '3': 3.888, '4': 5.184, '5': 6.48}
  };

  let subStatList = ['HP', 'HP_Flat', 'ATK', 'ATK_Flat', 'DEF', 'DEF_Flat', 'SPD', 'CRIT Rate', 'CRIT DMG', 'Break Effect', 'Effect Hit Rate', 'Effect RES'];
  let mainStatLists = {
    'Body': ['HP', 'ATK', 'DEF', 'CRIT Rate', 'CRIT DMG', 'Outgoing Healing Boost', 'Effect Hit Rate'],
    'Feet': ['HP', 'ATK', 'DEF', 'SPD'],
    'Planar Sphere': ['HP', 'ATK', 'DEF', 'Physical DMG Boost', 'Fire DMG Boost', 'Ice DMG Boost', 'Wind DMG Boost', 'Lightning DMG Boost', 'Quantum DMG Boost', 'Imaginary DMG Boost'],
    'Link Rope': ['HP', 'ATK', 'DEF', 'Break Effect', 'Energy Regen Rate']
  };

  let relicSets = [
    'Band of Sizzling Thunder',
    'Belobog of the Architects',
    'Broken Keel',
    'Celestial Differentiator',
    'Champion of Streetwise Boxing',
    'Eagle of Twilight Line',
    'Firesmith of Lava-Forging',
    'Fleet of the Ageless',
    'Genius of Brilliant Stars',
    'Guard of Wuthering Snow',
    'Hunter of Glacial Forest',
    'Inert Salsotto',
    'Knight of Purity Palace',
    'Longevous Disciple',
    'Messenger Traversing Hackerspace',
    'Musketeer of Wild Wheat',
    'Pan-Galactic Commercial Enterprise',
    'Passerby of Wandering Cloud',
    'Rutilant Arena',
    'Space Sealing Station',
    'Sprightly Vonwacq',
    'Talia: Kingdom of Banditry',
    'Thief of Shooting Meteor',
    'Wastelander of Banditry Desert'
  ]


  function calculateMaxValue(relic, characterStatWeights) {
    let sortable = [];
    subStatList.forEach(function(stat) {
      if (stat.includes('_Flat')) {
        sortable.push([stat, Math.round(((characterStatWeights[stat.replace('_Flat', '')] || 0) / 4) * 100) / 100]);
      } else {
        sortable.push([stat, (characterStatWeights[stat] || 0)]);
      }
    });

    let weights = sortable.sort((a, b) => b[1] - a[1]);
    let mainStat;

    if (relic.slotKey === 'Head') {
      mainStat = ['HP_Flat', 0];
    } else if (relic.slotKey === 'Hand') {
      mainStat = ['ATK_Flat', 0];
    } else {
      mainStat = weights.find((w) => mainStatLists[relic.slotKey].includes(w[0]));
    }

    let subStats = weights.filter((w) => (subStatList.filter((s) => s !== mainStat[0])).includes(w[0])).slice(0, 4);
    let response = 0;

    for (let i = 0; i < 6; i++) {
      if (i == 0) {
        let mainStatValue = ((2.86 + (relic.level * 0.476)) * mainStat[1]);
        response = (mainStatValue + subStats.reduce((t, s) => t + s[1], 0));
      } else {
        response = (response + subStats[0][1]);
      }
    }

    return response;
  }

  function calculateCurrentValue(relic, characterStatWeights) {
    let value = 0;

    if (!['Head','Hand'].includes(relic.slotKey)) {
      let statWeight = (characterStatWeights[relic.mainStatKey] || 0);
      value = ((2.86 + (relic.level * 0.476)) * statWeight);
    }

    relic.subStats.forEach(function(subStat) {
      let subStatMax = subStatValues[subStat.key][relic.rarity.toString()];
      let statCount = Math.ceil(subStat.value / subStatMax);
      let effectiveStat = ((subStat.value  / (subStatMax * statCount)) * statCount);
      let statWeight = (characterStatWeights[subStat.key.replace('_', '')] || 0);

      if (['HP','ATK','DEF'].includes(subStat.key)) {
        value = (value + (effectiveStat * (statWeight / 2)));
      } else {
        value = (value + (effectiveStat * statWeight));
      }
    });

    return value;
  }

  function calculatePotentialValue(relic, currentValue, characterStatWeights) {
    if (relic.level === (relic.rarity * 3)) return currentValue;

    let weights = subStatList.map(function(stat) {
      if (stat.includes('_Flat')) {
        return [stat, Math.round(((characterStatWeights[stat.replace('_Flat', '')] || 0) / 4) * 100) / 100];
      } else {
        return [stat, (characterStatWeights[stat] || 0)];
      }
    });

    let upgradeCount = (relic.rarity - Math.floor(relic.level / 3) - (4 - relic.subStats.length));
    let mainStat;

    if (relic.slotKey === 'Head') {
      mainStat = ['HP_Flat', 0];
    } else if (relic.slotKey === 'Hand') {
      mainStat = ['ATK_Flat', 0];
    } else {
      mainStat = weights.find((w) => mainStatLists[relic.slotKey].includes(w[0]));
      currentValue = (currentValue + (((15 - relic.level) * 0.476) * mainStat[1]));
    }

    let subStats = relic.subStats.map(function(subStat) {
      if (['HP','ATK','DEF'].includes(subStat.key)) {
        return weights.find((w) => (w[0] === `${subStat.key}_Flat`));
      } else {
        return weights.find((w) => (w[0] === subStat.key.replace('_', '')));
      }
    });

    if (subStats.length < 4) {
      let existingSubStats = [mainStat[0]].concat(subStats.map((s) => s[0]));
      let newSubStats = weights.filter(function(weight) {
        return subStatList.filter((subStat) => !existingSubStats.includes(subStat)).includes(weight[0]);
      }).sort((a, b) => b[1] - a[1]).slice(0, (4 - subStats.length));
      let bestSubStat = subStats.concat(newSubStats).sort((a, b) => b[1] - a[1])[0];

      currentValue = (currentValue + newSubStats.reduce((t, s) => t + s[1], 0) + (upgradeCount * bestSubStat[1]));
    } else {
      let bestSubStat = subStats.sort((a, b) => b[1] - a[1])[0];
      currentValue = (currentValue + (upgradeCount * bestSubStat[1]));
    }

    return currentValue;
  }

  function calculateGrade(score) {
    if (score >= 42) {
      return 'S';
    } else if (score >= 34) {
      return 'A';
    } else if (score >= 26) {
      return 'B';
    } else if (score >= 18) {
      return 'C';
    } else if (score >= 10) {
      return 'D';
    } else {
      return 'F';
    }
  }

  function calculateScore(value, max) {
    return (Math.round((50 / max * value) * 10) / 10);
  }

  function formatRelics(relic, index, characters) {
    if (relic.location === 'TrailblazerPreservation') {
      relic.location = 'Trailblazer (Fire)';
    } else if (relic.location === 'TrailblazerDestruction') {
      relic.location = 'Trailblazer (Physical)';
    }

    if (relic.slotKey === 'Head') {
      relic.order = 1;
    } else if (relic.slotKey === 'Hand') {
      relic.order = 2;
    } else if (relic.slotKey === 'Body') {
      relic.order = 3;
    } else if (relic.slotKey === 'Feet') {
      relic.order = 4;
    } else if (relic.slotKey === 'Planar Sphere') {
      relic.order = 5;
    } else if (relic.slotKey === 'Link Rope') {
      relic.order = 'last';
    }

    if (relic.mainStatKey === 'Energy Regeneration Rate') relic.mainStatKey = 'Energy Regen Rate';
    if (relic.level >= 70 && relic.level <= 79) relic.level = (relic.level - 60);

    if (relic.slotKey === 'Head') {
      let mainStatValue = mainStatValues['HP_Flat'][relic.rarity.toString()];
      relic.mainStatValue = Math.floor(mainStatValue.base + (relic.level * mainStatValue.per));
    } else if (relic.slotKey === 'Hand') {
      let mainStatValue = mainStatValues['ATK_Flat'][relic.rarity.toString()];
      relic.mainStatValue = Math.floor(mainStatValue.base + (relic.level * mainStatValue.per));
    } else if (relic.mainStatKey === 'SPD') {
      let mainStatValue = mainStatValues['SPD'][relic.rarity.toString()];
      relic.mainStatValue = Math.floor(mainStatValue.base + (relic.level * mainStatValue.per));
    } else {
      let mainStatValue = mainStatValues[relic.mainStatKey][relic.rarity.toString()];
      relic.mainStatValue = [(Math.floor((mainStatValue.base + (relic.level * mainStatValue.per)) * 10) / 10), '%'].join('');
    }

    relic.id = (index + 1);
    relic.characters = {};

    characters.forEach(function(character) {
      let maxValue = calculateMaxValue(relic, character.statWeights);
      let currentValue = calculateCurrentValue(relic, character.statWeights);
      let potentialValue = calculatePotentialValue(relic, currentValue, character.statWeights);

      let currentScore = calculateScore(currentValue, maxValue);
      let potentialScore = calculateScore(potentialValue, maxValue);

      relic.characters[character.key] = {
        currentScore: currentScore.toFixed(1),
        currentGrade: calculateGrade(currentScore),
        potentialScore: potentialScore.toFixed(1),
        potentialGrade: calculateGrade(potentialScore)
      };
    });

    return relic;
  }


  return {
    setList: relicSets,
    format: formatRelics
  }
}());
