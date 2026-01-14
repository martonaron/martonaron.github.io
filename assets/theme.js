(function () {
  const THEME_KEY = "theme-preference";
  const buttons = Array.from(document.querySelectorAll(".theme-btn"));
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const mobileQuery = window.matchMedia("(max-width: 640px)");
  const toggle = document.querySelector(".theme-toggle");
  let isOpen = !mobileQuery.matches;

  const resolveTheme = (choice) => {
    if (choice === "system") {
      return mediaQuery.matches ? "dark" : "light";
    }
    return choice;
  };

  const setActive = (choice) => {
    buttons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.theme === choice);
    });
  };

  const applyTheme = (choice) => {
    const theme = resolveTheme(choice);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const applyLayout = () => {
    const collapsed = mobileQuery.matches && !isOpen;
    toggle.classList.toggle("is-collapsed", collapsed);
    toggle.classList.toggle("is-open", isOpen);
  };

  const saved = localStorage.getItem(THEME_KEY) || "system";
  setActive(saved);
  applyTheme(saved);
  applyLayout();

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (mobileQuery.matches && !isOpen) {
        isOpen = true;
        applyLayout();
        return;
      }
      const next = btn.dataset.theme;
      localStorage.setItem(THEME_KEY, next);
      setActive(next);
      applyTheme(next);
      if (mobileQuery.matches) {
        isOpen = false;
        applyLayout();
      }
    });
  });

  mediaQuery.addEventListener("change", () => {
    const stored = localStorage.getItem(THEME_KEY) || "system";
    if (stored === "system") {
      setActive("system");
      applyTheme("system");
    }
  });

  mobileQuery.addEventListener("change", () => {
    isOpen = !mobileQuery.matches;
    applyLayout();
  });
})();
