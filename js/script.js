const skills = {
    data: [
        {name:"html",    level:"70",   img:"img/skills/html.svg" },
        {name:"css",     level:"50",   img:"img/skills/css.svg" },
        {name:"python",  level:"40",   img:"img/skills/python.svg" },
        {name:"c++",     level:"70",   img:"img/skills/c++.svg" }
    ],

    generateList: function (parentElement) {
        
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
    }
};

const skillList = document.querySelector('dl.skill-list');
skills.generateList(skillList);