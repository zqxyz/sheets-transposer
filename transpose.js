const sourceSheet = SpreadsheetApp.getActive().getSheetByName("SOURCE");
const targetSheet = SpreadsheetApp.getActive().getSheetByName(
  "QP-Data-Import-Template"
);
const sourceRowStartIndex = 1;
const targetRowStartIndex = 3;

function getSourceValues() {
  return sourceSheet.getDataRange().getValues();
}

function getColumnIndexFromA1Notation(column) {
  const multiplier = 26;
  const base = 64;
  const length = column.length;
  const sum = Array.from(column).reduce((acc, letter, index) => {
    const letterIndex = letter.charCodeAt(0) - base;
    return (
      acc + parseInt(letterIndex) * Math.pow(multiplier, length - index - 1)
    );
  }, 0);
  return sum;
}

// function to trim google sheets to rows with data
function trimSheet(sheet) {
  const maxRows = sheet.getMaxRows();
  const lastRow = sheet.getLastRow();
  if (maxRows - lastRow != 0) {
    sheet.deleteRows(lastRow + 1, maxRows - lastRow);
  }
}

function transpose(answers) {
  const sourceData = getSourceValues();

  for (let i = sourceRowStartIndex; i < sourceData.length; i++) {
    // for each row to act on
    for (let key of answers.keys()) {
      // for each defined column in that row

      const { src, transformFn } = answers.get(key);
      const sourceColumnIndex = getColumnIndexFromA1Notation(src) - 1;
      const targetColumnIndex = getColumnIndexFromA1Notation(key);

      targetSheet
        .getRange(i + targetRowStartIndex, targetColumnIndex)
        .setValue(
          transformFn
            ? transformFn(sourceData[i][sourceColumnIndex])
            : sourceData[i][sourceColumnIndex]
        );
    }
  }
  trimSheet(targetSheet);
}
