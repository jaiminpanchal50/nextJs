// skeleton loading
export default function ProductCardSkeleton() {
    const skeletons = Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="border rounded-xl p-4 shadow-sm bg-white animate-pulse">
            {/* Image */}
            <div className="w-full h-52 bg-gray-200 rounded-lg" />

            {/* Title */}
            <div className="h-5 bg-gray-200 rounded mt-4 w-full" />
            <div className="h-5 bg-gray-200 rounded mt-2 w-3/4" />

            {/* Category */}
            <div className="h-4 bg-gray-200 rounded mt-4 w-1/3" />

            {/* Description */}
            <div className="h-4 bg-gray-200 rounded mt-3 w-full" />
            <div className="h-4 bg-gray-200 rounded mt-2 w-4/5" />

            {/* Price + Rating */}
            <div className="flex justify-between items-center mt-5">
                <div className="h-6 bg-gray-200 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
        </div>
    ));

    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{skeletons}</div>;
}