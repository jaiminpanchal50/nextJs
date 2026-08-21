import ProductCard from "@/components/ProductCard"


const page = async () => {

    let res = await fetch('https://fakestoreapi.com/products')
    let data = await res.json()
    console.log(data)

    return (
        <div className="container mx-auto">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                {data.map((product) => {
                    return (
                        <ProductCard key={product.id} product={product} />
                    )
                })}

            </div>
        </div>
    )
}

export default page