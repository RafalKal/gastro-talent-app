import { useNavigate } from "react-router-dom";

const Unathorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Brak autoryzacji</h1>
            <br />
            <p>Nie masz dostępu do tej strony</p>
            <div className="flexGrow">
                <button onClick={goBack}>Wróć do poprzedniej strony</button>
            </div>
        </section>
    );
};

export default Unathorized;