'use client'

import './style.scss';
import Post from "@/app/components/post/Post";
import axios from "axios";
import {useEffect, useState} from "react";

/**
 * Fetches posts data via API
 *
 * @returns {Promise<any|[{}]>}
 */
const fetchPostsData = async () => {
    const apiRequest = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts?_=${new Date().getTime()}`;

    try {
        const response = await axios.get(apiRequest);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [{}];
    }
};

/**
 * Component that fetches and displays a wall of posts
 *
 * @returns {JSX.Element}
 */
const WallClientSide = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPostsData();
            setPosts(data);
        };
        fetchData();
    }, []);

    const postsElements = posts.map(post =>
        <Post key={post.id} post={post}/> // Mapping each post to a Post component
    );

    return (
        <div className="post-wall">
            {postsElements}
        </div>
    );
};

export default WallClientSide;
