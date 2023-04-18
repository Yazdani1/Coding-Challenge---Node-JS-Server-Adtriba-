const axios = require("axios");
const requestIP = require('request-ip');

const AdCampaign = require("../model/AdCampaign");
const VisitorCounter = require("../model/VisitorCounter");

exports.createAdCampaign = async (req, res) => {
  try {
    const {
      ad_date,
      source,
      attributed_conversions,
      attributed_revenue,
      type,
      spends,
      partition_id,
      optimisation_target,
    } = req.body;

    if (!ad_date) {
      return res.status(422).json({ error: "please add ad_date" });
    }

    if (!source) {
      return res.status(422).json({ error: "please add source" });
    }

    if (!attributed_conversions) {
      return res
        .status(422)
        .json({ error: "please add attributed_conversions" });
    }

    if (!attributed_revenue) {
      return res.status(422).json({ error: "please add attributed_revenue" });
    }

    if (!type) {
      return res.status(422).json({ error: "please add type" });
    }

    if (!spends) {
      return res.status(422).json({ error: "please add spends" });
    }

    if (!partition_id) {
      return res.status(422).json({ error: "please add partition_id" });
    }

    if (!optimisation_target) {
      return res.status(422).json({ error: "please add optimisation_target" });
    }

    const adcampaignDetails = AdCampaign({
      ad_date,
      source,
      attributed_conversions,
      attributed_revenue,
      type,
      spends,
      partition_id,
      optimisation_target,
    });

    const saveAdCampaign = await AdCampaign.create(adcampaignDetails);

    res.status(201).json(saveAdCampaign);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// To get adcampaign

exports.getAdCampaign = async (req, res) => {
  try {
    const allAdCampaign = await AdCampaign.find().sort({ date: -1 });

    const adCampByMonth = await AdCampaign.aggregate([
      {
        $addFields: {
          ad_date: {
            $toDate: "$ad_date",
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$ad_date" },
          },
          count: { $sum: 1 },
          totalSpends: { $sum: { $toDouble: "$spends" } },
          totalRevenue: { $sum: { $toDouble: "$attributed_revenue" } },
        },
      },
    ]);

    // To create  number of views everytime when user visit the home page

    // Get user's IP address
    // const ip = req.connection.remoteAddress;

    // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // // Use ipdata.co to get the user's location
    // const response = await axios.get(`https://api.ipdata.co/${ip}?api-key=29ed79985902e87f84743637b25e340235bfaaaa7a6191b57df0a843`);

    // Create a new VisitorCount document


    const visitorDetails = VisitorCounter({
      views: 1,
      date: new Date(),
      // country: response.data.country,
      // city: response.data.city,
    });

    const visitorCount = await VisitorCounter.create(visitorDetails);

    res.status(200).json({ allAdCampaign, adCampByMonth, visitorCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

/**
 * To get all the visitor list
 * @param {*} req
 * @param {*} res
 * @returns
 */

exports.getAllVisitorList = async (req, res) => {
  try {
    const allVisitorLists = await VisitorCounter.find();

    const totlaViewsCount = await VisitorCounter.countDocuments();



    res.status(200).json({allVisitorLists,totlaViewsCount});
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// To delete ad campaign

exports.deleteAdCampaign = async (req, res) => {
  try {
    const deleteQuery = { _id: req.params.id };

    const singleAdCampaign = await AdCampaign.findById(deleteQuery);

    if (!singleAdCampaign) {
      return res.status(404).json({ error: "Id could not found" });
    }

    const deleteAdCampaign = await AdCampaign.findByIdAndDelete(deleteQuery);

    res.status(200).json(deleteAdCampaign);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
