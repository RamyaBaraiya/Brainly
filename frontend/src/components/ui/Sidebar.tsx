// // import { XIcon } from "../../icons/XIcon";
// // import { YoutubeIcon } from "../../icons/YoutubeIcon";
// // import { SideBarItem } from "./SideBarItem";
// // import { Logo } from "../../icons/Logo";


// // export function Sidebar(){

// //     return (
// //         <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
// //             <div className="flex text-2xl pt-4   items-center">
// //                 <div className="pr-2 text-purple-600">
// //                     <Logo/>
// //                 </div>
// //                 Brainly
// //             </div>
// //             <div className="pt-8 pl-4">
// //                 <SideBarItem text="X" icon={<XIcon/>}/>
// //                 <SideBarItem text="Youtube" icon={<YoutubeIcon/>}/>
// //             </div>
// //         </div>
// //     )


import { useState } from "react";
import { XIcon } from "../../icons/XIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SideBarItem } from "./SideBarItem";
import { Logo } from "../../icons/Logo";
import { AllIcon } from "../../icons/AllIcon";

// Hamburger Menu Icon Component
function MenuIcon() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
}

// Close Icon Component
function CloseIcon() {
    return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}

interface SidebarProps {
    filter?: string | null;
    onFilterChange?: (filter: string | null) => void;
}

export function Sidebar({ filter, onFilterChange }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Sidebar filter items
    const items = [
        { text: 'All', icon: <AllIcon/>, value: null },
        { text: 'X', icon: <XIcon />, value: 'twitter' },
        { text: 'Youtube', icon: <YoutubeIcon />, value: 'youtube' },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div className={`
                h-screen bg-gradient-to-b from-purple-50 via-white to-purple-100 border-r w-72 fixed left-0 top-0 pl-6 z-40 transition-transform duration-300 ease-in-out shadow-xl
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex text-3xl pt-6 items-center font-extrabold tracking-tight text-purple-700">
                    <div className="pr-2 text-purple-600">
                        <Logo />
                    </div>
                    Brainly
                </div>
                <div className="pt-10 pl-2 flex flex-col gap-3">
                    {items.map((item) => (
                        <SideBarItem
                            key={item.text}
                            text={item.text}
                            icon={item.icon}
                            isActive={filter === item.value || (item.value === null && !filter)}
                            onClick={() => {
                                if (onFilterChange) {
                                    onFilterChange(item.value);
                                }
                                setIsOpen(false); // close on mobile
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}


