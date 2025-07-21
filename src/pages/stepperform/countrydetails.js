import React, { useState, useEffect } from "react";
import Select from 'react-select';

export default function Countrydetails({ onChange }) {
    const country = [
        { value: '1', label: 'India' },
        { value: '2', label: 'Afghanistan.' },
        { value: '3', label: 'Albania' }
    ];
    const state = [
        { value: '1', label: 'maharashtra' },
        { value: '2', label: 'Gujarat' },
        { value: '3', label: 'Kerala' }
    ];

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);

    useEffect(() => {
        onChange({
            country: selectedCountry ? selectedCountry.label : '',
            state: selectedState ? selectedState.label : ''
        });
    }, [selectedCountry, selectedState, onChange]);

    return (
        <>
            <div className="flex w-full p-2 ">
                <div className="w-full">
                    <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">Details</h1>
                    <form>
                        <div className="grid gap-2 md:grid-cols-2">
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="country">
                                    Select Country
                                </label>
                                <Select
                                    className="basic-single text-left text-sm text-gray-700 rounded border border-gray-200"
                                    classNamePrefix="select"
                                    options={country}
                                    value={selectedCountry}
                                    onChange={setSelectedCountry}
                                    id="country"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="state">
                                    Select State
                                </label>
                                <Select
                                    className="basic-single text-left text-sm rounded text-gray-700 border border-gray-200"
                                    classNamePrefix="select"
                                    options={state}
                                    value={selectedState}
                                    onChange={setSelectedState}
                                    id="state"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}