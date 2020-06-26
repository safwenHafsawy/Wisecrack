import React from 'react';
import{withRouter} from 'react-router-dom';
import { Fade, Button } from 'react-bootstrap';

class CreateNote extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            description:'',
            appear : false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount(){
        const token = localStorage.getItem('token')
        if(!token){
            this.props.history.push('/home') 
        }
        this.setState({
            appear : true
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    handleSubmit(event){
        event.preventDefault();
        const token = localStorage.getItem("token")
        const note = JSON.stringify(this.state)
        fetch('http://localhost:5000/api/createnote', {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body : note        
        }).then( () => {
            this.props.history.push('/')     
        })
    };

    render(){
        return(
    <Fade in={this.state.appear}>
        <div className='container-grid'>
            <div className="row d-flex justify-content-center" style={{margin : '50px'}}>
                <form onSubmit = {this.handleSubmit} id="createForm">
                <p id="formHeader">Create a note</p>
                <div className='form-group'>
                        <input 
                            name="title"
                            value = {this.state.title}
                            className="form-control" 
                            placeholder="Note Tilte..." 
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <textarea
                            name="description"
                            value = {this.state.description}
                            className="form-control" 
                            placeholder="Note Descritpion..." 
                            onChange={this.handleChange} 
                            style ={{height : '100px'}}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <Button variant="outline-success" onClick={this.handleSubmit} block>
                            Create my note
                        </Button>
                    </div>    
                </form>
            </div>
        </div>   
    </Fade>                 
                       
            )
    }
}

export default withRouter(CreateNote);