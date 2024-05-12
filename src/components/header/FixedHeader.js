import './styles/fixed.scss';

export function FixedHeader({isDisplayed}) {
    // TopHeader when scrolling down
    return (
        <header className='fixed' style={!isDisplayed ? {display: "none"} : {}}>
            <img src="/images/avatar.gif" alt="" className="avatar"/>
            <h1>Rasik</h1>
        </header>
    );
}