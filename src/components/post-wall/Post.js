export function Post({post}) {

    // Converting an array of image references to an array of image elements
    const images = post.images.map(image =>
        <img src={image} alt=""/>
    );

    return (
        <div className="post">
            <div className="content">
                {post.text}
            </div>
            <div className={
                [
                    'images',
                    images.length === 1 ? 'image-1' :
                        (images.length === 2 ? 'image-2' :
                            (images.length === 3 ? 'image-3' : ''))
                ].join(' ')
            }>
                {images}
            </div>
            <p className="datetime">{post.datetime}</p>
        </div>
    );
}

export default Post;