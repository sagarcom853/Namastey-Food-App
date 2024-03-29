import React from 'react';
const MemberInfoTable = ({ title, fields }) => {
    return (
        <div className='member-basic'>
            <div className='flex flex-row justify-between'>
                <h1 className='text-[#00416a] font-bold text-xl'>{title}</h1>

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
