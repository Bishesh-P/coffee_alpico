// Premium Enhancement Script
// This script adds premium classes to existing elements

document.addEventListener('DOMContentLoaded', function() {
  // Add premium classes to buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (!button.classList.contains('btn-premium')) {
      button.classList.add('btn-premium');
    }
  });

  // Add premium classes to cards
  const cards = document.querySelectorAll('.bg-white');
  cards.forEach(card => {
    if (card.classList.contains('rounded-lg') || card.classList.contains('rounded')) {
      card.classList.add('card-premium');
    }
  });

  // Add premium navbar class
  const navbar = document.querySelector('nav');
  if (navbar) {
    navbar.classList.add('navbar-premium');
    
    // Handle scroll for navbar
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        navbar.classList.remove('transparent');
      } else {
        navbar.classList.add('transparent');
      }
    });
  }

  // Add premium hero class
  const hero = document.querySelector('.h-screen');
  if (hero) {
    hero.classList.add('hero-premium');
  }

  // Add premium text gradient to headings
  const headings = document.querySelectorAll('h1, h2, h3');
  headings.forEach(heading => {
    if (heading.textContent.includes('Nepal') || heading.textContent.includes('Coffee') || heading.textContent.includes('Premium')) {
      heading.classList.add('text-premium-gradient');
    }
  });

  // Add floating animation to floating elements
  const floatingElements = document.querySelectorAll('.animate-float');
  floatingElements.forEach(element => {
    element.classList.add('animate-premium-float');
  });

  // Add glow effect to important buttons
  const primaryButtons = document.querySelectorAll('[class*="primary"]');
  primaryButtons.forEach(button => {
    button.classList.add('animate-premium-glow');
  });
});

// Export for use in components
export const addPremiumClasses = {
  button: (element) => element.classList.add('btn-premium'),
  card: (element) => element.classList.add('card-premium'),
  heading: (element) => element.classList.add('text-premium-gradient'),
  glow: (element) => element.classList.add('animate-premium-glow'),
  float: (element) => element.classList.add('animate-premium-float'),
  pulse: (element) => element.classList.add('animate-premium-pulse'),
};
