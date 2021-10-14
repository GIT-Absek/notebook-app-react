import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note,updateNote } = props;

    return (
        <div className="col-md-4">
            <div className="card">
                <div className="card-body my-3">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fas fa-trash-alt" onClick={()=> {deleteNote(note._id); props.showAlert("Deleted note sucessfully!","success");}}></i>
                <i className="fas fa-edit mx-3" onClick={()=> {updateNote(note); }}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
