import './styles/top.scss';
import {Avatar} from "@/app/components/header/Avatar";

export function TopHeader({info}) {

    // Converting the blog description to several paragraphs
    const description = info && info.description ? info.description.split('\n').map((paragraph, index) =>
        <p key={index}>{paragraph}</p>
    ) : '';

    // Converting the bio to several paragraphs
    const bio = info && info.bio ? info.bio.split('\n').map((paragraph, index) =>
        <p key={index}>{paragraph}</p>
    ) : '';

    // Converting an object with links to an ul-list of links
    const links = info && info.links ? Object.keys(info.links).map((key) => (
        <li key={key}><a href={info.links[key]}>{key}</a></li>
    )) : '';

    return (
        <header>
            <a href="/">
                <Avatar />
            </a>

            <div className="personal-info">
                <h1>{info.nickname}</h1>

                <p className="blog-description">
                    {description}
                </p>

                <div className="bio">
                    <h2>Bio</h2>
                    {bio}
                </div>
            </div>

            <div className='links'>
                <ul className="links__ul">
                    <h2>Links</h2>
                    {links}
                </ul>
            </div>

        </header>
    );
}