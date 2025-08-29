function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registro de Evaluaciones");
    
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Registro de Evaluaciones");
      sheet.getRange(1, 1, 1, 6).setValues([["Fecha", "Nombre", "Curso", "Documento", "Puntuacion", "Aprobado"]]);
    }
    
    var rowData = [
      data.fecha,
      data.nombre,
      data.curso,
      data.documento,
      data.puntuacion,
      data.aprobado ? "Sí" : "No"
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({result: "success"})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({result: "error", message: error.message})).setMimeType(ContentService.MimeType.JSON);
  }
}
