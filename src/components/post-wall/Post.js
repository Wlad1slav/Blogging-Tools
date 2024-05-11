export function Post({post}) {
    const images = post.images.map(image =>
        <img src={image} alt=""/>
    );


    return (
        <div className="post">
            <div className="content">
                {post.text}
            </div>
            <div className="images">
                {images}
            </div>
            <p className="datetime">{post.datetime}</p>
        </div>
    );
}

export default Post;