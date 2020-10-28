// create database and object store
const dbPromised = idb.open("bolaber", 1, function(upgradeDb) {
  const teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", {unique: false});
});

// function save data
function saveInfoTeam(team) {
  dbPromised
  .then(function(db) {
    const tx = db.transaction("teams", "readwrite");
    const store = tx.objectStore("teams");
    console.log(team);
    store.put(team);
    return tx.complete;
  })
  .then(function() {
    console.log("Team info saved saccessfully.");
    alert("Team saved saccessfully");
  });
}

// get all data (show)
function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
      const tx = db.transaction("teams", "readonly");
      const store = tx.objectStore("teams");
      return store.getAll();
    })
    .then(function(teams) {
      resolve(teams);
    });
  });
}

// get data by_id
function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
      const tx  = db.transaction("teams", "readonly");
      const store = tx.objectStore("teams");
      return store.get(id);
    })
    .then(function(team) {
      resolve(team);
    });
  });
}

// function delete data
function deleteSavedTeam(id) {
  dbPromised
  .then(function(db) {
    const tx = db.transaction("teams", "readwrite");
    const store = tx.objectStore("teams");
    store.delete(id);
    return tx.complete;
  })
  .then(function() {
    console.log("Team was deleted");
    alert("Team deleted successfully");
  });
}
