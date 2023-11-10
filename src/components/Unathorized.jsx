import { useNavigate } from "react-router-dom";

const Unathorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Unathorized</h1>
            <br />
            <p>You are not allowed to access this page.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go back</button>
            </div>
        </section>
    );
};

export default Unathorized;