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

const addPlacements = (placements, index, pair, add) => {
  if (placements[index]) {
    if (placements[index][pair]) {
      placements[index][pair] += add;
    } else {
      placements[index][pair] = add;
    }
  } else {
    placements[index] = {};
    placements[index][pair] = add;
  }
}

const getMaxValueOfObj = (obj) => {
  return Math.max(...Object.values(obj));
}

const getMinValueOfObj = (obj) => {
  return Math.min(...Object.values(obj));
}

function getPairsByValue(object, maxValue) {
  const returnArray = []
  for (const [key, value] of Object.entries(object)) {
    if (value === maxValue) {
      returnArray.push(key);
    }
  }
  return returnArray;
}

const getPairsOfMajorityAsObject = (obj, majority) => {
  for ( const pair in obj) {
    if(obj[pair] < majority) {
      delete obj[pair];
    }
  }
  return obj;
}

const deletePlacedPairInObj = (obj, key) => {
  delete obj[key];
}

const deletePlacedPairInPlacements = (placements, index, key) => {
  for (let i = index + 1; i < placements.length;  i++) {
    delete placements[i][key];
  }
}

const resolveWithSum = (originalPlacements, placementLevel, pairsWithEqualMajority) => {
  const sums = {};
  for(let i = 0; i < pairsWithEqualMajority.length; i++) {
    sums[pairsWithEqualMajority[i]] = 0;
  }

  for (let i = 0; i <= placementLevel; i++) {
    const row = originalPlacements[i];
    for(let j = 0; j < pairsWithEqualMajority.length; j++) {
      if (row[pairsWithEqualMajority[j]]) {
        sums[pairsWithEqualMajority[j]] += row[pairsWithEqualMajority[j]] * i;
      }
    }
  }
  const minValue = getMinValueOfObj(sums);
  const pairsWithMinValue = getPairsByValue(sums, minValue);
  if (pairsWithMinValue.length === 1) {
    return pairsWithMinValue[0];
  }

  return false;
}

const resolveWithNextLevels = (originalPlacements, placementLevel, placements) => {
  for(let i = ++placementLevel; i < placements.length; i++) {
    const maxValue = getMaxValueOfObj(placements[i]);
    const pairsWithMaxValue = getPairsByValue(placements[i], maxValue);
    if (pairsWithMaxValue.length === 1) {
      return pairsWithMaxValue[0];
    } else {
      const resolvedWithSum = resolveWithSum(originalPlacements, i, pairsWithMaxValue);
      if (resolvedWithSum) {
        return resolvedWithSum;
      }
    }
  }
  
  return false;
}

const transpose = (array) => {
  return array.reduce(($, row) => row.map((_, i) => [...($[i] || []), row[i]]), []);
}

const resolveWithJudgeComparison = (votesInColumns, pairsWithEqualMajority) => {
  const higherCounts = {}
  const placements = [];

  // place keys
  for(let i = 0; i < pairsWithEqualMajority.length; i++) {
    higherCounts[pairsWithEqualMajority[i]] = 0;
    placements[i] = [];
  }

  // get placements by judge
  for (const [index, pair] of pairsWithEqualMajority.entries()) {
    for (let i = 0; i < votesInColumns.length; i++) {
      for (let j = 0; j < votesInColumns[i].length; j++) {
        if (pair === votesInColumns[i][j].toString()) {
          placements[index].push(j + 1);
        }
      }
    }
  }

  const placementsInColumns = transpose(placements);

  // Check higher scores. Works for two couples
  for (const [index, pair] of pairsWithEqualMajority.entries()) {
    for (let j = 0; j < placementsInColumns.length; j++) {
      if (index !== pairsWithEqualMajority.length -1) {
        if (placementsInColumns[j][index] <= placementsInColumns[j][index + 1]) {
          higherCounts[pair]++;
        } else {
          higherCounts[pairsWithEqualMajority[index + 1]]++;
        }
      }
    }
  }

  const maxValue = getMaxValueOfObj(higherCounts);
  const pairsWithMaxValue = getPairsByValue(higherCounts, maxValue);
  if (pairsWithMaxValue.length === 1) {
    return pairsWithMaxValue[0];
  }
  
  return false;
}

const countVotes = (votes) => {
  const majority = Math.ceil(votes.length / 2);
  const votesInColumns = transpose(votes);
  const originalPlacements = [];
  const placements = [];
  const lastIndex = votesInColumns.length-1;

  for (let i = 0; i < votesInColumns.length; i++) { // placement (pairs who got i placements)
    for (let j = 0; j < votesInColumns[i].length; j++) { // judge
      const pair = votesInColumns[i][j];
      addPlacements(placements, i, pair, 1);
      addPlacements(originalPlacements, i, pair, 1);
    }
    if( i !== lastIndex ) {
      placements[i+1] = {...placements[i]};
    } 
  }

  const results = [];

  for (let i = 0; i < placements.length; i++) {
    const row = placements[i];
    const majoritiesObj = getPairsOfMajorityAsObject(row, majority);
    const length = Object.keys(majoritiesObj).length;
    for (let j = 0; j < length; j++) {
      const maxValue = getMaxValueOfObj(majoritiesObj);
      const pairsWithMaxValue = getPairsByValue(majoritiesObj, maxValue);
      if (pairsWithMaxValue.length === 1) {
        results.push(pairsWithMaxValue[0]);
        deletePlacedPairInObj(majoritiesObj, pairsWithMaxValue[0]);
        deletePlacedPairInPlacements(placements, i, pairsWithMaxValue[0]);
      } else {
        const resolvedWithSum = resolveWithSum(originalPlacements, i, pairsWithMaxValue);
        if (!resolvedWithSum) {
          const resolvedWithNextLevels = resolveWithNextLevels(originalPlacements, i, placements)
          if (!resolvedWithNextLevels) {
            const resolvedWithJudgeComparison = resolveWithJudgeComparison(votes, pairsWithMaxValue);
            if (!resolvedWithJudgeComparison) {
              console.log('error');
            } else {
              results.push(resolvedWithJudgeComparison);
              deletePlacedPairInObj(majoritiesObj, resolvedWithJudgeComparison);
              deletePlacedPairInPlacements(placements, i, resolvedWithJudgeComparison);
            }
          } else {
            results.push(resolvedWithNextLevels);
            deletePlacedPairInObj(majoritiesObj, resolvedWithNextLevels);
            deletePlacedPairInPlacements(placements, i, resolvedWithNextLevels);
          }
        } else {
          results.push(resolvedWithSum);
          deletePlacedPairInObj(majoritiesObj, resolvedWithSum);
          deletePlacedPairInPlacements(placements, i, resolvedWithSum);
        }
      }
    }

    if (Object.keys(majoritiesObj).length > 0) {
    }
  }
  return(results);
}

const arrayOfObjectsTo2DArray = (array) => {
  const returnArray = [];
  for (const obj of array) {
    returnArray.push(obj.vote_array);
  }
  return returnArray;
}

const resultsInPostgre = (array) => {
  let arrayString = '{';
  for(let i = 0; i < array.length; i++) {
    console.log(array[i]);
    if (i === array.length - 1) {
      arrayString += array[i] + '}';
    } else {
      arrayString += array[i] + ', ';
    }
  }
  return arrayString;
}

module.exports = {createUniqueId, countVotes, arrayOfObjectsTo2DArray, resultsInPostgre};