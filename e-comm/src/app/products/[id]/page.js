

const page = async ({ params }) => {
    const { id } = await params

    console.log(id)
    return (
        <div>
            <h1>product details page</h1>
        </div>
    )
}

export default page