import React from "react";
import PropTypes from "prop-types";

interface YoutubeEmbedProps {
  embedId: string;
}

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ embedId }) => {
  // Check if the embedId is a YouTube link
  const isYoutubeLink = embedId.includes("youtube.com") || embedId.includes("youtu.be");

  if (isYoutubeLink) {
    // Extract the YouTube video ID
    const youtubeEmbedId = embedId.replace("https://youtu.be/", "");
    
    // Render for YouTube videos
    return (
      <div className="video-responsive">
        <iframe
          width="420"
          height="240"
          src={`https://www.youtube.com/embed/${youtubeEmbedId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    );
  } else {
    // Render for other video sources (assuming it's from lvpr.tv)
    return (
      <div className="video-responsive">
        <iframe
          src={`https://lvpr.tv?v=${embedId}`}
          allowFullScreen
          allow="autoplay; encrypted-media; picture-in-picture"
          sandbox="allow-scripts"
        />
      </div>
    );
  }
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;
