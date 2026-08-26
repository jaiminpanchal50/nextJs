// export interface ApiResponse<T> {  // we dont know what type of data will be come so we use generic type it means which type of data will come automatically or it will adapt to the type of data that will come from the server.
export interface ApiResponse {
    success: boolean,
    message: string,
    // data?: T, // we have to ignore the any and unkonwn types in ts so in that case we use generic types. like <T> this <T> is just a placeholder for any type that we want to use in our code. In the api response we are not sure about the type of the data that we are going to receive from the server so we use generic types. for that create a file and store this interface in that file for future use or just use it here only.`
    data?: object,
    error?: string,
    // status: number,   // here we are not making it optional because we are always going to return the status code with the response 
    // we are not adding status in this api response coz its already being returned from the NextResponse.json({status: 200})

}