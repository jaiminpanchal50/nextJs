console.log("hii")

let a: number = 10
// a = "jk"

console.log(a)


// arr
let arr: number[] = [1, 2, 3]
arr.push("sd")
console.log(arr)

// tuples
let newArr: [string, string] = ["jk", "jk"] // if u pass the 2 tuple in tuple then u justhave to pass atleast 2 value not 3
// newArr.push(1) // this will give error
console.log(newArr)

// objects
let obj: { name: string, age: number } = { name: "jk", age: 10 }
obj.age = "jk" // this will give error
console.log(obj)

// enum
enum Roles {
    admin,
    user,
    moderator
}
let newRole: Roles = Roles.admin
console.log(newRole)

// any | unkonwn | never diff and example

// in any we pass any type of data but it will not give error
let any: any = 10
any = "jk"
any = true
any = []
console.log(any)

// in unknown we pass any type of data but it will give error when we try to perform any operation on it
let unknown: unknown = 10
unknown = "jk"
unknown = true
unknown = []
console.log(unknown)

// in never we pass any type of data but it will give error when we try to perform any operation on it and also it will not accept any type of data also 
let never: never = 10
never = "jk"
never = true
never = []
console.log(never)
