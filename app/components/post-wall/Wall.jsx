import axios from "axios";

import './style.scss';

import Post from "@/app/components/post/Post";


/**
 * Fetches posts data from the API
 *
 * @returns {Promise<any|[{}]>}
 */
const fetchPostsData = async () => {
    const apiRequest = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`;
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
 * @returns {Promise<JSX.Element>}
 * @constructor
 */
export async function Wall() {

    const postsArray = await fetchPostsData();

    const postsElements = postsArray.map(post =>
        <Post key={post.id} post={post}/> // Mapping each post to a Post component
    );

    return (
        <div className="post-wall">
            {postsElements}
        </div>
    );
}

export default Wall;