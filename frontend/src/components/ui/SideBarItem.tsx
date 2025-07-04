// import type { ReactElement } from "react"


// export function SideBarItem({ text, icon }: {
//     text: string;
//     icon: ReactElement;
// }) {

//     return (
//         <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-slate-200 rounded max-w-48 pl-4 transition-all duration-150">
//             <div className="pr-2">
//                 {icon}
//             </div>
//             <div>
//                 {text}
//             </div>
//         </div>
//     )
// }
// import type { ReactElement } from "react"

// interface SideBarItemProps {
//     text: string;
//     icon: ReactElement;
//     isActive?: boolean;
//     onClick?: () => void;
// }

// export function SideBarItem({ text, icon, isActive = false, onClick }: SideBarItemProps) {
//     return (
//         <div 
//             className={`
//                 flex text-gray-700 py-2 cursor-pointer rounded max-w-48 pl-4 transition-all duration-150
//                 ${isActive 
//                     ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-600' 
//                     : 'hover:bg-slate-200'
//                 }
//             `}
//             onClick={onClick}
//         >
//             <div className="pr-2">
//                 {icon}
//             </div>
//             <div>
//                 {text}
//             </div>
//         </div>
//     )
// }

import type { ReactElement } from "react"

interface SideBarItemProps {
    text: string;
    icon: ReactElement;
    isActive?: boolean;
    onClick?: () => void;
}

export function SideBarItem({ text, icon, isActive = false, onClick }: SideBarItemProps) {
    return (
        <div 
            className={`flex text-gray-700 py-2 cursor-pointer rounded max-w-48 pl-4 transition-all duration-150 ${
                isActive 
                    ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-600' 
                    : 'hover:bg-slate-200'
            }`}
            onClick={onClick}
        >
            <div className="pr-2">
                {icon}
            </div>
            <div>
                {text}
            </div>
        </div>
    )
}