import './styles/fixed.scss';
import {Avatar} from "@/app/components/header/Avatar";

/**
 * A fixed header on top that doesn't take up much space.
 * Appears when the user scrolls down the page.
 *
 * @param isDisplayed
 * @returns {JSX.Element}
 * @constructor
 */
export function FixedHeader({isDisplayed}) {
    return (
        <header className='fixed' style={!isDisplayed ? {display: "none"} : {}}>
            <a href="/">
                <Avatar />
            </a>
            <h1>Rasik</h1>
        </header>
    );
}