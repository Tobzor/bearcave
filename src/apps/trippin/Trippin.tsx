import { Route, Routes, Link } from "react-router-dom";

function Trippin(): JSX.Element {
    return (
        <div>
            <h2>Trippin</h2>
            <nav>
                <Link to="somewhere">somewhere</Link>
            </nav>

            <Routes>
                <Route
                    path="somewhere"
                    element={<h2>{"Trippin'"} somewhere</h2>}
                />
            </Routes>
        </div>
    );
}
export default Trippin;
