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

// Enhanced form submission with WhatsApp integration
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const nombre = formData.get("nombre")
  const empresa = formData.get("empresa") || "No especificada"
  const telefono = formData.get("telefono")
  const email = formData.get("email")
  const categoria = formData.get("categoria")
  const mensaje = formData.get("mensaje") || "Sin mensaje adicional"

  // Format WhatsApp message
  const whatsappMessage = `
🌾 *Nueva Consulta - Agroveterinaria Asunción S.R.L.*

👤 *Cliente:* ${nombre}
🏢 *Empresa:* ${empresa}
📞 *Teléfono:* ${telefono}
📧 *Email:* ${email}
📋 *Categoría:* ${categoria}

💬 *Mensaje:*
${mensaje}

---
_Enviado desde el sitio web_
    `.trim()

  // Your WhatsApp business number (replace with your actual number)
  const whatsappNumber = "595981123456" // Format: country code + number (no + or spaces)

  // Create WhatsApp URL
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  // Open WhatsApp
  window.open(whatsappURL, "_blank")

  // Show confirmation
  alert("¡Gracias por tu consulta! Te estamos redirigiendo a WhatsApp para completar el contacto.")

  // Reset form
  this.reset()
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

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Ensure first slide is active
  if (slides.length > 0) {
    showSlide(0)
  }
})
