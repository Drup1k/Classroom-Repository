//This page as input page where ideas are given in the database

// imports
import dotenv from 'dotenv';
import express from 'express';
// import jwt from 'jsonwebtoken'; //do we need this? 
import mariadb from 'mariadb'
dotenv.config()
app.use(express.json());


// Add fetch to server example - change after to own server
fetch("https://apis.scrimba.com/jsonplaceholder/todos", {
    method: "POST",
    body: JSON.stringify({
        title: "my title",
        completed: false
    }),
    headers: {
        "Content-Type": "application/json"
    }
})
    .then(res => res.json())
    .then(data => console.log(data))

// Add new idea 
document.getElementById('new-idea').addEventListener('submit', function(e) {
    e.preventDefault();
    const ideaTitle = document.getElementById('idea-title').value
    const ideaBody = document.getElementById('idea-body').value
    console.log(ideaTitle) //remove when finish
    console.log(ideaBody) //remove when finish
    const data = {
        title: ideaTitle,
        body: ideaBody
    }
    console.log(data) //remove when finish
})

