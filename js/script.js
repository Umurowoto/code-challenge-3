 document.addEventListener("DOMContentLoaded", () => {
  loadPosts();
  document.getElementById("post-form").addEventListener("submit", addPost);
});

function loadPosts() {
  fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(posts => {
      const postList = document.getElementById("post-list");
      postList.innerHTML = "<h2>All Posts</h2>";
      posts.forEach(post => {
        const div = document.createElement("div");
        div.textContent = post.title;
        div.addEventListener("click", () => showPost(post));
        postList.appendChild(div);
      });
    });
}

function showPost(post) {
  const postDetail = document.getElementById("post-detail");
  postDetail.innerHTML = `
    <h2>${post.title}</h2>
    <p><strong>${post.author}</strong></p>
    <img src="${post.image}" alt="" style="max-width: 100%; margin: 10px 0;" />
    <p>${post.content}</p>
    <button onclick="deletePost(${post.id})">Delete</button>
  `;
}

function addPost(e) {
  e.preventDefault();
  const form = e.target;

  const newPost = {
    title: form.title.value,
    author: form.author.value,
    content: form.content.value,
    image: form.image.value || "https://https://i0.wp.com/themes.svn.wordpress.org/blogger-hub/1.3.3/screenshot.png?w=post-thumbnail&strip=all/150"
  };

  fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost)
  })
  .then(() => {
    form.reset();
    loadPosts();
  });
}

function deletePost(id) {
  fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE"
  })
  .then(() => {
    document.getElementById("post-detail").innerHTML = "";
    loadPosts();
  });
}

