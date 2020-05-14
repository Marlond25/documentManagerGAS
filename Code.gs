const doGet = () => {
    return HtmlService.createTemplateFromFile('exclude').evaluate().setTitle("Exclude Manager");
}

const include = (filename) => {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function storeData(data) {
  const uss = usObj();
  const u = (data.user).toUpperCase();
  if (uss[u]) {
    const doc = data.docs.split("\n");
    const workSheet = getWorkSheet("Excluded");
    const obs = exObj();
    for (let i in doc) {
      let cat = data.cat1 + " " + data.cat2;
      cat = cat.trim();
      let array = [new Date(), Session.getActiveUser().getEmail(), u, cat, doc[i], obs[cat] || 123];
      workSheet.appendRow(array);
    }
    return "200," + " Success!";
  } else {
    return "404," + " Unauthorized user!"
  }
}

function getWorkSheet(sheetName) {
    const workSheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/GSID/edit#gid=0").getSheetByName(sheetName);
    return workSheet;
}

function exObj() {
  return {
    "Robot": 2,
    "External tax error": 1,
    "Processing": 2,
    "Resolution": 2,
    "CN – PA": 1,
    "AP2 - PO CN – PA": 1,
    "AP2 - PO Utilities AIUS": 1,
    "AP2 - PO Utilities HUS": 1,
    "AP2 - PO Utilities LCI": 1,
    "AP2 - PO Utilities LNA": 1,
    "AP2 - PO VAlexander": 1,
    "AP2 - NON PO Deringer": 1,
    "AP2 - NON PO Legal": 1,
    "AP2 - NON PO Specific vendors": 1,
    "AP2 - NON PO Telecom":	1,
    "AP2 - NON PO Wires": 1,
    "Urgent": 1
  }
}

function usObj() {
  return {
    "RYZEN": true,
    "MARLON": true,
  }
}

function aster() {
  return '<iframe width="1200px" height="920px" src="https://datastudio.google.com/" frameborder="0" style="border:0" allowfullscreen></iframe>';
}
