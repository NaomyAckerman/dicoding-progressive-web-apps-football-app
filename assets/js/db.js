let dbPromised = idb.open("football-app", 1, upgradeDb => {
    let teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id",
    });
    teamsObjectStore.createIndex("name", "name", {
        unique: false,
    });
});

function getAll() {
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(teams => resolve(teams));
    });
};

function saveForTeam(team) {
    dbPromised
        .then(db => {
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            store.add(team);
            return tx.complete;
        })
        .then(() => {
            return M.toast({
                html: "Team berhasil disimpan ke favorit"
            });
        });
};

function deleteSavedTeamById(id) {
    dbPromised
        .then(db => {
            id = parseInt(id);
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            store.delete(id);
            return tx.complete;
        })
        .then(() => {
            return M.toast({
                html: "Team berhasil dihapus dari favorit"
            });
        });
}

function getById(id) {
    id = parseInt(id);
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                let tx = db.transaction("teams", "readonly");
                let store = tx.objectStore("teams");
                return store.get(id);
            })
            .then(team => resolve(team))
            .catch(error => reject(error));
    });
}