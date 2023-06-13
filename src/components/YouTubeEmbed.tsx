import React from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId}: {embedId: string}
     ) => (
  <div className="video-responsive">
    <iframe
      width="420"
      height="240"
      src={`https://www.youtube.com/embed/${embedId.replace("https://youtu.be/", "")}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;