
// Create a function in script.js that returns true if the user's token is found in local storage 
// and false if not. This will be useful to determine if elements on the home page should be shown
//  or hidden depending on if the user is logged in.
function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== undefined && token !== null;

}

document.addEventListener("DOMContentLoaded", function () {
    const topNav = document.querySelector(".top-nav");
    const icon = document.querySelector(".icon");
    const filters = document.querySelector(".filters");
    const button = document.querySelector(".btn-edit")
    console.log(isLoggedIn());

    if (isLoggedIn()) {
        // Show black edit bar
        // Show edit button next to my project
        // Hide category filters

        icon.classList.remove('hidden');
        topNav.classList.remove('hidden');
        filters.classList.remove('hidden');
        button.classList.remove('hidden');
    }
});




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

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector(".modal");
    const closeModalBtn = document.querySelector(".btn-close");
    const modalImage = modal.querySelector("img");
    const galleryImages = document.querySelectorAll(".gallery img");
    const trashIcons = document.querySelectorAll(".trash-icon");

    const icon = document.querySelector(".icon");

    icon.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modalImage.src = "assets/images/abajour-tahina.png";
        modal.querySelector(".modal-txt").textContent = "Photo Gallery";
    });


    function openModal(imgElement) {
        //TODO insert small gallery cards into
        modal.classList.remove("hidden");
        modalImage.src = imgElement.src;
        modal.querySelector(".modal-txt").textContent = imgElement.alt;

        const gallery = document.querySelector(".gallery");


    }

    function insertModalGallery(imgWrap) {
        console.log(gallery)
        ModalGallery.innerHTML = ''
        for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i];
            console.log(job);
            ModalGallery.innerHTML += `<p> ${job.icon} </p>`;
            ModalGallery.innerHTML += `
    <div class="img-wrap">
                <img src=" assets/images/abajour-tahina.png" alt="Tahina Lampshade">
                <i class="trash-icon fa-solid fa-trash-can" data-id="1"></i>
            </div>
    `;
        }
    }


    closeModalBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });

    // Optionally, handle modal closing with the "Escape" key
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            modal.classList.add("hidden");
        }
    });
});


const modalImage = document.querySelectorAll(".img-wrap")
modalImage.forEach(img => {

    img.addEventListener("click", () => openModal(img));
});

const trashIcons = document.querySelectorAll('fa-solid fa-trash-can')
trashIcons.forEach(icon => {
    icon.addEventListener('click', function (e) {
        const trashCanElement = e.target;
        const imageElement = trashCanElement.closest('.img-wrap');
        imageElement.remove();
    });
});


document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        modal.classList.add("hidden");
    }
});





const deleteIcons = document.querySelectorAll('.trash-icon');

document.addEventListener('DOMContentLoaded', () => {
    //    document.querySelector(".pizza").addEventListener('click',function(){console.log('pizza')})

    deleteIcons.forEach(icon => {
        console.log(icon)
        icon.addEventListener('click', function ($event) {
            console.log("delete icon clicked")
            const trashCanElement = $event.target;
            const resourceId = trashCanElement.dataset.id;

            const url = `http://localhost:5678/api/works/1${resourceId}`;

            fetch(url, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        console.log(`Resource ${resourceId} deleted successfully`);
                        this.remove();
                    } else {
                        console.error(`Failed to delete resource ${resourceId}`);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    });
});




