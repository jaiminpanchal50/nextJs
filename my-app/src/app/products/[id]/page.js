

const page = async ({ params }) => {
    const { id } = await params;
    return (
        <div className="text-center py-10">
            <h1>Product -- {id}</h1>
            <p className="text-orange-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
        </div>

    );
};

export default page;