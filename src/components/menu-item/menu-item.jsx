import React from "react";
import { withRouter } from "react-router-dom";
import "./menu-item.style.scss";
const MenuItem = ({ menuitem, history, match }) => {
    return (
        <div
            className={`${menuitem.size} menu-item`}
            onClick={() => history.push(`${match.url}${menuitem.linkUrl}`)}
        >
            <div
                className="background-image"
                style={{ backgroundImage: `url(${menuitem.imageUrl})` }}
            />
            <div className="content">
                <h1 className="title">{menuitem.title.toUpperCase()}</h1>
                <span className="subtitle">Shop Now</span>
            </div>
        </div>
    );
};
export default withRouter(MenuItem);
