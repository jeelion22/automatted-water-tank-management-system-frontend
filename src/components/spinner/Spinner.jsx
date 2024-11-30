import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
  return (
    <div className="container">
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div className="col text-center">
          <FontAwesomeIcon icon={faSpinner} spinPulse size="4x" />
          <h6 className="mt-4">Loading...</h6>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
