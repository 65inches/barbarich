export function initOnScrollAnimate() {
  const options = {
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add('active');
      }
    });
  }, options);

  document.querySelectorAll('.fade-in, .clip-in').forEach((element) => {
    observer.observe(element);
  });
}
