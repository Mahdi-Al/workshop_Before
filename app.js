const input = document.querySelector("input");
const btnSubmit = document.querySelector("#submit-btn");
const wrapper = document.querySelector(".wrapper");
let gifCount = 16;
const apiKey = "BNesU8TGHMDTWmw8OC7skeluVIuvLtRd";
const generateGif = () => {
  //  display loader until gif load
  const loader = document.querySelector(".loader");
  loader.style.display = "block";
  wrapper.style.display = "none";
  // get search value (default => laugh)

  wrapper.innerHTML = "";
  const req = fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${input.value}&limit=${gifCount}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
  )
    .then((response) => response.json())
    .then((info) => {
      console.log(info);
      let gifs = info.data.forEach((gif) => {
        let container = document.createElement("section");
        container.classList.add(
          "container",
          "w-full",
          "md:w-1/2",
          "lg:w-1/4",
          "px-4",
          "py-6"
        ); // add responsive classes
        let iframe = document.createElement("img");
        iframe.setAttribute("src", gif.images.fixed_height_downsampled.url);
        iframe.onload = () => {
          //  if iframes loaded correctly...
          gifCount--;
          if (gifCount == 0) {
            loader.style.display = "none";
            wrapper.style.display = "flex";
            wrapper.classList.add("flex", "flex-wrap", "justify-center"); // add flex, flex-wrap, and justify-center classes
          }
        };
        container.innerHTML += `<div class="w-full rounded-md border grid justify-items-centre ">
        
  <img
    src="${gif.images.fixed_height_downsampled.url}"
    alt="Laptop"
    class="h-[200px] w-full rounded-md object-cover "
  />

    <button
      type="button"
      class="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black justify-self-center"
    >
      more...
    </button>
  </div>
</div>
`;
        wrapper.append(container);
      });
    })
    .catch((error) => console.log(error));
};

btnSubmit.addEventListener("click", generateGif);
console.log(btnSubmit);
