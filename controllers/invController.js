const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}


/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
//  const vehicles_id = req.params.inv_id
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
//  const vehicle = await invModel.getVehicleId(vehicles_id)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

// Display single car view
invCont.displayCarById = async function (req, res, next) {
  const invId = req.params.invId;
  const data = await invModel.getCarById(invId);
  const car = await utilities.getVehicle(data);
  let name = data[0].inv_make + ' ' + data[0].inv_model;
  let nav = await utilities.getNav();
  res.render("./inventory/vehicle", {title: name, nav, car,});
};

// Add Classification and Vehicle view
invCont.displayAdd = async function (req, res, next) {
  let nav = await utilities.getNav()
  const classificationSelect = await utilities.dropdown()
  res.render("./inventory/management", {
    title: "Management",
    nav,
    classificationSelect,
    errors: null,
  });
};

invCont.displayAddClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null
  });
};

invCont.displayAddVehicle = async function (req, res, next) {
  let nav = await utilities.getNav()
  const drop = await utilities.dropdown();
  res.render("./inventory/add-inventory", {
    title: "Add Vehicle",
    nav,
    drop,
    errors: null
  });
};

invCont.buildModification = async function (req, res, next) {
  const inv_id = parseInt(req.params.inventoryId)
  let nav = await utilities.getNav()
  const itemData = await invModel.getCarById(inv_id)
  const classificationSelect = await utilities.dropdown(itemData[0].classification_id)
  const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData[0].inv_id,
    inv_make: itemData[0].inv_make,
    inv_model: itemData[0].inv_model,
    inv_year: itemData[0].inv_year,
    inv_description: itemData[0].inv_description,
    inv_image: itemData[0].inv_image,
    inv_thumbnail: itemData[0].inv_thumbnail,
    inv_price: itemData[0].inv_price,
    inv_miles: itemData[0].inv_miles,
    inv_color: itemData[0].inv_color,
    classification_id: itemData[0].classification_id
  })
};

// delete inventory item view
invCont.buildDeletion = async function (req, res, next) {
  const inv_id = parseInt(req.params.inventoryId)
  let nav = await utilities.getNav()
  const itemData = await invModel.getCarById(inv_id)
  const itemName = `${itemData[0].inv_make} ${itemData[0].inv_model}`
  res.render("./inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id: itemData[0].inv_id,
    inv_make: itemData[0].inv_make,
    inv_model: itemData[0].inv_model,
    inv_year: itemData[0].inv_year,
    inv_price: itemData[0].inv_price,
  })
};

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
};

/* ****************************************
*  Process Add Classification
* *************************************** */
invCont.addClassification = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const regResult = await invModel.addClassification(
    classification_name
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, ${classification_name} has been added.`
    )
    res.status(201).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the addition failed.")
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
    })
  }
}

/* ****************************************
*  Process Add Vehicle
* *************************************** */
invCont.addVehicle = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color } = req.body
  const regResult = await invModel.addVehicle(
    classification_id,
    inv_make, 
    inv_model, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_year,
    inv_miles, 
    inv_color
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, ${inv_make} ${inv_model} has been added.`
    )
    res.status(201).render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the addition failed.")
    res.status(501).render("inventory/add-inventory", {
      title: "Add Vehicle",
      nav,
    })
  }
}

/* ****************************************
*  Process Update Vehicle
* *************************************** */
invCont.updateVehicle = async function (req, res) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body

  // Add classification_id to req.body if it's missing
  if (!req.body.classification_id) {
    req.body.classification_id = classification_id;
  }
  
  const updateResult = await invModel.updateVehicle(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationSelect = await utilities.dropdown(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    })
  }
}

invCont.deleteVehicle = async function (req, res) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_price,
    inv_year,
    classification_id,
  } = req.body

  // Add classification_id to req.body if it's missing
  if (!req.body.classification_id) {
    req.body.classification_id = classification_id;
  }
  
  const updateResult = await invModel.deleteVehicle(
    inv_id,  
    inv_make,
    inv_model,
    inv_price,
    inv_year,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationSelect = await utilities.dropdown(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/delete-confirm", {
    title: "Delete " + itemName,
    nav,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_price,
    classification_id
    })
  }
}



module.exports = invCont