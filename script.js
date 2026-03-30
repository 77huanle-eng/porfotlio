// Animation & micro-interaction setup
// - Scroll reveal
// - Skeleton loading for images (remove shimmer when loaded)
// - Smooth scroll for nút CONTACT

document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  const options = { threshold: 0.18, rootMargin: '0px 0px -40px 0px' };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, options);

  reveals.forEach(el => io.observe(el));

  // Skeleton removal when images finish loading
  const lazyImages = document.querySelectorAll('.lazy-img');
  lazyImages.forEach(img => {
    const removeSkeleton = () => img.closest('.skeleton')?.classList.remove('skeleton');
    if (img.complete) {
      removeSkeleton();
    } else {
      img.addEventListener('load', removeSkeleton, { once: true });
      img.addEventListener('error', removeSkeleton, { once: true });
    }
  });

  // Smooth scroll on CONTACT ME button
  const contactBtn = document.getElementById('contactBtn');
  const contactSection = document.getElementById('contact');
  if (contactBtn && contactSection) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      contactSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Hover micro-interaction: gentle tilt reset on pointer leave (extra polish)
  document.querySelectorAll('.polaroid').forEach(card => {
    const baseTilt = card.classList.contains('tilt-left') ? -2.2 : card.classList.contains('tilt-right') ? 2.2 : 0;
    card.style.transform = `rotate(${baseTilt}deg)`;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const dx = (e.clientX - rect.left) / rect.width - 0.5;
      const dy = (e.clientY - rect.top) / rect.height - 0.5;
      const tilt = Math.max(Math.min(dx * 6, 4), -4);
      card.style.transform = `rotate(${tilt}deg) translateY(${dy * -4}px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `rotate(${baseTilt}deg)`;
    });
  });

  /* Hiệu ứng trang trí nhẹ: hạt sáng / cánh hoa / bướm */
  const overlay = document.getElementById('overlay-effects');
  if (overlay) {
    const isMobile = window.innerWidth < 640;
    const sparkleCount = isMobile ? 14 : 26;
    const petalCount = isMobile ? 7 : 14;
    const butterflyCount = isMobile ? 2 : 4;

    const rand = (min, max) => Math.random() * (max - min) + min;

    const makeEl = (cls, count, durRange, xRange, dxRange) => {
      for (let i = 0; i < count; i++) {
        const el = document.createElement('span');
        el.className = cls;
        el.style.setProperty('--x', `${rand(xRange[0], xRange[1])}vw`);
        el.style.setProperty('--y', `${rand(5, 90)}vh`);
        el.style.setProperty('--dx', `${rand(dxRange[0], dxRange[1])}px`);
        el.style.setProperty('--dur', `${rand(durRange[0], durRange[1])}s`);
        el.style.animationDelay = `${rand(0, 6)}s`;
        overlay.appendChild(el);
      }
    };

    makeEl('sparkle', sparkleCount, [10, 18], [0, 100], [-20, 20]);
    makeEl('petal', petalCount, [14, 22], [0, 100], [-30, 30]);
    makeEl('butterfly', butterflyCount, [16, 24], [5, 95], [-10, 10]);
  }
});

/* Ghi chú nâng cao:
- Muốn thêm animation mới: thêm class .reveal cho section mới hoặc dùng keyframes riêng trong CSS.
- Muốn đổi skeleton: chỉnh .skeleton::after trong style.css.
- Hover effect/micro-interaction: sửa logic trong phần eventListener cho .polaroid ở trên.
*/
