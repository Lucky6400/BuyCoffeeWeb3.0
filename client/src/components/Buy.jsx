import { useState } from 'react'
import './buy.css'
import { ethers } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';

const Buy = ({ state }) => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const name = formData.name;
            const message = formData.message;

            if (!name || !message) {
                toast.error("Please enter a value");
                return false;
            }
            const { contract } = state;

            const amount = {
                value: ethers.utils.parseEther(String(0.001))
            }
            const transaction = await contract.buyChai(name, message, amount);
            await transaction.wait();
            toast.success("transaction successfull");

            console.log(name, message);
        } catch (error) {
            toast.error(error.code)
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        setFormData(p => ({
            ...p, [e.target.id]: e.target.value
        }))
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} placeholder="Enter name" id="name" type="text" />
                <input onChange={handleChange} placeholder="Enter message" id="message" type="text" />
                <button disabled={loading}>Buy</button>
            </form>
            <Toaster />
        </>
    )
}

export default Buy