import './styles/fixed.scss';
import {Avatar} from "@/app/components/header/Avatar";

export function FixedHeader({isDisplayed}) {
    // TopHeader when scrolling down
    return (
        <header className='fixed' style={!isDisplayed ? {display: "none"} : {}}>
            <a href="/">
                <Avatar />
            </a>
            <h1>Rasik</h1>
        </header>
    );
}