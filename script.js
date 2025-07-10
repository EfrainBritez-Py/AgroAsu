// Carousel functionality
let currentSlide = 0
const slides = document.querySelectorAll(".carousel-slide")
const dots = document.querySelectorAll(".carousel-dot")
const totalSlides = slides.length

function showSlide(index) {
  // Remove active class from all slides and dots
  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  // Add active class to current slide and dot
  slides[index].classList.add("active")
  dots[index].classList.add("active")
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides
  showSlide(currentSlide)
}

// Auto-advance carousel every 5 seconds
setInterval(nextSlide, 5000)

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide = index
    showSlide(currentSlide)
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to header
const header = document.querySelector("header")
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.background = "white"
    header.style.backdropFilter = "none"
  }
})

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")
    }
  })
}, observerOptions)

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent =
        target + (element.textContent.includes("+") ? "+" : "") + (element.textContent.includes("%") ? "%" : "")
      clearInterval(timer)
    } else {
      element.textContent =
        Math.floor(start) +
        (element.textContent.includes("+") ? "+" : "") +
        (element.textContent.includes("%") ? "%" : "")
    }
  }, 16)
}

// Trigger counter animations when stats come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number")
        const text = statNumber.textContent
        const number = Number.parseInt(text.replace(/\D/g, ""))

        // Reset and animate
        statNumber.textContent = "0" + (text.includes("+") ? "+" : "") + (text.includes("%") ? "%" : "")
        animateCounter(statNumber, number)

        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

// Initialize carousel and animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Ensure first slide is active
  if (slides.length > 0) {
    showSlide(0)
  }

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(".fade-in-left, .fade-in-right, .fade-in-up")
  animatedElements.forEach((el) => {
    observer.observe(el)
  })

  // Add staggered animation delay for service cards
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`
  })

  // Add staggered animation delay for stats
  const statItems = document.querySelectorAll(".stat-item")
  statItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`
  })

  // Add staggered animation delay for feature items
  const featureItems = document.querySelectorAll(".feature-item")
  featureItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`
  })

  // Observe stat items for counter animation
  statItems.forEach((item) => {
    statsObserver.observe(item)
  })
})
