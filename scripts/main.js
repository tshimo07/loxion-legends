// ==============================
// LOXION LEGENDS MAIN JS
// Modular, reusable, maintainable
// ==============================

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------ */
  /* Utility Functions */
  /* ------------------------------ */
  const createElement = (tag, props = {}, styles = {}, parent = document.body) => {
    const el = document.createElement(tag);
    Object.assign(el, props);
    Object.assign(el.style, styles);
    parent.appendChild(el);
    return el;
  };

  const toggleClass = (el, className) => el.classList.toggle(className);
  const addClass = (el, className) => el.classList.add(className);
  const removeClass = (el, className) => el.classList.remove(className);
  const isElementInViewport = (el, offset = 100) => 
    el.getBoundingClientRect().top < window.innerHeight - offset;


  /* ------------------------------ */
  /* BACK TO TOP BUTTON */
  /* ------------------------------ */
  const initBackToTop = () => {
    const btn = createElement('button', { id: 'backToTop', textContent: '↑', title: 'Go to top' }, {
      position: 'fixed', bottom: '30px', left: '30px', padding: '10px 15px',
      fontSize: '20px', backgroundColor: 'gold', color: 'black', border: 'none',
      borderRadius: '5px', cursor: 'pointer', display: 'none', zIndex: '1000'
    });

    window.addEventListener('scroll', () => {
      btn.style.display = document.documentElement.scrollTop > 100 ? 'block' : 'none';
    });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };


  /* ------------------------------ */
  /* CHAT WIDGET */
  /* ------------------------------ */
  const initChatWidget = () => {
    const chatContainer = createElement('div', { id: 'chatWidget' });

    chatContainer.innerHTML = `
      <button id="chatButton" title="Chat with us">💬</button>
      <div id="chatBox" class="hidden">
        <div class="chat-header">
          <h4>Chat with Loxion Legends</h4>
          <span id="closeChat">×</span>
        </div>
        <div class="chat-body">
          <p>Hi 👋 Want to know more or ask something?</p>
          <textarea id="chatMessage" placeholder="Type your message..."></textarea>
          <button id="sendChat">Send</button>
        </div>
      </div>
    `;

    // Chat styling
    const style = createElement('style');
    style.textContent = `
      #chatWidget { position: fixed; bottom: 20px; right: 20px; z-index: 1000; }
      #chatButton { background: gold; color: black; border: none; padding: 12px; border-radius: 50%; font-size: 24px; cursor: pointer; }
      #chatBox { display: none; width: 300px; background: #111; color: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px #000; margin-bottom: 10px; }
      #chatBox.active { display: block; }
      .chat-header { background: gold; color: black; padding: 10px; display: flex; justify-content: space-between; align-items: center; }
      .chat-body { padding: 10px; display: flex; flex-direction: column; gap: 10px; }
      #chatMessage { width: 100%; height: 70px; border-radius: 5px; border: none; padding: 5px; resize: none; }
      #sendChat { background: gold; color: black; border: none; padding: 8px; border-radius: 5px; cursor: pointer; }
      #closeChat { cursor: pointer; font-weight: bold; }
    `;

    const chatButton = document.getElementById('chatButton');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    const sendChat = document.getElementById('sendChat');
    const chatMessage = document.getElementById('chatMessage');

    chatButton.addEventListener('click', () => toggleClass(chatBox, 'active'));
    closeChat.addEventListener('click', () => removeClass(chatBox, 'active'));
    sendChat.addEventListener('click', () => {
      const msg = chatMessage.value.trim();
      if(msg){
        alert(`Your message has been sent:\n"${msg}"`);
        chatMessage.value = '';
        removeClass(chatBox, 'active');
      } else alert("Please type a message before sending!");
    });
  };


  /* ------------------------------ */
  /* NAVIGATION ACTIVE LINKS */
  /* ------------------------------ */
  const initNavLinks = () => {
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function(){
        document.querySelectorAll('nav a').forEach(l => removeClass(l, 'active'));
        addClass(this, 'active');
      });
    });
  };


  /* ------------------------------ */
  /* FADE-IN SECTIONS ON SCROLL */
  /* ------------------------------ */
  const initFadeSections = () => {
    const sections = document.querySelectorAll(
      ".service-card, .about-section, .image-highlights, .core-values, .target-audience, .faq-section"
    );
    window.addEventListener('scroll', () => {
      sections.forEach(sec => { if(isElementInViewport(sec)) addClass(sec, 'visible'); });
    });
  };


  /* ------------------------------ */
  /* ACCORDIONS */
  /* ------------------------------ */
  const initAccordions = () => {
    document.querySelectorAll(".accordion").forEach(acc => {
      acc.addEventListener("click", function(){
        toggleClass(this, 'active');
        const panel = this.nextElementSibling;
        if(panel) panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
      });
    });
  };


  /* ------------------------------ */
  /* MODALS */
  /* ------------------------------ */
  const initModal = (modalId, closeId, delay = 2000) => {
    const modal = document.getElementById(modalId);
    const closeBtn = document.getElementById(closeId);
    if(modal && closeBtn){
      setTimeout(() => { modal.style.display = 'block'; }, delay);
      closeBtn.onclick = () => modal.style.display = 'none';
      modal.onclick = (e) => { if(e.target === modal) modal.style.display = 'none'; }
    }
  };


  /* ------------------------------ */
  /* LIGHTBOX FOR GALLERY */
  /* ------------------------------ */
  const initLightbox = (itemClass, lightboxId, imgId, closeId) => {
    const items = document.querySelectorAll(`.${itemClass}`);
    const lightbox = document.getElementById(lightboxId);
    const lbImg = document.getElementById(imgId);
    const closeLB = document.getElementById(closeId);
    if(items.length && lightbox && lbImg && closeLB){
      items.forEach(img => img.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lbImg.src = img.src;
      }));
      closeLB.onclick = () => lightbox.style.display = 'none';
      lightbox.onclick = (e) => { if(e.target === lightbox) lightbox.style.display = 'none'; }
    }
  };


  /* ------------------------------ */
  /* WELCOME POPUP */
  /* ------------------------------ */
  const initWelcomePopup = (overlayId, closeId, delay = 2000) => {
    const overlay = document.getElementById(overlayId);
    const closeBtn = document.getElementById(closeId);
    if(!overlay || !closeBtn) return;

    setTimeout(() => addClass(overlay, 'active'), delay);

    const closePopup = () => {
      removeClass(overlay, 'active');
      addClass(overlay, 'fade-out');
      setTimeout(() => removeClass(overlay, 'fade-out'), 600);
    };

    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', e => { if(e.target === overlay) closePopup(); });
  };


  /* ------------------------------ */
  /* CONTACT FORM VALIDATION */
  /* ------------------------------ */
  const initContactForm = (formId, errorId) => {
    const form = document.getElementById(formId);
    const errorMsg = document.getElementById(errorId);
    if(!form || !errorMsg) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const message = form.querySelector('#message').value.trim();

      errorMsg.textContent = '';
      errorMsg.style.color = 'red';

      if(!name || !email || !message){
        errorMsg.textContent = "Please fill in all fields."; return;
      }
      if(name.length < 3){ errorMsg.textContent = "Name must be at least 3 characters."; return; }
      if(!email.includes('@') || !email.includes('.')){ errorMsg.textContent = "Enter a valid email."; return; }
      if(message.length < 10){ errorMsg.textContent = "Message must be at least 10 characters."; return; }

      errorMsg.style.color = 'lightgreen';
      errorMsg.textContent = "Message sent successfully!";
      form.reset();
    });
    
   };


  /* ------------------------------ */
  /* INITIALIZE ALL COMPONENTS */
  /* ------------------------------ */
  initBackToTop();
  initChatWidget();
  initNavLinks();
  initFadeSections();
  initAccordions();
  initModal('serviceModal', 'closeService', 2000);
  initLightbox('gallery-item', 'lightbox', 'lightboxImg', 'closeLightbox');
  initWelcomePopup('welcomeOverlay', 'closeWelcome', 2000);
  initContactForm('contactForm', 'error');

  console.log("LOXION LEGENDS JS Initialized 🚀");
});
 
