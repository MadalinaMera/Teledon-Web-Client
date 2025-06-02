import React, {useEffect, useRef} from 'react';
import { useState } from 'react';
import './TeledonApp.css'
import {GetCharityCases, DeleteCharityCase, AddCharityCase, UpdateCharityCase} from './utils/rest-calls'
import CharityCasesTable from './CharityCasesTable.jsx';
import CharityCaseForm from './CharityCaseForm.jsx';


export default function TeledonApp(){
	const [charityCasesList, setCharityCases] = useState([]);
	const connection = useRef(null)

	function addFunc(charityCase){
		console.log('inside add Func '+charityCase);
		AddCharityCase(charityCase)
			.then(res=> GetCharityCases())
			.then(charityCasesList=>setCharityCases(charityCasesList))
			.catch(erorr=>console.log('eroare add ',erorr));
	}

    function updateFunc(charityCase){
		console.log('inside update Func '+charityCase);
		UpdateCharityCase(charityCase)
			.then(res=> GetCharityCases())
			.then(charityCasesList=>setCharityCases(charityCasesList))
			.catch(erorr=>console.log('eroare add ',erorr));
	}

	function deleteFunc(charityCase){
		console.log('inside deleteFunc '+charityCase);
		DeleteCharityCase(charityCase)
			.then(res=> GetCharityCases())
			.then(charityCasesList=>setCharityCases(charityCasesList))
			.catch(error=>console.log('eroare delete', error));
	}
    useEffect(() => {
        console.log('inside useEffect');
    
        const socket = new WebSocket("ws://localhost:8080/teledonws");
    
        socket.addEventListener("open", () => {
            console.log("WebSocket connection established");
        });
    
        socket.addEventListener("message", (event) => {
            console.log("Message from server: ", event.data);
            try {
                const updatedCases = JSON.parse(event.data);
                setCharityCases(updatedCases);  // <-- actualizezi lista
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        });
    
        connection.current = socket;
    
        // Fetch initial list
        GetCharityCases()
            .then((charityCasesList) => {
                console.log("Initial fetch: ", charityCasesList);
                setCharityCases(charityCasesList);
            })
            .catch((error) => {
                console.log("Error fetching charity cases:", error);
            });
    
        return () => {
            // Cleanup la inchidere
            if (connection.current) {
                connection.current.close();
            }
        };
    }, []);
    

	return (<div className="TeledonApp">
		<h1>New Charity Cases Management App </h1>
		<CharityCaseForm addFunc={addFunc}/>
		<br/>
		<br/>
		<CharityCasesTable charityCasesList={charityCasesList} deleteFunc={deleteFunc} updateFunc={updateFunc}/>
	</div>);
}

