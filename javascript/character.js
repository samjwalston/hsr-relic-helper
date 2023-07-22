const Character = (function() {
  let characterStatWeights = {
    'Arlan': {'Lightning DMG Boost': 1, 'CRIT Rate': 1, 'CRIT DMG': 1, 'ATK': 0.75, 'SPD': 0.75, 'Break Effect': 0.25},
    'Asta': {'Energy Regen Rate': 1, 'Fire DMG Boost': 1, 'SPD': 1, 'ATK': 0.75, 'Break Effect': 0.75, 'HP': 0.25, 'DEF': 0.25},
    'Bailu': {'Outgoing Healing Boost': 1, 'SPD': 1, 'HP': 0.75, 'DEF': 0.5, 'Effect RES': 0.25},
    'Blade': {'Wind DMG Boost': 1, 'CRIT Rate': 1, 'CRIT DMG': 1, 'HP': 0.75, 'SPD': 0.75, 'ATK': 0.25, 'Break Effect': 0.25},
    'Bronya': {'CRIT DMG': 1, 'Energy Regen Rate': 1, 'SPD': 1, 'Wind DMG Boost': 0.75, 'ATK': 0.5, 'HP': 0.25, 'DEF': 0.25},
    'Clara': {'Physical DMG Boost': 1, 'CRIT Rate': 1, 'CRIT DMG': 1, 'ATK': 1, 'SPD': 0.5},
    'Dan Heng': {'Wind DMG Boost': 1, 'CRIT Rate': 1, 'CRIT DMG': 1, 'ATK': 0.75, 'SPD': 0.75, 'Break Effect': 0.25},
    'Gepard': {'Energy Regen Rate': 1, 'DEF': 1, 'SPD': 1, 'HP': 0.5, 'Effect Hit Rate': 0.5, 'Effect RES': 0.5},
    'Herta': {'Ice DMG Boost': 1, 'CRIT Rate': 1, 'CRIT DMG': 1, 'ATK': 0.75, 'SPD': 0.75, 'Break Effect': 0.25},
    'Himeko': {'Fire DMG Boost': 1, 'CRIT Rate': 1, 'CRIT DMG': 1, 'ATK': 0.75, 'SPD': 0.75, 'Break Effect': 0.25},
    'Hook': {'Fire DMG Boost': 1, 'CRIT Rate': 1, 'CRIT DMG': 1, 'ATK': 0.75, 'SPD': 0.75, 'Break Effect': 0.25},
    'Jing Yuan': {'Lightning DMG Boost': 1, 'CRIT Rate': 1, 'CRIT DMG': 1, 'ATK': 0.75, 'SPD': 0.75, 'Break Effect': 0.25},
    'Luocha': {'Outgoing Healing Boost': 1, 'Energy Regen Rate': 1, 'SPD': 1, 'ATK': 1, 'HP': 0.5, 'DEF': 0.5, 'Effect RES': 0.25, 'Break Effect': 0.25},
    'March 7th': {'Effect Hit Rate': 1, 'Energy Regen Rate': 1, 'SPD': 1, 'DEF': 1, 'HP': 0.5},
    'Natasha': {'Outgoing Healing Boost': 1, 'Energy Regen Rate': 1, 'SPD': 1, 'HP': 1, 'DEF': 0.5, 'Effect RES': 0.25},
    'Pela': {'Ice DMG Boost': 1, 'Effect Hit Rate': 1, 'Energy Regen Rate': 1, 'SPD': 1, 'ATK': 0.5, 'Break Effect': 0.25, 'CRIT Rate': 0.25, 'CRIT DMG': 0.25},
    'Qingque': {'Quantum DMG Boost': 1, 'CRIT Rate': 1, 'CRIT DMG': 1, 'ATK': 0.75, 'SPD': 0.75, 'Break Effect': 0.5},
    'Sampo': {'Wind DMG Boost': 1, 'SPD': 1, 'ATK': 1, 'Effect Hit Rate': 0.75, 'Break Effect': 0.25},
    'Seele': {'Quantum DMG Boost': 1, 'CRIT Rate': 1, 'CRIT DMG': 1, 'ATK': 0.75, 'SPD': 0.75, 'Break Effect': 0.5},
    'Serval': {'Lightning DMG Boost': 1, 'SPD': 1, 'Break Effect': 0.75, 'ATK': 0.5, 'CRIT Rate': 0.5, 'CRIT DMG': 0.5},
    'Silver Wolf': {'Quantum DMG Boost': 1, 'Effect Hit Rate': 1, 'Energy Regen Rate': 0.75, 'SPD': 0.75, 'CRIT Rate': 0.75, 'CRIT DMG': 0.75, 'ATK': 0.5},
    'Sushang': {'Physical DMG Boost': 1, 'CRIT Rate': 1, 'CRIT DMG': 1, 'ATK': 0.75, 'SPD': 0.75, 'Break Effect': 0.25},
    'Tingyun': {'Energy Regen Rate': 1, 'SPD': 1, 'ATK': 1, 'HP': 0.5, 'DEF': 0.5},
    'Trailblazer (Fire)': {'Energy Regen Rate': 1, 'SPD': 1, 'DEF': 1, 'HP': 0.5, 'Effect RES': 0.25},
    'Trailblazer (Physical)': {'Physical DMG Boost': 1, 'CRIT Rate': 1, 'CRIT DMG': 1, 'ATK': 0.75, 'SPD': 0.75, 'Break Effect': 0.25},
    'Welt': {'Imaginary DMG Boost': 1, 'Energy Regen Rate': 1, 'SPD': 0.75, 'CRIT Rate': 0.75, 'CRIT DMG': 0.75, 'Effect Hit Rate': 0.5, 'ATK': 0.5, 'Break Effect': 0.25},
    'Yanqing': {'Ice DMG Boost': 1, 'CRIT DMG': 1, 'ATK': 0.75, 'SPD': 0.75, 'Break Effect': 0.25},
    'Yukong': {'Imaginary DMG Boost': 1, 'SPD': 1, 'CRIT Rate': 0.75, 'CRIT DMG': 0.75, 'ATK': 0.75, 'Break Effect': 0.5}
  };

  let characterInfo = {
    'Arlan': {rarity: 4, path: 'Destruction', element: 'Lightning'},
    'Asta': {rarity: 4, path: 'Harmony', element: 'Fire'},
    'Bailu': {rarity: 5, path: 'Abundance', element: 'Lightning'},
    'Blade': {rarity: 5, path: 'Destruction', element: 'Wind'},
    'Bronya': {rarity: 5, path: 'Harmony', element: 'Wind'},
    'Clara': {rarity: 5, path: 'Destruction', element: 'Physical'},
    'Dan Heng': {rarity: 4, path: 'Hunt', element: 'Wind'},
    'Gepard': {rarity: 5, path: 'Preservation', element: 'Ice'},
    'Herta': {rarity: 4, path: 'Erudition', element: 'Ice'},
    'Himeko': {rarity: 5, path: 'Erudition', element: 'Fire'},
    'Hook': {rarity: 4, path: 'Destruction', element: 'Fire'},
    'Jing Yuan': {rarity: 5, path: 'Erudition', element: 'Lightning'},
    'Luocha': {rarity: 5, path: 'Abundance', element: 'Imaginary'},
    'March 7th': {rarity: 4, path: 'Preservation', element: 'Ice'},
    'Natasha': {rarity: 4, path: 'Abundance', element: 'Physical'},
    'Pela': {rarity: 4, path: 'Nihility', element: 'Ice'},
    'Qingque': {rarity: 4, path: 'Erudition', element: 'Quantum'},
    'Sampo': {rarity: 4, path: 'Nihility', element: 'Wind'},
    'Seele': {rarity: 5, path: 'Hunt', element: 'Quantum'},
    'Serval': {rarity: 4, path: 'Erudition', element: 'Lightning'},
    'Silver Wolf': {rarity: 5, path: 'Nihility', element: 'Quantum'},
    'Sushang': {rarity: 4, path: 'Hunt', element: 'Physical'},
    'Tingyun': {rarity: 4, path: 'Harmony', element: 'Lightning'},
    'Trailblazer (Fire)': {rarity: 5, path: 'Preservation', element: 'Fire'},
    'Trailblazer (Physical)': {rarity: 5, path: 'Destruction', element: 'Physical'},
    'Welt': {rarity: 5, path: 'Nihility', element: 'Imaginary'},
    'Yanqing': {rarity: 5, path: 'Hunt', element: 'Ice'},
    'Yukong': {rarity: 4, path: 'Harmony', element: 'Imaginary'}
  };


  function calculateRelicGrade(score) {
    if (score >= 252) {
      return 'S';
    } else if (score >= 204) {
      return 'A';
    } else if (score >= 156) {
      return 'B';
    } else if (score >= 108) {
      return 'C';
    } else if (score >= 60) {
      return 'D';
    } else {
      return 'F';
    }
  }

  function addRelicsToCharacter(character, relics) {
    character.relics = relics.filter((relic) => relic.location === character.key);
    character.relicScore = character.relics.reduce((sum, relic) => sum + parseFloat(relic.characters[character.key].currentScore), 0).toFixed(1);
    character.relicGrade = calculateRelicGrade(character.relicScore);

    return character;
  }

  function formatCharacters(character, index) {
    if (character.key === 'TrailblazerPreservation') {
      character.key = 'Trailblazer (Fire)';
    } else if (character.key === 'TrailblazerDestruction') {
      character.key = 'Trailblazer (Physical)';
    }

    character.id = (index + 1);
    character.statWeights = (characterStatWeights[character.key] || {});

    return {...character, ...characterInfo[character.key]};
  }


  return {
    addRelics: addRelicsToCharacter,
    format: formatCharacters
  }
}());
