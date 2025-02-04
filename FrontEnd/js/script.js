

// let apiRequest = new XMLHttpRequest();
// apiRequest.open('GET', 'http://localhost:5678/api/works'); apiRequest.send();

// let jobCache =  [
//     {
//         "id": 1,
//         "title": "Tahina lampshade",
//         "imageUrl": "http://localhost:5678/images/abajour-tahina1651286843956.png",
//         "categoryId": 1,
//         "userId": 1,
//         "category": {
//             "id": 1,
//             "name": "Objects"
//         }
//     },
//     {
//         "id": 2,
//         "title": "Apartment Paris V",
//         "imageUrl": "http://localhost:5678/images/appartement-paris-v1651287270508.png",
//         "categoryId": 2,
//         "userId": 1,
//         "category": {
//             "id": 2,
//             "name": "Apartments"
//         }
//     },
//     {
//         "id": 3,
//         "title": "Restaurant Sushisen - London",
//         "imageUrl": "http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png",
//         "categoryId": 3,
//         "userId": 1,
//         "category": {
//             "id": 3,
//             "name": "Hotels & restaurants"
//         }
//     },
//     {
//         "id": 4,
//         "title": "Villa “La Balisiere” - Port Louis",
//         "imageUrl": "http://localhost:5678/images/la-balisiere1651287350102.png",
//         "categoryId": 2,
//         "userId": 1,
//         "category": {
//             "id": 2,
//             "name": "Apartments"
//         }
//     },
//     {
//         "id": 5,
//         "title": "Thermopolis Structures",
//         "imageUrl": "http://localhost:5678/images/structures-thermopolis1651287380258.png",
//         "categoryId": 1,
//         "userId": 1,
//         "category": {
//             "id": 1,
//             "name": "Objects"
//         }
//     },
//     {
//         "id": 6,
//         "title": "Apartment Paris X",
//         "imageUrl": "http://localhost:5678/images/appartement-paris-x1651287435459.png",
//         "categoryId": 2,
//         "userId": 1,
//         "category": {
//             "id": 2,
//             "name": "Apartments"
//         }
//     },
//     {
//         "id": 7,
//         "title": "Pavillon “Le coteau” - Cassis",
//         "imageUrl": "http://localhost:5678/images/le-coteau-cassis1651287469876.png",
//         "categoryId": 2,
//         "userId": 1,
//         "category": {
//             "id": 2,
//             "name": "Apartments"
//         }
//     },
//     {
//         "id": 8,
//         "title": "Villa Ferneze - Isola d’Elba",
//         "imageUrl": "http://localhost:5678/images/villa-ferneze1651287511604.png",
//         "categoryId": 2,
//         "userId": 1,
//         "category": {
//             "id": 2,
//             "name": "Apartments"
//         }
//     },
//     {
//         "id": 9,
//         "title": "Apartment Paris XVIII",
//         "imageUrl": "http://localhost:5678/images/appartement-paris-xviii1651287541053.png",
//         "categoryId": 2,
//         "userId": 1,
//         "category": {
//             "id": 2,
//             "name": "Apartments"
//         }
//     },
//     {
//         "id": 10,
//         "title": "Bar “Lullaby” - Paris",
//         "imageUrl": "http://localhost:5678/images/bar-lullaby-paris1651287567130.png",
//         "categoryId": 3,
//         "userId": 1,
//         "category": {
//             "id": 3,
//             "name": "Hotels & restaurants"
//         }
//     },
//     {
//         "id": 11,
//         "title": "Hotel First Arte - New Delhi",
//         "imageUrl": "http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png",
//         "categoryId": 3,
//         "userId": 1,
//         "category": {
//             "id": 3,
//             "name": "Hotels & restaurants"
//         }
//     }

// ];
let jobCache;
function filterButtons(job) {
    return job.category.name === 'Objects';
}

fetch('http://localhost:5678/api/works') 
    .then(data => {
        return data.json();
    })
    .then(jobs => {
        jobCache = jobs
        insertJobs(jobs)
    });
const gallery = document.querySelector(".gallery");

function insertJobs(jobs) {
    console.log(jobs)
    gallery.innerHTML = ''
    for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        console.log(job);
        // gallery.innerHTML += `<p> ${job.title} </p>`;
        gallery.innerHTML += `
        <figure>
				<img src="${job.imageUrl}" alt="Paris V Appartment">
				<figcaption>${job.title}</figcaption>
			</figure>
        `;
    }
}
//TODO// fetchCategoryMenu

fetch('http://localhost:5678/api/categories')
    .then(data => {
        return data.json();
    })
    .then(categories => {
        insertFilterButtons(categories)
    });
const filters = document.querySelector(".filters");

function insertFilterButtons(categories) {
    console.log(categories)
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        console.log(category);
        filters.innerHTML += `
       <button value="${category.name}">${category.name}</button> 
        `
    }
    const buttons = filters.querySelectorAll("button");
    console.log(buttons)
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        console.log(button)

        button.addEventListener("click", function (event) {
            const categoryName = event.target.value;

            console.log(categoryName)
            //TODO filter job cache with category name
            let filteredJobs;
            if (categoryName === 'All') {
                console.log(jobCache)
                filteredJobs = jobCache
            } else {
                filteredJobs = jobCache.filter(checkCategory);
            }
            console.log(filteredJobs)

            function checkCategory(job) {
                return job.category.name === categoryName;
            }
            insertJobs(filteredJobs)


            });

        }
}


