const express = require("express") //telling js we wanna use framework
const cors = require("cors") //allowing us to bypass security

const app = express();  //creating an express server we can use to handle requests
const port = 3000; // we are choosing to post port 3000 (we can choose anything)

// server is a nontangible computer somewhere else
// port is how we are communicating with the server, and it shows the response from server

app.use(cors());  // telling express to use cors so every port can access every other port
app.use(express.json());

// we are creating an array with 3 objects
// objects in js contain a key and field
let tasks = [

];
let taskID = 0;

app.get("/tasks", (request, response) => {
    response.json(tasks)
});
// app is our express server, port is 3000
// we are creating get route,server "gets" from backend
// we are creating a new route called /tasks (server has a million
// routes, we can have as many routes we want)
// response.json(tasks) means server turns tasks (rn in javascript) into json object, that's what we are getting back
// what we see at localhost:3000/tasks is the response in our .get route

// server listens for the get request, and then responds back, which is what we see at localhost...

app.post("/tasks", (request,response) => {
    const newTask = {
        id: taskID++, // the server's memory keeps track of each ID so that it never repeats
        task: request.body.task // body.task cuz body might have even more variables (body, name, etc)
    };

    tasks.push(newTask);
    response.json(newTask)
});

app.delete("/tasks/:id", (request,response) => {
    const taskId = parseInt(request.params.id); // all data passed into these methods are strings, we want to turn into integer so we can properly compare in the filter function
    tasks = tasks.filter((task) => task.id !== taskId);
    response.sendStatus(200);
});

// telling our terminal that our server is successfully running
app.listen(port,() => {
    console.log("Server is running!");
});

