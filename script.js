
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        const postsArr = data.slice(0, 5);
        let html = ""
        for (let post of postsArr) {
            html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            `
        }
        document.getElementById("idea-list").innerHTML = html
    })



document.getElementById('new-idea').addEventListener('submit', function(e) {
    e.preventDefault();
    const ideaTitle = document.getElementById('idea-title').value
    const ideaBody = document.getElementById('idea-body').value
    console.log(ideaTitle)
    console.log(ideaBody)
    const data = {
        title: ideaTitle,
        body: ideaBody
    }
    console.log(data)
})