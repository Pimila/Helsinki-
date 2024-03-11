import { useState, useEffect } from 'react';
import sort from '../assets/sort.png'
import arrowDown from '../assets/arrow-down.png'
import { Popup } from './CardPopUp.jsx'
import '../styles/List.css'
import arrowLeft from '../assets/arrowLeft.png'
import arrowRight from '../assets/arrowRight.png'
import emptyHeart from '../assets/emptyHeart.png'
import pin from '../assets/pin.png'
import fullHeart from '../assets/fullHeart.png'
<assets />

export const List = ({hubData}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [isBackwards, setIsBackwards] = useState(true)
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [paginationArrowLeft, setPaginationArrowLeft] = useState(false);
    const [paginationArrowRight, setPaginationArrowRight] = useState(true);
    const [buildingFavourites, setBuildingFavourites] = useState({}); // Object to store favourite status for each building
    
    const handleReadMore = (building) => {
        setSelectedBuilding(building);
      };
    
    const handleClosePopup = () => {
        setSelectedBuilding(null);
      };

    const handleCardCount = (count) => {
        setItemsPerPage(count)

        const newTotalPages = Math.ceil(hubData.data?.groupedProducts?.length / count);
        const newCurrentPage = Math.min(currentPage, newTotalPages);
        setCurrentPage(newCurrentPage);

        console.log("current page: " + newCurrentPage)
        console.log("page numbers length" + newTotalPages)
           
        if (newCurrentPage === 1 && newTotalPages === 2) {
            setPaginationArrowRight(true)
            setPaginationArrowLeft(false)
        }
        else if (newCurrentPage === 2 && newTotalPages === 2) {
            console.log("tulee tänne!!")
            setPaginationArrowRight(false)
            setPaginationArrowLeft(true)
        }

        else if (newCurrentPage === 1) {
            setPaginationArrowLeft(false);
        }
       
        else if (newCurrentPage === newTotalPages) {
            
            setPaginationArrowRight(false);
        }

        else {
            setPaginationArrowRight(true);
            setPaginationArrowLeft(true);
        }
    }

    const handleWards = () => {
        setIsBackwards(!isBackwards)
    }

    const totalPages = Math.ceil(hubData.data?.groupedProducts?.length / itemsPerPage);

    const getPageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return [startIndex, endIndex];
    };

    const [startIndex, endIndex] = getPageRange();

    // useEffect(() => {
    //     // Fetch building favorites from the server when the component mounts
    //     fetchBuildingFavorites();
    // }, []);

    // const fetchBuildingFavorites = async () => {
    //     try {
    //         const response = await fetch('/api/buildings/favorites');
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch building favorites');
    //         }
    //         const data = await response.json();
    //         setBuildingFavourites(data);
    //     } catch (error) {
    //         console.error('Error fetching building favorites:', error);
    //     }
    // };

    // const markAsFavourite = async (buildingId) => {
    //     try {
    //         const response = await fetch('/api/buildings/favorite', {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 buildingId: buildingId,
    //                 isFavorite: !buildingFavourites[buildingId], // Toggle the favorite status
    //             }),
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to mark building as favorite');
    //         }

    //         // Update local state after successful response
    //         setBuildingFavourites(prevFavorites => ({
    //             ...prevFavorites,
    //             [buildingId]: !prevFavorites[buildingId], // Toggle the favorite status locally
    //         }));
    //     } catch (error) {
    //         console.error('Error marking building as favorite:', error);
    //         // Handle error
    //     }
    // };

    const markAsFavourite = (buildingId) => {
        setBuildingFavourites(prevFavourites => ({
            ...prevFavourites,
            [buildingId]: !prevFavourites[buildingId] // Toggle the favorite status for the clicked building
        }));
    }
    
    // Check if a building is marked as a favorite
    const isBuildingFavourite = (buildingId) => {
        return buildingFavourites.hasOwnProperty(buildingId) && buildingFavourites[buildingId];
    }
    
    
    const getBuildingName = (building) => {
        return (
            building.productInformations[0]?.name ||
            (building.productImages[0]?.copyright === "Kuvio" ? "Oodi" :
            building.productImages[0]?.copyright === "Didrichsen archives" ? "Didrichsenin taidemuseo" :
            building.productImages[0]?.copyright.includes("Copyright: Visit Finland")
                ? building.productImages[0]?.copyright.split(":")[1].trim()
                : building.productImages[0]?.copyright)
        );
    };
    
    const sortedItems = isBackwards 
        ? hubData.data?.groupedProducts?.sort((a, b) => {
            const nameA = getBuildingName(a);
            const nameB = getBuildingName(b);
            return nameA.localeCompare(nameB);
        })
        : hubData.data?.groupedProducts?.sort((a, b) => {
            const nameA = getBuildingName(a);
            const nameB = getBuildingName(b);
            return nameB.localeCompare(nameA);
        });
                
    const displayedItems = sortedItems?.slice(startIndex, endIndex);
            
    const handlePageChange = (newPage) => {
    
        setCurrentPage(newPage);
        console.log("sivujen lukumäärä " + pageNumbers.length)

        if (newPage === 1 && pageNumbers.length === 2) {
            setPaginationArrowRight(true)
            setPaginationArrowLeft(false)
        }
        else if (newPage === 2 && pageNumbers.length === 2) {
            setPaginationArrowRight(false)
            setPaginationArrowLeft(true)
        }

        else if (newPage === 1) {
            setPaginationArrowLeft(false);
            setPaginationArrowRight(true);
        }
       
        else if (newPage === pageNumbers.length) {
            setPaginationArrowRight(false);
            setPaginationArrowLeft(true);
        }

        else {
            setPaginationArrowRight(true);
            setPaginationArrowLeft(true);
        }  
      };

    const handlePageChangeLeft = (newPage) => {

        const pageToShow = currentPage - 1;
    
        if (pageToShow === 1 && pageNumbers.length === 2) {
            setPaginationArrowRight(true)
            setPaginationArrowLeft(false)
            setCurrentPage(newPage);
        }
        else if (pageToShow === 1 ) {
            setPaginationArrowLeft(false);
            setCurrentPage(newPage);
        }
       
        else {
            setPaginationArrowLeft(true);
            setPaginationArrowRight(true);
            setCurrentPage(newPage);
        }
      };

    const handlePageChangeRight = (newPage) => {

        console.log("pagenumbers lenght: " + pageNumbers.length)
        const pageToShow = currentPage + 1;
        console.log("page to show " + pageToShow )
    
        if (pageToShow === 2 && pageNumbers.length === 2) {
            console.log("TÄÄLLÄ!")
            setPaginationArrowRight(false)
            setPaginationArrowLeft(true)
            setCurrentPage(newPage);
        }
        else if (pageToShow === pageNumbers.length) {
            setPaginationArrowRight(false);
            setCurrentPage(newPage);
        }
       
        else {
            setPaginationArrowRight(true);
            setPaginationArrowLeft(true);
            setCurrentPage(newPage);
        }
      };
      
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);  
    
    return (
    <div>
        <h1 className="listHeader">SELAA RAKENNUKSIA</h1>
        <div className='sortContainer'>
       
        <div className='dropdown'>
            <img src={sort} alt="sortLogo" />
            <a>NÄYTÄ {itemsPerPage}</a>
            <div className="dropdown-content">
            <button className='button' onClick={() => handleCardCount(6)}>6</button>
            <button className='button' onClick={() => handleCardCount(12)}>12</button>
            <button className='button' onClick={() => handleCardCount(24)}>24</button>
            </div>
        
        </div>
        
    {isBackwards ? (
        <div className='wards'>
        <span>A - Ö</span>
        <img onClick={() => handleWards()} src={arrowDown} alt="arrow-down" />
        </div>
    ) : (
        <div className='wards'>
        <span>Ö - A</span>
        <img onClick={() => handleWards()} src={arrowDown} alt="arrow-up" style={{ transform: 'rotate(180deg)' }} />
        </div>
    )}
        </div>
        <div className='cardContainer'>
        <ul >
        {displayedItems?.map((building) => (
        <li className="card" key={building.id}>
            <div className='headingContainer'>
                <h2 className='h2'>{building.productInformations[0]?.name}</h2>
                <div className='iconsContainer'>
                {isBuildingFavourite(building.id) ? (
                    <img onClick={() => markAsFavourite(building.id)} className='fullHeart' src={fullHeart} alt="full-heart" />
                ) : (
                    <img onClick={() => markAsFavourite(building.id)} className='emptyHeart' src={emptyHeart} alt="empty-heart" />
                )}
                    {/* <img className='emptyHeart' src={emptyHeart} alt="empty-heart" /> */}
                     {/* <img className='pinCard' src={pin} alt="pin" /> */}
                </div>
            </div>
            <div className='info'>  

            <p className='p'>Osoite: {building.postalAddresses[0]?.streetName}</p>
            <p className='p'>Kaupunki: {building.postalAddresses[0]?.city}</p>
            <p className='p'>Postinumero: {building.postalAddresses[0]?.postalCode}</p>
            </div>
            <figure className='picture_url'>
                <img src={building.productImages[0]?.thumbnailUrl} alt={building.productImages[0]?.altText} />
            </figure>
            <a className='zoom' onClick={() => handleReadMore(building)}>
              LUE LISÄÄ
            </a>  
        </li>
        
        ))}
        </ul>
        {selectedBuilding && <Popup building={selectedBuilding} onClose={() => handleClosePopup()} />}
        </div>
        
        <div className="navigation-arrows">
        {paginationArrowLeft ? (
            <a 
                onClick={() => handlePageChangeLeft(currentPage - 1)}><img src={arrowLeft} alt="arrowLeft" 
                style={{ textDecoration: currentPage === pageNumbers.indexOf(currentPage) ? 'none !important' : 'underline'}}/></a>
            ) : (
            <p>{null}</p>
        )}
        <div className="pagination">
            {pageNumbers.map((pageNumber) => (
                <span
                key={pageNumber}
                 className={pageNumber === currentPage ? 'active' : ''}
                 style={{ textDecoration: pageNumber === currentPage ? 'none !important' : 'underline'}}
                onClick={() => handlePageChange(pageNumber)}
                >
                {pageNumber}
                </span>
            ))}
        </div>    
        {paginationArrowRight ? (
            <a 
                onClick={() => handlePageChangeRight(currentPage + 1)}><img src={arrowRight} alt="arrowRight" 
                style={{ textDecoration: currentPage === pageNumbers.indexOf(currentPage) ? 'none !important' : 'underline'}}/></a>
            ) : (
            <p>{null}</p>
        )}
        </div>
    </div>
);
}

