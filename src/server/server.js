const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const existingData = JSON.parse(fs.readFileSync('./data.json'));
app.use(cors());
app.use(express.json()); // Parse JSON request bodies thid called meddileWare

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/', (req, res) => {
  try {
    const newData = req.body; // Received data
    let newId = existingData[existingData.length - 1].id + 1


    const newTask = Object.assign({ id: newId }, newData)  // combine two objects together

    existingData.push(newTask)

    fs.writeFile('./data.json', JSON.stringify(existingData), (err) => {
      if (err) {
        res.status(500).send('Server Error');
      }
      else {
        res.status(200).json(existingData);
      }
    })
    // fs.readFile('./data.json', (err, data) => {
    //   if (err) {
    //     res.status(500).send('Server Error');
    //   } else {
    //     // the data variable holds the existing data from the data.json file. 
    //     // const existingData = JSON.parse(data); // convert the data to an object and assign it to existingData
    //     const updatedData = [...existingData, newData]; //combines the existing data with the new data received (newData) and assigns it to the updatedData variable.

    //     fs.writeFile('./data.json', JSON.stringify(updatedData), (err) => { //converting back the updated data from object to string
    //       if (err) {
    //         res.status(500).send('Server Error');
    //       } else {
    //         res.status(200).json(updatedData);
    //       }
    //     });
    //   }
    // });
  } catch (error) {
    res.status(400).send('Invalid JSON data');
  }
});

app.get('/', (req, res) => {
  fs.readFile('./data.json', (err, data) => {
    if (err) {
      res.status(500).send('Server Error');
    } else {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    }
  });
});

app.delete('/:id', (req, res) => {
  const id = req.params.id * 1
  // console.log(typeof (id))

  const taskDelete = existingData.find(el => el.id === id)
  const index = existingData.indexOf(taskDelete)

  existingData.splice(index, 1)

  fs.writeFile('./data.json', JSON.stringify(existingData), (err) => {
    if (err) {
      res.status(500).send('Server Error');
    }
    else {
      res.status(204).send(null);
    }
  })

  // res.send(taskDelete)
})

app.patch('/:id', (req, res) => {
  // res.send('donnnne')
  const id = req.params.id * 1
  const taskEdit = existingData.find(el => el.id === id)
  const index = existingData.indexOf(taskEdit)
  Object.assign(taskEdit, req.body)
  existingData[index] = taskEdit;

  fs.writeFile('./data.json', JSON.stringify(existingData), (err) => {
    res.status(200).json(existingData)
  })

})

// test :
// Implement a route for the endpoint /trainees that returns the HTML page.

// app.get('/trainees', (req, res, data) => {
//   //send string 
//   // let traineeNames = "John Doe\nJane Smith";
//   // return res.end("Trainees:\n" + traineeNames + "\n");
//   // res.writeHead(200, { 'Content-Type': 'text/html' })
//   // res.end(data)


//   fs.readFile('./test.html', (err, data) => {
//     if (err) {
//       res.writeHead(500, { 'Content-Type': 'text/plain' });
//       res.end('Internal Server Error');
//     } else {
//       res.writeHead(200, { 'Content-Type': 'text/html' });
//       res.end(data);
//     }
//   });
// })

app.listen(8080, () => {
  console.log(`Server running at http://localhost:8080`);
});
