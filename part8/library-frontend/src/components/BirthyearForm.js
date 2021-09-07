import { gql,useMutation } from '@apollo/client';
import React, { useState } from 'react';
import Select from "react-select";
const SET_AUTHOR_BIRTHYEAR = gql`
mutation editAuthor($name: String!, $date: Int!) {
  editAuthor(name: $name, setBornTo: $date) {
    name
    id
    born
  }
  }
`;

function BirthyearForm({authors}) {
    const [name,setName] = useState("");
    const [date, setDate] = useState(null);
    const [setAuthorBirthDate] = useMutation(SET_AUTHOR_BIRTHYEAR )
    const options = authors.map(author=> ({value: author.name, label: author.name}));
    return (
        <div>
            <h1>Set Birthyear</h1>
            <form onSubmit={async(e)=>{
                e.preventDefault();
                
                const response = await setAuthorBirthDate({variables:{
                    name: name.value,
                    date
                }})
                setName("");
                setDate("");

            }}>
                <label htmlFor="name">name</label>

                <Select options={options} value={name} onChange={setName}    />
                <label htmlFor="name">born</label>

                <input type="number" name="date" id="date" value={date} onChange={(e)=>{setDate(parseInt(e.target.value))}} />
                <input type="submit" value="update author"  />
            </form>
        </div>
    )
}

export default BirthyearForm
