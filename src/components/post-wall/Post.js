export function Post({post}) {

    // Converting an array of image references to an array of image elements
    const images = post.images.map(image =>
        <img src={image} alt=""/>
    );

    const content = post.text.split('\n').map(paragraph =>
        <p>{paragraph}</p>
    );

    return (
        <div className="post">
            <h3>{post.title}</h3>
            <div className="content">
                {content}
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