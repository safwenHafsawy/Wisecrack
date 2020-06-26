import React from 'react';
import {withRouter} from 'react-router-dom';

class Update extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title : '',
            description : ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    
    componentDidMount(){
        const token = localStorage.getItem("token")
        fetch('http://localhost:5000/api/notes/'+ this.props.match.params.id, {
            method : 'GET',
            headers : {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => res.json())        
        .then((data) => {
            this.setState ({
                title : data.title,
                description : data.description
            })
        }
                
        ).catch(error => {
                console.log(error)
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
        fetch('http://localhost:5000/api/updatenotes/' + this.props.match.params.id, {
            method : 'PUT',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body : note        
        }).then( () => {
            this.props.history.push('/')
    }

        )
    };

    render(){
        return(
            <div className='container-grid'>
            <div className="row d-flex justify-content-center" style={{margin : '50px'}}>
                <div className="jumbotron">
                    <h1>Update your note</h1>
                </div>
                <form onSubmit = {this.handleSubmit} id="createForm">
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
                            style ={{height : '150px'}}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <button className="btn btn-primary">Update My Note</button>
                    </div>    
                </form>
            </div>
        </div>   
            )
    }
}

export default withRouter(Update);