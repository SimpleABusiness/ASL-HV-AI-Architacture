const progressBar = document.querySelector('.progress span');
const navLinks = [...document.querySelectorAll('.nav nav a')];
const sections = navLinks.map((link) => document.querySelector(link.hash)).filter(Boolean);

function updatePageState() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = `${max > 0 ? Math.min(100, (scrollY / max) * 100) : 0}%`;
  const active = sections.reduce((best, section) => {
    const distance = Math.abs(section.getBoundingClientRect().top - 110);
    return !best || distance < best.distance ? { section, distance } : best;
  }, null);
  navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${active?.section.id}`));
}

addEventListener('scroll', updatePageState, { passive: true });
addEventListener('resize', updatePageState);
updatePageState();
