
// Add new idea 
document.getElementById('new-idea').addEventListener('submit', function(e) {
    e.preventDefault();
    const ideaTitle = document.getElementById('idea-title').value
    const ideaBody = document.getElementById('idea-body').value

    function fetchAndDisplayIdeas() {
        fetch('http://localhost:3000/ideas')
        .then(res => res.json())
        .then(ideas => {
            const ideaList = document.getElementById('idea-list')
            ideaList.innerHTML = ""
            ideas.forEach(idea => {
                ideaList.innerHTML += `<div><h3>${idea.title}</h3><p>${idea.body}</p></div>`
            })
        })
        .catch(error => console.error('Error fetching ideas:', error))
    }
    fetch('http://localhost:3000/ideas', {
        method: "POST",
        body: JSON.stringify({
            title: ideaTitle,
            body: ideaBody
        }),
        headers: {
            "Content-Type":"application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            fetchAndDisplayIdeas()
        })
            .catch(error => console.error('Error:', error))
    })