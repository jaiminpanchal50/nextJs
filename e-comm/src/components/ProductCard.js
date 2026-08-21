import Link from "next/link";

export default function ProductCard({ product }) {
    return (
        <div className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition bg-white">
            <Link href={`/products/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-52 object-contain"
                />
            </Link>

            <h2 className="font-semibold text-lg mt-4 line-clamp-2">
                {product.title}
            </h2>

            <p className="text-sm text-gray-500 mt-2 capitalize">
                {product.category}
            </p>

            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {product.description}
            </p>

            <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-lg">
                    ${product.price}
                </span>

                <span className="text-sm">
                    ⭐ {product.rating.rate}
                </span>
            </div>
        </div>
    );
}