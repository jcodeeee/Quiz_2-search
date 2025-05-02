import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import CreateCSV from "./CreateCSV";
import DashboardText from "./DashboardText";
import BooksTable from "./BookTable";
import PaginationComponent from "./PaginationComponent";
import RecordsPerPage from "./RecordsPerPage";

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const npage = Math.ceil(totalRecords / postsPerPage);
    const [isLoading, setIsLoading] = useState(true);
    const [api1, setApi1] = useState(
        "https://openlibrary.org/search.json?q=random&fields=author_key,ratings_average,author_name,title,subject"
    );
    const [authorName, setAuthorName] = useState("random");
    const [yearSort, setYearSort] = useState("default");
    const [selectedSortOption, setSelectedSortOption] = useState("default");

    const fetchData = useCallback(() => {
        setIsLoading(true);

        const limit = postsPerPage;
        const offset = (currentPage - 1) * postsPerPage;

        axios
            .get(`${api1}&limit=${limit}&offset=${offset}`)
            .then((response) => {
                const books = response.data.docs;
                setTotalRecords(response.data.numFound);

                setData(books); // No extra API call for authors anymore
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(`Error while fetching data: ${error}`);
                setIsLoading(false);
            });
    }, [currentPage, postsPerPage, api1]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < npage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const changeCurrPage = (n) => {
        setCurrentPage(n);
    };

    const handlePostsPerPageChange = (event) => {
        setPostsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const getPaginationNumbers = () => {
        const delta = 1;
        const range = [];
        range.push(1);
        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
            if (i >= 2 && i <= npage - 1) {
                range.push(i);
            }
        }
        range.push(npage);

        return range;
    };

    const handleYearSort = (event) => {
        const year = event.target.value;
        setSelectedSortOption(year);
        setYearSort(year);

        if (year === "default" && year !== "Sort") {
            setApi1(
                `https://openlibrary.org/search.json?q=${authorName}&fields=author_key,ratings_average,author_name,title,subject`
            );
        } else if (year !== "Sort") {
            setApi1(
                `https://openlibrary.org/search.json?q=${authorName}&fields=author_key,ratings_average,author_name,title,subject&sort=${year}`
            );
        }
        setCurrentPage(1);
    };

    const handleAuthorSearch = () => {
        const name = document.getElementById("authorName").value;
        setAuthorName(name);

        if (yearSort === "default") {
            setApi1(
                `https://openlibrary.org/search.json?q=${name}&fields=author_key,ratings_average,author_name,title,subject`
            );
        } else {
            setApi1(
                `https://openlibrary.org/search.json?q=${name}&fields=author_key,ratings_average,author_name,title,subject&sort=${yearSort}`
            );
        }
        setCurrentPage(1);
    };

    return (
        <div className="px-4 sm:px-5 bg-pink-900 min-h-screen">
            <DashboardText />

            <div className="py-10">
                {isLoading ? (
                    <ReactLoading type="bars" color="#f9a8d4" className="mx-auto top-[30vh] relative" />
                ) : (
                    <div>
                        <BooksTable {...{ handleAuthorSearch, handleYearSort, selectedSortOption, data, currentPage, postsPerPage }} />

                        <div className="flex items-center justify-around flex-col md:flex-row gap-5 pt-10">
                            <PaginationComponent {...{ prevPage, nextPage, changeCurrPage, getPaginationNumbers, currentPage }} />

                            <CreateCSV />

                            <RecordsPerPage {...{ postsPerPage, handlePostsPerPageChange }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
