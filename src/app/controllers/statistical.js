const OrdersModel = require("../models/order");
const OrderdetailsModel = require("../models/orderdetails");
const ProductsModel = require("../models/product");

const byday= async (req,res)=>{
    var totalbill =0;
    var count2 =0;
    var totalproduct =0;
    var totalprofit =0;
    var totalorderamount =0;
    var today = new Date();
    const date = today.toLocaleDateString(`fr-CA`).split('/').join('-')
    
    const searchorders = await OrdersModel.find({status:"Đã hoàn thành đơn hàng",createdAt:{ $gte:`${date}T00:00:00.000Z` , $lte:`${date}T23:59:59.999Z`}});
    res.render("admin/statistical/statisticsbyday",
    {
        searchorders,
        totalbill,
        totalproduct,
        totalprofit,
        totalorderamount,
        count2
        
    });
}
const searchbyday= async (req,res)=>{
    const date = req.body.data || "";
    var totalbill =0;
    var count2 =1;
    var totalproduct =0;
    var totalprofit =0;
    var totalorderamount =0;
    /*  public async getDatabaseorderbyDate(req: Request, res: Response) {
      const { dateQuery }: any = req.query
      const date = new Date(dateQuery)
      console.log(date)
      const today = date.toLocaleDateString(`fr-CA`).split('/').join('-')
      console.log(today)
      const creationDate = {
        "creationDate": {
          '$gte': `${today}T00:00:00.000Z`,
          '$lt': `${today}T23:59:59.999Z`
        }
      }; */
      
    const searchorders = await OrdersModel.find({status:"Đã hoàn thành đơn hàng",createdAt:{ $gte:`${date}T00:00:00.000Z` , $lte:`${date}T23:59:59.999Z`}});
    res.render("admin/statistical/changetable", {
        searchorders,
        totalbill,
        totalproduct,
        totalprofit,
        totalorderamount,
        count2
    });
}
const bytime= async (req,res)=>{
    var totalbill =0;
    var count2 =0;
    var totalproduct =0;
    var totalprofit =0;
    var totalorderamount =0;
    var today = new Date();
    const date = today.toLocaleDateString(`fr-CA`).split('/').join('-')
    console.log("date",date);
    const searchorders = await OrdersModel.find({status:"Đã hoàn thành đơn hàng",createdAt:{ $gte:`${date}T00:00:00.000Z` , $lte:`${date}T23:59:59.999Z`}});
    res.render("admin/statistical/statisticsbytime",
    {
        searchorders,
        totalbill,
        totalproduct,
        totalprofit,
        totalorderamount,
        count2
        
    });
}
const searchbytime= async (req,res)=>{
    const date = req.body.data || "";
    var totalbill =0;
    var count2 =1;
    var totalproduct =0;
    var totalprofit =0;
    var totalorderamount =0;
    /*  public async getDatabaseorderbyDate(req: Request, res: Response) {
      const { dateQuery }: any = req.query
      const date = new Date(dateQuery)
      console.log(date)
      const today = date.toLocaleDateString(`fr-CA`).split('/').join('-')
      console.log(today)
      const creationDate = {
        "creationDate": {
          '$gte': `${today}T00:00:00.000Z`,
          '$lt': `${today}T23:59:59.999Z`
        }
      }; */
      
    const searchorders = await OrdersModel.find({status:"Đã hoàn thành đơn hàng",createdAt:{ $gte:`${date}T00:00:00.000Z` , $lte:`${date}T23:59:59.999Z`}});
    res.render("admin/statistical/changetable", {
        searchorders,
        totalbill,
        totalproduct,
        totalprofit,
        totalorderamount,
        count2
    });
}
module.exports = {
    byday: byday,
    bytime:bytime,
    searchbyday:searchbyday,
    searchbytime:searchbytime,
  };