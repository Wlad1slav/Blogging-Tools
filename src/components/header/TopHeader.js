import './styles/top.scss';

export function TopHeader() {
    return (
        <header>
            <img src="/images/avatar.gif" alt="" className="avatar"/>

            <div className="personal-info">
                <h1>Rasik</h1>

                <p className="blog-description">
                    Буду тут писати свої нікому непотрібні думки, подалі від людських очів.
                </p>

                <div className="bio">
                    <h2>Bio</h2>
                    <p>
                        Веб програміст з Криму, проживаю в Києві. Переконаний зрадойоб і монархіст, трошки християнин і дуже бі.
                        Етнічний українець без домішок, але є мрія стати євреєм (чи хоча б знайти єврейські коріння).
                    </p>

                    <p>
                       Support: 🇹🇼 🏴󠁩󠁱󠁫󠁲󠁿 🇮🇱 🇺🇸 🏳️‍🌈 🏳️‍⚧️
                    </p>

                    <p>
                        KILL WITH FIRE: 🇸🇺 🇷🇺 🇨🇳 🏴󠁵󠁳󠁣󠁡󠁿
                    </p>
                </div>
            </div>

            <div className='links'>
                <ul className="links__ul">
                    <h2>Links</h2>
                    <li><a href="#">Github</a> </li>
                    <li><a href="#">Telegram</a> </li>
                    <li><a href="#">Post Backups</a> </li>
                </ul>
            </div>

        </header>
    );
}