
(() => {
  const BUY_KEY = 'aurelia_premium_v1';
  const buyBtn = document.getElementById('buyBtn');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');
  const confirmBuy = document.getElementById('confirmBuy');
  const cancelBuy = document.getElementById('cancelBuy');
  const statusText = document.getElementById('statusText');
  const restoreBtn = document.getElementById('restoreBtn');
  const exportBtn = document.getElementById('exportBtn');

  function isPremium() { return localStorage.getItem(BUY_KEY) === 'purchased'; }
  function updateUI() {
    const locked = document.querySelectorAll('.card.locked');
    locked.forEach(c => { c.style.opacity = isPremium() ? '1' : '0.6'; const lock = c.querySelector('.lock'); if (lock) lock.style.display = isPremium() ? 'none' : 'block'; });
    statusText.textContent = isPremium() ? 'Premium active — thank you!' : 'You are using the free version.';
    buyBtn.textContent = isPremium() ? 'Premium Active' : 'Get Premium — $3.99';
    buyBtn.disabled = isPremium();
    exportBtn.disabled = !isPremium();
  }

  buyBtn.addEventListener('click', () => { if (isPremium()) return; modal.setAttribute('aria-hidden', 'false'); });
  closeModal.addEventListener('click', () => modal.setAttribute('aria-hidden','true'));
  cancelBuy.addEventListener('click', () => modal.setAttribute('aria-hidden','true'));

  confirmBuy.addEventListener('click', () => {
    confirmBuy.disabled = true;
    confirmBuy.textContent = 'Processing...';
    setTimeout(() => {
      localStorage.setItem(BUY_KEY, 'purchased');
      confirmBuy.disabled = false;
      confirmBuy.textContent = 'Buy — $3.99';
      modal.setAttribute('aria-hidden','true');
      updateUI();
      alert('Purchase simulated — Premium unlocked. (Demo only.)');
    }, 1200);
  });

  restoreBtn.addEventListener('click', () => {
    if (isPremium()) { alert('Premium already active.'); } else { alert('No purchase to restore in this demo.'); }
  });

  exportBtn.addEventListener('click', () => {
    if (!isPremium()) { alert('Premium required for HQ export.'); return; }
    // Simulate an export: create a small blob and download
    const data = 'Aurelia HQ Export - demo\nGenerated at ' + new Date().toISOString();
    const blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'aurelia_hq_export.txt'; document.body.appendChild(a); a.click();
    setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 1500);
  });

  window.addEventListener('load', () => updateUI());
  window.Aurelia = { isPremium: isPremium, unlockPremium: () => { localStorage.setItem(BUY_KEY, 'purchased'); updateUI(); }, lockPremium: () => { localStorage.removeItem(BUY_KEY); updateUI(); } };
})();
