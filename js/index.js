const JSONURL = "https://jsonplaceholder.typicode.com/posts";


// <li id="post">
//   <div>
//     <h4 class="post-title">lorem ipsum title</h4>
//     <p class="post-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus rerum consequuntur, unde minima maiores facere accusamus dicta illum a. Repudiandae!</p>
//   </div>
// </li>
//DOM Elements
//List of posts
let postsList = document.getElementById('postsList');

//Post List Item
let postListItem = document.createElement('li');
let postListItemDiv = document.createElement('div');
let postItemTitle = document.createElement('h4');
let postItemBody = document.createElement('p');

postItemTitle.className = "post-title";
postItemBody.className = "post-body";


function getData() {
  return fetch(JSONURL)
  .then(res => {
    if(!res.ok) {
      if(res.status >= 400 && res.status < 500) {
        return res.json(data => {
          let err = {
            errorMessage: data.message,
            statusCode: res.status,
            callURL: res.url
          };
          throw err;
        })
      } else {
        let err = {
          errorMessage: "server not responding, please try again later",
          statusCode: res.status
        };
        throw err;
      }
    }
    return res.json();
  })
}

async function useData() {
   let data = await getData();
   //Document Fragment for the list

   let listFrag = document.createDocumentFragment();
   let postsArr = [];

   data.forEach(d => {
     //Base DOM nodes
     let dataListItem = postListItem;
     let dataItemDiv = postListItemDiv;
     let dataItemTitle = postItemTitle;
     let dataItemBody = postItemBody;

     dataListItem.id = d.id
     dataItemTitle.innerText = d.title;
     dataItemBody.innerText = d.body;

     dataItemDiv.append(postItemTitle, postItemBody);

     dataListItem.appendChild(dataItemDiv);
     // debugger
     postsArr.push(dataListItem);
   });
   console.log(postsArr);
   // postsList.appendChild(listFrag);
};

useData();
