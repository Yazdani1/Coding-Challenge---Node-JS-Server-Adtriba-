const AdCampaign = require("../model/AdCampaign");


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
    res.status(400).json({ error: "Something went wrong" });
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
            $toDate: "$ad_date"
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$ad_date" }
          },
          count: { $sum: 1 },
          totalSpends: { $sum: { $toDouble: "$spends" } },
          totalRevenue: { $sum: { $toDouble: "$attributed_revenue" } },

        },
      },
    ]);
    

    res.status(200).json({ allAdCampaign, adCampByMonth });
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};

// To delete ad campaign

exports.deleteAdCampaign = async (req, res) => {
  try {
    const deleteQuery = { _id: req.params.id };

    const singleAdCampaign = await AdCampaign.findById(deleteQuery);

    if(!singleAdCampaign){
        return res.status(404).json({error:"Id could not found"})
    }

    const deleteAdCampaign = await AdCampaign.findByIdAndDelete(deleteQuery);

    res.status(200).json(deleteAdCampaign);
  } catch (error) {
    res.status(400).json({ error: "Something went wrong" });
  }
};



