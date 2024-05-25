import './style.scss'

export function Post({post}) {

    let images = [];
    try {
        // Mapping each image
        images = JSON.parse(post?.images ?? '[]').map(image =>
            <a key={image} href={process.env.NEXT_PUBLIC_IMAGES_PATH + image}>
                <img src={process.env.NEXT_PUBLIC_IMAGES_PATH + image} alt="" />
            </a>
        );
    } catch (error) {
        console.error('Failed to parse images JSON:', error);
        images = [];
    }

    const content = post?.text?.split('\n').map((paragraph, index) =>
        <p key={index}>{paragraph}</p> // Mapping each paragraph to content
    );

    const postCreatedAt = new Date(post?.created_at);

    return (
        <div className="post">
            <div className='head'>
                <h3>{post.title}</h3>
                <a href={`/post/${post.id}`}>{post.id}</a>
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