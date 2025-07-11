// Screen Management
class ScreenManager {
  constructor() {
    this.currentScreen = "home"
    this.screens = document.querySelectorAll(".screen")
    this.navLinks = document.querySelectorAll(".nav-link")
    this.buttons = document.querySelectorAll("[data-screen]")
    this.navToggle = document.querySelector(".nav-toggle")
    this.navMenu = document.querySelector(".nav-menu")

    this.init()
  }

  init() {
    // Navigation click handlers
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const screen = link.getAttribute("data-screen")
        this.switchScreen(screen)
        this.closeMenu()
      })
    })

    // Button click handlers
    this.buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const screen = button.getAttribute("data-screen")
        if (screen) {
          this.switchScreen(screen)
        }
      })
    })

    // Mobile menu toggle
    this.navToggle.addEventListener("click", () => {
      this.toggleMenu()
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".navbar")) {
        this.closeMenu()
      }
    })

    // Initialize animations
    this.initAnimations()
  }

  switchScreen(screenName) {
    // Hide current screen
    const currentScreenEl = document.getElementById(this.currentScreen)
    if (currentScreenEl) {
      currentScreenEl.classList.remove("active")
    }

    // Show new screen
    const newScreenEl = document.getElementById(screenName)
    if (newScreenEl) {
      setTimeout(() => {
        newScreenEl.classList.add("active")
        this.animateScreenContent(newScreenEl)
      }, 100)
    }

    // Update navigation
    this.updateNavigation(screenName)

    // Update current screen
    this.currentScreen = screenName

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  updateNavigation(activeScreen) {
    this.navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("data-screen") === activeScreen) {
        link.classList.add("active")
      }
    })
  }

  toggleMenu() {
    this.navMenu.classList.toggle("active")
  }

  closeMenu() {
    this.navMenu.classList.remove("active")
  }

  animateScreenContent(screen) {
    const animatableElements = screen.querySelectorAll(
      ".project-item, .certificate-item, .experience-item, .education-item, .contact-card, .resume-card, .highlight-item",
    )

    animatableElements.forEach((element, index) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(30px)"

      setTimeout(() => {
        element.style.transition = "all 0.6s ease"
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, index * 100)
    })
  }

  initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")
        }
      })
    }, observerOptions)

    // Observe all animatable elements
    document.querySelectorAll(".project-card, .project-item, .certificate-item, .resume-card").forEach((el) => {
      observer.observe(el)
    })
  }
}

// File Download Function
function downloadFile(filePath, fileName) {
  // Create a temporary link element
  const link = document.createElement("a")
  link.href = filePath
  link.download = fileName
  link.style.display = "none"

  // Add to DOM, click, and remove
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // Show download notification
  showNotification(`Downloading ${fileName}...`, "success")
}

// Certificate Modal Functions
function openCertificateModal(imageSrc, caption) {
  const modal = document.getElementById("certificateModal")
  const modalImg = document.getElementById("modalImage")
  const modalCaption = document.getElementById("modalCaption")

  modal.style.display = "block"
  modalImg.src = imageSrc
  modalCaption.textContent = caption
  document.body.style.overflow = "hidden"

  // Animate modal
  setTimeout(() => {
    modal.style.opacity = "1"
  }, 10)

  // Add click outside to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeCertificateModal()
    }
  })
}

function closeCertificateModal() {
  const modal = document.getElementById("certificateModal")
  modal.style.opacity = "0"
  setTimeout(() => {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }, 300)
}

