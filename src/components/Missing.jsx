import { Link } from "react-router-dom"

const Missing = () => {
    return (
        <article style={{ padding: "200px" }}>
            <h1>Oops!</h1>
            <p>Nie znaleziono strony</p>
            <div className="flexGrow">
                <Link to="/">Odwiedź naszą stronę główną</Link>
            </div>
        </article>
    )
}

export default Missing