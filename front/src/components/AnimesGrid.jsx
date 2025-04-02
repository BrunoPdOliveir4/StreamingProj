const AnimesGrid = () =>{
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Example anime cards */}
            {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-bold">Anime Title {index + 1}</h2>
                    <p className="text-gray-600">Description of the anime goes here.</p>
                </div>
            ))}
        </div>
    )
}
export default AnimesGrid;