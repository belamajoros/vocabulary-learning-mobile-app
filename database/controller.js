var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'words', createFromLocation: '~words.db'});

export const getAllWords = (mail) => {
    return new Promise((resolve, reject) => {
        let obj = {
            res: [],
            empty: true,
            message: '',
        }
        db.transaction((tx) => {
            tx.executeSql('SELECT word FROM Words WHERE user=?', [mail], (tx, results) => {
                let len = results.rows.length;
                let result = [];
                if( len > 0){
                    for(let i = 0; i < len; i++){
                        let item = results.rows.item(i);
                        result.push(item.word);
                    }
                    obj.res = result;
                    obj.empty = false;
                    resolve({ result: obj.res, empty: obj.empty });
                }
            }, (error) => {
                resolve({ result: obj.res, empty: obj.empty });
            });
        })
    });
}

export const deleteChosenWord = (mail, word) => {
    return new Promise((resolve, reject) => {
        let modal = false;
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM Words WHERE user=? AND word=?', [mail, word], (tx, results) => {
                if(results.rowsAffected > 0){
                    modal = true;
                    resolve({ result: modal });
                }
            }, (error) => {
                resolve({ result: modal });
            });
        })
    });
}

export const addChosenWord = (mail, word) => {
    return new Promise((resolve, reject) => {
        let modal = false;
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO Words (user, word) VALUES (?,?)', [mail, word], (tx, results) => {
                if( results.rowsAffected > 0) {
                    modal = true;
                    resolve({ result: modal });
                }
            }, (error) => {
                resolve({ result: modal });
            });
        });
    });
}