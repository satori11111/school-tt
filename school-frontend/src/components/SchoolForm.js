import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

const schema = z.object({
    name: z
        .string()
        .min(2, "Назва повинна містити щонайменше 2 символи")
        .max(100, "Назва занадто довга")
        .regex(/^[А-Яа-яA-Za-z0-9\s-]+$/, "Назва повинна містити лише літери, цифри, пробіли та дефіси"),

    edrpou: z
        .string()
        .length(8, "ЄДРПОУ повинен містити рівно 8 цифр")
        .regex(/^\d{8}$/, "ЄДРПОУ повинен містити лише цифри"),

    region: z
        .string()
        .min(2, "Регіон повинен містити щонайменше 2 символи")
        .max(100, "Назва регіону занадто довга")
        .regex(/^[А-Яа-яA-Za-z\s-]+$/, "Регіон повинен містити лише літери, пробіли та дефіси"),

    type: z.enum(["GYMNASIUM", "LYCEUM", "ZZSO"], {
        errorMap: () => ({ message: "Оберіть тип навчального закладу" }),
    }),
});

export const SchoolForm = ({ setAdding, mutate }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (formData) => {
        await axios.post('http://localhost:8080/schools', { ...formData, active: true });
        setAdding(false);
        mutate();
    };

    const inputClass = (fieldName) =>
        `block w-full border rounded px-3 py-2 ${
            errors[fieldName] ? 'border-red-500' : 'border-gray-300'
        }`;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>

                <div>
                    <input
                        placeholder="Назва Школи"
                        {...register("name")}
                        className={inputClass("name")}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <input
                        placeholder="ЄДРПОУ (8 цифр)"
                        {...register("edrpou")}
                        className={inputClass("edrpou")}
                    />
                    {errors.edrpou && <p className="text-red-500 text-sm mt-1">{errors.edrpou.message}</p>}
                </div>

                <div>
                    <input
                        placeholder="Регіон"
                        {...register("region")}
                        className={inputClass("region")}
                    />
                    {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>}
                </div>

                <div>
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <select {...field} className={inputClass("type")}>
                                <option value="">Оберіть тип</option>
                                <option value="GYMNASIUM">Гімназія</option>
                                <option value="LYCEUM">Ліцей</option>
                                <option value="ZZSO">ЗЗСО</option>
                            </select>
                        )}
                    />
                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
                </div>

                <div className="flex gap-4">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Додати
                    </button>
                    <button
                        type="button"
                        onClick={() => setAdding(false)}
                        className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                    >
                        Назад
                    </button>
                </div>
            </div>
        </form>
    );
};
