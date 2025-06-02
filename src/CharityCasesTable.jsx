import React from  'react';
import './TeledonApp.css'
import { useState } from 'react';
function CharityCaseRow({charityCase, deleteFunc,updateFunc}){
    function handleDelete(event){
        console.log('delete button pentru '+charityCase.id);
        deleteFunc(charityCase.id);
    }
    const [editingCase, setEditingCase] = useState(null);

    const handelUpdate = (caseItem) => {
        console.log("Editing case:", charityCase);
        setEditingCase(caseItem); 
    };

    const handleUpdateSubmit = (event) => {
        event.preventDefault();
        updateFunc(editingCase); 
        setEditingCase(null);
    };
    return (
        <>
            <tr>
                <td>{charityCase.id}</td>
                <td>{charityCase.name}</td>
                <td>{charityCase.totalSum}</td>
                <td><button  onClick={handleDelete}>Delete</button><button onClick={() => handelUpdate(charityCase)}>Update</button></td>
            <td>
             {editingCase && (
                <form onSubmit={handleUpdateSubmit}>
                    <h3>Edit Charity Case</h3>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={editingCase.name}
                            onChange={(e) =>
                                setEditingCase({ ...editingCase, name: e.target.value })
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Sum:
                        <input
                            type="text"
                            value={editingCase.totalSum}
                            onChange={(e) =>
                                setEditingCase({ ...editingCase, totalSum: e.target.value })
                            }
                        />
                    </label>
                    <br />
                    <button type="submit">OK</button>
                    <button type="button" onClick={() => setEditingCase(null)}>
                        Cancel
                    </button>
                </form>
            )}
            </td>
            </tr>
        </>
        
        
    );
}
export default function CharityCasesTable({charityCasesList, deleteFunc,updateFunc}){
    console.log("In CharityCasesTable");
    console.log(charityCasesList);
    let rows = [];
    let functieStergere=deleteFunc;
    let functieActualizare=updateFunc;
    charityCasesList.forEach(function(charityCase) {
        rows.push(<CharityCaseRow charityCase={charityCase}  key={charityCase.id} deleteFunc={functieStergere} updateFunc={functieActualizare} />);
    });

    return (
        <div className="Charity Cases Table">
            <table className="center">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Total Sum</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>

        </div>
    );
}
