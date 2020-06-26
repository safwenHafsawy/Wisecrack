import React,{useContext, useState, useEffect} from 'react';
import { userContext } from './userContext';
import { useHistory } from 'react-router-dom';
import { Container,Jumbotron, Fade, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Home = () =>{
    const [Token] = useContext(userContext);
    const [appear, setAppear] = useState(false);
    const history = useHistory();
    useEffect(()=> {
        setAppear(true)
    }, [])
    if(Token){
        history.push('/')
    }else{
    return(
        <Container fluid>
        <Fade in={appear}>
            <Jumbotron fluid>
                <h1 className="display-4">Hello, and welcome to WiseCrack!</h1>
                <p className="lead">WiseCrack provides the possibility to store everything you could possibly imagine losing track of, like a boarding pass, receipt, article you want to read, to do list, or even a simple typed note..</p>
                <hr className="my-4" />
                <Link to='/signup' className='linkStyle' ><Button variant="light"> Get started </Button></Link>
                <Link to='/login' className='linkStyle' ><Button variant="light" style={{margin : '5px'}}> Login </Button></Link>
            </Jumbotron>
        </Fade>
      </Container>
    )

}
}

export default Home ;