import React from  'react';
import { useState } from 'react';
export default function CharityCaseForm({addFunc}){

    const [name, setName] = useState('');
    const [totalSum, setTotalSum] = useState('');

   function handleSubmit (event){

        let chartity_case={id: 0,
            name:name,
            totalSum:totalSum
        }
        console.log('A chartity case was submitted: ');
        console.log(chartity_case);
         addFunc(chartity_case);
        event.preventDefault();
    }
    return(
    <form onSubmit={handleSubmit}>
        <label>
            Name:
            <input type="text" value={name} onChange={e=>setName(e.target.value)} />
        </label><br/>
        <label>
            Sum:
            <input type="text" value={totalSum} onChange={e=>setTotalSum(e.target.value)} />
        </label><br/>
        <input type="submit" value="Add charity case" />
    </form>);
}
