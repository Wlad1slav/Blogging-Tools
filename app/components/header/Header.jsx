'use client'

import {useEffect, useState, useCallback} from "react";
import axios from "axios";

import {FixedHeader} from "./FixedHeader";
import {TopHeader} from "./TopHeader";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export function Header() {
    const [showFixedHeader, setShowFixedHeader] = useState(false);
    const [blogInfo, setBlogInfo] = useState({});

    const handleScroll = useCallback(() => {
        setShowFixedHeader(window.scrollY > 350);
    }, []);

    const fetchBlogInfo = async () => {
        const apiRequest = `${process.env.NEXT_PUBLIC_API_BASE_URL}/personal_information`;

        try {
            const response = await axios.get(apiRequest);
            response.data.links = JSON.parse(response.data.links); // Converting a json string to an object
            setBlogInfo(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        fetchBlogInfo();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <>
            <FixedHeader isDisplayed={showFixedHeader} info={blogInfo} />
            <TopHeader info={blogInfo} />
        </>
    );
}
