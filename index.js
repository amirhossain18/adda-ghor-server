

const express = require('express')
const cors = require("cors");
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const ImageKit = require('imageKit');
app.use(cors());
app.use(express.json());
// user: bondshawon18
// pass: qBovA1YCep8VJEq0
const uri = "mongodb+srv://bondshawon18:qBovA1YCep8VJEq0@cluster0.bnfdzmb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri)
      



async function run(){
    try {
        const userCollection= client.db("Adda_Ghor").collection("users");
        const postCollection= client.db("Adda_Ghor").collection("post")

        
        app.post("/users", async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            console.log(user);
            res.send(result);
          });

          app.post("/post", async(req, res)=>{
            const post= req.body;
            console.log(post)
            const postItem= await postCollection.insertOne(post);
            
            res.send(postItem);
          })
        
   app.get('/post' ,async(req, res)=>{
    const query = {}
    const cursor= postCollection.find(query)
    const post= await cursor.toArray()
    res.send(post)
   })
 

 
    }
    finally {

    }
}

run().catch((error) => console.log(error));

app.get('/', (req, res)=>{
    res.send('hellow new server ok')
});







app.listen(port, ()=>{
    console.log(`your server running: ${port}`)
})