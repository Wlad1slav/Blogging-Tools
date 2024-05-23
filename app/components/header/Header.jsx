'use client'

import {useEffect, useState} from "react";
import axios from "axios";

import {FixedHeader} from "./FixedHeader";
import {TopHeader} from "./TopHeader";

export function Header() {

    const [showFixedHeader, setShowFixedHeader] = useState(false);
    const [blogInfo, setBlogInfo] = useState({});

    const handleScroll = () => {
        if (window.scrollY > 350) {
            setShowFixedHeader(true);
        } else if (window.scrollY === 0) {
            setShowFixedHeader(false);
        }
    };

    useEffect(() => {
        // Set the action when the viewer scrolls the page
        window.addEventListener('scroll', handleScroll);

        // Get blog info via api
        axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/personal_information')
            .then(async response => {
                response.data.links = JSON.parse(response.data.links); // Converting a json string to an object
                setBlogInfo(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/*{showFixedHeader ? <FixedHeader /> : <TopHeader /> }*/}
            <FixedHeader isDisplayed={showFixedHeader} info={blogInfo} />
            <TopHeader info={blogInfo} />
        </>
    );
}