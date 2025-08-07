"use client";

import { useEffect, useState } from "react";

interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchValue) ||
        advocate.lastName.includes(searchValue) ||
        advocate.city.includes(searchValue) ||
        advocate.degree.includes(searchValue) ||
        advocate.specialties.includes(searchValue) ||
        advocate.yearsOfExperience.toString().includes(searchValue)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1 className="text-2xl font-bold text-center">Solace Advocates</h1>
      <br />
      <br />
      <div>
        <input 
          style={{ border: "1px solid black" }} 
          value={searchTerm}
          onChange={onChange} 
          placeholder="Search"
          className="input input-bordered w-full max-w-xs bg-white"
        />
        <button className="btn btn-primary btn-sm ml-2" onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate, index) => {
            return (
              <tr key={index}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s: string, i: number) => (
                    <div key={i}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
