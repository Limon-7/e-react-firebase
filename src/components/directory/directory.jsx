import React from "react";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { selectDirectorySections } from "../../redux/directory/directory.selector";

import "./directory.style.scss";
import MenuItem from "../menu-item/menu-item";

const Directory = ({ sections }) => {
    return (
        <div className="directory-menu">
            {sections.map((menuitem) => (
                <MenuItem key={menuitem.id} menuitem={menuitem} />
            ))}
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections,
});
export default connect(mapStateToProps)(Directory);
