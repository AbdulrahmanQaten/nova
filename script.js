/* particles.js config */
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 120, // Increased number of particles
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff" // Stars are white
    },
    "shape": {
      "type": "circle", // Shape of the stars
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.8, // Slightly vary star opacity
      "random": true,
      "anim": {
        "enable": true, // Twinkling effect
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 2, // Size of the stars
      "random": true, // Vary star sizes slightly
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true, // Enable lines
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.5,
      "width": 1
    },
    "move": {
      "enable": true, // Stars move slowly
      "speed": 3, // Slow movement speed
      "direction": "none", // Random directions
      "random": true, // Random movement
      "straight": false,
      "out_mode": "out", // Stars disappear off screen
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true, // Enable hover interaction
        "mode": "repulse" // Push particles away on hover
      },
      "onclick": {
        "enable": false, // Disable click effects for now
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 100, // Reduced distance for repulse
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true // Handles high-DPI displays
});

/* Meteor Animation Functions */
function createMeteor() {
  const meteor = document.createElement('div');
  meteor.className = 'meteor';
  document.body.appendChild(meteor);
  return meteor;
}

function animateMeteor() {
  const meteor = createMeteor();
  const startX = window.innerWidth + 100;
  const startY = -100 + Math.random() * (window.innerHeight / 2);
  const angle = 30 + Math.random() * 20; // Random angle between 30-50 degrees

  meteor.style.top = `${startY}px`;
  meteor.style.left = `${startX}px`;
  
  anime({
    targets: meteor,
    translateX: -window.innerWidth - 200,
    translateY: window.innerHeight + 200,
    rotate: angle,
    duration: 1200,
    easing: 'easeOutExpo',
    complete: () => {
      document.body.removeChild(meteor);
    }
  });
}

function createMeteorShower() {
  const numMeteors = 30; // Number of meteors
  const body = document.body;

  for (let i = 0; i < numMeteors; i++) {
    const meteor = document.createElement('div');
    meteor.classList.add('meteor');

    // --- Start from Left --- 
    const startX = -200; // Start exactly off-screen left
    const startY = anime.random(0, window.innerHeight); // Start from any vertical position
    const endX = window.innerWidth + 200; // End exactly off-screen right
    const endY = startY + anime.random(window.innerHeight * 0.5, window.innerHeight * 1.5); // Move down while maintaining 45-degree angle
    const duration = anime.random(800, 1600);
    const delay = anime.random(0, 500);
    const scale = anime.random(0.3, 1.0);

    meteor.style.left = startX + 'px';
    meteor.style.top = startY + 'px';
    // Add rotation to the transform
    meteor.style.transform = `scale(${scale})`;

    body.appendChild(meteor);

    anime({
      targets: meteor,
      translateX: [0, endX - startX], // Move from startX to endX
      translateY: [0, endY - startY], // Move from startY to endY
      opacity: [1, 0],
      duration: duration,
      delay: delay,
      easing: 'linear',
      complete: function(anim) {
        meteor.remove();
      }
    });
  }
}

