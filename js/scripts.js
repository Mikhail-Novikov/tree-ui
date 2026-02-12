(() => {
  // src/scripts/index.js
  document.addEventListener("DOMContentLoaded", () => {
    const t = document.forms.Tree;
    const fieldset = [].filter.call(
      t.querySelectorAll("fieldset"),
      (element) => element
    );
    fieldset.forEach((eFieldset) => {
      const main = [].filter.call(
        t.querySelectorAll('[type="checkbox"]'),
        (element) => {
          let node = element;
          while (node && node !== t) {
            if (node.nextElementSibling === eFieldset) {
              return true;
            }
            node = node.parentNode;
          }
          return false;
        }
      );
      main.forEach((eMain) => {
        const all = eFieldset.querySelectorAll('[type="checkbox"]');
        eFieldset.onchange = function() {
          const allChecked = eFieldset.querySelectorAll(
            '[type="checkbox"]:checked'
          ).length;
          eMain.checked = allChecked === all.length;
          eMain.indeterminate = allChecked > 0 && allChecked < all.length;
        };
        eMain.onclick = function() {
          for (let i = 0; i < all.length; i++) {
            all[i].checked = this.checked;
          }
          // Запустить change события для обновления вложенных fieldsets
          for (let i = 0; i < all.length; i++) {
            all[i].dispatchEvent(new Event('change', { bubbles: true }));
          }
        };
      });
    });
  });
})();
//# sourceMappingURL=scripts.js.map
