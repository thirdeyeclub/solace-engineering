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
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

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

  const toggleRowExpansion = (index: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(index)) {
      newExpandedRows.delete(index);
    } else {
      newExpandedRows.add(index);
    }
    setExpandedRows(newExpandedRows);
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
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="w-full table-auto bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">First Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">City</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Degree</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Specialties</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Years of Experience</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone Number</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAdvocates.map((advocate, index) => {
              return (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm text-gray-900">{advocate.firstName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{advocate.lastName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{advocate.city}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {advocate.degree}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="space-y-1">
                      {(expandedRows.has(index) ? advocate.specialties : advocate.specialties.slice(0, 3)).map((s: string, i: number) => (
                        <div key={i} className="text-xs bg-gray-100 px-2 py-1 rounded inline-block mr-1 mb-1">
                          {s}
                        </div>
                      ))}
                      {advocate.specialties.length > 3 && (
                        <button
                          onClick={() => toggleRowExpansion(index)}
                          className="text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                        >
                          {expandedRows.has(index) 
                            ? "show less" 
                            : `+${advocate.specialties.length - 3} more`
                          }
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{advocate.yearsOfExperience}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">{advocate.phoneNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
