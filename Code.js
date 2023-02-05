// playground
// TODO cleanup and generalize

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
 
 function getA1NotationFromColumnIndex(columnIndex) {
 let dividend = columnIndex + 1;
 let columnName = "";
 let modulo;
 
 while (dividend > 0) {
 modulo = (dividend - 1) % 26;
 columnName = String.fromCharCode(65 + modulo) + columnName;
 dividend = Math.floor((dividend - modulo) / 26);
 }
 
 return columnName;
 }
 
 function printColumnMap(
 targetStart,
 targetEnd,
 sourceStart,
 options = { transform: null, applyTransform: false }
 ) {
 const offset = sourceStart - targetStart;
 
 for (let i = targetStart - 1; i < targetEnd; i++) {
 console.log(
 `['${getA1NotationFromColumnIndex(
 i
 )}', { src: '${getA1NotationFromColumnIndex(i + offset)}'${
 options.applyTransform ? `, transformFn: ${options.transform}` : ""
 } }],`
 );
 }
 }
 
 const a1 = getColumnIndexFromA1Notation;
 
 
 // Console logging import map generation helpers
 
 // From here
 const targetColumnStart = "LU";
 const sourceColumnStart = "NX";
 // To here
 const targetColumnEnd = "LX";
 
 const transform = "qpImport.enforceInteger";
 const applyTransform = true;
 
 function printRange() {
 console.log(
 printColumnMap(
 a1(targetColumnStart),
 a1(targetColumnEnd),
 a1(sourceColumnStart),
 { transform, applyTransform }
 )
 );
 }
 
 // printRange(); // comment/uncomment as toggle
 
 /* Compare range counts:
 Ensure that the source and target ranges are the same length,
 which is useful for catching added/missing columns. */
 const column1Start /**/ = "AV";
 const column1End /* */ = "BK";
 // -------------
 const column2Start /**/ = "AP";
 const column2End /* */ = "BE";
 // -------------
 const range1 = a1(column1End) - a1(column1Start);
 const range2 = a1(column2End) - a1(column2Start);
 // console.log(range1, range2, range1 === range2 ? "✓" : "✗"); // comment/uncomment as toggle
 
 /* 
 For demographics tables
 
 Map alternating columns from 
 source to linear columns in target, 
 skipping defined columns
 */
 const altTargetColStart = a1("ED");
 const altTargetColEnd = a1("HE");
 const altSourceColStart = a1("ER");
 const altSourceColEnd = a1("HX");
 
 const altTargetValueArray = Array.from({
 length: altTargetColEnd - altTargetColStart + 1,
 }).map((e, i) => i + altTargetColStart - 1);
 
 const altSourceValueArray = Array.from({
 length: altSourceColEnd - altSourceColStart + 1,
 }).map((e, i) => i + altSourceColStart - 1);
 
 const divider = 17;
 
 function printSingleMap(target, source) {
 console.log(
 `['${getA1NotationFromColumnIndex(
 target
 )}', { src: '${getA1NotationFromColumnIndex(source)}', transformFn: qpImport.enforceInteger }],`
 );
 }
 
 const sections = altSourceValueArray.length / divider;
 
 function printDemoAlt() {
 for (let i = 0; i < sections; i++) {
 const startIndex = i * divider;
 const section = altSourceValueArray.slice(startIndex, startIndex + divider);
 
 section.shift();
 
 if (section[0] % 2 === 1) {
 odds();
 evens();
 } else {
 evens();
 odds();
 }
 
 function odds() {
 section
 .filter((col) => col % 2 === 1)
 .forEach((col) => {
 printSingleMap(altTargetValueArray.shift(), col);
 });
 }
 
 function evens() {
 section
 .filter((col) => col % 2 === 0)
 .forEach((col) => {
 printSingleMap(altTargetValueArray.shift(), col);
 });
 }
 }
 }
 
 // printDemoAlt(); // comment/uncomment as toggle
 
