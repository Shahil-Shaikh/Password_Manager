require('dotenv').config()
// this line will load the environment variables from the .env file into process.env
const { MongoClient } = require('mongodb');
// importing the MongoClient class from the mongodb package to interact with MongoDB databases
const bodyParser = require('body-parser')
//it is a middleware that parses incoming request bodies in a middleware before your handlers, available under the req.body property.
//what is does in simple words is that it takes the raw data from the request body and converts it into a format that can be easily 
// accessed and used in your application, such as JSON or URL-encoded data.
const cors = require('cors')
//using cors from express js cors

const express = require('express')


const app = express() //express() is a function that creates an Express application, which is an instance of the Express framework. This application will be used to define routes and handle HTTP requests.
const port = 3000


app.use(bodyParser.json()) 
//this line will tell the Express application to use the bodyParser middleware to parse JSON data in the request body.
app.use(cors()) 
//this line will tell the Express application to use the cors middleware to enable Cross-Origin Resource Sharing (CORS) for 
//all routes in the application. This allows the server to accept requests from different origins, which is important for 
//web applications that may be hosted on different domains or ports than the server.

//*******************************************************MongoDB******************************************************************/
// Connection URL
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
// creating a new instance of MongoClient using the connection URL stored in the MONGO_URL environment variable

// Database Name
const dbName = 'PracticeProjects'; //under database there is collection and under collection there is document

(async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
})();
const db = client.db(dbName); //accessing the database named 'PracticeProjects' using the db() method of the MongoClient instance.
const collection = db.collection('PasswordManager'); //collection name 
// and here we are accessing the 'PasswordManager' collection within the 'PracticeProjects' database using 
// the collection() method of the db instance.
//*******************************************************MongoDB******************************************************************/



//ARTICLE FOR UNDERSTANDING REQ AND RES: https://dev.to/pravinjadhav/understanding-request-and-response-in-nodejs-backend-g12

// getting all data from DB
app.get('/', async (req, res) => {
  // data = await collection.find();
  data = await collection.find({}).toArray(); 
  //here find() method helps to retrieve all documents from the collection. 
  //We can also specify a query inside the find() method to filter the results based on certain criteria. 
  //Leaving the query empty (find()) or empty query (find({})) will return all documents in the collection.
  // the find() method returns a cursor, which is an object that allows you to iterate over the results of the query.
  // The toArray() method is used to convert the cursor returned by find() into an array of documents, which can then be sent as a response to the client.

  //.find() won't return the actual data, it will return a cursor object that can be used to iterate over the results.
  //a cursor is a pointer to the result set of a query. 
  // It allows you to iterate through the results one at a time, which 
  // can be more efficient than retrieving all the data at once, especially for large datasets.
  //and then when we do .toArray() after .find(), it will convert the cursor into an array of documents, which 
  // can be easily manipulated and sent as a response to the client.
  // And so the pointer will turn into the actual data that we want to retrieve from the database.
  console.log(data); //the data has a type of array because we used .toArray() method.
 //to convert it into json format we can use JSON.stringify(data) and then send it to the client.
  res.send(JSON.stringify(data)); 
  //The server will give response after the client sends a GET request to the root URL ("/").
  //all the data will be fetched and will be shown in the root / trail of the url
  //the json.stringify() method is used to convert the JavaScript object (in this case, the data retrieved from the database) 
  //into a JSON string format, which can be easily sent as a response to the client.
  
})



//saving data to DB
app.post('/', async (req, res) => {
/*
const id=await collection.insertOne({site:"google.com", psswd:"1234"}); //it will insert this object into the collection and return an object that contains the insertedId, which is the unique identifier for the newly inserted document in the MongoDB collection.
console.log(id.insertedId);
res.send('Data inserted successfully with id', id.insertedId) //we can access the insertedId property of the id object to get the unique identifier of the newly inserted document and send it as part of the response to the client.;
*/
//The above one was for testing purpose but we have to send the request using body by the request parameter and 
//then we will insert that data into the database and then send the response to the client.
 
const id = await collection.insertOne(req.body) 
//this will insert the data that we send in the body of the POST request into the MongoDB collection using PostMan or API. 
//The req.body will contain the data that we want to insert into the database, and the insertOne() method will add that data as 
//a new document in the collection.

/*
---------------------------------------------------------------------------------------------------------------------------------------
_______________________________________REGARDING REQUEST/RESPONSE CONCEPT______________________________________________________________
NOTE: Meanwhile the bodyparser middleware is used to take request body and parse it into JSON format and then we can 
access that data using req.body in our route handler.
Otherwise, if we don't use bodyParser middleware, then the req.body will be undefined and we won't be able to access the 
data sent in the request body because it won't be parsed into a usable format. Parsing is necessary to convert the raw data 
from the request body into a format that can be easily used in our application, such as JSON.
----------------------------------------------------------------------------------------------------------------------------------------
NOTE2: Even if app.post((req, res) => {}) were to be empty even still it would send post. If we were to send data inside body even if 
with empty app.post((req, res) => {}). Cuz the body is stored in request. we can console.log the req.body by parsing 
inside res.send() (i.e. res.send(req.body);). 
Untill and unless we are sending the req.body to the database we can't send the data to the database besides using 
inside res.send(req.body);
---------------------------------------------------------------------------------------------------------------------------------------
*/
res.send("Data inserted successfully with id: " + id.insertedId);
//after successfully POST request the server will give a response to the client so we use response
})


//Deleting data from DB
app.delete('/del', async (req, res) => { 
//in order to delete data , we send a query to the deleteOne() method of the collection, 
//which specifies the criteria for selecting the document to delete.
const query = req.body; 
//the query is an object that specifies the criteria for selecting the document to delete. 
//for example, const query = { site: "google.com" }; will delete the document that has the site field equal to "google.com".
const info = await collection.deleteOne(query); 
//the deleteOne() method will delete the first document that matches the 
//query criteria and return an object that contains information about the deletion operation, 
//including the deletedCount property, which indicates how many documents were deleted.
console.log("Items deleted:", info.deletedCount)
res.send("Data deleted successfully. Number of items deleted: " + info.deletedCount);
/*
NOTE: We have used /del in the route instead of / because in the root route (/) the handler is already giving 
res.send() which is displayed in the browser but when in the same route (/) we wabt to give response using res.send()
for delete request, then it is conflicting and the res.send() of the delete request is not shown, only the res.send() of
the get request is shown.
Also if we were to remove the res.send() from the delete request then that was also possible and works perfectly and also we can do 
console.log.The only diff is that now it no longer gives any response.
And also if it doesn't give any response then while testing in postman then the postman will wait for the request to accomplish
for indefinite amount of time. So we added this /del route instead of using the root route (/) which although we could but then we
would have to remove the res.send() from the delete request due to the fact that the get request is also doing res.send().
Or we could keep the route as root and would not care about what is shown in the res.send() on the browser and so it would give res.send()
in the postman without any problem for both get and delte request from postman. For that simply change the /del in the app.delete() and
test it in the postman.
*/
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})








