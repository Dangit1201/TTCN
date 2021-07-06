const OrdersModel = require("../models/order");
const OrderdetailsModel = require("../models/orderdetails");
const ProductsModel = require("../models/product");


const index = async (req, res) => {
    const orders = await OrdersModel.find({status:"Tiếp nhận đơn hàng"}).sort({cout:1});
    res.render("admin/order/order",{
        orders:orders,
  });
};
const create = async (req, res) => {
    res.render("admin/advertisement/add_advertisement");
};

const store = async (req,res)=>{
  const body = req.body;
  const file = req.file;

  const advertisement = {
    content: body.content,
    link: body.link,
    typeofadv: body.typeofadv,
    } 
    /* console.log('advertisement',advertisement); */

    if(file){
  
      const thumbnail = "products/"+file.originalname;
      advertisement["thumbnail"] = thumbnail;
      fs.renameSync(file.path, path.resolve("src/public/images", thumbnail)); 
      await AdvertisementsModel(advertisement).save();
      res.redirect("/admin/advertisements");
    }
 
};

const edit = async (req, res) => {
  const id = req.params.id;
  const order = await OrdersModel.findById(id);
  res.render("admin/order/edit_order",{
    advertisement
  });
};

const update = async (req,res)=>{
  const id = req.params.id;
  const body = req.body;
  const file = req.file;

  const advertisement = {
    content: body.content,
    link: body.link,
    typeofadv: body.typeofadv,
    } 
    

    if(file){
      const thumbnail = "products/"+file.originalname;
      advertisement["thumbnail"] = thumbnail;
      fs.renameSync(file.path, path.resolve("src/public/images", thumbnail)); 
    }
    await AdvertisementsModel.updateOne({_id: id}, {$set: advertisement});
    res.redirect("/admin/advertisements");
};

const dele = async (req, res) => {
    const id = req.params.id;
    const order = await OrdersModel.find({_id:id});
    for(let x of order){
        const orderdetails = await OrderdetailsModel.find({idorder:x.idorder});
        /* console.log(orderdetails); */
        for(let y of orderdetails){
            /* console.log(y.idprd); */
            /* console.log(y.qty); */
            const product = await ProductsModel.findById(y.idprd);
        /*  console.log(product);
            console.log(product.quantity); */
            
            let quantity = parseInt(product.quantity) + parseInt(y.qty);
            await ProductsModel.updateOne({_id:y.idprd}, {$set: {quantity:quantity}});
        }
        await OrderdetailsModel.deleteMany({idorder: x.idorder});       
    }
    await OrdersModel.deleteOne({_id:id});
    res.redirect("/admin/orders");
};
const updatetransport = async (req,res)=>{
    const id = req.params.id;
    await OrdersModel.updateOne({_id: id}, {$set: {status:"Vận chuyển"}});
    res.redirect("/admin/orders");
};

const indexdetail = async (req, res) => {
    const orders = await OrdersModel.find({status:"Vận chuyển"}).sort({cout:1});
    res.render("admin/order/orderdetails",{
        orders:orders,
  });
};

module.exports = {
  index: index,
  create: create,
  edit: edit,
  dele: dele,
  store:store,
  update:update,
  updatetransport:updatetransport,
  indexdetail:indexdetail,
};