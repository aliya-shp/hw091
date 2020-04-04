import React, {Fragment} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";
import {Container} from "reactstrap";
import Routes from "./Routes";
import {useSelector} from "react-redux";

const App = () => {
    const user = useSelector(state => state.users.user);
    return (
        <Fragment>
            <header>
                <Toolbar/>
            </header>
            <Container style={{marginTop: '20px'}}>
                <Routes user={user}/>
            </Container>
        </Fragment>
    );
};

export default App;