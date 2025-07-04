import Button from '../components/ui/Button';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Card } from '../components/ui/Card';
import { ContentModal } from '../components/ui/ContentModal';
import { useState } from 'react';
import { Sidebar } from '../components/ui/Sidebar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';



export function Dashboard() {

    const [modalOpen, setModalOpen] = useState(false);
    const [filter, setFilter] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(0);
    const [shareEnabled, setShareEnabled] = useState(false);
    const [shareLink, setShareLink] = useState<string | null>(null);
    const contents = useContent(refresh);

    // Filter contents based on selected type
    interface ContentItem {
        _id?: string;
        id?: string;
        type: 'twitter' | 'youtube';
        title: string;
        link: string;
    }
    const filteredContents = filter ? (contents as ContentItem[]).filter((item) => item.type === filter) : (contents as ContentItem[])

    // Handler to trigger refresh after adding content
    const handleContentAdded = () => {
        setRefresh(r => r + 1);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 font-sans">
            <div className="flex flex-1">
                <Sidebar filter={filter} onFilterChange={setFilter} />
                <main className="flex-1 p-4 sm:p-6 md:p-8 lg:ml-72 min-h-screen transition-all">
                    <ContentModal open={modalOpen} onClose={() => setModalOpen(false)} onContentAdded={handleContentAdded} />

                    <div className="flex flex-col sm:flex-row justify-end gap-4 mb-8">
                        <Button
                            onClick={() => setModalOpen(true)}
                            variant="primary"
                            text="Add Content"
                            size="small"
                            startIcon={<PlusIcon size="medium" />}
                        />
                        <Button
                            variant={shareEnabled ? "primary" : "secondary"}
                            size="small"
                            text={shareEnabled ? "Disable Sharing" : "Share Brain"}
                            startIcon={<ShareIcon />}
                            onClick={async () => {
                                if (!shareEnabled) {
                                    // Enable sharing
                                    const response = await axios.post(BACKEND_URL + '/brain/share', {
                                        share: true
                                    }, {
                                        headers: {
                                            "Authorization": localStorage.getItem("token") || ''
                                        }
                                    });
                                    setShareEnabled(true);
                                    setShareLink(window.location.origin + `/brain/${response.data.hash}`);
                                } else {
                                    // Disable sharing
                                    await axios.post(BACKEND_URL + '/brain/share', {
                                        share: false
                                    }, {
                                        headers: {
                                            "Authorization": localStorage.getItem("token") || ''
                                        }
                                    });
                                    setShareEnabled(false);
                                    setShareLink(null);
                                }
                            }}
                        />
                    </div>
                    {shareEnabled && shareLink && (
                        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-purple-100 p-2 rounded break-all">
                            <span className="text-sm font-medium">Share this link:</span>
                            <a href={shareLink} className="text-blue-600 underline break-all" target="_blank" rel="noopener noreferrer">{shareLink}</a>
                            <button
                                className="sm:ml-2 px-2 py-1 bg-gray-200 rounded text-xs mt-1 sm:mt-0"
                                onClick={() => {
                                    navigator.clipboard.writeText(shareLink);
                                }}
                            >Copy</button>
                        </div>
                    )}
                    {/* Responsive Cards Grid */}
                    <div className="flex flex-wrap -m-2 gap-6">
                        {filteredContents.map((item) => (
                            <Card
                                key={item._id || item.id}
                                id={item._id || item.id || ''}
                                type={item.type}
                                link={item.link}
                                title={item.title}
                                onDelete={() => setRefresh(r => r + 1)}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}