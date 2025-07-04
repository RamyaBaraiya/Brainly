// import { CloseIcon } from "../../icons/CloseIcon";
// import Button from "./Button"

// export function ContentModal({ open, onClose }) {
//     return (
//         <div>
//             {open &&
//                 <div className="w-screen h-screen bg-slate-700 fixed top-0 left-0 opacity-60 flex justify-center">
//                     <div className="flex justify-center flex-col">
//                         <span className="bg-white opacity-100 p-4 rounded">
//                             <div className="flex justify-end">
//                                 <div onClick={onClose}>
//                                     <CloseIcon />
//                                 </div>
//                             </div>
//                             <div>
//                                 <Input placeholder={"Title"} />
//                                 <Input placeholder={"Link"} />
//                             </div>
//                             <div className="flex justify-center ">

//                                 <Button variant="primary" text="submit" />
//                             </div>
//                         </span>
//                     </div>
//                 </div>
//             }
//         </div>
//     )

// }

// function Input({ onchange, placeholder }: { onchange: () => void }) {
//     return <div>
//         <input type="text" className="px-4 py-2 border rounded m-2" onChange={onchange} placeholder={placeholder} />
//     </div>
// }
import { useState,useRef } from "react";
import { CloseIcon } from "../../icons/CloseIcon";
import Button from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../../config";
import axios from 'axios'

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function ContentModal({ open, onClose, onContentAdded }: { open: boolean, onClose: () => void, onContentAdded?: () => void }) {
    const titleref = useRef<HTMLInputElement>(null);
    const LinkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [loading, setLoading] = useState(false);

    async function addContent() {
        const title = titleref.current?.value;
        const link = LinkRef.current?.value;
        if (!title || !link) return;
        setLoading(true);
        try {
            await axios.post(BACKEND_URL+"/content",{
                link,
                type,
                title,
            },{
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            });
            if (onContentAdded) onContentAdded();
            onClose();
        } finally {
            setLoading(false);
        }
    }
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-slate-700 opacity-60" onClick={onClose}></div>

            {/* Modal content (keeps width/height compact like original) */}
            <div className="relative z-10 bg-white p-4 rounded w-[350px]">
                {/* Close button */}
                <div className="flex justify-end mb-2">
                    <button onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>

                {/* Inputs */}
                <div className="mb-4">
                    <Input reference={titleref} placeholder="Title" />
                    <Input reference={LinkRef} placeholder="Link" />
                </div>

                <div>
                    <h1>Type</h1>
                    <div className="flex gap-1 justify-center pb-2">
                        <Button text="youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"}
                            onClick={() => setType(ContentType.Youtube)}
                        />
                        <Button text="twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"}
                            onClick={() => setType(ContentType.Twitter)}
                        />
                    </div>
                </div>

                {/* Submit button */}
                <div className="flex justify-center">
                    <Button onClick={addContent} variant="primary" text={loading ? "Submitting..." : "Submit"} disabled={loading} />
                </div>
            </div>
        </div>
    );
}


