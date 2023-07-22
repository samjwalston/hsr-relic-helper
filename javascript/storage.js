const Storage = (function() {
  function saveData(data) {
    window.localStorage.setItem('hsrData', JSON.stringify(data));
    window.location.reload();
  }

  function loadData() {
    let data = JSON.parse(window.localStorage.getItem('hsrData'));
    if (!data) return {characters: [], relics: []};

    data.characters = data.characters.map(Character.format).sort(function(a, b) {
      if (a.key < b.key) return -1;
      if (a.key > b.key) return 1;
      return 0;
    });

    data.relics = data.relics.map((relic, index) => Relic.format(relic, index, data.characters));
    data.characters = data.characters.map((character) => Character.addRelics(character, data.relics));

    return data;
  }

  function clearData() {
    window.localStorage.removeItem('hsrData');
  }


  return {
    save: saveData,
    load: loadData,
    clear: clearData
  }
}());
