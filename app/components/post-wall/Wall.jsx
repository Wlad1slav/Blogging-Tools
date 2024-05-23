'use client'

import './style.scss';

import Post from "@/app/components/post/Post";

import {useEffect, useState} from "react";
import axios from "axios";

export function Wall() {

    const [gotPosts, setGotPosts] = useState();

    useEffect(() => {
        // Get all posts via api
        axios.get(process.env.NEXT_PUBLIC_API_BASE_URL + '/posts')
            .then(response => {
                setGotPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const posts = (gotPosts ?? [{}]).map(post =>
        <Post key={post.id} post={post} />
    );

    return (
        <div className="post-wall">
            {posts}
        </div>
    );
}

export default Wall;