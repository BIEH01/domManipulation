/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const url = "https://platzi-avo.vercel.app";

const appNode = document.querySelector("#app");

appNode.addEventListener("click", (event) => {
  if (event.target.nodeName === "H2") {
    window.alert("Hello");
  }
});

//API International for dates and currencies
const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return newPrice;
};

// web  to connect to server
window
  .fetch(`${url}/api/avo`)
  // processing response to JSON
  .then((response) => response.json())
  // JSON to data for rendering info on browser
  .then((responseJson) => {
    const allItems = [];

    responseJson.data.forEach((item) => {
      // create image
      const image = document.createElement("img");
      image.src = `${url}${item.image}`;
      image.className =
        "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";

      // create title
      const title = document.createElement("h2");
      title.textContent = item.name;
      title.className = "text-lg";

      // create price
      const price = document.createElement("div");
      price.textContent = formatPrice(item.price);
      price.className = "text-gray-600";

      // Create container with title and price
      const priceAndTitle = document.createElement("div");
      priceAndTitle.className = "text-center md:text-left";
      priceAndTitle.appendChild(title);
      priceAndTitle.appendChild(price);

      // Push them into card container
      const card = document.createElement("div");
      card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
      card.append(image, priceAndTitle);

      // create container
      const container = document.createElement("div");
      container.appendChild(card);

      allItems.push(container);
    });

    appNode.append(...allItems);
  });
