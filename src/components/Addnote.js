import React, { useContext ,useState} from 'react'
import noteContext from '../context/notes/noteContext';


const Addnote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title :"",description:"",tag:""})

    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title :"",description:"",tag:""});
        props.showAlert("Added the note successfully!","success");
    }

    return (
        <div className="">
            <h2> Add a Note </h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name ="description" value={note.description} onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name ="tag" value={note.tag} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleAddNote} disabled={note.title.length<5 || note.description.length<5 }>Submit</button>
            </form>
        </div>
    )
}

export default Addnote
