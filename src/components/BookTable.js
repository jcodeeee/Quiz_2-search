const BooksTable = ({ handleAuthorSearch, handleYearSort, selectedSortOption, data, currentPage, postsPerPage }) => {
    return (
        <div className="overflow-x-auto rounded-lg">
            <table className="border border-pink-600 w-full text-center text-sm text-pink-300" id="table">
                <thead className="bg-pink-600 font-medium text-center text-lg text-white">
                    <tr>
                        <th className="px-4 py-2 tracking-wider text-center">
                            S. No.
                        </th>
                        <th className="px-4 py-2 text-center tracking-wider">
                            <p className="mb-1 text-sm">Author Name</p>
                            <div className="flex items-center justify-center gap-2">
                                <input
                                    placeholder="Author Name"
                                    className="px-3 py-2 rounded-md w-32 bg-pink-800 text-center text-xs text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    id="authorName"
                                />
                                <button
                                    className="bg-pink-700 hover:bg-pink-600 px-4 py-2 rounded-md text-white text-xs focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    onClick={handleAuthorSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </th>
                        <th className="px-4 py-2 text-center tracking-wider">
                            Ratings Average
                        </th>
                        <th className="px-4 py-2 text-center tracking-wider">
                            Subject
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-pink-800">
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-pink-900 bg-opacity-20" : ""}
                        >
                            <td className="border border-none px-3 py-2 text-pink-100" contentEditable="true">
                                {index + 1 + (currentPage - 1) * postsPerPage}
                            </td>
                            <td className="border border-none px-3 py-2 text-pink-100" contentEditable="true">
                                {item.author_name?.[0] || "N/A"}
                            </td>
                            <td className="border border-none px-3 py-2 text-pink-100" contentEditable="true">
                                {item.ratings_average ? item.ratings_average.toFixed(1) : "N/A"}
                            </td>
                            <td className="border border-none px-3 py-2 text-pink-100" contentEditable="true">
                                {Array.isArray(item.subject) ? item.subject.slice(0, 3).join(", ") : "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BooksTable;
