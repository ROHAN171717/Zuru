const toggleButton = document.querySelector('.navbar__toggle');
const sidebarCloseButton = document.querySelector('.sidebar_close_btn');
const navBar_sideBar = document.querySelector('.navbar-sidebar');
const sideBar_dropDown = document.querySelector('.sidebar_dropdown');
const dropDown = document.querySelector('.dropdown');


toggleButton.addEventListener('click', () => {
    navBar_sideBar.style.display = 'block';
});

sidebarCloseButton.addEventListener('click', (e) => { 
    e.stopPropagation();
    navBar_sideBar.style.display = 'none';
});

sideBar_dropDown.addEventListener('click', (e) => {
    const sidebar_dropdown_items = document.querySelector('.sidebar_dropdown_items');
    const arrow_icon = document.getElementById('arrow_icon');

    if (sidebar_dropdown_items.style.display === 'block') {
        sidebar_dropdown_items.style.display = 'none';
        arrow_icon.src = "./Images/forward-arrow-icon.png"
    } else {
        sidebar_dropdown_items.style.display = 'block';
        arrow_icon.src = "./Images/downward-arrow-icon.png"
    }
});
 
// dropDown.addEventListener('click', (e) => { 
//     const dropdown_items = document.querySelector('.dropdown_items');

//     if (dropdown_items.style.display === 'block') {
//         dropdown_items.style.display = 'none';
//     } else {
//         dropdown_items.style.display = 'block';
//     }


// });