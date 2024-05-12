import {TopHeader} from "./TopHeader";
import {FixedHeader} from "./FixedHeader";
import {useEffect, useState} from "react";

export function Header() {

    const [showFixedHeader, setShowFixedHeader] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 350) {
            setShowFixedHeader(true);
        } else if (window.scrollY === 0) {
            setShowFixedHeader(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/*{showFixedHeader ? <FixedHeader /> : <TopHeader /> }*/}
            <FixedHeader isDisplayed={showFixedHeader} />
            <TopHeader isDisplayed={!showFixedHeader} />
        </>
    );
}