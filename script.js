let posts = [];

// Load stored posts on page load
function loadPosts() {
    const count = localStorage.getItem("postCount");
    if (count) {
        const total = Number(count);
        for (let i = 0; i < total; i++) {
            const post = {
                image: localStorage.getItem("postImage" + i),
                title: localStorage.getItem("postTitle" + i) || "",
                description: localStorage.getItem("postDescription" + i) || ""
            };
            posts.push(post);
        }
    }
}

// Toggle the post input modal
document.getElementById("addButton").addEventListener("click", function() {
    const postPopup = document.getElementById("postPopup");
    postPopup.style.display = postPopup.style.display === "block" ? "none" : "block";
});

// Handle creation of a new post
document.getElementById("addPost").addEventListener("click", function() {
    const image = document.getElementById("imageUrl").value.trim();
    const title = document.getElementById("postTitle").value.trim();
    const description = document.getElementById("postDescription").value.trim();

    if (image) {
        const post = { image, title, description };
        posts.push(post);

        savePosts();
        displayPosts(posts);

        // Reset inputs and close popup
        document.getElementById("imageUrl").value = "";
        document.getElementById("postTitle").value = "";
        document.getElementById("postDescription").value = "";
        document.getElementById("postPopup").style.display = "none";
    } else {
        alert("Please enter a valid image URL.");
    }
});

// Render all posts in the post container
function displayPosts(data) {
    const postsContainer = document.getElementById("posts");
    let output = "";

    data.forEach(function(post) {
        output += `
            <div class="post-card">
                <div class="post-header">
                    <img src="https://cdn-icons-png.flaticon.com/128/149/149071.png" alt="Profile">
                    <p>madhav_khatod</p>
                </div>
                <div class="post-image">
                    <img src="${post.image}" alt="Post Image">
                </div>
                <div class="post-actions">
                    <img src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png" alt="Like">
                    <img src="https://cdn-icons-png.flaticon.com/128/2099/2099085.png" alt="Comment">
                    <img src="https://cdn-icons-png.flaticon.com/128/2462/2462719.png" alt="Share">
                </div>
                <div class="post-text">
                    ${post.title ? `<b>${post.title}</b>` : ''}
                    ${post.description ? `<p>${post.description}</p>` : ''}
                </div>
            </div>
        `;
    });

    postsContainer.innerHTML = output;
}

// Save posts array into localStorage
function savePosts() {
    localStorage.setItem("postCount", posts.length);

    posts.forEach(function(post, index) {
        localStorage.setItem("postImage" + index, post.image);
        localStorage.setItem("postTitle" + index, post.title);
        localStorage.setItem("postDescription" + index, post.description);
    });
}

// Initialize application
loadPosts();
displayPosts(posts);
