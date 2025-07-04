import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Card } from '../components/ui/Card';

interface ContentItem {
  _id?: string;
  id?: string;
  type: 'twitter' | 'youtube';
  title: string;
  link: string;
  // tags?: string[]; // Not used in Card
}

interface BrainData {
  username: string;
  content: ContentItem[];
}

export default function PublicBrain() {
  const { shareLink } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<BrainData | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${BACKEND_URL}/brain/${shareLink}`);
        setData(res.data);
      } catch {
        setError('Invalid link or sharing disabled');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [shareLink]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold mb-4">{data.username}'s Brain</h2>
      <div className="flex gap-4 flex-wrap justify-center">
        {data.content.map((item) => (
          <Card
            key={item._id || item.id}
            id={item._id || item.id || ''}
            type={item.type}
            link={item.link}
            title={item.title}
            // No onDelete for public view
          />
        ))}
      </div>
    </div>
  );
}
