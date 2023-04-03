const fetchData = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => showcatagories(data.data.news_category));
};

const showcatagories = (data) => {
  catagoriesContainer = document.querySelector(".catagories-container");
  //   console.log(data);
  data.forEach((singleCatagories) => {
    let linkContainer = document.createElement("p");

    linkContainer.innerHTML = `
    <a href="#" onclick= "displayfetchCatagoryName('${singleCatagories.category_id}', '${singleCatagories.category_name}') ">${singleCatagories.category_name}</a>
    `;
    catagoriesContainer.appendChild(linkContainer);
  });
};

const displayfetchCatagoryName = (category_id, category_name) => {
  // console.log(category_id);
  let url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAllData(data.data, category_name));
};
const showAllData = (data, category_name) => {
  // console.log(data.data.length, category_name);
  let displayCatagory = document.querySelector(".displayCatagory ");
  displayCatagory.innerText =
    data.length + " " + "items found for category" + " " + category_name;
  let newscontainer = document.querySelector(".all-newsCard");

  newscontainer.innerHTML = " ";

  data.forEach((singleNews) => {
    // console.log(singleNews._id);

    const { image_url, title, details } = singleNews;

    // const allCardDetails = document.querySelector("#all-newsCard");

    const AddCard = document.createElement("div");
    AddCard.classList.add("AddCard", "mb-3");
    AddCard.innerHTML = `
    <div

        class="  flex flex-col  bg-white border border-gray-200 rounded-lg shadow 
        md:flex-row w-full container-lg hover:bg-gray-100 dark:border-gray-700 
        dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img src ="${image_url}" class="h-[300px] w-[600px] mt-[30px]"/>
        <div class="flex flex-col  p-4 leading-normal">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
          ${title}
          </h5>
          <p class=" font-normal text-gray-700 dark:text-gray-400 ">
          ${details.slice(0, 600)}
          </p>

      

        
        </div>
        <div class="lg:mt-[20rem] lg:ml-[0px] ml-[20rem]">
        <i class="fa-solid fa-arrow-right" onclick="FetchDataDetails('${
          singleNews._id
        }')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
        </div>

      </div>
    `;
    newscontainer.appendChild(AddCard);
  });
};

const FetchDataDetails = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => showSingleData(data.data[0]));
};

const showSingleData = (News_data) => {
  console.log(News_data);

  const { image_url, title, details, author } = News_data;

  // const allCardDetails = document.querySelector("#all-newsCard");

  const AddCard = document.querySelector("#SigleData");
  AddCard.classList.add("AddCard", "mb-3");
  AddCard.innerHTML = `
  <div

      class="bg-white border border-gray-200 rounded-lg shadow 
      md:flex-row w-full container-lg hover:bg-gray-100 dark:border-gray-700 
      dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img src ="${image_url}" class="h-[300px] w-[600px] mt-[30px]"/>
      <div class=" p-4 leading-normal">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
        ${title}
        </h5>
        <p class=" font-normal text-gray-700 dark:text-gray-400 ">
        ${details.slice(0, 600)}
        </p>

        <p
        class="mb-2 text-xl font-bold tracking-tight text-gray-600 dark:text-white"
      >
      ${author.published_date}
      </p>

       

      </div>
      </div>
 
  `;
};
