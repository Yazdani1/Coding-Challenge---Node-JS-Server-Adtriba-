const router = require("express").Router();
const {createAdCampaign,getAdCampaign,deleteAdCampaign} = require("../controllers/AdCampaign");


/**
 * To create ad campaign
 */

router.post("/create-adcampaign",createAdCampaign);


/**
 * To get list of add campaign
 */

router.get("/ad-capmaign-lists",getAdCampaign)


/**
 * To delete a post
 */

router.delete("/delete-add-campaign/:id",deleteAdCampaign);

module.exports = router;
