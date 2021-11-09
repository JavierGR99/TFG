import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react';


function SearchBarApartaments() {
    const [data, setData] = useState({ hits: [] });
    const [query, setQuery] = useState('');
    const [url, setUrl] = useState(
        'http://localhost:5000/api/apartments/',
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);

            try {
                const result = await axios(`http://localhost:5000/api/apartments/=${query}`)

                setData(result.data);
            } catch (error) {
                setIsError(true);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [query]);
    //,[query]


    return (
        <Fragment>
            <form onSubmit={event => {
                setUrl(`https://expenses-dev.realbooking.net/api/search/properties?term=${query}`);

                event.preventDefault();
            }}>
                <div className="searchInputs flex flex-nowrap max-w-min my-3 py-3 border-2 border-blue-400 rounded-full p-4">
                    <input type="text"
                        value={query}
                        placeholder="Search apartament..."
                        onChange={event => setQuery(event.target.value)}
                        className="outline-none" />
                    {/* <button type="submit" style="">
                    SEARCH
                </button> */}
                    <div className="searchIcon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>



            </form>


            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <div className="searchResults rounded flex flex-col border-2 border-blue-400 bg-white overflow-hidden overflow-y-auto h-32">

                    {
                        Object.entries(data).map(item => (
                            <div>
                                <option value={[item[1]]} className="w-max px-2 py-1 m-1 cursor-pointer " >{item[1]}</option>

                            </div>

                        ))
                    }
                </div>
            )}







        </Fragment>
    );
}

export default SearchBarApartaments
