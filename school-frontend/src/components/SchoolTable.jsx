import React from "react";

export const SchoolTable = ({ schools, onDeactivateClick }) => {
    const cellClass = "px-4 py-2 border";
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm text-left">
                <thead className="bg-gray-100">
                <tr>
                    <th className={cellClass}>Назва Школи</th>
                    <th className={cellClass}>ЄДРПОУ</th>
                    <th className={cellClass}>Регіон</th>
                    <th className={cellClass}>Тип</th>
                    <th className={cellClass}>Статус</th>
                    <th className={cellClass}>Дата запису</th>
                    <th className={cellClass}>Деактивувати</th>
                </tr>
                </thead>
                <tbody>
                {schools.map((school) => (
                    <tr key={school.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{school.name}</td>
                        <td className="px-4 py-2 border">{school.edrpou}</td>
                        <td className="px-4 py-2 border">{school.region}</td>
                        <td className="px-4 py-2 border">{school.type}</td>
                        <td className="px-4 py-2 border">
                <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                        school.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                  {school.active ? "Active" : "Inactive"}
                </span>
                        </td>
                        <td className="px-4 py-2 border">
                            {new Date(school.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 border">
                            {school.active ? (
                                <button
                                    onClick={() => onDeactivateClick(school.id)}
                                    className="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-100"
                                >
                                    Деактивувати
                                </button>
                            ) : (
                                <span className="text-gray-400 text-sm italic">—</span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
