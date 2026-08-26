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
export interface IUser { // inshort this interface gives you the idea other field from outside of this interface gives error.
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

# Generic Type
```typescript
// Note: Generic version (ApiResponse<T>) is the ideal approach — we dont know what type of data will come so we use generic type, it means which type of data will come automatically or it will adapt to the type of data that will come from the server.
// <T> abhi muje iska type pata nahi h so jis type ka data aayega usi ka type le lena
// interface ApiResponse<T> {
//     success: boolean,
//     message: string,
//     data: T, // we have to ignore the any and unkonwn types in ts so in that case we use generic types. like <T> this <T> is just a placeholder for any type that we want to use in our code. In the api response we are not sure about the type of the data that we are going to receive from the server so we use generic types. for that create a file and store this interface in that file for future use or just use it here only.`
//     // unkown or any jitna ignore kar pao utna karo
//     statusCode?: number,
//     error?: string,
// }

// Actual version used in project (simplified, non-generic):
export interface ApiResponse {
    success: boolean,
    message: string,
    data?: object, // unkown or any jitna ignore kar pao utna karo — here we used object type instead of generic <T> for simplicity
    error?: string,
    // status: number,   // here we are not making it optional because we are always going to return the status code with the response
    // we are not adding status in this api response coz its already being returned from the NextResponse.json({status: 200})
}
export default ApiResponse
```

## when you create any route handler in app folder you always have to pass the connectDB fnc in that route handler
```typescript

export async function POST(req: NextRequest) { // NextRequest is used to get the values or parameters from the client or browser for POST , PUT , PATCH , DELETE
    // IMPORTANT: In Next.js App Router, route handler functions MUST be exported with the `export` keyword, otherwise Next.js won't recognize them as route handlers.

    try {
        await connectDB()  // always you have to pass the connectDb fnc in any api route

        const body: RegisterBody = await req.json() // RegisterBody is the interface for the user data that we are going to receive from the frontend.   we get the value from the req.json()

        const { name, mobile, email, password } = body // destructuring the body

        if (!name || !email || !password) { // checking if the user has provided all the fields
            return NextResponse.json<ApiResponse>(    // NextResponse is used to return the response to the client or browser.
                // it returns JSON data in the form of 
                {
                    success: false,
                    message: "All fields are required"
                }, { status: 400 })
        }

        const userExists = await User.findOne({ email }) // checking if the user already exists
        if (userExists) {
            return NextResponse.json<ApiResponse>({ success: false, message: "User already exists" }, { status: 409 })
        }

        const user = await User.create({ name, email, password, mobile })

        let token = generateToken({ userId: user._id, email: user.email })
        console.log(token)



        const res = NextResponse.json<ApiResponse>({
            success: true, message: "User registered successfully", data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            }
        }, { status: 201 })

        res.cookies.set('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 // maxAge is in SECONDS not milliseconds — 60 * 60 = 3600 seconds = 1 hour. Writing 60 * 60 * 1000 would mean 3,600,000 seconds (~41 days) which is wrong.
        })

        return res

    } catch (error) {
        console.log('error in register api', error)
        return NextResponse.json({ error: "Internal server error", success: false }, { status: 500 })
    }
}
```

    