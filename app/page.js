import Wall from "@/app/components/post-wall/Wall";

import './stylesheet/app.scss';
import axios from "axios";

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
 * Fetches blog info via API
 *
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const fetchBlogInfo = async () => {
    const apiRequest = `${process.env.NEXT_PUBLIC_API_BASE_URL}/personal_information`;
    try {
        return await axios.get(apiRequest);
    } catch (error) {
        console.error(error);
    }
};

/**
 *
 * @returns {Promise<{props: {posts: (*|{}[])}}>}
 */
export const getServerSideProps = async () => {
    const postsArray = await fetchPostsData();
    return {
        props: {
            posts: postsArray,
        },
        // This option allows the page to revalidate every time there is a request
        revalidate: 1,
    };
};

/**
 * Creating page metadata. The name of the blog is taken as the title,
 * and the first 320 characters of the bio are used as the description.
 * The image for the link preview is set to the blog avatar
 * in the meta tag <meta property="og:image" content="">.
 *
 * @returns {Promise<{description: (string|*), title: *, openGraph: {images: string, description: (string|*), title: *}, metadataBase: URL}>}
 */
export async function generateMetadata() {
    const info = await fetchBlogInfo();
    const metaDescription = info.data.bio.length > 320 ? info.data.bio.substring(0, 320) : info.data.bio;

    return {
        metadataBase: new URL('https://vladrasik.netlify.app'),
        title: info.data.nickname,
        description: metaDescription,
        openGraph: {
            title: info.data.nickname,
            description: metaDescription,
            images: '/images/avatar.gif',
        },
    };
}

export default async function Home() {
    const { props: { posts } } = await getServerSideProps();
    return (
        <>
            <Wall posts={posts}/>
        </>
    );
}
