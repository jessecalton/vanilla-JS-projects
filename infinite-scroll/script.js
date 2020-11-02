const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  // data return value is also a promise
  return data;
}

// Show posts in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
       <h2 class="post-title">${post.title}</h2>
       <p class="post-body">${post.body}</p>
      </div>
    `;
    postsContainer.appendChild(postEl);
  });
}

// Show loader and fetch more posts
function showLoading() {
  // Add the class of show to the loader
  loading.classList.add('show');

  // Use setTimeout to fade loader
  setTimeout(() => {
    loading.classList.remove('show');
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// Show initial posts
showPosts();

// Infinite scroll functionality

window.addEventListener('scroll', () => {
  // lots of values in the `document` object that pertain to scrolling
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // If you get to the almost-bottom of the screen, do the thing
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

// for every change of input, do the filterPosts function
filter.addEventListener('input', filterPosts);
