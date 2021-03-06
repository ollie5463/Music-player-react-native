import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ListItem, SearchBar, ButtonGroup } from 'react-native-elements';
import {
  FlatList,
  View,
} from 'react-native';
import _ from 'lodash';
import Helper from '../Helper';
import Sounds from '../components/Sounds';

export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fullData: [],
      search: '',
      selectedIndex: 1,
      currentSong: null
    };
  }

  componentDidMount = () => {
    getSongs().then((songs) => {
      const data = songs.rows._array;
      this.setState({ data });
      this.setState({ fullData: data });
      }
    );
  }

  updateIndex = selectedIndex => {
    if (selectedIndex === 1) {
        getSongs().then((songs) => {
          const data = songs.rows._array;
          this.setState({ data });
          this.setState({ fullData: data });
          }
        );
    } else {
      getAlbums().then((albums) => {
      const data = albums.rows._array;
        this.setState({ data });
        this.setState({ fullData: data });
        }
      );
    }
    this.setState({selectedIndex})
  }

  stopCurrentSong = song => {
    if (song) {
      Sounds.sounds[song].stopAsync();
    }
  }

  shuffleSong = () => {
    this.stopCurrentSong(this.state.currentSong);
    const randomSongIndex = Math.floor(Math.random() * this.state.fullData.length);
    const randomSong = this.state.fullData[randomSongIndex].Name;
    this.setState({ currentSong: randomSong })
    Sounds.sounds[randomSong].playAsync();
  }

  playSong = song => {
    this.stopCurrentSong(this.state.currentSong);
    this.setState({ currentSong: song });
    Sounds.sounds[song].playAsync();
  }

  handleSearch = search => {
    const formattedQuery = search.toLowerCase();
    const data = _.filter(this.state.fullData, user => {
      return contains(user, formattedQuery);
    });
    this.setState({ search, data });
  }


  render() {
      return (
        <View>
          <SearchBar placeholder="Type here..."
              lightTheme round
              onChangeText={this.handleSearch}
              value={this.state.search}
            />
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                onPress={() => { this.playSong(item.Name) }}
                title={item.Name}/>
            )}
            keyExtractor={item => item.Name}
          />
          <View>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={this.state.selectedIndex}
              buttons={['By Albums', 'By Songs']}
            />
          </View>
            <View style={{ paddingLeft: 150, alignContent: "center"}}>
            <Ionicons name="ios-shuffle" size={100} onPress={this.shuffleSong}/>
            </View>
        </View>
      );
  }
}

SearchScreen.navigationOptions = {
  title: 'Search screen',
};

function contains({ Name }, query) {
  if (Name.includes(query)) {
    return true;
  }
  return false;
}

function getAlbums() {
  return new Promise((resolve) => {
    const dataBase = Helper.database;
    dataBase.DB.transaction(tx => {
        tx.executeSql(`SELECT * FROM Album`, [], (tx, result) => {
          resolve(result);
        })
    });
  })
}

function getSongs() {
  return new Promise((resolve) => {
    const dataBase = Helper.database;
    dataBase.DB.transaction(tx => {
        tx.executeSql(`SELECT * FROM Song`, [], (tx, result) => {
          resolve(result);
        })
    });
  })
}
