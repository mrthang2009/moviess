import ReactPlayer from 'react-player';
import PropTypes from "prop-types";
const VideoPlayer = ({ linkEmbed }) => {
  return (
    <div className="video-player-wrapper">
      <ReactPlayer
        url={linkEmbed} // Sử dụng link_embed từ data của bạn
        controls // Hiển thị các controls của video player
        width="100%" // Độ rộng của player
        height="100%" // Độ cao của player
      />
    </div>
  );
};
VideoPlayer.propTypes = {
    linkEmbed: PropTypes.string.isRequired,
  };
export default VideoPlayer;
