import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectShopItems } from "../../redux/shop/shop.selectors";

import CollectionPreview from "../collection-preview/collection-preview";

import "./collection-overview.style.scss";

const CollectionOverview = ({ collections }) => {
    return (
        <div className="collections-overview">
            {collections.map(({ id, ...otherCollections }) => (
                <CollectionPreview key={id} {...otherCollections} />
            ))}
        </div>
    );
};
const mapStateToProps = createStructuredSelector({
    collections: selectShopItems,
});
export default connect(mapStateToProps)(CollectionOverview);
