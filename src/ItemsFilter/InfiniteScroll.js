import { useState, useEffect, useCallback } from 'react';
import axios from 'axios'

const InfiniteScroll = ({ setPage, page, originalHotelData, setHotelData, setOriginalHotelData }) => {
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState('')

    const handleScroll = async () => {
        try {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight

            ) {
                setPage((prev) => prev + 15)
                throttledGetRestaurantMore()
                // throttledFetchMoreData();   // if throttled then use this function, otherwise can directly use fetchMoreData()
            }
        } catch (error) {
            console.log(error)
        }
    };

    const throttle = (func, delay) => {
        let lastCall = 0;
        return function (...args) {
            const now = new Date().getTime();
            if (now - lastCall >= delay) {
                lastCall = now;
                func(...args);
            }
        };
    };
    // const throttledGetRestaurantMore = throttle(getRestaurantMore, 5000);
    const throttledGetRestaurantMore = useCallback(throttle(getRestaurantMore, 5000), []);
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [page, throttledGetRestaurantMore]);

    async function getRestaurantMore() {
        setLoading(true);

        try {
            const response = await fetch(
                'https://www.swiggy.com/dapi/restaurants/list/update',
                {
                    method: 'POST', // Use POST for fetching more restaurants
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any additional headers here
                    },
                    body: JSON.stringify({
                        lat: 12.9715987,
                        lng: 86.73296984285116,
                        nextOffset: 'COVCELQ4KICAkcKjpOn/ZDCnEzgC', // Use the correct nextOffset value,
                        page_type: "DESKTOP_WEB_LISTING",
                        // Other payload parameters if needed
                        seoParams: {
                            apiName: "FoodHomePage",
                            pageType: "FOOD_HOMEPAGE",
                            seoUrl: "https://www.swiggy.com/",
                        },
                        widgetOffset: {
                            // Include your widgetOffset values here
                            NewListingView_Topical_Fullbleed: '',
                            NewListingView_category_bar_chicletranking_TwoRows: '',
                            NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
                            Restaurant_Group_WebView_SEO_PB_Theme: '',
                            collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "10",
                            inlineFacetFilter: '',
                            restaurantCountWidget: '',
                            // collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: String(page),
                        },
                    }),
                }
            );
            const data = await response.json();
            if (originalHotelData) {
                let newRestaurants = data.data.cards[0].card.card.gridElements.infoWithStyle.restaurants;
                setHotelData((prevRestaurants) => [...prevRestaurants, ...newRestaurants]);
                setOriginalHotelData((prevRestaurants) => [...prevRestaurants, ...newRestaurants]);
            }
        } catch (error) {
            setErr("Not able to update the additional Restaurants...")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>

        </div>
    )
}

export default InfiniteScroll