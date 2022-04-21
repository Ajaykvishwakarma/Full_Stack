// const mongoose = require('mongoose')
// // const mongoDB = "mongodb://localhost:27017/apartmentManagement-2"
// const mongoDB = `mongodb+srv://ajay1234:ajay1234@cluster0.0ezl5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

// module.exports = ()=>mongoose.connect(mongoDB)


const mongoose = require('mongoose')
// const mongoDB = "mongodb://localhost:27017/apartmentmanagement";
const mongoDB = `mongodb+srv://ajay1234:ajay1234@cluster0.0ezl5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

module.exports = ()=>mongoose.connect(mongoDB)


// const mongoose = require("mongoose");

// const connect = () => {
//   return mongoose.connect(
//     "mongodb+srv://ajay:ajay@cluster0.1a6qo.mongodb.net/appartment?retryWrites=true&w=majority"
//   );
// };

// module.exports = connect;

