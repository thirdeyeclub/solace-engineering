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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch(`/api/advocates?page=${currentPage}&search=${searchTerm}`).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setTotalPages(jsonResponse.pagination.totalPages);
      });
    });
  }, [currentPage, searchTerm]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setCurrentPage(1);
  };

  const onClick = () => {
    setSearchTerm("");
    setCurrentPage(1);
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

  const formatPhoneNumber = (phoneNumber: number): string => {
    const phone = phoneNumber.toString();
    return `${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`;
  };

  const copyToClipboard = async (phoneNumber: number) => {
    try {
      await navigator.clipboard.writeText(formatPhoneNumber(phoneNumber));
    } catch (err) {
      console.error('Failed to copy phone number:', err);
    }
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
              <th className="px-2 py-4 text-center text-sm font-semibold text-gray-900 w-20">Years of Experience</th>
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
                  <td className="px-2 py-4 text-sm font-medium text-gray-900 text-center w-16">{advocate.yearsOfExperience}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span>{formatPhoneNumber(advocate.phoneNumber)}</span>
                      <button
                        onClick={() => copyToClipboard(advocate.phoneNumber)}
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                        title="Copy phone number"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        <span className="px-3 py-1">Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>
    </main>
  );
}
