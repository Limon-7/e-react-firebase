import React from "react";
import { connect } from "react-redux";

import { selectCollection } from "../../redux/shop/shop.selectors";

import CollectionItem from "../collection-item/collection-item";

import "./collection.style.scss";

const Collection = ({ collections, match }) => {
    console.log(collections);
    console.log("Get Match Props:", match);
    const { title, items } = collections;
    return (
        <div className="collection">
            <h2 className="title">{title}</h2>
            <div className="items">
                {items.map((item) => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};
const mapStateToProps = (state, ownProps) => ({
    collections: selectCollection(ownProps.match.params.collection_Id)(state),
});
export default connect(mapStateToProps)(Collection);
