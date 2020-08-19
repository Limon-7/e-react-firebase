import React from "react";

import "./with-spinner.style.scss";

const WithSpinner = (WrappedComponent) => {
    const Spinner = ({ isLoading, ...otherProbs }) => {
        return isLoading ? (
            <div className="spinner">
                <div className="spinner-container"></div>
            </div>
        ) : (
            <WrappedComponent {...otherProbs} />
        );
    };
    return Spinner;
};
export default WithSpinner;
