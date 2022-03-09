/**
 * Created new unique id for the id given, ingluding the original id at the end of the
 * new id. Makes sure the character before the original id is a letter to keep it unique. 
 * 
 * @param {int} id - id of the wanted item to create longer unique id
 * @param {int} length - length of the unique id returned, default = 6
 * @returns unique id based on id and length given
 */

const createUniqueId = (id, length = 6) => {
  const idLength = id.toString().length;
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const justLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lastRandomI = length - idLength - 1; 

  let uniqueId = '';

  for(let i = 0; i < length - idLength; i++) {
    if (i === lastRandomI) {
      uniqueId += justLetters.charAt(Math.floor(Math.random() * justLetters.length));
    } else {
      uniqueId += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  }

  return uniqueId += id;
}

module.exports = {createUniqueId};