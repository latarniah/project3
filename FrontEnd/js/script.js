
// Create a function in script.js that returns true if the user's token is found in local storage 
// and false if not. This will be useful to determine if elements on the home page should be shown
//  or hidden depending on if the user is logged in.
function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== undefined && token !== null;

}
console.log(isLoggedIn())
if (isLoggedIn()) {
    //TODO show black edit bar
    //TODO show edit button next to my project
    //TODO hidde category filters
    // const filters = document.querySelector(".filters");
    // const topNav = document.querySelector(".topNav")
    // const edit = document.querySelector(".edit");
    //     edit.classList.remove('hidden'); // Show the edit bar

    //     topNav.classList.remove('hidden'); // Show the top navigation bar

    //     filters.classList.add('hidden'); // Hide the category filters
    }
    // };



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
        //TODO 
        const trashIcons = document.querySelectorAll(".trash-icon");


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

        // Add event listeners to each image in the gallery to open the modal
        galleryImages.forEach(img => {

            img.addEventListener("click", () => openModal(img));
        });

        // Delete image functionality
        trashIcons.forEach(icon => {
            icon.addEventListener('click', function (e) {
                const trashCanElement = e.target;
                const imageElement = trashCanElement.closest('.img-wrap');
                imageElement.remove(); // Remove the image container
            });
        });

        // Optionally, handle modal closing with the "Escape" key
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && !modal.classList.contains("hidden")) {
                modal.classList.add("hidden");
            }
        });
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


    // const modal = document.querySelector(".modal");
    // const overlay = document.querySelector(".overlay");
    // const openModalBtn = document.querySelector(".btn-edit");
    // const closeModalBtn = document.querySelector(".btn-close");
    // const images = document.querySelectorAll(".modal_gallery");
    // const modalContent = document.getElementById('myModalContent');


    // images.forEach(img => {
    //     img.addEventListener("click", () => {
    //         modal.classList.remove("hidden");
    //         modalImg.src = img.src;
    //     });
    // });


    // const openModal = function () {
    //     // console.log("lala")\\
    //     modal.classList.remove("hidden");
    //     overlay.classList.remove("hidden");
    //     //TODO inerate job cache and instert each job into modal
    //     modal.innerHTML = ''
    //   let modalContent = '';
    //   jobCache.forEach(job => {
    //     modalContent += `
    //     <section class="modal hidden">
    // 			<button class="btn-close">⨉</button>
    // 			<h1 class="modal-txt">Photo Gallery</h1>
    // 			<div class="flex"></div>
    // 				<div class="modal-gallery"></div>

    //          `;

    //             modalContent.innerHTML = newHTML;       

    //   });
    //   modal.innerHTML = modalContent;
    // };

    // openModalBtn.addEventListener("click", openModal);

    // openModalBtn.addEventListener("click", openModal);

    // const closeModal = function () {
    //     modal.classList.add("hidden");
    //     overlay.classList.add("hidden");
    // };
    // closeModalBtn.addEventListener("click", closeModal);
    // overlay.addEventListener("click", closeModal);
    // document.addEventListener("keydown");

    // document.addEventListener("keydown", function (e) {
    //     if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    //         modalClose();
    //     }
    // });



    // const modal = document.querySelector(".modal");
    // const overlay = document.querySelector(".overlay");
    // const openModalBtn = document.querySelector(".btn-edit");
    // const closeModalBtn = document.querySelector(".btn-close");

    // const modalImg = document.querySelector(".modal img");
    // const images = document.querySelectorAll(".modal_gallery");

    // const myModalContent = document.getElementById('myModalContent');


    // images.forEach(img => {
    //     img.addEventListener("click", () => {
    //         console.log("image Event")
    //         modal.classList.remove("hidden");

    //         if (modalImg) {
    //             modalImg.src = img.src;
    //         }
    //     });
    // });


    // const openModal = function () {
    //     console.log("opening modal")
    //     modal.classList.remove("hidden");
    //     overlay.classList.remove("hidden");


    // myModalContent.innerHTML = '';


    // let newHTML = '';
    // jobCache.forEach(job => {

    //     newHTML += `
    //         <figure>
    //             <img src="${job.imageUrl}" alt="${job.title}">
    //             <figcaption>${job.title}</figcaption>
    //         </figure>
    //     `;
    // });


    //     // myModalContent.innerHTML = newHTML;
    // };

    // openModalBtn.addEventListener("click", openModal);


    // const closeModal = function () {
    //     console.log("closing modal")
    //     modal.classList.add("hidden");
    //     overlay.classList.add("hidden");
    // };

    // closeModalBtn.addEventListener("click", closeModal);
    // overlay.addEventListener("click", closeModal);


    // document.addEventListener("keydown", function (e) {
    //     console.log("key down")
    //     if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    //         closeModal();
    //     }
    // });






    // const addAphotoButton = document.getElementById('addAphoto');


    // const newWork = {
    //     title: 'New Work Title',
    //     description: 'Description of the new work',

    // };


    // addAphotoButton.addEventListener('click', function () {
    //     createWork(newWork);
    // });

    // async function createWork(workData) {
    //     const url = 'http://localhost:5678/api/works';

    //     try {
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',

    //             },
    //             body: JSON.stringify(workData),
    //         });

    //         if (response.ok) {
    //             const responseData = await response.json();
    //             console.log('Work created successfully:', responseData);

    //         } else {
    //             const errorData = await response.json();
    //             console.error('Failed to create work:', response.status, errorData.message);

    //         }
    //     } catch (error) {
    //         console.error('Error during the request:', error);

    //     }

