import React from "react";

export const Header: React.FC = () => {
    console.log("hello");
    return (
        <header className="flex items-center bg-neutral-300 h-[60px] ">
            <h2 className="text-[28px] font-bold text-amber-500 ml-5">
                universe
            </h2>
        </header>
    );
};
