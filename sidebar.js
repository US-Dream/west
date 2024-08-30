function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    const burger = document.querySelector('.burger')
    sidebar.style.display == 'flex';
}


function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    const burger = document.querySelector('.burger')

    sidebar.style.display == 'none';

    if(burger.style.display == 'none'){
        burger.style.display == 'flex'
    }
    else{
        burger.style.display == 'none'
    }
}