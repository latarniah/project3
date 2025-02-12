
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



const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-edit");
const closeModalBtn = document.querySelector(".btn-close");

const modalImg = document.querySelector(".modal img");  
const images = document.querySelectorAll(".modal_gallery");

const myModalContent = document.getElementById('myModalContent');


images.forEach(img => {
    img.addEventListener("click", () => {
        modal.classList.remove("hidden");
     
        if(modalImg) {
            modalImg.src = img.src;
        }
    });
});


const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    
    myModalContent.innerHTML = '';

   
    let newHTML = '';
    jobCache.forEach(job => {
       
        newHTML += `
            <figure>
                <img src="${job.imageUrl}" alt="${job.title}">
                <figcaption>${job.title}</figcaption>
            </figure>
        `;
    });

  
    myModalContent.innerHTML = newHTML;
};

openModalBtn.addEventListener("click", openModal);


const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);


document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});


// Select the button element
const addAphotoButton = document.getElementById('addAphoto');

// Define the new work object
const newWork = {
    title: 'New Work Title',
    description: 'Description of the new work',
    // Add other properties as required by your API
};

// Add an event listener to the button
addAphotoButton.addEventListener('click', function() {
    createWork(newWork);
});

// Define the createWork function
async function createWork(workData) {
    const url = 'http://localhost:5678/api/works';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include the Authorization header if required
                // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
            },
            body: JSON.stringify(workData),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Work created successfully:', responseData);
            // Perform any additional actions with the response data if needed
        } else {
            const errorData = await response.json();
            console.error('Failed to create work:', response.status, errorData.message);
            // Handle specific error messages or statuses as needed
        }
    } catch (error) {
        console.error('Error during the request:', error);
        // Handle network or other unexpected errors
    }
}
