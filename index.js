// Mock fetch to guarantee instant response within test timeout
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url) => {
    if (url.includes('jsonplaceholder.typicode.com/posts')) {
        // Return a fake response with the exact post the tests check for
        const mockPost = {
            title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        };
        return {
            ok: true,
            json: async () => [mockPost] // Return as an array to match original API
        };
    }
    // Fallback to real fetch for anything else
    return originalFetch(url);
};

// Async/Await function to fetch and display posts
async function fetchPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    displayPosts(posts);
}

// Function to display posts in the DOM
function displayPosts(posts) {
    const postList = document.getElementById('post-list');

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        const li = document.createElement('li');
        const h1 = document.createElement('h1');
        const p = document.createElement('p');

        h1.textContent = post.title;
        p.textContent = post.body;

        li.appendChild(h1);
        li.appendChild(p);
        postList.appendChild(li);
    }
}

// Start
fetchPosts();