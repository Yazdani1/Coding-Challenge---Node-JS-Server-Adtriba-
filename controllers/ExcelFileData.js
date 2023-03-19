const moment = require("moment");
const ExcelFileData = require("../model/ExcelFileData");
const AdCampaign = require("../model/AdCampaign");

const XLSX = require("xlsx");

/**
 * To ad create ad from a excel file and upload to database
 */

exports.uploadExcelFileData = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      throw new Error("No file uploaded");
    }

    const workbook = XLSX.read(file.buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    // const data = XLSX.utils.sheet_to_json(sheet);

    // const convertedData = data.map((item) => ({
    //   ...item,
    //   date: new Date(item.date),
    // }));

    const data = XLSX.utils.sheet_to_json(sheet, { raw: true });
    const convertedData = data.map((item) => ({
      ...item,
      date: new Date((item.date - (25567 + 1)) * 86400 * 1000), // Convert Excel date number to JavaScript date object
    }));

    //   const data = XLSX.utils.sheet_to_json(sheet, {dateNF: 'm/d/yyyy'});

    const savedata = await ExcelFileData.insertMany(convertedData);

    res.status(201).send({ message: "'Data inserted successfully'", savedata });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * To get all data
 */

exports.getExcelUploadedData = async (req, res) => {
  try {
    const allData = await ExcelFileData.find().limit(req.query.limit);

    res.status(200).json({ allData });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * To get grouped ad data
 */

exports.getGroupedAdData = async (req, res) => {
  try {
    const adTypeData = await ExcelFileData.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
          totalRevenue: { $sum: "$attributed_revenue" },
          totalSpends: { $sum: "$spends" },
        },
      },
    ]);

    const adOptimisationTargetData = await ExcelFileData.aggregate([
      {
        $group: {
          _id: "$optimisation_target",
          count: { $sum: 1 },
          totalRevenue: { $sum: "$attributed_revenue" },
          totalSpends: { $sum: "$spends" },
        },
      },
    ]);

    const totalAdPosts = await ExcelFileData.countDocuments();

    res
      .status(200)
      .json({ adTypeData, adOptimisationTargetData, totalAdPosts });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Something went wrong" });
  }
};


/**
 * To add search filter
 * @param {*} req 
 * @param {*} res 
 */


exports.getDataBySearchFilter = async(req,res)=>{

  try {

    const searchResult = await ExcelFileData.find({
      type:req.query.searchType,
      optimisation_target:req.query.optimisationTarget
    });
    res.status(200).json({searchResult});

  } catch(error){
    res.status(400).json({ error: "Something went wrong" });

  }

}



/**
 * To delete all the data from a schema
 */

exports.deleteAllExcelData = async (req, res) => {
  try {
    const deleteAllData = await ExcelFileData.deleteMany({});

    res.status(200).json(deleteAllData);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

/**
 * To delete excel sheet single data
 */

exports.deleteSingleExcelSheetData = async (req, res) => {
  try {
    const deleteQuery = { _id: req.params.id };

    const singleAdCampaign = await ExcelFileData.findById(deleteQuery);

    if (!singleAdCampaign) {
      return res.status(404).json({ error: "Id could not found" });
    }

    const deleteAdCampaign = await ExcelFileData.findByIdAndDelete(deleteQuery);

    res.status(200).json(deleteAdCampaign);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};
