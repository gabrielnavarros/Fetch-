/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector("#app");

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD",
    }).format(price)
    
    return newPrice;
}

//web API
//Connect to the server
window
    .fetch(`${baseUrl}/api/avo`)
    //Process response and convert in JSON
    .then((response) => response.json())
    //JSON -> Data -> Render info into the browser
    .then((responseJson) => {
        const AllItems = [];
        responseJson.data.forEach((item) => {
            //create image
            const imagen = document.createElement("img");
            imagen.src = `${baseUrl}${item.image}`
            imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";

            //create title
            const title = document.createElement("h2");
            title.textContent = item.name;
            title.className = "text-lg";

            //create price
            const price = document.createElement("div");
            price.textContent = formatPrice(item.price);
            price.className = "text-gray-600";

            //title and price container
            const priceAndTitle = document.createElement("div")
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.appendChild(title);
            priceAndTitle.appendChild(price);
            
            //card container
            const card = document.createElement("div");
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
            card.append(imagen, priceAndTitle);

            //main container
            const container = document.createElement("div");
            container.appendChild(card);

            AllItems.push(container);
        });
        
        appNode.append(...AllItems);
    });
