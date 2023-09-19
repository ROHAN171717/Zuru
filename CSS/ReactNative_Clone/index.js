const toggleButton = document.querySelector('.navbar__toggle');
const sidebarCloseButton = document.querySelector('.sidebar_close_btn');
const navBar_sideBar = document.querySelector('.navbar-sidebar');

toggleButton.addEventListener('click', () => {
    navBar_sideBar.style.display = 'block';
    console.log(navBar_sideBar.style.display);

});

sidebarCloseButton.addEventListener('click', (e) => { 
    e.stopPropagation();
    navBar_sideBar.style.display = 'none';
    console.log(navBar_sideBar.style.display);
});