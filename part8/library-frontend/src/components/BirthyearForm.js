import { gql,useMutation } from '@apollo/client';
import React, { useState } from 'react';

const ME = gql`
mutation editAuthor($name: String!, $date: Int!) {
  editAuthor(name: $name, setBornTo: $date) {
    name
    id
    born
  }
  }
`;

function BirthyearForm() {
    const [name,setName] = useState("");
    const [date, setDate] = useState(null);
    const [setAuthorBirthDate] = useMutation(ME)
    return (
        <div>
            <h1>Set Birthyear</h1>
            <form onSubmit={async(e)=>{
                e.preventDefault();
                
                const response = await setAuthorBirthDate({variables:{
                    name,
                    date
                }})
                console.log(response);
                setName("");
                setDate("");

            }}>
                <label htmlFor="name">name</label>
                <input type="text" name="name" id="name" value={name} onChange={(e)=>{setName(e.target.value)}} />
                <label htmlFor="name">born</label>
                <input type="number" name="date" id="date" value={date} onChange={(e)=>{setDate(parseInt(e.target.value))}} />
                <input type="submit" value="update author"  />
            </form>
        </div>
    )
}

export default BirthyearForm
