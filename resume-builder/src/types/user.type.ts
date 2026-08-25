export interface IUser { // inshort this interface gives you the idea other field from outside of this interface gives error.
    _id: string, // you have to provide this because mongodb automatically creates a _id field for each document and it is the primary key for the documents. or you can use mongoose.Schema.Types.ObjectId which is also good and this will also work.
    name: string,
    email: string,
    password: string,
    mobile: string,
    createdAt?: Date, // you can optionalize this if user is not passing the value. It will take the current date and time automatically. If you dont 
    updatedAt?: Date,
}

export interface RegisterBody { // in regiseter we are not adding the _id because from the frontend we are not accepting the _id we receving the data from the user input fields from the form so we are not providing the _id in the register body or interface.
    name: string,
    mobile: string,
    email: string,
    password: string,
}

export interface LoginBody { // in login we are not adding the _id because from the frontend we are not accepting the _id we receving the data from the user input fields from the form so we are not providing the _id in the login body or interface.
    email: string,
    password: string,
}


export interface JWTPayload { // for generating the token we are using this interface
    userId: string, // this is used as user id in the token that will be used for authentication and authorization. or instead of this you can use _id if you want
    email?: string,
}



