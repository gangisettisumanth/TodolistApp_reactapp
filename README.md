# TodolistApp_reactapp
React-JS , HTML, CSS, JS


#TodoList Application

Overview Build a Todo application using React.js that allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks. The application fetches initial data from a remote API using Axios.

Features:-

#Display Existing Tasks: Show a list of existing tasks, including the task name and its completion status (completed or not). Initialize this list with todos fetched from the API.

#API Endpoint: Utilize the following API endpoint to retrieve todos: https://jsonplaceholder.typicode.com/users/1/todos.

#Task Properties: Each todo object from the API response has the following properties: id (number): The unique identifier for the todo. title (string): The title of the todo. completed (boolean): Indicates whether the todo has been completed or not.

#Add New Tasks: Provide an input field to add new tasks. Validate before adding a task: The task name should not be empty.

#Mark Tasks as Completed: Allow users to mark a task as completed by clicking on it. Visually distinguish completed tasks (e.g., by using a different color).

#Edit Task Name Enable users to edit the task name by clicking on an edit button next to each task. When a task is edited, update the task name in the list.

#Delete Tasks Provide a delete button to allow users to remove a task from the list. Filter Tasks

npm start Open the application in your browser at https://reactapp-todo-list-app.netlify.app.

Technologies Used React.js Axios CSS (for styling)
