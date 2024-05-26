import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { doctors } from '../Features/doctorsSlice';
import axios from 'axios';

function SearchComponent({ data }) {
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState('');
    const filterDoctor = useSelector((state) => state.filterDoctor);

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchClick = () => {
        console.log(data);
        axios.post('http://localhost:5010/api/v1/algolia/search', {
            searchText: searchInput,
            data: data.doctors,
            datework: filterDoctor.datework,
            scheduleTypeId: filterDoctor.scheduleTypeId,
        })
            .then((res) => {
                dispatch(doctors(res.data));
            })
    };

    return (
        <div style={{ width: "100%" }}>
            <div className="input-group">
                <input
                    id="search-input"
                    type="search"
                    className="form-control"
                    placeholder="Tìm kiếm theo mô tả bệnh ..."
                    aria-label="Search"
                    value={searchInput}
                    onChange={handleInputChange}
                />
                <div className="input-group-prepend">
                    <button
                        id="search-button"
                        className="btn btn-primary"
                        type="button"
                        onClick={handleSearchClick}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchComponent;
