import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import axios from 'axios'
import FilterModalPage from './FilterModalPage';

const FilterOptions = ({isGreaterThan600, setISGreaterThan600, setIslessThan300, setBetween300To500, filterMenuData, setFilterModalOpen, isFilterModalOpen, setIsLessThan30, setLessThan45, handleLessThan30, handleLessThan45, isLessthan30, isLessthan45, handlelessThan300, handleBetween300To500, setSelectedOption, isLessthan300, isBetween300To500, selectedOption }) => {
    const [sortByfield, setSortByField] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectOption = (e, option) => {
        console.log('option', option)
        e.preventDefault()
        setSelectedOption(option);
        setIsOpen(false);

    };
    const handlesortByField = () => {
        console.log(sortByfield)
        setSortByField(!sortByfield)
    }

    const handlePureVeg = async () => {
        let parameters =
        {
            collection: "83655",
            facets: { isVeg: [{ value: 'isVegfacetquery3' }] },
            filters: "",
            isFiltered: true,
            lat: 22.5799975,
            lng: 88.4863991,
            page_type: null,
            sortBy: "",
            tags: "layout_CCS_Cake",
            type: "rcv2",
            _csrf: "wJbyxTZHBJUA-4ch-o2NaDbzdFw4b2Gq0yptn4D8"
        }
        try {
            const response = await axios.post('https://www.swiggy.com/dapi/restaurants/list/update', parameters)
            console.log(response)

        }
        catch (error) {
            console.log(error)
        }
    }

    const handleFilterModal = () => {
        console.log(isFilterModalOpen)
        setFilterModalOpen(!isFilterModalOpen)
    }

    return (

        <div className="filter">
            <div>{isFilterModalOpen &&
                <FilterModalPage
                    setSelectedOption={setSelectedOption}
                    selectedOption={selectedOption}
                    filterMenuData={filterMenuData}
                    handleFilterModal={handleFilterModal}
                    isLessthan30={isLessthan30}
                    isLessthan45={isLessthan45}
                    setIsLessThan30={setIsLessThan30}
                    setLessThan45={setLessThan45}
                    setIslessThan300={setIslessThan300}
                    setBetween300To500={setBetween300To500}
                    setISGreaterThan600={setISGreaterThan600}
                />
            }
            </div>
            <div>
                <button onClick={handleFilterModal} className=''>Filter<TuneRoundedIcon /> </button>
                <button className={`dropdown`} onClick={handleToggleDropdown}>
                    <div className="dropdown-toggle" >
                        <span>{selectedOption ? selectedOption.title : 'sortBy'}</span>
                        <KeyboardArrowDownIcon />
                    </div>
                    {isOpen && (
                        <div className="dropdown-menu">
                            {filterMenuData?.sortConfigs?.map((option) => (
                                <div
                                    key={option.key}
                                    className="dropdown-option"
                                    onClick={(e) => handleSelectOption(e, option)}
                                >
                                    {option.title}
                                </div>
                            ))}
                        </div>
                    )}
                </button>
                <button onClick={handlePureVeg}>Pure Veg</button>
                <button onClick={handleLessThan30} className={`${!isLessthan30.status ? '' : 'button-colored'} `}> Less than 30 mins</button>
                <button onClick={handleLessThan45} className={`${!isLessthan45.status ? '' : 'button-colored'} `}> Less than 45 mins</button>
                <button onClick={handlelessThan300} className={`${!isLessthan300 ? '' : 'button-colored'} `}>less than Rs.300</button>
                <button onClick={handleBetween300To500} className={`${!isBetween300To500 ? '' : 'button-colored'} `}>Rs.300-Rs.600</button>
                <button onClick={() => setISGreaterThan600((prev) => !prev)} className={`${!isGreaterThan600 ? '' : 'button-colored'} `}>Greater than 600</button>


            </div>
        </div>
    )
}
export default FilterOptions