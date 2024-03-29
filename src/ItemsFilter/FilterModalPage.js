import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import Input from './Input';

const FilterModalPage = ({
    setIslessThan300,
    setBetween300To500,
    setISGreaterThan600,
    setIsLessThan30,
    setLessThan45,
    handleFilterModal,
    filterMenuData,
    selectedOption,
    setSelectedOption,
    isLessthan30,
    isLessthan45
}) => {
    const [selectedMenu, setselectedMenu] = useState('sortBy');
    const [checkedFiller, setCheckedFiller] = useState({
        cost: '',
        delivery: ''
    });
    const [deliveryArray, setDeliveryArray] = useState([])
    const [costArray, setCostArray] = useState([])
    const [isVegArray, setVegArray] = useState([])



    const handleSetId = (id) => {
        setselectedMenu(id);
    };

    const handleSortFilter = (e) => {
        const sortFilter = e.target.value;
        setSelectedOption(JSON.parse(sortFilter));
    };

    const createFacetArrays = () => {
        let isVegArray = filterMenuData.facetList[0].facetInfo.map((menu) => {
            return menu.id
        })

        console.log('isVegArray', isVegArray)
        setVegArray(isVegArray)

        const costArray = filterMenuData.facetList[1].facetInfo.map((menu) => {
            return menu.id
        })
        console.log('ccostarray', costArray)
        setCostArray(costArray)

        const DeliveryArray = filterMenuData.facetList[2].facetInfo.map((menu) => {
            return menu.id
        })
        setDeliveryArray(DeliveryArray)
        console.log('DeliveryArray', DeliveryArray)

    }
    const handleLessThanFilter = (e) => {
        const { value } = e.target;
        if (value === 'deliveryTimefacetquery2') {
            setIsLessThan30({ ...isLessthan30, status: true })
            setLessThan45({ ...isLessthan45, status: false })
        } else if (value === 'deliveryTimefacetquery3') {
            setIsLessThan30({ ...isLessthan30, status: false })
            setLessThan45({ ...isLessthan45, status: true })
        }
    };

    const handleDeliveryCostFilter = (e) => {
        const { value } = e.target;
        if (value === 'costForTwofacetquery3') {
            setISGreaterThan600(false);
            setIslessThan300(false);
            setBetween300To500(true);
            console.log(checkedFiller.cost, value)

            setCheckedFiller(prevState => ({ ...prevState, cost: value }));
        } else if (value === 'costForTwofacetquery4') {
            setISGreaterThan600(true);
            setIslessThan300(false);
            setBetween300To500(false);
            console.log(checkedFiller.cost, value)

            setCheckedFiller(prevState => ({ ...prevState, cost: value }));

        } else if (value === 'costForTwofacetquery5') {
            setIslessThan300(true);
            setBetween300To500(false);
            setISGreaterThan600(false);
            console.log(checkedFiller.cost, value)
            setCheckedFiller(prevState => ({ ...prevState, cost: value }));
        }
    };

    const SwitchControls = () => {
        switch (selectedMenu) {
            case 'sortBy':
                return (
                    <div className='sorted'>
                        <h4>SORT BY</h4>
                        {filterMenuData.sortConfigs.map((menu) => (
                            <div key={menu.key}>
                                <Input
                                    label={menu.title}
                                    type='radio'
                                    name='radio'
                                    id={menu.key}
                                    value={JSON.stringify(menu)}
                                    onChange={handleSortFilter}
                                    checked={selectedOption !== null ? selectedOption.key === menu.key : false}
                                />
                            </div>
                        ))}
                    </div>
                );

            case 'isVeg':
                return (
                    <div className='sorted'>
                        <h4 className='uppercase'>{filterMenuData.facetList[0].subLabel}</h4>
                        {filterMenuData.facetList[0].facetInfo.map((menu) => {

                            return (
                                <div className={menu.id} key={menu.id}>
                                    <Input label={menu.label} type='radio' name='radio' id={menu.id} />
                                </div>
                            )
                        })}
                    </div>
                );

            case 'deliveryTime':
                return (
                    <div className='sorted'>
                        <h4 className='uppercase'>{filterMenuData.facetList[1].subLabel}</h4>
                        {filterMenuData.facetList[1].facetInfo.map((menu) => (
                            <div key={menu.id}>
                                <Input
                                    label={menu.label}
                                    type='radio'
                                    name='radio'
                                    id={menu.id}
                                    value={menu.id}
                                    onChange={handleLessThanFilter}
                                    checked={deliveryArray.find((deliv)=> deliv === menu.id)}
                                />
                            </div>
                        ))}
                    </div>
                );

            case 'costForTwo':
                return (
                    <div className='sorted'>
                        <h4 className='uppercase'>{filterMenuData.facetList[2].subLabel}</h4>
                        {filterMenuData.facetList[2].facetInfo.map((menu) => (
                            <div key={menu.id}>
                                <Input
                                    label={menu.label}
                                    type='radio'
                                    name='radio'
                                    id={menu.id}
                                    value={menu.id}
                                    onChange={handleDeliveryCostFilter}
                                    checked={checkedFiller.cost.toString() === menu.id.toString()}
                                />
                            </div>
                        ))}
                    </div>
                );

            default:
                break;
        }
    };

    useEffect(() => {
        filterMenuData && createFacetArrays()
    }, [])

    useEffect(() => {
        SwitchControls()
    }, [checkedFiller, selectedMenu])

    const handleClearfilter = () => {
        setIsLessThan30(false);
        setLessThan45(false);
        setBetween300To500(false);
        setISGreaterThan600(false);
        setIslessThan300(false);
        setCheckedFiller({ cost: '', delivery: '' });
        handleFilterModal();
    };

    const handleApplyFilter = () => {
        handleFilterModal();
    };

    return (
        <div className="filter-modal-container filter-item">
            <div className="filter-header">
                <h1 className="filter-title">Filter</h1>
                <div className='cross-icon' onClick={handleFilterModal}>
                    <CloseIcon />
                </div>
            </div>
            <div className='height-temp'>
                <div className='filter-body'>
                    <ul className='filter-criteria-list'>
                        <li id='sortBy' onClick={() => handleSetId('sortBy')} className={`${selectedMenu === 'sortBy' ? 'bordering' : ''}`}>Sort</li>
                        {filterMenuData && filterMenuData?.facetList.map((menuData, index) => (
                            <li key={index} className={`${selectedMenu === menuData.id ? 'bordering' : ''}`} onClick={() => handleSetId(menuData.id)}>{menuData.label}</li>
                        ))}
                    </ul>
                    <div className='filter-body-list'>
                        <div className='sorted'>{selectedMenu !== null && SwitchControls()}</div>
                        <div className='flex justify-between items-center px-10 py-6 w-full h-[20%] shadow-2xl shadow-slate-500 absolute bottom-0 top-[100%]'>
                            <button className='shadow-lg px-4 py-1 button bg-white' onClick={handleClearfilter}>Clear all Filters</button>
                            <button className='bg-[orangered] px-4 py-1 button' onClick={handleApplyFilter}>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterModalPage;
