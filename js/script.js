const skills = {
    data: [],

    generateList: function (parentElement) {
        parentElement.innerHTML = '';
        
        this.data.forEach(element => {
            const skillDt = document.createElement('dt');
            const skillDd = document.createElement('dd');
            const skillDiv = document.createElement('div');

            skillDt.classList.add('skill-item');
            skillDd.classList.add('skill-level');
            
            skillDt.textContent = element.name;
            skillDiv.textContent = `${element.level}%`;
            skillDt.style.backgroundImage = `url(${element.img})`;
            skillDiv.style.width = `${element.level}%`;
            skillDd.append(skillDiv);

            parentElement.append(skillDt, skillDd);
        });
    },

    sortList: function (prop) {
        if (this.isSort !== prop){
            this.data.sort(getComparer(prop));
            this.isSort = prop
    
            console.log('сортировка ', prop);
        }
        else{
            this.data.reverse();
    
            console.log('инвертировали сортировку')
        }
    },

    isSort: false,

    initList: function(url, parentElement, skillSection) {
        fetch(url)
          .then(data => data.json())
          .then(object => {
            this.data = object;
            this.generateList(parentElement);
          })
          .catch(() => {
            console.error('что-то пошло не так');
            skillSection.remove();
          });
      }
};

const skillList = document.querySelector('dl.skill-list');
const skillSection = document.querySelector('.skills')

skills.initList('db/skills.json', skillList, skillSection);

skills.generateList(skillList);


const sortBtn = document.querySelector('.sort');

sortBtn.addEventListener('click', (e) =>{
    let target = e.target;

    if (target.nodeName === "BUTTON"){
        switch (target.dataset.type) {
            case 'name':
                skills.sortList('name');
                break;
            case 'level':
                skills.sortList('level');
                break;
        
            default:
                console.log('неизвестная кнопка');
                break;
        }
    }
    //console.log(skills);
    skills.generateList(skillList);
});

function getComparer(prop){
    return function (a, b){
        if (a[prop] < b[prop]){
            return -1;
        }

        if (a[prop] > b[prop]){
            return 1;
        }

        return 0;
    }
};

const menu ={
    close: function(navMenu, navBtn){
        navMenu.classList.add('main_nav_closed');
        navBtn.classList.remove('nav-btn_close');
        navBtn.classList.add('nav-btn_open');
        navBtn.innerHTML = 
        '<span class="visually-hidden">Открыть меню</span>';
    },

    open: function(navMenu, navBtn){
        navMenu.classList.remove('main_nav_closed');
        navBtn.classList.add('nav-btn_close');
        navBtn.classList.remove('nav-btn_open');
        navBtn.innerHTML = 
        '<span class="visually-hidden">Закрыть меню</span>';
    },

};

const navMenu = document.querySelector('.main-nav');
const navBtn = document.querySelector('.nav-btn');

navBtn.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-btn_open')){
        menu.open(navMenu, navBtn);
    }
    else{
        menu.close(navMenu, navBtn);
    }
});

menu.close(navMenu, navBtn);

const checkbox = document.querySelector('.switch-checkbox');

checkbox.addEventListener('change', (e) => {
    if (e.target.checked){
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'white');
    }
    else {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
});

if (localStorage.getItem('theme') === 'white') {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'white');
    checkbox.checked = true;
}