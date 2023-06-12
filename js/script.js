const skills = {
    data: [
        {name:"html",    level:"70",   img:"img/skills/html.svg" },
        {name:"css",     level:"50",   img:"img/skills/css.svg" },
        {name:"python",  level:"40",   img:"img/skills/python.svg" },
        {name:"c++",     level:"90",   img:"img/skills/c++.svg" }
    ],

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

    isSort: 'false'
};

const skillList = document.querySelector('dl.skill-list');
skills.generateList(skillList);

const sortBtn = document.querySelector('div.sort');
sortBtn.isSort = false;

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


//console.log(sortBtn);