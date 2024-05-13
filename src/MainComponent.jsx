import React, { useState, useEffect } from "react";

function MainComponent() {
    const [itemName, setItemName] = useState("");
    const [amount, setAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(() => {
        const storedTotalAmount = localStorage.getItem("totalAmount");
        return storedTotalAmount ? parseFloat(storedTotalAmount) : 0;
    });
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem("items");
        return storedItems ? JSON.parse(storedItems) : [];
    });

    // Update local storage when totalAmount or items change
    useEffect(() => {
        localStorage.setItem("totalAmount", totalAmount);
    }, [totalAmount]);

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    function addToTotal() {
        if (amount > 0 && itemName.trim() !== "") {
            const newItem = { name: itemName, amount: amount };
            setTotalAmount(prevTotal => prevTotal + amount);
            setItems([...items, newItem]);
            setItemName("");
            setAmount(0);
        }
    }

    function handleAmountChange(e) {
        setAmount(parseFloat(e.target.value));
    }

    function handleItemNameChange(e) {
        setItemName(e.target.value);
    }

    function clearAll() {
        setTotalAmount(0);
        setItems([]);
    }

    return (
        <div>
            <div className="Main-div">
                <div><p className="heading">Expense Tracker</p></div>

                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="Enter Item Name" 
                        value={itemName} 
                        onChange={handleItemNameChange} 
                    />
                </div>

                <div className="input-box">
                    <input 
                        type="number" 
                        placeholder="Enter Amount" 
                        value={amount} 
                        onChange={handleAmountChange} 
                    />
                </div>

                <div className="button">
                    <button onClick={addToTotal}>Submit</button>
                    <button onClick={clearAll}>Clear All</button>
                </div>

                <div className="total">
                    <p>Total: {totalAmount}</p>
                </div>
            </div>
            
            {items.length > 0 && (
                <div className="list">
                    {items.map((item, index) => (
                        <div key={index} className="list-inner">
                            <p className="list-item">{item.name}: ₹{item.amount}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MainComponent;
