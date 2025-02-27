
function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== undefined && token !== null;

}

document.addEventListener("DOMContentLoaded", function () {
    const topNav = document.querySelector(".top-nav");
    const filters = document.querySelector(".filters");
    const button = document.querySelector(".btn-edit")
    const login = document.querySelector(".login")
    const logout = document.querySelector(".logout")
    console.log(isLoggedIn());

    if (isLoggedIn()) {
        topNav.classList.remove('hidden');
        filters.classList.add('hidden');
        button.classList.remove('hidden');
        login.classList.add('hidden');
        logout.classList.remove('hidden');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const logout = document.querySelector(".logout");
    const login = document.querySelector(".login");

    console.log("Logout", logout);
    

    if (!logout || !login) {
        console.error("Logout or login button not found.");
        return;
    }

    logout.addEventListener("click", (event) => {
        event.preventDefault();

        console.log("Before Logout - token:", localStorage.getItem("token"));

       
        localStorage.removeItem("token");

        console.log("After Logout - token:", localStorage.getItem("token"));
        console.log("User logged out successfully.");

        // Ensure login button appears and logout disappears
        login.classList.remove("hidden"); // Show login button
        login.style.display = "block"; // Ensure it's not hidden
        logout.classList.add("hidden"); // Hide logout button
        logout.style.display = "none"; // Extra safety

        
       
            window.location.href = "./"; 
        
    });
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
    const overlay = document.querySelector(".overlay");
    const closeModalBtn = document.querySelector(".btn-close");
    const modalImage = modal.querySelector("img");
    const galleryImages = document.querySelectorAll(".gallery img");
    const trashIcons = document.querySelectorAll(".trash-icon");

    const button = document.querySelector(".btn-edit")

    button.addEventListener("click", () => {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        modalImage.src = "assets/images/abajour-tahina.png";
        modal.querySelector(".modal-txt").textContent = "Photo Gallery";
    });


    function openModal(imgElement) {
        //TODO insert small gallery cards into
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        modalImage.src = imgElement.src;
        modal.querySelector(".modal-txt").textContent = imgElement.alt;

        const gallery = document.querySelector(".gallery");


    }

    const closeModal = function () {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    };
    overlay.addEventListener("click", closeModal);

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


    closeModalBtn.addEventListener("click", closeModal);


    window.addEventListener("click", (e) => {

        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            modal.classList.add("hidden");
        }
    });



    trashIcons.forEach(icon => {
        icon.addEventListener('click', function (e) {
            const trashCanElement = e.target;
            const imageElement = trashCanElement.closest('.img-wrap');
            imageElement.remove();

            async function deleteImage(imageId) {
                try {
                    const token = localStorage.getItem('authToken');
                    const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        console.log(`Image with ID ${imageId} deleted successfully.`);

                        document.getElementById(`image-${imageId}`)?.remove();
                        document.getElementById(`modal-image-${imageId}`)?.remove();


                        refreshGallery();
                    } else {
                        console.error('Failed to delete image:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }

            function attachDeleteEventListeners() {
                document.querySelectorAll('.delete-btn').forEach(button => {
                    button.addEventListener('click', function () {
                        const imageId = this.dataset.id;
                        deleteImage(imageId);
                    });
                });
            }


            fetch('http://localhost:5678/api/works')
                .then(data => {
                    return data.json();
                })
                .then(jobs => {
                    jobCache = jobs
                    insertJobs(jobs)
                });






            //TODO use fetch to call BE to delete jobs
            //TODO update home new jobs are deleted "look for job in cache & delet it, then call function that
            // displays the jobs on homepage passing the job cache to the job"
        });
    });



    document.addEventListener('DOMContentLoaded', () => {
        const trashIcons = document.querySelectorAll('.trash-icon');

        trashIcons.forEach(icon => {
            icon.addEventListener('click', function (e) {
                const trashCanElement = e.target;


                const imageElement = trashCanElement.closest('.img-wrap');
                if (!imageElement) return;

                const resourceId = trashCanElement.dataset.id;
                const token = localStorage.getItem('token');


                const url = `http://localhost:5678/api/works/${resourceId}`;


                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })
                    .then(response => {
                        if (response.ok) {
                            console.log(`Resource ${resourceId} deleted successfully`);

                            imageElement.remove();
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
});

// const addAPhoto = document.querySelector("btn");

// addAPhoto.addEventListener("click", async () => {
//     // A <form> element
//     const title = document.querySelector("#user-info");
//     const category = new FormData(userInfo);

//     const response = await fetch("http://localhost:5678/api/works"), {
//         method: "POST",
//         body: formData,
//     });
// console.log(await response.json());
// });

