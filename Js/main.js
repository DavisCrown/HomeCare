document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  // Note: The HTML previously used 'data-target' on buttons for mobile dropdowns
  // and the previous JS used `document.querySelectorAll('#mobile-menu button[data-target]')`
  // but your provided JS here uses '.mobile-dropdown-toggle'.
  // Please ensure your HTML matches what the JS is looking for.
  // If your HTML buttons have data-target, but not `mobile-dropdown-toggle` class,
  // you might need to adjust HTML or change `dropdownToggles` selector to:
  // `const dropdownToggles = document.querySelectorAll('#mobile-menu button[data-target]');`
  // For now, I'm keeping your provided JS selector.
  const dropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle");

  function toggleMobileMenu() {
    // Assuming 'open' class for styling. If using Tailwind's translate-x-full,
    // you might need to revert to using `classList.toggle('translate-x-full');`
    // and `classList.toggle('hidden');` for the overlay as in my previous HTML suggestions.
    // For now, I'll stick to your provided JS logic for 'open' class.
    mobileMenu.classList.toggle("open");
    mobileMenuToggle.classList.toggle("open"); // Animate hamburger icon
    mobileMenuOverlay.style.display = mobileMenu.classList.contains("open")
      ? "block"
      : "none";
  }

  if (mobileMenuToggle && mobileMenu && mobileMenuClose && mobileMenuOverlay) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu);
    mobileMenuClose.addEventListener("click", toggleMobileMenu);
    mobileMenuOverlay.addEventListener("click", toggleMobileMenu); // Close when clicking overlay
  }

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior
      const targetId = toggle.dataset.target;
      // Assuming your mobile dropdown content has a class `mobile-dropdown-content`
      // and an ID matching `data-target` and the icon has `mobile-dropdown-icon`
      const dropdownContent = document.getElementById(targetId);
      const dropdownIcon = toggle.querySelector(".mobile-dropdown-icon");

      if (dropdownContent) {
        // Toggle visibility
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
          if (dropdownIcon) dropdownIcon.classList.remove("rotate");
        } else {
          // Close other open dropdowns in mobile menu
          document
            .querySelectorAll(".mobile-dropdown-content")
            .forEach((content) => {
              if (content !== dropdownContent) {
                content.style.display = "none";
                // Ensure there's a previous element and it contains the icon
                const prevSibling = content.previousElementSibling;
                if (prevSibling) {
                  const prevIcon = prevSibling.querySelector(
                    ".mobile-dropdown-icon"
                  );
                  if (prevIcon) prevIcon.classList.remove("rotate");
                }
              }
            });
          dropdownContent.style.display = "block";
          if (dropdownIcon) dropdownIcon.classList.add("rotate");
        }
      }
    });
  });

  // Optional: Close mobile menu on desktop resize if open
  window.addEventListener("resize", () => {
    // You'll need to define what 'open' means in terms of Tailwind classes for mobileMenu
    // If mobileMenu has `translate-x-full` when closed and you toggle it, check that.
    // Or if you use a specific `md:` breakpoint class to hide it on desktop.
    // For now, I'll use the 'open' class check from your code.
    if (
      window.innerWidth >= 768 &&
      mobileMenu &&
      mobileMenu.classList.contains("open")
    ) {
      toggleMobileMenu();
    }
  });

  // Set active link based on current URL (simple example)
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath || (currentPath === "" && linkPath === "#")) {
      // Handle home page
      link.classList.add("active");
    }
  });
  // Also for mobile menu
  const mobileNavLinks = document.querySelectorAll("#mobile-menu ul a");
  mobileNavLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath || (currentPath === "" && linkPath === "#")) {
      link.classList.add("active");
    }
  });

  // Accordion Section
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      // Find the icon within the clicked header
      const icon = this.querySelector(".accordion-icon");

      // Toggle the icon text
      if (icon) {
        // Check if icon exists
        if (icon.textContent === "+") {
          icon.textContent = "-";
        } else {
          icon.textContent = "+";
        }
      }

      // OPTIONAL: Also toggle the visibility of the content
      const accordionContent = this.nextElementSibling; // Gets the very next sibling element

      if (accordionContent) {
        // Ensure content element exists
        accordionContent.classList.toggle("hidden"); // Toggles the 'hidden' class
      }
    });
  });

  AOS.init({
    disable: "tablet",

    once: true,
    mirror: false,
    anchorPlacement: "top-bottom",
    easing: "ease-out",
  });
});

// This function is for the custom Google Translate buttons
function doGTranslate(lang_pair) {
  if (lang_pair.value) lang_pair = lang_pair.value;
  if (lang_pair == "") return;
  var lang = lang_pair.split("|")[1];
  var teCombo;
  var sel = document.getElementsByTagName("select");
  for (var i = 0; i < sel.length; i++) {
    if (sel[i].className == "goog-te-combo") {
      teCombo = sel[i];
      break;
    }
  }
  if (
    document.getElementById("google_translate_element") == null ||
    document.getElementById("google_translate_element").innerHTML == ""
  ) {
    // This part handles the initial load for the hidden widget
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.getElementsByTagName("head")[0].appendChild(s);
  } else {
    teCombo.value = lang;
    teCombo.dispatchEvent(new Event("change"));
  }
}

// This is the callback function required by the Google Translate API.
// We initialize the widget here but keep it hidden from view.
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,rw",
      autoDisplay: false, // This is key to hiding the default widget
    },
    "google_translate_element"
  );
}

// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const mobileMenuClose = document.getElementById("mobile-menu-close");

  // Toggle the mobile menu when the hamburger icon is clicked
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.add("open");
      mobileMenuOverlay.style.display = "block";
    });
  }

  // Close the mobile menu when the close button or overlay is clicked
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      mobileMenuOverlay.style.display = "none";
    });
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      mobileMenuOverlay.style.display = "none";
    });
  }

  // Toggle mobile dropdowns
  const dropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle");
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = toggle.dataset.target;
      const targetDropdown = document.getElementById(targetId);
      if (targetDropdown) {
        targetDropdown.classList.toggle("active");
        toggle.classList.toggle("active");
      }
    });
  });
});
