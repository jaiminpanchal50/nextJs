## In typescript always you have to install the types of the packages like mongoose, jsonwebtoken, etc
 - npm i mongoose jsonwebtoken bcryptjs
 - types :- npm i @types/mongoose @types/jsonwebtoken @types/bcryptjs

# Next js project setup 
## Inside the app created a folder called api and create other routes folder inside that folder
## folder structure is like :- app -> api -> auth -> [route name] -> route.ts (or) route.js
## route.js file is the api or server api file we can access it using http://localhost:3000/api/auth/[route name]
## inside the route.js file we use request handler functions like GET, POST, PUT, DELETE, PATCH, etc.
## after this we create models,middlewares,lib and types folder inside the src folder
## models is used to define the structure of the data or documents that we are going to store in the database
## middlewares is used to pre-process the request or response
## lib is used to store the reusable code or functions or server code that we can use in different places also mongoDb connection, jwt utils, etc
## types is used to store the types of the variables that we are going to use in the code

## in any project after the db connection we create models

## Before creating the schema create a Document interface that will define the structure of the schema and use it in the schema
## inside types folder create a file for which model types you want to store

```typescript
interface IUser { // inshort this interface gives you the idea other field from outside of this interface gives error.
    _id: string, // you have to provide this because mongodb automatically creates a _id field for each document and it is the primary key for the documents. or you can use mongoose.Schema.Types.ObjectId which is also good and this will also work.
    name: string,
    email: string,
    password: string,
    mobile: string,
    createdAt?: Date, // you can optionalize this if user is not passing the value. It will take the current date and time automatically. If you dont 
    updatedAt?: Date,
}
export default IUser

import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUser>({ // we have passed the IUser interface for accepting only those value which mentioned in that IUser interface
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User
```