// wait till page loads
window.addEventListener("DOMContentLoaded", function() {

  // get all sponsor cards
  var cards = document.querySelectorAll(".mycontainer > div");

  // initially hide cards and move them left/right
  cards.forEach(function(card, index){
    card.style.opacity = "0";
    if(index % 2 === 0){
      card.style.transform = "translateX(-50px)";
    } else {
      card.style.transform = "translateX(50px)";
    }
    card.style.transition = "all 0.8s ease";
  });

  // animate cards when in viewport
  function animateCards(){
    cards.forEach(function(card){
      var rect = card.getBoundingClientRect();
      if(rect.top < window.innerHeight - 50){
        card.style.opacity = "1";
        card.style.transform = "translateX(0)";
      }
    });
  }

  // check on scroll
  window.addEventListener("scroll", animateCards);

  // check immediately
  animateCards();

  // click highlight effect
  cards.forEach(function(card){
    card.addEventListener("click", function(){
      card.style.backgroundColor = "#ffd700";
      setTimeout(function(){ card.style.backgroundColor = "white"; }, 500);
    });
  });

  console.log("Sponsorship page JS loaded");
});


// FADE-IN SCROLL EFFECT FOR IMAGES & VIDEOS
document.addEventListener("DOMContentLoaded", function() {
  const fadeItems = document.querySelectorAll(".fade-in");

  function checkFade() {
    fadeItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if(rect.top < window.innerHeight - 50){
        item.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", checkFade);
  checkFade(); // initial check
});

// FADE-IN EFFECT FOR SECTIONS
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");

  function fadeInOnScroll() {
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        sec.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", fadeInOnScroll);
  fadeInOnScroll(); // Initial check
});

// FADE-IN FOR SUCCESS STORIES CARDS
document.addEventListener("DOMContentLoaded", function () {
  const storyCards = document.querySelectorAll(".story-card");

  function revealStories() {
    storyCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealStories);
  revealStories(); // Initial check
});

/* ========== DYNAMIC WELCOME MESSAGE ========== */

const welcomeBox = document.getElementById("dynamicWelcome");

if (welcomeBox) {
  let hour = new Date().getHours();
  let message = "";

  if (hour < 12) message = "Good Morning! Welcome to Loxion Legends ☀️";
  else if (hour < 18) message = "Good Afternoon! Explore our world 😎";
  else message = "Good Evening! Ready for some vibes? 🌙";

  welcomeBox.innerHTML = `
    <div class="welcome-msg">
      ${message}
    </div>
  `;
}
/* ========== END DYNAMIC WELCOME MESSAGE ========== */

/* ===== SEARCH FILTER FOR SERVICE CARDS ===== */

const searchInput = document.getElementById("serviceSearch");

if (searchInput) {
  searchInput.addEventListener("keyup", function() {
    let filter = searchInput.value.toLowerCase();
    let cards = document.querySelectorAll(".service-card");

    cards.forEach(card => {
      let text = card.innerText.toLowerCase();
      if (text.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}
/* ===== END SEARCH FILTER FOR SERVICE CARDS ===== */

/* ===== GALLERY SEARCH FOR PHOTOS + VIDEOS ===== */
const gallerySearch = document.getElementById("gallerySearch");

if (gallerySearch) {
  gallerySearch.addEventListener("keyup", function () {
    let filter = gallerySearch.value.toLowerCase();

    // Select all photos and videos
    let photos = document.querySelectorAll(".gallery img");
    let videos = document.querySelectorAll(".video-gallery video");

    photos.forEach(img => {
      let name = img.alt.toLowerCase();
      img.style.display = name.includes(filter) ? "block" : "none";
    });

    videos.forEach(vid => {
      let name = (vid.getAttribute("data-name") || "").toLowerCase();
      vid.style.display = name.includes(filter) ? "block" : "none";
    });
  });
}
/* ===== END GALLERY SEARCH FOR PHOTOS + VIDEOS ===== */

/* ========== SPONSOR SEARCH + FILTER ========== */
const sponsorSearch = document.getElementById("sponsorSearch");
const sponsorCards = document.querySelectorAll(".sponsor-card");
const filterBtns = document.querySelectorAll(".filter-btn");

// Search
if (sponsorSearch) {
  sponsorSearch.addEventListener("keyup", () => {
    let value = sponsorSearch.value.toLowerCase();

    sponsorCards.forEach(card => {
      let text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "block" : "none";
    });
  });
}

// Filters
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {

    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.dataset.type;

    sponsorCards.forEach(card => {
      if (type === "all") {
        card.style.display = "block";
      } else {
        card.style.display =
          card.dataset.type === type ? "block" : "none";
      }
    });
  });
});
/* ========== END SPONSOR SEARCH + FILTER ========== */

document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');

  const sections = {
    "Our Story": document.querySelector('.about-section'),
    "core values": document.querySelector('.core-values'),
    "Who we serve": document.querySelector('.target-audience')
  };

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Highlight the active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const type = button.dataset.type;

      // Show/hide sections based on button
      Object.keys(sections).forEach(key => {
        if (type === 'all' || key === type) {
          sections[key].style.display = '';
        } else {
          sections[key].style.display = 'none';
        }
      });
    });
  });
});
