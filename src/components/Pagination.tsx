import {useOutsideClickHandler} from '../util/useOutsideClickHandler'
import {useEffect, useState} from "react";

import '../scss/Pagination.scss'

type PaginationProps = {
    offset: number,
    itemsOnPage: number,
    totalItems: number,
    setCurPage: (page: number) => any,
}

const Pagination = ({offset, itemsOnPage, totalItems, setCurPage}: PaginationProps) => {

    const [dropDown, setDropDown] = useState<boolean>(false);
    const toggleDropDown = () => setDropDown(!dropDown);

    const handleClickOutside = () => {
        setDropDown(false);
    }

    const ref = useOutsideClickHandler(handleClickOutside);

    useEffect(() => {
        (document.querySelector('.back-button') as HTMLLinkElement).disabled = offset === 1;
        (document.querySelector('.back-button') as HTMLLinkElement).disabled = offset === Math.ceil(totalItems / itemsOnPage);
    }, [offset, totalItems, itemsOnPage]);


    return (
        <nav className="pagination">
            <button onClick={() => setCurPage(offset < 1 ? offset : offset - 1)} className="back-button">
                <img src="/images/svg/carat-arrow.svg" alt="pagination back button"/>
            </button>
            <div>
                <button onMouseDown={toggleDropDown} ref={ref}>
                    <span>
                        Page {offset + 1} of {Math.ceil(totalItems / itemsOnPage)}
                    </span>
                    <div>
                        <img src="/images/svg/carat-arrow.svg" alt="pagination drop-down arrow"/>
                    </div>
                </button>
                <div className="drop-down-container">
                    {dropDown &&
                         <div className="drop-down">
                             {Array.from(Array(Math.ceil(totalItems / itemsOnPage)).keys()).map((i: number) => {
                                 return (
                                     <button key={i} onClick={() => {toggleDropDown(); setCurPage(i)}} className={`${offset === i ? "active" : ""}`}>
                                         Page {i + 1} of {Math.ceil(totalItems / itemsOnPage)}
                                     </button>
                                 )
                             })}
                         </div>
                     }
                </div>
            </div>
            <button onClick={() => setCurPage(Math.ceil(totalItems / itemsOnPage) === offset ? offset : offset + 1)} className="next-button">
                <img src="/images/svg/carat-arrow.svg" alt="pagination forward button"/>
            </button>
        </nav>
    )
}

export default Pagination
