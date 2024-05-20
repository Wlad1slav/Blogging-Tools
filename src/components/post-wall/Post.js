export function Post({post}) {

    // Converting an array of image references to an array of image elements
    const images = JSON.parse(post?.images ?? '[]').map(image =>
        <a href={image}>
            <img src={image} alt=""/>
        </a>
    );

    const content = post?.text?.split('\n').map(paragraph =>
        <p>{paragraph}</p>
    );

    const postCreatedAt = new Date(post?.created_at);

    return (
        <div className="post">
            <div className='head'>
                <h3>{post.title}</h3>
                <a href="/">{post.id}</a>
            </div>
            <div className="content">
                {content}
            </div>
            <div className={
                [
                    'images',
                    (images?.length ?? 0) === 1 ? 'image-1' :
                        ((images?.length ?? 0)  === 2? 'image-2' :
                            ((images?.length ?? 0) === 3 ? 'image-3' : ''))
                ].join(' ')
            }>
                {images}
            </div>
            <p className="datetime">{postCreatedAt.toLocaleString()}</p>
        </div>
    );
}

export default Post;