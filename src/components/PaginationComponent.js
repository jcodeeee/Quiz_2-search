const PaginationComponent = ({prevPage, nextPage, changeCurrPage, getPaginationNumbers, currentPage}) => {
    return (
        <ul className="flex gap-2 justify-center sm:py-0 text-sm sm:text-lg">
            <li>
                <div
                    onClick={prevPage}
                    className="cursor-pointer px-3 py-1 rounded text-pink-400">
                    {'<'} Prev
                </div>
            </li>
            {getPaginationNumbers().map((n, i) => (
                <li key={i}>
                    {typeof n === "number" ? (
                        <div
                            onClick={() => changeCurrPage(n)}
                            className={`cursor-pointer px-3 py-1 border border-pink-400 rounded ${
                                currentPage === n
                                    ? "bg-pink-500 text-white"
                                    : "bg-pink-900 text-pink-400"
                            }`}>
                            {n}
                        </div>
                    ) : (
                        <span className="px-3 py-1 text-pink-500">{n}</span>
                    )}
                </li>
            ))}
            <li>
                <div
                    onClick={nextPage}
                    className="cursor-pointer px-3 py-1 text-pink-400 rounded">
                    Next {'>'}
                </div>
            </li>
        </ul>
    );
};

export default PaginationComponent;
