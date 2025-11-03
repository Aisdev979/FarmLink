const openBtn = document.querySelector('.open-menu');
const navMenu = document.querySelector('.nav-header');

openBtn.addEventListener('click', () => navMenu.style.right = '0');
navMenu.addEventListener('click', () => navMenu.style.right = '-30em');