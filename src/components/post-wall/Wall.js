import Post from "./Post";

import './style.scss';
import {useEffect, useState} from "react";
import axios from "axios";

export function Wall() {

    const [gotPosts, setGotPosts] = useState();

    useEffect(() => {
        // Get all posts via api
        axios.get(process.env.REACT_APP_API_BASE_URL + '/posts')
            .then(response => {
                setGotPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const posts = (gotPosts ?? [{}]).map(post =>
        <Post post={post} />
    );

    return (
        <div className="post-wall">
            {posts}
        </div>
    );
}

export default Wall;