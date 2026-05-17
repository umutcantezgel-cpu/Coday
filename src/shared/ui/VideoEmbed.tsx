import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { JsonLd } from '@/shared/ui/JsonLd';

interface VideoEmbedProps {
  id: string; // YouTube Video ID
  title: string;
  description: string;
  uploadDate: string; // ISO 8601 (e.g., '2024-05-01')
  duration?: string; // ISO 8601 (e.g., 'PT5M30S')
  thumbnailUrl?: string; // Fallbacks to YouTube default if not provided
  className?: string;
  poster?: 'hqdefault' | 'maxresdefault' | 'sddefault';
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({
  id,
  title,
  description,
  uploadDate,
  duration,
  thumbnailUrl,
  className = '',
  poster = 'maxresdefault',
}) => {
  const finalThumbnailUrl = thumbnailUrl || `https://i.ytimg.com/vi/${id}/${poster}.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${id}`;
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-gray-900 shadow-2xl ${className}`}
    >
      <JsonLd
        data={{
          video: {
            name: title,
            description,
            thumbnailUrl: finalThumbnailUrl,
            uploadDate,
            duration,
            embedUrl,
            contentUrl: watchUrl,
          },
        }}
      />
      <LiteYouTubeEmbed
        id={id}
        title={title}
        poster={poster}
        wrapperClass="yt-lite"
        playerClass="lty-playbtn"
      />
    </div>
  );
};
