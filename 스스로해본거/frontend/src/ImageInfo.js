import api from './api.js';

class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, loadingShow, loadingHide, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.loadingShow = loadingShow;
    this.loadingHide = loadingHide;

    this.data = data;

    this.render();
  }

  closeImageInfo() {
    this.setState({ visible: false, cat: undefined });
  }

  async showDetail(data) {
    this.loadingShow();

    const detailInfo = await api.fetchCatDetail(data.cat.id);
    if (detailInfo) {
      this.setState({
        visible: true,
        cat: detailInfo.data,
      }),
        this.loadingHide();
    } else {
      this.loadingHide();
    }
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible && this.data.cat) {
      const { name, url, temperament, origin } = this.data.cat;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <header class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </header>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;

      this.$imageInfo.style.display = 'block';

      document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
          this.closeImageInfo();
        }
      });

      document.addEventListener('click', (e) => {
        if (
          e.target.className === 'ImageInfo' ||
          e.target.className === 'close'
        ) {
          this.closeImageInfo();
        }
      });
    } else {
      this.$imageInfo.style.display = 'none';
    }
  }
}

export default ImageInfo;
