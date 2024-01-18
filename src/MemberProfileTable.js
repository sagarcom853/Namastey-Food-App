import React from 'react';
// import BasicDetails from "./forms/BasicForm"
import { Link } from "react-router-dom"
const MemberInfoTable = ({ title, fields }) => {
    return (
        <div className='member-basic'>
            <div className='flex flex-row justify-between'>
                <h1 className='member-name'>{title}</h1>
                <Link to='/basicform' className='button flex justify-end'>Edit</Link>
            </div>

            <table>
                <tbody>
                    {fields.map((field) => (
                        <tr key={field.label} className='table-row'>
                            <th>{field.label}</th>
                            {field.label.toLowerCase() === 'password' ? <td>****************</td> : <td>{field.value}</td>}{
                            }
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemberInfoTable;
