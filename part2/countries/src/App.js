import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";
import Info from "./Info";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);
  const onSearchChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);
  };
  // console.log(countries);
  return (
    <div>
      <h1>Countries Enclopedia</h1>
      <Form value={searchTerm} onSearchChange={onSearchChange} />
      {/* {setCountries.length !== 0 ? countries[0].name : {}} */}
      <h2>Info</h2>
      <Info
        countries={countries}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}

export default App;
