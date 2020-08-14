import React from "react";
import { Route } from "react-router-dom";

import CollectionOverview from "../../components/collection-overview/collection-overview";
import Collection from "../../components/collection/collection";

const ShopPage = ({ match }) => {
    console.log("Match", match);
    return (
        <div className="shop-page">
            <Route
                exact
                path={`${match.path}`}
                component={CollectionOverview}
            />
            <Route
                path={`${match.path}/:collection_Id`}
                component={Collection}
            />
        </div>
    );
};

export default ShopPage;
