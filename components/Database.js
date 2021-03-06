import { SQLite } from 'expo-sqlite';

export class Database {
    constructor() {
        this.DB = SQLite.openDatabase('myDB', 1);
        this.resetTables();
        this.createDBTables();
        this.createDBEntries();
    }
    createDBEntries() {
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Album (Name) values ('album1');`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Album (Name) values ('album2');`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Album (Name) values ('album3');`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Playlist (Name) values ('Michaels playlist');`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Playlist (Name) values ('Ollies playlist');`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Song (Name, Playlist_ID) values ('classical_music_1', 1);`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Song (Name, Playlist_ID) values ('classical_music_2', 2);`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Song (Name, Playlist_ID) values ('dnb1', 2);`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Song (Name, Playlist_ID) values ('dnb2', 1);`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Song (Name) values ('dnb4');`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Song (Name) values ('classical_music_3');`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Song (Name) values ('classical_music_4');`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Song (Name) values ('dnb3');`)
        });
        this.DB.transaction(tx => {
            tx.executeSql(`INSERT INTO Song (Name, Playlist_ID) values ('background_music', 2);`)
        });
    }

    resetTables() {// Drop tables
        this.DB.transaction(tx => {
            tx.executeSql('DROP TABLE Playlist')
        });
        this.DB.transaction(tx => {
            tx.executeSql('DROP TABLE Album')
        });
        this.DB.transaction(tx => {
            tx.executeSql('DROP TABLE Song')
        });
    }

    createDBTables() {    
        this.DB.transaction(tx => { // Album
            tx.executeSql(
                `CREATE TABLE Album (
                    ID INTEGER PRIMARY KEY,
                    Name varchar(255) 
                    );`)
                });
        this.DB.transaction(tx => { // Playlist
            tx.executeSql(
                `CREATE TABLE Playlist (
                    ID INTEGER PRIMARY KEY,
                    Name varchar(255)
                );`)
        });
        this.DB.transaction(tx => { // Song
            tx.executeSql(
                `CREATE TABLE Song (
                    ID INTEGER PRIMARY KEY,
                    Name varchar(255),
                    Album_ID INTEGER,
                    Playlist_ID INTEGER,
                    FOREIGN KEY(Album_ID) REFERENCES Album(ID),
                    FOREIGN KEY(Playlist_ID) REFERENCES Playlist(ID)
                );`)
        });
    }

    printTables() {
        this.DB.transaction(tx => {
            tx.executeSql(`SELECT * FROM Album`, [], (tx, result) => {
                console.log('Albumsss >>>>>', result)
            })
        });
        this.DB.transaction(tx => {
            tx.executeSql(`SELECT * FROM Playlist`, [], (tx, result) => {
                console.log('Playlistt >>>>>', result)
            })
        });
        this.DB.transaction(tx => {
            tx.executeSql(`SELECT * FROM Song`, [], (tx, result) => {
                console.log('Songss >>>>>', result)
            })
        });
    }
}

export default Database;