/* fullPage.js Initialization */
document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('nav'); 
  const alpineData = nav ? nav.__x : null; // Get Alpine data context
  const mobileTitleElement = document.getElementById('mobileTitle'); // Get the span element
  let currentTitle = ''; // Keep track of the current title

  new fullpage('#fullpage', {
    // Navigation
    anchors: ['home', 'why-nova', 'about', 'services', 'portfolio', 'testimonials', 'contact', 'footer'],
    navigation: true,
    navigationPosition: 'right',
    // navigationTooltips: ['Home', 'Why Nova?', 'About', 'Services', 'Portfolio', 'Testimonials', 'Contact'], // Optional tooltips
    showActiveTooltip: true,
    menu: '#menu', // Link to *desktop* menu for active state (fullPage handles this)

    // Scrolling
    scrollingSpeed: 700, // تقليل سرعة التمرير
    css3: true,
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    loopBottom: false,
    loopTop: false,
    scrollBar: false,
    scrollOverflow: true, // تمكين التمرير في الأقسام التي تحتوي على محتوى زائد
    scrollOverflowOptions: { // إعدادات إضافية لـ scrollOverflow
        scrollbars: {
            autoHide: 'leave',
            autoHideDelay: 1000,
            autoHideScrollbar: true
        },
        mouseWheel: {
            scrollAmount: 100
        }
    },
    touchSensitivity: 15, // تحسين حساسية التمرير باللمس
    normalScrollElements: '.footer', // السماح بالتمرير الطبيعي في قسم footer

    // Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: true,

    // Design
    controlArrows: true,
    verticalCentered: true, // Try to vertically center content
    // sectionsColor: ['#ff5f45', '#0798ec', '#fc6c7c', '#435b71'], // Example section colors
    paddingTop: '3em', // Adjust if needed for fixed header
    paddingBottom: '10px',
    fixedElements: 'nav', // Keep navbar fixed
    responsiveWidth: 0, // Disable responsiveness features if not needed
    responsiveHeight: 0,

    // Custom Selectors
    // sectionSelector: '.section',
    // slideSelector: '.slide',

    lazyLoading: true,

    // Events
    onLeave: function(origin, destination, direction){
      console.log("Leaving section " + origin.index);
      // Trigger meteor shower animation during transition
      createMeteorShower();
    },
    afterLoad: function(origin, destination, direction){
      console.log("Loaded section " + destination.index);
      // Remove transition effects here or trigger new animations
      // Example: document.body.classList.remove('space-travel-start');

      // Update active nav link class and mobile title
      updateActiveNav(destination.anchor);
      const link = document.querySelector(`.nav-link[href="#${destination.anchor}"]`);
      const newTitle = link ? link.innerText.trim().split('\n')[0] : '';

      if (alpineData && mobileTitleElement && newTitle !== currentTitle) {
          // Determine flip direction
          const flipClass = direction === 'down' ? 'flip-down' : 'flip-up';
          const flipOutClass = direction === 'down' ? 'flipUpOut' : 'flipDownOut'; // Opposite for outgoing title

          // Animate out old title
          const oldTitleSpan = mobileTitleElement.cloneNode(true);
          oldTitleSpan.style.position = 'absolute';
          oldTitleSpan.style.animation = `${flipOutClass} 0.4s ease-in-out forwards`;
          mobileTitleElement.parentNode.appendChild(oldTitleSpan);
          oldTitleSpan.addEventListener('animationend', () => {
            oldTitleSpan.remove();
          });

          // Set new title and animate in
          alpineData.currentSectionTitle = newTitle; 
          currentTitle = newTitle; // Update tracker
          // Add class with a slight delay to ensure text update is rendered
          setTimeout(() => {
            mobileTitleElement.classList.add(flipClass);
            mobileTitleElement.addEventListener('animationend', () => {
              mobileTitleElement.classList.remove(flipClass);
            }, { once: true });
          }, 10); 
      }

      // Re-initialize tilt on the loaded section if needed
      const currentSection = destination.item;
      const tiltElements = currentSection.querySelectorAll('[data-tilt]');
      if (tiltElements.length > 0) {
        VanillaTilt.init(tiltElements, {
          max: 15,
          speed: 400,
          glare: true,
          "max-glare": 0.2
        });
      }
    }
  });

  // Function to update active nav link
  function updateActiveNav(activeAnchor) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('nav-active');
      if (link.getAttribute('href') === '#' + activeAnchor) {
        link.classList.add('nav-active');
      }
    });
  }

  // Initial setup for the first loaded section
  const initialAnchor = window.location.hash.substring(1) || 'home';
  updateActiveNav(initialAnchor);
  if(alpineData) {
      const link = document.querySelector(`.nav-link[href="#${initialAnchor}"]`);
      const initialTitle = link ? link.innerText.trim().split('\n')[0] : '';
      alpineData.currentSectionTitle = initialTitle;
      currentTitle = initialTitle; // Initialize tracker
  }
});

// Splash Screen Handling
window.addEventListener('load', function() {
    // Wait for all resources to load
    const splashScreen = document.getElementById('splash-screen');
    const loadingBar = document.querySelector('.loading-bar');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Add fade-out class after a short delay
            setTimeout(() => {
                splashScreen.classList.add('fade-out');
                
                // Remove splash screen after animation
                setTimeout(() => {
                    splashScreen.remove();
                    document.body.classList.remove('loading');
                }, 500);
            }, 500);
        }
        loadingBar.style.width = progress + '%';
    }, 100);
});
