module.exports = app =>{
    const revenue_expenditure =require("../controller/revenue_expenditure.controller.js");

    app.post("/revenue_expenditure", revenue_expenditure.create);

    app.get("/revenue_expenditure",revenue_expenditure.findAll);

    app.get("revenue_expenditure", revenue_expenditure.findOne);


}