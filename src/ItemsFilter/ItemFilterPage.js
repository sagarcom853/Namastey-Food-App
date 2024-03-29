import { useSearchParams } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import LoadingComponent from "../utils/LoadingComponent";
import Hotelpage from "../Components/HotelPage";
import "./ItemFilterPage.css"
import FilterOptions from "./FilterOptions";

const FilterPage = () => {
    const [searchParams] = useSearchParams()
    const [headerData, setHeaderData] = useState([])
    const [filterMenuData, setFilteredMenuData] = useState([])
    const [textExplore, setTextExplore] = useState('')
    const [loading, setLoading] = useState(false)
    const [hotelData, setHotelData] = useState([])
    const [originalHotelData, setOriginalHotelData] = useState([])
    const [isLessthan30, setIsLessThan30] = useState({
        key: 'deliveryTimefacetquery2',
        status: false
    })
    const [isLessthan45, setLessThan45] = useState({
        key: 'deliveryTimefacetquery3',
        status: false
    })
    const [isLessthan300, setIslessThan300] = useState(false)
    const [isBetween300To500, setBetween300To500] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    const [isFilterModalOpen, setFilterModalOpen] = useState(false)
    const [isGreaterThan600, setISGreaterThan600] = useState(false)

    const tags = searchParams.get('tags')
    const collectionId = searchParams.get('collection_id')

    const fetchFilteredItemsData = async () => {
        let API = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&collection=${collectionId}&tags=${tags}&sortBy=&filters=&type=rcv2&offset=0&page_type=null`
        const response = await axios.get(API)
        setHeaderData(response?.data?.data?.cards[0]?.card?.card)
        setFilteredMenuData(response?.data?.data?.cards[1]?.card?.card)
        setTextExplore(response?.data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.text)
        handleHotelData(response)
        setLoading(false)
    }

    const handleHotelData = (response) => {
        let datainfo = []
        response && response.data?.data?.cards?.map((card) => {
            if (card?.card?.card?.info) {
                datainfo.push(card.card.card)
            }
        })
        if (datainfo && datainfo.length > 0) {
            setHotelData([...datainfo])
            setOriginalHotelData([...datainfo])
        }
    }

    const handleFilterButtons = () => {
        let filteredData = originalHotelData.filter(data => {
            switch (true) {
                case isLessthan30.status:
                    return Number(data.info.sla.deliveryTime) <= 30;
                case isLessthan45.status:
                    let deliveryValue = Number(data.info.sla.deliveryTime)
                    return deliveryValue >= 30 && deliveryValue <= 45
                case isLessthan300:
                    let cost300Value = Number(data.info.costForTwo.split(' ')[0].replace(/\D/gi, ''));
                    setBetween300To500(false)
                    return cost300Value <= 300;
                case isBetween300To500:
                    let cost500Value = Number(data.info.costForTwo.split(' ')[0].replace(/\D/gi, ''));
                    setIslessThan300(false)
                    return cost500Value >= 300 && cost500Value <= 500;
                case isGreaterThan600:
                    let value = Number(data.info.costForTwo.split(' ')[0].replace(/\D/gi, ''));
                    setIslessThan300(false)
                    setBetween300To500(false)
                    return value >= 600;
                default:
                    return true; // If no filters are selected
            }
        });
        setHotelData(filteredData);
    };

    const SortingFilter = () => {
        let sortedData = [...originalHotelData]
        if (selectedOption) {
            switch (selectedOption.key) {
                case "relevance":
                    setHotelData(sortedData)
                    break;
                case 'deliveryTimeAsc':
                    setHotelData([])
                    let sortedValue1 = sortedData.sort((a, b) => {
                        return a.info.sla.deliveryTime - b.info.sla.deliveryTime
                    })
                    setHotelData(sortedValue1)
                    break;
                case 'modelBasedRatingDesc':
                    setHotelData([])
                    let sortedValue2 = sortedData.sort((a, b) => {
                        return b.info.avgRating - a.info.avgRating
                    })
                    setHotelData(sortedValue2)
                    break;
                case 'costForTwoAsc':
                    setHotelData([])
                    let sortedValue3 = sortedData.sort((a, b) => {
                        let costA = a.info.costForTwo.split(' ')[0].replace(/\D/gi, '')
                        let costB = b.info.costForTwo.split(' ')[0].replace(/\D/gi, '')
                        return costA - costB
                    })
                    setHotelData(sortedValue3)
                    break;
                case 'costForTwoDesc':
                    setHotelData([])
                    let sortedValue4 = sortedData.sort((a, b) => {
                        let costA = a.info.costForTwo.split(' ')[0].replace(/\D/gi, '')
                        let costB = b.info.costForTwo.split(' ')[0].replace(/\D/gi, '')
                        return costB - costA
                    })
                    setHotelData(sortedValue4)
                    break;
                default:
                    setHotelData(sortedData)
                    break;
            }
        }
    }

    const handleLessThan30 = () => {
        let value = isLessthan30.status
        setIsLessThan30({ ...isLessthan30, status: !value })
        setLessThan45({ ...isLessthan45, status: false })
    }

    const handleLessThan45 = () => {
        let value = isLessthan45.status
        setLessThan45({ ...isLessthan45, status: !value })
        setIsLessThan30({ ...isLessthan30, status: false })
    }

    const handlelessThan300 = () => {
        setIslessThan300(!isLessthan300)
    }

    const handleBetween300To500 = () => {
        setBetween300To500(!isBetween300To500)
    }

    useEffect(() => {
        setLoading(true)
        fetchFilteredItemsData()
    }, [])

    useEffect(() => {
        handleFilterButtons()
    }, [isLessthan30, isLessthan300, isBetween300To500, isLessthan45, isGreaterThan600])

    useEffect(() => {
        SortingFilter()
    }, [selectedOption])

    if (loading) {
        return <LoadingComponent />
    }

    return (
        <div className={`filter-container`}>
            <div className="header-data">
                <h1 className="header-title">{headerData?.title}</h1>
                <p className="header-description">{headerData?.description}</p>
            </div>

            <div className="filter-notopac">
                <FilterOptions
                    handleFilterButtons={handleFilterButtons}
                    isLessthan30={isLessthan30}
                    handleLessThan30={handleLessThan30}
                    handleLessThan45={handleLessThan45}
                    isLessthan45={isLessthan45}
                    handlelessThan300={handlelessThan300}
                    handleBetween300To500={handleBetween300To500}
                    isLessthan300={isLessthan300}
                    isBetween300To500={isBetween300To500}
                    setSelectedOption={setSelectedOption}
                    selectedOption={selectedOption}
                    setIsLessThan30={setIsLessThan30}
                    setLessThan45={setLessThan45}
                    filterMenuData={filterMenuData}
                    isFilterModalOpen={isFilterModalOpen}
                    setFilterModalOpen={setFilterModalOpen}
                    setIslessThan300={setIslessThan300}
                    setBetween300To500={setBetween300To500}
                    setISGreaterThan600={setISGreaterThan600}
                    isGreaterThan600={isGreaterThan600}
                />
            </div>
            <div>
                {hotelData && hotelData.length > 0 && <Hotelpage RestaurantData={hotelData} collectionId={collectionId}
                    textExplore={textExplore}
                />}
            </div>
        </div>
    )
}

export default FilterPage
