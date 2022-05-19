import { request } from 'express';
import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1);

  const trx = jateDb.transaction('jate', 'readwrite');

  const store = trx.objectStore('jate');

  request = store.put({id: 1, value: content});

  const res = await request;

  console.log('data saved to the database', res);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);

  const trx = jateDb.transaction('todos', 'readonly');

  const store = trx.objectStore('jate');
  
  request = store.getAll();

  await request;
  console.log('res.value', res);
  return res;
};

initdb();
