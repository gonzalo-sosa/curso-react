import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHearRegular } from "@fortawesome/free-regular-svg-icons";

type Props = {
  liked: boolean;
  onClick: () => void;
};

const Like: React.FC<Props> = ({ liked, onClick }) => {
  return (
    <FontAwesomeIcon
      onClick={onClick}
      icon={liked ? faHeartSolid : faHearRegular}
    />
  );
};

export default Like;
