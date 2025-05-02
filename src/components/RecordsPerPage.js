const RecordsPerPage = ({ postsPerPage, handlePostsPerPageChange }) => {
    return (
        <div className="flex justify-center sm:justify-end pb-10 sm:pb-0">
            <label className="mr-2 text-gray-400">Records per page:</label>
            <select
                name="record"
                value={postsPerPage}
                onChange={handlePostsPerPageChange}
                className="border border-pink-500 bg-pink-500 rounded px-2 py-1 text-white">
                <option value="5" className="bg-pink-500 text-white">5</option>
                <option value="10" className="bg-pink-500 text-white">10</option>
                <option value="50" className="bg-pink-500 text-white">50</option>
                <option value="100" className="bg-pink-500 text-white">100</option>
            </select>
        </div>
    );
};

export default RecordsPerPage;

