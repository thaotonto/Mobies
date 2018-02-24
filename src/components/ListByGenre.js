import React, {Component} from 'react';
import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import ListByCategory from '../components/ListByCategory';
import ItemTab from '../components/ItemTab';
import { MOVIE_GENRE_SELECTED, TV_GENRE_SELECTED, LOAD_MOVIE_BY_GENRE, LOAD_TV_BY_GENRE } from '../configs/constants';
import {connect} from 'react-redux';

class ListByGenre extends React.Component {
    // state = {
    //     selectedItem: undefined
    // }

    _keyExtractor = (item, index) => item.id.toString();

    _onPressItem = (id) => {
        if (this.props.selectedGenre != id) {
            this.props.dispatch({type: this.props.type === 'movie' ? LOAD_MOVIE_BY_GENRE : LOAD_TV_BY_GENRE, payload: id})
            this.props.dispatch({type: this.props.type === 'movie' ? MOVIE_GENRE_SELECTED : TV_GENRE_SELECTED, payload: id});
            this.setState(state => {
                return {selectedItem: id}
            });
        }
    };

    _renderItem = ({item}) => {
        return( 
            <ItemTab
                id={item.id}
                onPressItem={this._onPressItem}
                selected={this.props.selectedGenre}
                title={item.name.toUpperCase()}
                style={styles.itemTabStyle}
            />
        );
    }

    renderGenre() {
        if (this.props.selectedGenre != undefined) {
            if (!this.props.listByGenre.loadingGenres) {
                return(
                    <ListByCategory
                        title={''}
                        loading={false}
                        list={this.props.listByGenre.byGenre}
                        navigation={this.props.navigation}  
                        itemWidth={153}   
                        style={{marginLeft: 0, marginTop: 0}}          
                    />
                );
            }
            else return (
                <ActivityIndicator style={{margin: 8}} size='large' color='#ff9900'/>
            );
        } else {
            return null;
        }
    }

    render() {
        if (!this.props.loading) {
            return(
                <View style={styles.container}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.props.list.genres}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        extraData={this.state}
                    />
                    {this.renderGenre()}
                </View>
            );
        }
        else return null;
    }
}

const styles = {
    container: {
        flex: 1,
        marginLeft:8,
        marginRight: 8,
        marginBottom: 16,
    },
    itemTabStyle: {
        paddingRight: 10,
        paddingBottom: 10
    }
}

const mapStateToProps = state => ({
    listByGenre: state.listByGenre
});

export default connect(mapStateToProps)(ListByGenre);