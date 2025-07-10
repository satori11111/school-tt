"use client";


import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import useSWR from "swr";
import axios from 'axios';
import {Spinner} from "@heroui/spinner";
import {Chip} from "@heroui/chip";
import React from "react";
import {SchoolForm} from "@/components/SchoolForm";


import {Button} from "@heroui/button";
import {useToast} from "@heroui/toast";

export const SchoolPage = () => {
    const [isAdding, setAdding] = React.useState(false);
    const { toast } = useToast();
    const { data, error, isLoading, mutate } = useSWR('/api/schools',async () => {
        const {data} = await axios.get('http://localhost:8080/schools');
        return data;
    });

    if (isLoading) return <div className="p-4"><Spinner label="Loading..." /></div>

    if (error) return <div className="p-4 text-red-500">Failed to load data</div>

    const handleDeactivation = async (id) => {
        try {
            await axios.patch(`http://localhost:8080/schools/${id}/deactivate`);
            toast({
                title: "Success",
                description: "School successfully deactivated",
                status: "success", // use "success", "error", "warning", "info"
                duration: 3000,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to deactivate the school",
                status: "error",
                duration: 3000,
            });
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">School Registry</h1>
            {
                isAdding ? <SchoolForm setAdding={setAdding} mutate={mutate} /> :  <Button onPress={() => setAdding(true)}>New</Button>
            }
            <Table
                aria-label="Schools Table"
            >
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>EDRPOU</TableColumn>
                    <TableColumn>Region</TableColumn>
                    <TableColumn>Type</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Created</TableColumn>
                    <TableColumn>Deactivate</TableColumn>
                </TableHeader>
                <TableBody>
                    {data?.map((school) => (
                        <TableRow key={school.id}>
                            <TableCell>{school.name}</TableCell>
                            <TableCell>{school.edrpou}</TableCell>
                            <TableCell>{school.region}</TableCell>
                            <TableCell>{school.type}</TableCell>
                            <TableCell>
                                <Chip
                                    color={school.active ? 'success' : 'danger'}
                                    variant="flat"
                                    size="sm"
                                >
                                    {school.active ? 'Active' : 'Inactive'}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                {new Date(school.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Button onPress={() => handleDeactivation()}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
};