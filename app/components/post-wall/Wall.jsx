import './style.scss';

import Post from "@/app/components/post/Post";


/**
 * Component that fetches and displays a wall of posts
 *
 * @returns {JSX.Element}
 */
const Wall = ({ posts }) => {
    const postsElements = posts.map(post =>
        <Post key={post.id} post={post}/> // Mapping each post to a Post component
    );

    return (
        <div className="post-wall">
            {postsElements}
        </div>
    );
};

export default Wall;