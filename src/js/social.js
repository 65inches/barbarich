export function initSocialButtons() {
  if (document.querySelector('.share-btn')) {
    document.querySelectorAll('.share-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const social = button.getAttribute('data-social');
        shareOnSocial(social);
      });
    });
  }
}

function shareOnSocial(social) {
  const url = encodeURIComponent(window.location.href);
  let shareUrl = '';

  switch (social) {
    case 'facebook':
      shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
      break;
    case 'twitter':
      shareUrl = 'https://twitter.com/share?url=' + url;
      break;
    case 'linkedin':
      shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
      break;
    default:
      break;
  }

  if (shareUrl !== '') {
    window.open(shareUrl, '_blank');
  }
}
