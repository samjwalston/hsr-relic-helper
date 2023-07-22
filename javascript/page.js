const Page = (function() {
  let fileInput;
  let importButton;


  function importFile() {
    let fileReader = new FileReader();

    fileReader.onload = function() {
      let parsedJSON = JSON.parse(fileReader.result);
      Storage.save(parsedJSON);
    }

    fileReader.readAsText(fileInput.files[0]);
  }

  function loadData() {
    let data = (Storage.load() || {});

    return {
      selectedCharacterName: '',
      relicSortBy: 'potential',
      relicLevel: '',
      relicScore: '',
      relicSet: '',
      relicSlot: '',
      characters: data.characters,
      relics: data.relics,
      setList: Relic.setList,
      get selectedCharacters() {
        return this.characters.filter((character) => character.key === this.selectedCharacterName);
      },
      get filteredRelics() {
        let character = this.selectedCharacterName;
        let sortBy = this.relicSortBy;
        let relicLevel = (this.relicLevel || 0);
        let scores = ['S','A','B','C','D','F'];
        let relicScore = this.relicScore;
        let relicSet = this.relicSet;
        let relicSlot = this.relicSlot;

        return this.relics.filter(function(relic) {
          let selected = true;

          if (relic.level < parseInt(relicLevel)) selected = false;
          if (selected && relicScore != '' && !scores.slice(0, scores.indexOf(relicScore) + 1).includes(relic.characters[character][`${sortBy}Grade`])) selected = false
          if (selected && relicSet != '' && relic.setKey != relicSet) selected = false;
          if (selected && relicSlot != '' && relic.slotKey != relicSlot) selected = false;

          return selected;
        }).sort(function(a, b) {
          if (sortBy === 'current') {
            return parseFloat(b.characters[character].currentScore) - parseFloat(a.characters[character].currentScore);
          } else {
            return parseFloat(b.characters[character].potentialScore) - parseFloat(a.characters[character].potentialScore);
          }
        }).slice(0, 50);
      }
    }
  }

  function initializePage() {
    fileInput = document.getElementById('file');
    importButton = document.getElementById('import');

    importButton.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', importFile);
  }


  return {
    loadData: loadData,
    initialize: initializePage
  }
}());


document.addEventListener('DOMContentLoaded', Page.initialize);
