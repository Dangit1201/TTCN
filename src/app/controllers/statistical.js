const OrdersModel = require("../models/order");
const OrderdetailsModel = require("../models/orderdetails");
const ProductsModel = require("../models/product");
const objectFields = require('object-fields');

const byday= async (req,res)=>{
    var totalbill =0;
    var count2 =0;
    var totalproduct =0;
    var totalprofit =0;
    var totalorderamount =0;
    var today = new Date();
    const date = today.toLocaleDateString(`fr-CA`).split('/').join('-')
    
    const searchorders = await OrdersModel.find({status:"Đã hoàn thành đơn hàng",createdAt:{ $gte:`${date}T00:00:00.000Z` , $lte:`${date}T23:59:59.999Z`}});
   
    var allprdsort =[];
    res.render("admin/statistical/statisticsbyday",
    {
        searchorders,
        totalbill,
        totalproduct,
        totalprofit,
        totalorderamount,
        count2,
        allprdsort,
        
    });
}
const searchbyday= async (req,res)=>{
    const date = req.body.data || "";
    var totalbill =0;
    var count2 =1;
    var totalproduct =0;
    var totalprofit =0;
    var totalorderamount =0;
  
    const searchorders = await OrdersModel.find({status:"Đã hoàn thành đơn hàng",createdAt:{ $gte:`${date}T00:00:00.000Z` , $lte:`${date}T23:59:59.999Z`}});
  
    const products = await ProductsModel.find();
    const items = await OrderdetailsModel.find({createdAt:{ $gte:`${date}T00:00:00.000Z` , $lte:`${date}T23:59:59.999Z`}});
    
    var a = items.map(function(item){
      return {price : item["price"],qty : item["qty"], idprd : item["idprd"], img : item["img"], name : item["name"]}
    });

    // 1.lọc và in ra phần tử ko trung id
    var b = a
    .map(e => e['idprd'])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(obj=> a[obj])
    .map(e => a[e]);
    console.log(b);

    //2.trừ đi 2 lần qty so vs qty ban đầu
    var results = b.map(function(item){
      return {idprd: item["idprd"],qty : item["qty"]-2*item["qty"],price : item["price"],img : item["img"], name : item["name"]}
    });
    console.log(results);

     //3.cộng các object ban đầu và thêm vào array ko trùng id
    var valuesA = a.reduce(function(a,c){a[c.value] = c.value; return a; }, {});
    var valuesB = b.reduce(function(a,c){a[c.value] = c.value; return a; }, {});
    var result = a.filter(function(c){ return !valuesB[c.value]}).concat(b.filter(function(c){ return !valuesA[c.value]}));
    console.log(result);

    //4.cộng qty của array 3 vào array 1
    for(let x of result){
     for(let y of results){
         if(x.idprd==y.idprd){
           y.qty +=x.qty
         }
     }

    }
    console.log("ss",results);
    //sx lại array theo qty
    const sort_by = (field, reverse, primer) => {

      const key = primer ?
        function(x) {
          return primer(x[field])
        } :
        function(x) {
          return x[field]
        };
    
      reverse = !reverse ? 1 : -1;
    
      return function(a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
      }
    }
    // Sort by qty
    const allprdsort= results.sort(sort_by('qty', true, parseInt));
    console.log(results.sort(sort_by('qty', true, parseInt))); 

    
   /*  var a = [
      { id:10,qty:1 },
      { id:10,qty:2 },
      { id:10,qty:3 },
      { id:10,qty:4 },
      { id:10,qty:5 },
      { id:10,qty:5 },
      { id:10,qty:5 },
      { id:10,qty:6 },
      { id:11,qty:1 },
      { id:11,qty:2 },
      { id:11,qty:3 },
      { id:11,qty:4 },
      { id:11,qty:5 },
      { id:11,qty:5 },
      { id:11,qty:5 },
      { id:11,qty:6 },
      { id:11,qty:7 },
      { id:12,qty:5 }
    ]
    // 1.lọc và in ra phần tử ko trung id
    var b = a
    .map(e => e['id'])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(obj=> a[obj])
    .map(e => a[e]);
     console.log(b);

     //2.trừ đi 2 lần qty so vs qty ban đầu
     var results = b.map(function(item){
      return {id : item["id"],qty : item["qty"]-2*item["qty"]}
    });
    console.log(results);

    //3.cộng các object ban đầu và thêm vào array ko trùng id
     var valuesA = a.reduce(function(a,c){a[c.value] = c.value; return a; }, {});
     var valuesB = b.reduce(function(a,c){a[c.value] = c.value; return a; }, {});
     var result = a.filter(function(c){ return !valuesB[c.value]}).concat(b.filter(function(c){ return !valuesA[c.value]}));
     console.log(result);

     //4.cộng qty của array 3 vào array 1
     for(let x of result){
      for(let y of results){
          if(x.id==y.id){
            y.qty +=x.qty
          }
      }

     }
     console.log("ss",results);
     //sx lại array theo qty
     const sort_by = (field, reverse, primer) => {

      const key = primer ?
        function(x) {
          return primer(x[field])
        } :
        function(x) {
          return x[field]
        };
    
      reverse = !reverse ? 1 : -1;
    
      return function(a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
      }
    }
    
    
    
    // Sort by qty
    console.log(results.sort(sort_by('qty', true, parseInt)));
    
    // Sort by city, case-insensitive, A-Z
    //console.log(homes.sort(sort_by('city', false, (a) =>  a.toUpperCase()))); */

    

     /* const findDuplicates = (arr) => {
      let sorted_arr = arr.slice().sort(); // You can define the comparing function here. 
      // JS by default uses a crappy string compare.
      // (we use slice to clone the array so the
      // original array won't be modified)
      let results = [];
      for (let i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] == sorted_arr[i]) {
          results.push(sorted_arr[i]);
        }
      }
      return results;
    }
    
    let duplicatedArray = [9, 9, 111, 2, 3, 4,7,7,9, 4, 5, 7];
    console.log(`The duplicates in ${duplicatedArray} are ${findDuplicates(duplicatedArray)}`); */

  
     /* var duplicateIds = arr
     .map(e => e['id'])
     .map((e, i, final) => final.indexOf(e) !== i && i)
     .filter(obj=> arr[obj])
     .map(e => arr[e]["id"])

     var duplicate = arr.filter(obj=> duplicateIds.includes(obj.id));
     duplicate.splice(duplicate.indexOf(), 0);
     console.log(duplicate); */

    res.render("admin/statistical/changetable", {
        searchorders,
        totalbill,
        totalproduct,
        totalprofit,
        totalorderamount,
        count2,
        allprdsort,
    });
}
const bytime= async (req,res)=>{
    var totalbill =0;
    var count2 =0;
    var totalproduct =0;
    var totalprofit =0;
    var totalorderamount =0;
    
    function mulMonth(dateObj, numDays) {
      dateObj.setMonth(dateObj.getMonth() - numDays);
      return dateObj;
   }
  var today = new Date(); // Hàm lấy thời gian hôm nay
  const to = today.toLocaleDateString(`fr-CA`).split('/').join('-');
  var date = mulMonth(today , 1);
  const from = date.toLocaleDateString(`fr-CA`).split('/').join('-');
  const searchorders = await OrdersModel.find({status:"Đã hoàn thành đơn hàng",createdAt:{ $gte:`${from}T00:00:00.000Z` , $lte:`${to}T23:59:59.999Z`}});
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
const searchbytime1= async (req,res)=>{
   
    const from = req.body.from || "";
    const to = req.body.to || "";
   /*  console.log("to",req.body.to);
    console.log("from",req.body.from); */
    var totalbill =0;
    var count2 =0;
    var totalproduct =0;
    var totalprofit =0;
    var totalorderamount =0;
    const searchorders = await OrdersModel.find({status:"Đã hoàn thành đơn hàng",createdAt:{ $gte:`${from}T00:00:00.000Z` , $lte:`${to}T23:59:59.999Z`}});
    
    res.render("admin/statistical/changetable", {
        searchorders,
        totalbill,
        totalproduct,
        totalprofit,
        totalorderamount,
        count2
    });
}
const searchbytime2= async (req,res)=>{
  console.log("to",req.body.to1);
  console.log("from",req.body.from1);
  const from = req.body.from1 || 0;
  const to = req.body.to1 || 0;
  var totalbill =0;
  var count2 =0;
  var totalproduct =0;
  var totalprofit =0;
  var totalorderamount =0;
  const searchorders = await OrdersModel.find({status:"Đã hoàn thành đơn hàng",createdAt:{ $gte:`${from}T00:00:00.000Z` , $lte:`${to}T23:59:59.999Z`}});
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
    searchbytime1:searchbytime1,
    searchbytime2:searchbytime2,

  };