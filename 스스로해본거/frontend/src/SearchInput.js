import KeywordHistory from './KeywordHistory.js';

const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $wrapper = document.createElement('section');
    $wrapper.className = 'SearchInputWrapper';
    $target.appendChild($wrapper);

    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';
    this.$searchInput.value =
      localStorage.getItem('keywordHistory') === null
        ? []
        : localStorage.getItem('keywordHistory').split(',')[0];

    $searchInput.className = 'SearchInput';

    $wrapper.appendChild($searchInput);
    document.querySelector('.SearchInput').focus();

    $searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);
        this.$keywordHistory.setHistory(e.target.value);
      }
    });

    const $randomButton = document.createElement('button');
    this.$randomButton = $randomButton;
    this.$randomButton.className = 'RandomButton';
    this.$randomButton.textContent = '랜덤고양이';

    $wrapper.appendChild($randomButton);

    $randomButton.addEventListener('click', (e) => {
      onRandomSearch();
    });

    this.$keywordHistory = new KeywordHistory({
      $target,
      onSearch,
      setSearchInputValue: (keyword) => {
        this.$searchInput.value = keyword;
      },
    });
  }
}

export default SearchInput;
