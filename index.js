const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());

const url =
  //   "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
  "mongodb+srv://kalyani:kalyani22@cluster0.akrdx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
async function run() {
  try {
    await client.connect();
    const database = client.db("testing1");
    const usercollection = database.collection("student");
    app.get("/student", async (req, res) => {
      const abc = usercollection.find({});
      const user = await abc.toArray();
      res.send(user);
    });
    app.post("/abcd", async (req, res) => {
      const newdata = req.body;
      console.log("newdata", newdata);
      // console.log(req);
      const result = await usercollection.insertOne(newdata);

      res.json("Data added successfully");
    });
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      console.log("id", id);
      const result = await usercollection.deleteOne(query);
      if (result.deletedCount === 1) {
        res.json("Data Deleted successfully");
      } else {
        res.json("Something went wrong");
      }
      console.log("result", result);
    });

    app.put("/update/:id", async (req, res) => {
      const id = req.params.id;
      const filter = {
        _id: ObjectId(id),
      };
      const newdata = req.body;
      const option = { upscrt: true };
      const update = {
        $set: {
          name: newdata.name,
          age: newdata.age,
        },
      };
      const result = await usercollection.updateOne(filter, update, option);
      console.log("result", result);
      if (result.modifiedCount === 1) {
        res.json("data updated succcessfully");
      } else {
        res.json("something  wrong");
      }
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(port, (req, res) => {
  console.log("server start");
});
