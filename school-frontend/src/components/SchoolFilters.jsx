import { useForm, Controller } from 'react-hook-form';
import React, { useEffect } from 'react';

export const SchoolFilters = ({ onFilterChange }) => {
    const { register, control, watch } = useForm({
        defaultValues: {
            region: '',
            type: '',
            active: '',
        },
    });

    const region = watch("region");
    const type = watch("type");
    const active = watch("active");

    useEffect(() => {
        const values = { region, type, active };
        onFilterChange(values);
    }, [region, type, active, onFilterChange]);

    const inputClass = "border border-gray-300 px-3 py-2 rounded w-full";

    return (
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
                {...register("region")}
                placeholder="Фільтр по регіону"
                className={inputClass}
            />

            <Controller
                control={control}
                name="type"
                render={({ field }) => (
                    <select {...field} className={inputClass}>
                        <option value="">Усі типи</option>
                        <option value="GYMNASIUM">Гімназія</option>
                        <option value="LYCEUM">Ліцей</option>
                        <option value="ZZSO">ЗЗСО</option>
                    </select>
                )}
            />

            <Controller
                control={control}
                name="active"
                render={({ field }) => (
                    <select {...field} className={inputClass}>
                        <option value="">Усі</option>
                        <option value="true">Активні</option>
                        <option value="false">Неактивні</option>
                    </select>
                )}
            />
        </form>
    );
};
