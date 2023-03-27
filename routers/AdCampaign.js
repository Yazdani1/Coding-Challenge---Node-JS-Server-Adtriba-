const router = require("express").Router();


const {createAdCampaign,getAdCampaign,deleteAdCampaign,getAllVisitorList} = require("../controllers/AdCampaign");


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

/**
 * To load all the visitor lists
 */

router.get("/all-visitor-list",getAllVisitorList);

module.exports = router;
