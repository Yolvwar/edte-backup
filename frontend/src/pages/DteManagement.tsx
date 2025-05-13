import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const DteManagement = () => {
    const [data, setData] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:8081')
        .then(res => setData(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <div>
        <h1>DTE</h1>
        <div>
            <Link to="/dte/create">Create</Link>
        </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((user, index) => (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.NAME}</td>
                        <td>
                            <Button>Edit</Button>
                            <Button>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <Calendar
      mode="single"
      selected={new Date()}
      onSelect={() => {}}
      className="rounded-md border shadow"
    />
        </div>
    );
}

export default DteManagement;