// Notification System
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "success" ? "#10b981" : "#3b82f6"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    z-index: 3000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    font-weight: 500;
  `

  // Add to DOM
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Certificate Modal
class CertificateModal {
  constructor() {
    this.modal = document.getElementById("certificateModal")
    this.modalImg = document.getElementById("modalImage")
    this.modalCaption = document.getElementById("modalCaption")
    this.closeBtn = document.querySelector(".modal-close")

    this.init()
  }

  init() {
    // Close modal handlers
    this.closeBtn.addEventListener("click", () => {
      closeCertificateModal()
    })

    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        closeCertificateModal()
      }
    })

    // Keyboard handler
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeCertificateModal()
      }
    })
  }
}

// Smooth Scrolling
class SmoothScroll {
  constructor() {
    this.init()
  }

  init() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }
}

// Performance Optimization
class PerformanceOptimizer {
  constructor() {
    this.init()
  }

  init() {
    // Lazy loading for images
    this.lazyLoadImages()

    // Debounce scroll events
    this.debounceScrollEvents()
  }

  lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]")
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }

  debounceScrollEvents() {
    let ticking = false

    const updateScrollEffects = () => {
      // Update scroll-based effects here
      ticking = false
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects)
        ticking = true
      }
    })
  }
}

// Theme Manager
class ThemeManager {
  constructor() {
    this.currentTheme = "dark"
    this.init()
  }

  init() {
    // Load saved theme
    const savedTheme = localStorage.getItem("portfolio-theme")
    if (savedTheme) {
      this.currentTheme = savedTheme
      this.applyTheme()
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === "dark" ? "light" : "dark"
    this.applyTheme()
    this.saveTheme()
  }

  applyTheme() {
    document.body.setAttribute("data-theme", this.currentTheme)
  }

  saveTheme() {
    localStorage.setItem("portfolio-theme", this.currentTheme)
  }
}

// Toggle Project Details Function
function toggleProjectDetails(element) {
  const projectItem = element.closest(".project-item")
  const projectDetails = projectItem.querySelector(".project-details")
  const isVisible = projectDetails.style.display !== "none"

  if (isVisible) {
    // Hide details
    projectDetails.style.display = "none"
    element.classList.remove("fa-eye-slash")
    element.classList.add("fa-eye")
    element.title = "View Details"
  } else {
    // Show details
    projectDetails.style.display = "block"
    element.classList.remove("fa-eye")
    element.classList.add("fa-eye-slash")
    element.title = "Hide Details"

    // Smooth scroll to show the expanded content
    setTimeout(() => {
      projectDetails.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      })
    }, 100)
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  const screenManager = new ScreenManager()
  const certificateModal = new CertificateModal()
  const smoothScroll = new SmoothScroll()
  const performanceOptimizer = new PerformanceOptimizer()
  const themeManager = new ThemeManager()

  // Theme toggle functionality - FIXED VERSION
  const themeToggle = document.getElementById("themeToggle")
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector("i")

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark"
    document.body.setAttribute("data-theme", savedTheme)
    updateThemeIcon(savedTheme)

    // Add click event listener
    themeToggle.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()

      const currentTheme = document.body.getAttribute("data-theme") || "dark"
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      console.log(`Switching from ${currentTheme} to ${newTheme}`) // Debug log

      document.body.setAttribute("data-theme", newTheme)
      localStorage.setItem("portfolio-theme", newTheme)
      updateThemeIcon(newTheme)
    })

    function updateThemeIcon(theme) {
      if (themeIcon) {
        if (theme === "light") {
          themeIcon.className = "fas fa-sun"
        } else {
          themeIcon.className = "fas fa-moon"
        }
      }
    }
  }

  // Add loading animation
  document.body.classList.add("loaded")

  // Initialize typing animation for home screen
  const homeTitle = document.querySelector(".home-title")
  if (homeTitle) {
    setTimeout(() => {
      homeTitle.classList.add("slide-up")
    }, 500)
  }

  // Add hover effects to cards
  const cards = document.querySelectorAll(".project-card, .project-item, .certificate-item, .resume-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add click ripple effect
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary, .contact-card, .btn-download-resume")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Console welcome message
  console.log(`
    🚀 Welcome to Sana's Portfolio!
    
    Built with vanilla HTML, CSS, and JavaScript
    Featuring modern animations and responsive design
    
    Connect with me:
    📧 kamransana401@gmail.com
    💼 linkedin.com/in/sana-kamran-butt-034b70288
    
    Available Downloads:
    📄 AWS Project Documentation
    📊 Prompt Engineering Presentation
    📋 Professional Resume
    `)
})

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`

// Inject ripple CSS
const style = document.createElement("style")
style.textContent = rippleCSS
document.head.appendChild(style)
