import React, { Component } from "react";
import { Route } from "react-router-dom";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetechCollectionsStartAsync } from "../../redux/shop/shop.action";

import CollectionOverviewContainer from "../../components/collection-overview/CollectionOverviewContainer";
import Collection from "../../components/collection/collection";
import WithSpinner from "../../components/with-spinner/with-spinner";
import { selectIsCollectionLoaded } from "../../redux/shop/shop.selectors";

const CollectionWithSpinner = WithSpinner(Collection);

class ShopPage extends Component {
    componentDidMount() {
        const { fetechCollectionsStartAsync } = this.props;
        fetechCollectionsStartAsync();
    }
    render() {
        const { match, isCollectionLoaded } = this.props;
        return (
            <div className="shop-page">
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionOverviewContainer}
                />
                <Route
                    path={`${match.path}/:collection_Id`}
                    render={(props) => (
                        <CollectionWithSpinner
                            isLoading={!isCollectionLoaded}
                            {...props}
                        />
                    )}
                />
            </div>
        );
    }
}
const mapStateToProps = createStructuredSelector({
    isCollectionLoaded: selectIsCollectionLoaded,
});
const mapDispatchToProps = (dispatch) => ({
    fetechCollectionsStartAsync: () => dispatch(fetechCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
