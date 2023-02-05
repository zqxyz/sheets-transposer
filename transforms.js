function dateToISO(source) {
  return new Date(source).toISOString();
}

// MM-dd-yyyy HH:mm:ss
function dateToSubmissionTimestampFormat(source) {
  if (!source) {
    return null;
  }
  const date = new Date(source * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${month}-${day}-${year} ${hours}:${minutes}:${seconds}`;
}

function dateToSubmissionTimestampFormat2(source) {
  const date = new Date(source);
  const unixTime = (date.getTime() / 1000) | 0;
  return dateToSubmissionTimestampFormat(unixTime);
}

function workflowToQpStatus(value) {
  return "Completed";
}

function mapReportPeriodToOptionInt(value) {
  return reportPeriodToOptionIntMap.get(value);
}

function mapReportPeriodToString(value) {
  return reportPeriodToStringMap.get(value);
}

function mapReportPeriodVarToString(value) {
  return reportPeriodVarToStringMap.get(value);
}

function mapReportPeriodVarToOptionInt(value) {
  return value ? parseInt(value.split(" ")[1]) : null;
}

function mapLongReportPeriodStringToOptionInt(value) {
  return fullReportPeriodStringToOptionIntMap.get(value);
}

function shortenReportPeriodString(value) {
  const index = mapLongReportPeriodStringToOptionInt(value) - 1;
  return [...reportPeriodToStringMap.values()][index];
}

function mapCountyStringToOptionInt(value) {
  return countyStringToOptionIntMap.get(value);
}

function mapUserUuidToEmail(value) {
  return userUuidToEmailMap.get(value);
}

function mapUserIdToEmail(value) {
  return userIdToEmailMap.get(value);
}

function enforceInteger(value) {
  const number = Number(value);
  return Number.isInteger(number) ? number : null;
}

function enforceNumber(value) {
  const number = Number(value);
  return !Number.isNaN(number) ? number : null;
}

function sourceStringContainsQueryString(query) {
  return function (value) {
    value = String(value);
    return value.includes(query) ? 1 : "";
  };
}

// yyyy-MM-dd'T'HH:mm:ssZ
function toQpIsoDateString(date) {
  const pad = n => (n < 10 ? `0${n}` : n);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}-0800`;
}
