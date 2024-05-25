import Wall from "@/app/components/post-wall/Wall";

import './stylesheet/app.scss';
import axios from "axios";


const fetchBlogInfo = async () => {
    const apiRequest = `${process.env.NEXT_PUBLIC_API_BASE_URL}/personal_information`;
    try {
        return await axios.get(apiRequest);
    } catch (error) {
        console.error(error);
    }
};

export async function generateMetadata(parent) {
    const info = await fetchBlogInfo();

    const previousImages = (await parent).openGraph?.images || [];

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

export default function Home() {
  return (
    <>
      <Wall />
    </>
  );
}
