export default class Video {
  constructor(videoEl, popoverId) {
    this.el = videoEl;
    this.button = this.el.querySelector('button');
    this.popover = document.querySelector('#popover');
    this.popoverVideo = document.querySelector('#popover-iframe');
    this.url = this.convertToEmbedUrl(this.el.dataset.url);

    this.popover?.addEventListener('toggle', (event) => {
      if (event.newState === 'open') {
        if (this.url) {
          this.popoverVideo.src = this.url;
          this.popover.showPopover();
        }
      }
      if (event.newState === 'closed') {
        this.popoverVideo.src = '';
      }
    });
  }

  convertToEmbedUrl(url) {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  }
}
