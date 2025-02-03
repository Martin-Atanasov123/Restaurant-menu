const menuData = [
    {
        category: "Основни ястия",
        icon: "images/Restaurant-Dishes--Streamline-Ultimate.png",
        items: [
            {
                title: "Каварма",
                price: "14.90 лв",
                description: "Традиционно ястие в глинен съд със свинско, гъби, лук и подправки",
                image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Kavarma.jpg",
                tags: ["meat"]
            },
            {
                title: "Мусака",
                price: "12.50 лв",
                description: "Слоесто ястие с картофи, кайма и кисело мляко",
                image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Moussaka.jpg",
                tags: ["vegetarian"]
            }
        ]
    },
    {
        category: "Скара",
        icon: "images/grill.png",
        items: [
            {
                title: "Кебапчета",
                price: "3.50 лв/бр",
                description: "Изпечени на скара рула от мелена свинска кайма с традиционни подправки",
                image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kufte_and_kebapche.jpg",
                tags: ["meat"]
            },
            {
                title: "Шишчета",
                price: "4.20 лв/бр",
                description: "Мариновани свински шишчета с зеленчуци",
                image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Shish_kebab.jpg",
                tags: ["meat"]
            }
        ]
    },
    {
        category: "Салати",
        icon: "images/Salad--Streamline-Lucide.svg",
        items: [
            {
                title: "Шопска салата",
                price: "8.90 лв",
                description: "Пресни домати, краставици, лук, чушки и сирене",
                image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Shopska_salad.jpg",
                tags: ["vegetarian", "gluten-free"]
            },
            {
                title: "Овчарска салата",
                price: "10.50 лв",
                description: "Смесена салата с шунка, сирене, яйца и гъби",
                image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Ovcharska_salat.jpg",
                tags: ["meat"]
            }
        ]
    },
    {
        category: "Специалитети",
        icon: "images/Pizza--Streamline-Core.png",
        items: [
            {
                title: "Баница",
                price: "6.90 лв",
                description: "Традиционно слоесто тесто със сирене и яйца",
                image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Banitsa_%28Baniza%29.jpg",
                tags: ["vegetarian"]
            },
            {
                title: "Мекици",
                price: "5.50 лв",
                description: "Пържени тестени изделия със сладко или сирене",
                image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Mekitsi.jpg",
                tags: ["vegetarian"]
            }
        ]
    },
    {
        category: "Супи",
        icon: "images/soup.png",
        items: [
            {
                title: "Таратор",
                price: "7.90 лв",
                description: "Студена супа с кисело мляко, краставици и копър",
                image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Tarator_soup.jpg",
                tags: ["vegetarian", "gluten-free"]
            },
            {
                title: "Боб чорба",
                price: "9.50 лв",
                description: "Традиционна бобена чорба с пушено месо",
                image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Bob_chorba.jpg",
                tags: ["meat"]
            }
        ]
    },
    {
        category: "Десерти",
        icon: "images/Cake-Cherry--Streamline-Ultimate.png",
        items: [
            {
                title: "Баклава",
                price: "8.90 лв",
                description: "Слоесто тесто с орехи и медена заливка",
                image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Baklava%281%29.jpg",
                tags: ["vegetarian"]
            },
            {
                title: "Гараш",
                price: "6.50 лв",
                description: "Традиционна българска шоколадова торта с орехи",
                image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Garash_torte.jpg",
                tags: ["vegetarian"]
            }
        ]
    }
];

function createMenu() {
    const menuContainer = document.getElementById('menu');
    menuContainer.innerHTML = '';

    menuData.forEach(section => {
        const sectionElement = document.createElement('details');
        sectionElement.className = 'menu-section';
        sectionElement.innerHTML = `
            <summary>
                ${section.category}
                <img src="${section.icon}" alt="${section.category} икона">
            </summary>
            <div class="menu-items"></div>
        `;

        const itemsContainer = sectionElement.querySelector('.menu-items');
        section.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="item-info">
                    <h3>${item.title}</h3>
                    <p class="item-description">${item.description}</p>
                    <div class="dietary-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <span class="price">${item.price}</span>
                </div>
            `;
            itemsContainer.appendChild(itemElement);
        });

        menuContainer.appendChild(sectionElement);
    });
}

document.getElementById('search').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    filterAndSearchDishes(searchValue);
});

function filterDishes(filter) {
    document.querySelectorAll('.filter-options button').forEach(btn => {
        btn.classList.remove('active');
        if(btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    filterAndSearchDishes(document.getElementById('search').value.toLowerCase());
}

function filterAndSearchDishes(searchValue = '') {
    const filter = document.querySelector('.filter-options .active')?.dataset.filter || 'all';

    document.querySelectorAll('.menu-item').forEach(item => {
        const itemText = item.textContent.toLowerCase();
        const matchesSearch = itemText.includes(searchValue);
        const matchesFilter = filter === 'all' || 
            Array.from(item.querySelectorAll('.tag'))
                .some(tag => tag.textContent === filter);

        item.style.display = (matchesSearch && matchesFilter) ? 'block' : 'none';
    });

    document.querySelectorAll('.menu-section').forEach(section => {
        const hasVisibleItems = section.querySelector('.menu-item[style="display: block;"]');
        section.style.display = hasVisibleItems ? 'block' : 'none';
    });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function toggleMenu() {
    const menu = document.getElementById('myLinks');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

createMenu();
filterDishes('all'); 
