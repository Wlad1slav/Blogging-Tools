import React from "react";
import axios from "axios";
import Post from "@/app/components/post/Post";

/**
 * Fetch post data by ID
 *
 * @param id
 * @returns {Promise<{id: string, title: string, text: string, created_at: string, images: Array<string>}>}
 */
const fetchPostData = async (id) => {
    const apiRequest = `${process.env.NEXT_PUBLIC_API_BASE_URL}/post?id=${id}`;
    try {
        const response = await axios.get(apiRequest);
        return response.data;
    } catch (error) {
        console.error("Error fetching post:", error);
        return {
            id,
            title: "Post not found",
            text: "",
            created_at: "",
            images: [],
        };
    }
};

/**
 * Generation of page metadata. The post title serves as the title, if the post title does not exist,
 * then the post text is truncated to 70 characters and this segment is set as the page title.
 * The first 320 characters of the post text are set as the meta description.
 *
 * @param params
 * @param parent
 * @returns {Promise<{title: (string|*)}|{title: string}>}
 */
export async function generateMetadata({ params }, parent) {
    const post = await fetchPostData(params.id);

    const previousImages = (await parent).openGraph?.images || [];
    const title = post.title ?? (post.text.length > 70 ? post.text.substring(0, 70) : post.text);
    const metaDescription = post.text.length > 320 ? post.text.substring(0, 320) : post.text;

    return {
        title: title,
        description: metaDescription,
        openGraph: {
            title: title,
            description: metaDescription,
            images: [...previousImages],
        },
    };
}

/**
 * A page with a specific post
 */
export default async function PostPage({ params }) {
    const post = await fetchPostData(params.id);

    return (
        <Post post={post} />
    );
}
