// import logo from "./logo.svg";
import "./App.css";
import AppRoute from "./Routes/routes";
import MainWrapper from "./components/layouts/MainWrapper";
// import "./style.css";

function App() {
    return (
        <>
            <MainWrapper>
                <AppRoute />
            </MainWrapper>
        </>
    );
}

export default App;
