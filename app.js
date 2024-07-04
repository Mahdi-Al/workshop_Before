const input = document.querySelector("input");
const btnSubmit = document.querySelector("#submit-btn");
const wrapper = document.querySelector(".wrapper");
let gifCount = 10;
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
        container.classList.add("container");
        let iframe = document.createElement("img");
        iframe.setAttribute("src", gif.images.fixed_height_downsampled.url);

        iframe.onload = () => {
          //  if iframes loaded correctly ...
          gifCount--;
          if (gifCount == 0) {
            loader.style.display = "none";
            wrapper.style.display = "grid";
          }
        };
        container.append(iframe);
        wrapper.append(container);
      });
    })
    .catch((error) => console.log(error));
};

btnSubmit.addEventListener("click", generateGif);
console.log(btnSubmit);
// `https://api.giphy.com/v1/gifs/search?api-key=${apiKey}&q=${
input.value;
// }&limit=${20}&offset=0&rating=g&lang=en`;
