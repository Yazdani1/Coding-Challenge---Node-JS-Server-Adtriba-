const router = require("express").Router();
const multer = require('multer');


const {uploadExcelFileData,getDataBySearchFilter,getExcelUploadedData,getGroupedAdData,deleteAllExcelData,deleteSingleExcelSheetData} = require("../controllers/ExcelFileData");



// To upload file

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 1024 * 1024 * 5 // 5 MB
    }
  });

  /**
   * To create ad data from excel sheet
   */

router.post("/excel-file-upload",upload.single('file'),uploadExcelFileData);  


/**
 * To get all the data for excel file upload to database
 */

router.get("/get-excel-uploaded-add-data",getExcelUploadedData);


/**
 * To get grouped data for graph
 */


router.get("/grouped-ad-data",getGroupedAdData)


/**
 * To delete all the data from the schema
 */

router.delete("/delete-all-excel-data",deleteAllExcelData);


/**
 * To delete single excel sheet data
 */
router.delete("/delete-excelsheet-single-data/:id",deleteSingleExcelSheetData);


/**
 * To add search filter
 */

router.get("/search-data",getDataBySearchFilter);


module.exports = router;
