import React from "react";
import Weather from "./Weather";

function Info({ countries, searchTerm, setSearchTerm }) {
  if (searchTerm === "") {
    return <div>Enter Country name</div>;
  }
  if (countries.length === 0) {
    return <div>Loading data</div>;
  }
  // countries.find();
  const matches = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const matchesLength = matches.length;
  // Too many:
  if (matchesLength >= 10) {
    return <div>Too many results , please be more specific</div>;
  }
  //  < 10:
  if (matchesLength > 1 && matchesLength < 10) {
    return (
      <div>
        {matches.map((match) => (
          <div key={match.name}>
            {match.name}
            <button
              onClick={() => {
                setSearchTerm(match.name);
              }}
            >
              Show
            </button>
          </div>
        ))}
      </div>
    );
  }
  // 1 :
  if (matchesLength === 1) {
    return (
      <div>
        <h3>{matches[0].name}</h3>
        <p>capital {matches[0].capital}</p>
        <p>population {matches[0].population}</p>
        <h4>Languages</h4>
        <ul>
          {matches[0].languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img style={{ width: "100px" }} src={`${matches[0].flag}`} alt="" />
        {/* Weather */}
        <Weather capital={matches[0].capital} />
      </div>
    );
  } else if (matchesLength === 0) {
    return <div>No countries found</div>;
  }
  // return <div>What is here</div>;
  // return (
  //   <div>
  //     <h1>name</h1>
  //     <p>cap</p>
  //     <p>population</p>
  //     <h3>languages</h3>
  //     <ul>
  //       <li>langauge A</li>
  //     </ul>
  //     {/* <img src="" alt="" /> */}
  //   </div>
  // );
}

export default Info;
