import React, { useEffect, useState } from "react";

const CustomerForm = ({ customer, onSave } ) => {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');

    useEffect(() => {
        if (customer) {
            setName(customer.name);
            setEmail(customer.email);
        }
    }, [customer]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, email });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit">Save</button>
        </form>
    );

}
export default CustomerForm;