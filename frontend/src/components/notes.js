import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Alert, Button} from 'react-bootstrap';

//the note component
function Note(props){
    return(
        <div className='container-grid'>
            <div className="row d-flex justify-content-center" style={{margin : '20px'}}>
                <div className="card">
                    <div className="card-header">
                        {props.note.title}
                    </div>
                    <div className="card-body">
                        {props.note.description}
                    </div>
                    <div className="card-footer">
                    <div className="btn-group">
                        <Link 
                            to={"/editnote/"+props.note._id}
                            className ='linkStyle'>
                                <Button variant='outline-info'>Update Note</Button>
                        </Link>
                    <Button variant="outline-danger" onClick={() => { props.deleteNote(props.note._id) }}>Delete Note</Button>
                    </div>
                    </div>       
                </div>
            </div>
        </div>
        )
};

//the notes component
class Notes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isloaded : false,
            appear : false,
            notes : []
        }
        this.noteList = this.noteList.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

  

    componentDidMount(){
        const token = localStorage.getItem("token")
        if(!token){
            this.props.history.push('/home');
        }else{
            this.setState({appear : true})
            fetch('http://localhost:5000/api/notes' ,{
            method : 'GET',
            headers : {
                'Authorization': 'Bearer ' + token
            },
        },)
        .then(res => res.json())        
        .then((data) =>{
            this.setState({
                isloaded : true,
                notes : data
                })
            }
        ).catch(error => {
            this.setState({
                isloaded : false,
                error
            })
        })
    }
    }

    //DELETE_NOTE_FUNC
    deleteNote(id){
        const token = localStorage.getItem("token")
        const c = window.confirm('are you sure you want to delete this note ?')
        if(c === true){
        fetch("http://localhost:5000/api/notes/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
          }).then(() => {
             this.setState({
                isloaded : true,
                // filter through notes in this.state and return every note with an id different than the one passed in the delete function 
                notes : this.state.notes.filter(note => note._id !== id)
            })
          
          }).catch(err => {
            console.error(err)
          });
        }

    }

    noteList(){
        if(this.state.notes.length > 0){
        return this.state.notes.map(currentNote => {
            return (
                    <Note note = {currentNote} deleteNote = {this.deleteNote} key = {currentNote._id} />
                
            )
        })
        }else{
            return(
            <div className="row d-flex justify-content-center" style={{margin : '200px'}}>
                <div className="alert alert-success">
                    <strong>You have no notes !</strong><Link to='./createnote' className="alert-link">Create a new Note here</Link>.
                </div>
            </div>
            )
        }
    }

    render(){
        const {error , isloaded } = this.state
        if(error != null){
         return(
            <div className="row d-flex justify-content-center" style={{margin : '100px'}}>
                <Alert variant="danger">
                    <Alert.Heading> Oh snap! You got an error! </Alert.Heading>
                    <p>
                        {error.message} ! check your internet connexion and then try to refresh the page <br /> 
                        if the error remains despite that please contact us !
                    </p>
                </Alert>  
            </div>
         )   
        }else if(!isloaded){
            return(
                <div className="row d-flex justify-content-center" style={{margin : '30px'}}>
                <div className="spinner-border text-primary" />
                </div>
                )
        }else{
            return(  
                <div>
                        {this.noteList()}
                </div>
            )
        }
    }
}

export default withRouter(Notes);
