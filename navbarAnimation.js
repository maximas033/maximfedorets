  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.getElementById('buttonThreeline');
    
    // Check if it's a phone (screen width less than 768px)
    const isPhone = window.innerWidth < 768;

    if ((document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) && !isPhone) {
      navbar.style.transform = 'translateX(100%)';
      setTimeout(() => {
        navbarToggler.style.display = "block" 
      }, 300);
    } else {
        navbar.style.transform = 'translateX(0)';
        setTimeout(() => {
            navbarToggler.style.display = "none" 
        }, 300);
    }

    // onclick of navbarToggler expand the navbar 
    navbarToggler.addEventListener("click", () => {
      navbar.style.transform = 'translateX(0)';
      setTimeout(() => {
        navbarToggler.style.display = "none" 
      }, 300);
    });
  }