"use client"
import React from "react";
import { useState } from "react";

const page = () => {
    const [count, setCount] = useState(0)

    return (
        <div className="text-center py-10">
            <h1 className="text-orange-700 text-3xl">About</h1>
            <p className="text-orange-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <p>Count: {count}</p>
        </div>
    );
};

export default page;