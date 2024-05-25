import './styles/top.scss';
import {Avatar} from "@/app/components/header/Avatar";


/**
 * The top, large header that contains all the information about the page
 *
 * @param info
 * @returns {JSX.Element}
 * @constructor
 */
export function TopHeader({info}) {

    // Converting the blog description to several paragraphs
    const description = info && info.description ? info.description.split('\n').map((paragraph, index) =>
        <span key={index}>{paragraph}</span>
    ) : 'Loading...';

    // Converting the bio to several paragraphs
    const bio = info && info.bio ? info.bio.split('\n').map((paragraph, index) =>
        <span key={index}>{paragraph}</span>
    ) : 'Loading...';

    // Converting an object with links to an ul-list of links
    const links = info && info.links ? Object.keys(info.links).map((key) => (
        <li key={key}><a href={info.links[key]}>{key}</a></li>
    )) : 'Loading...';

    return (
        <header>
            <a href="/">
                <Avatar />
            </a>

            <div className="personal-info">
                <h1>{info.nickname ?? 'Loading...'}</h1>

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