import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

const schema = z.object({
    name: z.string().min(1),
    edrpou: z.string().min(1),
    region: z.string().min(1),
    type: z.string().min(1),
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Name" {...register("name")} />
            <input placeholder="EDRPOU" {...register("edrpou")} />
            <input placeholder="Region" {...register("region")} />
            <Controller
                name="type"
                control={control}
                render={({ field }) => (
                    <select {...field}>
                        <option value="">Select Type</option>
                        <option value="GYMNASIUM">Гімназія</option>
                        <option value="LYCEUM">Ліцей</option>
                        <option value="ZZSO">ЗЗСО</option>
                    </select>
                )}
            />
            <button type="submit">Submit</button>
        </form>
    );
};
