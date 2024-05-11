import Post from "./Post";

import './style.scss';

export function Wall() {
    const post = {
        text: 'Буду тут писати свої нікому непотрібні думки, подалі від людських очів',
        datetime: '5/11/2024 7:20 PM',
        images: [
            'https://femzai.com/cdn/shop/products/Fashion-Black-White-Wine-Red-Striped-Women-Long-Socks-Sexy-Thigh-High-Nylon-Stockings-Breathable-Over.jpg_640x640_25373e34-b098-4536-989c-ca00296a8a57.jpg?v=1705750085',
            'https://femzai.com/cdn/shop/products/Fashion-Black-White-Wine-Red-Striped-Women-Long-Socks-Sexy-Thigh-High-Nylon-Stockings-Breathable-Over.jpg_640x640_25373e34-b098-4536-989c-ca00296a8a57.jpg?v=1705750085',
        ],
    };

    return (
        <div className="post-wall">
            <Post post={post} />
        </div>
    );
}

export default Wall;