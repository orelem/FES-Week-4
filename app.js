const compList = document.getElementById('results__list');
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search__img');

const zMon = document.getElementById('zm');
const zCre = document.getElementById('.zc');
const zEqu = document.getElementById('.ze');
const zMat = document.getElementById('.zma');
const zTre = document.getElementById('.zt');

let zMobs = [];

// CLICK TO DISPLAY AND SEARCH MONSTERS
zMon.addEventListener('click', function() {
    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value;
        console.log(zMobs);
    
        const filteredMonsters = zMobs.filter((monster) => {
            return (
                monster.name.includes(searchString)
            );
        });
        displayMonsters(filteredMonsters);
    });
    
    
    const loadMonsters = async () => {
        try {
            const monsters = await fetch('https://botw-compendium.herokuapp.com/api/v2/category/monsters');
            const jsonData = await monsters.json();
            zMobs = jsonData.data
            displayMonsters(zMobs);
        } catch (err) {
            console.error(err);
        }
    };
    
    const displayMonsters = (monsters) => {
        const htmlString = monsters
            .map((monster) => {
                return `
                <div class="card__container">
                    <h2>${monster.name}</h2>
                    <h3>ID #: ${monster.id}</h3>
                    <img src="${monster.image}" alt="">
                    <div class="text__wrapper">
                        <p><b>Description:</b> ${monster.description}</p>
                        <p><b>Common Locations:</b> ${monster.common_locations}</p>
                        <p class="drops"><b>Drops:</b> ${monster.drops}</p>
                    </div>
                </div>
            `;
            })
            .join('');
        compList.innerHTML = htmlString;
    };
    
    loadMonsters();
});