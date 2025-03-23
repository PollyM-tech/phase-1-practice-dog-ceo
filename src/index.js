console.log('%c HI', 'color: firebrick');

document.addEventListener("DOMContentLoaded", function () {
    //global variable 
    const API_URL = "https://dog.ceo/api/breeds/image/random/4";
    const BREED_API_URL = "https://dog.ceo/api/breeds/list/all";

    async function fetchDogImages() {
        try {
            //it will fetch data for me from API 
            const response = await fetch(API_URL);
            //response is passed to json
            const data = await response.json();
            //url images are extracts through array
            const dogImages = data.message;
            //where images will be added
            const dogImageContainer = document.getElementById("dog-image-container");
            //create img elememts through forEach loop 
            dogImages.forEach(imageUrl => {
                const imgElement = document.createElement("img");
                imgElement.src = imageUrl;
                dogImageContainer.appendChild(imgElement);
            });

        } catch (error) {
            console.error("Error Fetching dog images:", error);
        }
    }

    async function fetchDogBreeds() {
        try {
            const response = await fetch(BREED_API_URL);
            const breed = await response.json();
            const breeds = Object.keys(breed.message);
            const breedList = document.getElementById("dog-breeds");

          //innerhtml used for clearing list
            function renderBreeds(filter = "") {
                breedList.innerHTML = "";

                breeds.forEach(breed => {
                    if (filter === "" || breed.startsWith(filter)) {
                        const liElement = document.createElement("li");
                        liElement.textContent = breed;
                        breedList.appendChild(liElement);
                        //adding color to li elements using event listeners
                        liElement.addEventListener("click", function () {
                            liElement.style.color = "firebrick";
                        });
                    }
                });
            }

            // Initializing breeds render
            renderBreeds();

            // Add event listener to the dropdown filter to get list dropdown
            const breedDropdown = document.getElementById("breed-dropdown");
            breedDropdown.addEventListener("change", function (event) {
                const selectedLetter = event.target.value;
                renderBreeds(selectedLetter); 
            });

        } catch (error) {
            console.error("Error Fetching dog breeds:", error);
        }
    }

    fetchDogImages();
    fetchDogBreeds();
});