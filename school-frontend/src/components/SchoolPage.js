"use client";

import React from "react";
import useSWR from "swr";
import axios from "axios";
import { SchoolForm } from "@/components/SchoolForm";
import { SchoolTable } from "@/components/SchoolTable";
import { ConfirmModal } from "@/components/ConfirmModal";
import { SchoolFilters } from "@/components/SchoolFilters";

export const SchoolPage = () => {
    const [isAdding, setAdding] = React.useState(false);
    const [selectedSchoolId, setSelectedSchoolId] = React.useState(null);
    const [filters, setFilters] = React.useState({});

    const queryParams = new URLSearchParams();

    if (filters.region) queryParams.append("region", filters.region);
    if (filters.type) queryParams.append("type", filters.type);
    if (filters.active !== "") queryParams.append("active", filters.active);

    const queryString = queryParams.toString();

    const { data, error, isLoading, mutate } = useSWR([`schools`, queryString], async () => {
        const { data } = await axios.get(`http://localhost:8080/schools?${queryString}`);
        return data;
    });

    const handleDeactivation = async () => {
        try {
            await axios.patch(`http://localhost:8080/schools/${selectedSchoolId}/deactivate`);
            setSelectedSchoolId(null);
            mutate();
        } catch (error) {
            console.error("Failed to deactivate school", error);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold mb-4">Шкільний Реєстр</h1>


            {isAdding ? (
                <SchoolForm setAdding={setAdding} mutate={mutate} />
            ) : (
                <React.Fragment>
                <SchoolFilters onFilterChange={setFilters} />
                <button
                    onClick={() => setAdding(true)}
                    className="px-4 py-2 mb-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Додати нову школу
                </button>
                </React.Fragment>
            )}

            {isLoading && <div>Завантаження...</div>}

            {error && <div className="text-red-500">Помилка завантаження даних</div>}

            {data && <SchoolTable schools={data} onDeactivateClick={setSelectedSchoolId} />}

            {selectedSchoolId && (
                <ConfirmModal
                    onCancel={() => setSelectedSchoolId(null)}
                    onConfirm={handleDeactivation}
                />
            )}
        </div>
    );
};

