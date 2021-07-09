const OrdersModel = require("../models/order");
const OrderdetailsModel = require("../models/orderdetails");
const ProductsModel = require("../models/product");


const index = async (req, res) => {
    const orders = await OrdersModel.find({status:"Tiếp nhận đơn hàng"}).sort({_id:1});
    res.render("admin/order/order",{
        orders:orders,
  });
};

const edit = async (req, res) => {
  const id = req.params.id;
  const order = await OrdersModel.findById(id);
  const orderdetails = await OrderdetailsModel.find({idorder:order.idorder});
  res.render("admin/order/edit_order",{
    order,
    orderdetails,
  });
};

const update = async (req,res)=>{
  const id = req.params.id;
  const body = req.body;

  const order = {
    full_name: body.full_name,
    phone: body.phone,
    address: body.address,
    } 
    await OrdersModel.updateOne({_id: id}, {$set: order});
    res.redirect("/admin/orders");
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
const shipping = async (req,res)=>{
    const id = req.params.id;
    await OrdersModel.updateOne({_id: id}, {$set: {status:"Vận chuyển"}});
    res.redirect("/admin/orders");
};

const indextransport = async (req, res) => {
    const orders = await OrdersModel.find({status:"Vận chuyển"}).sort({_id:1});
    
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
    const today = "2021-07-07";
    const search = await OrderdetailsModel.find({createdAt:{ $gte:`${today}T00:00:00.000Z` , $lte:`${today}T23:59:59.999Z`}});
    console.log(search);

    res.render("admin/order/ordertransport",{
        orders:orders,
  });
};
const shippinguser = async (req,res)=>{
  const id = req.params.id;
  await OrdersModel.updateOne({_id: id}, {$set: {status:"Đã hoàn thành đơn hàng"}});
  res.redirect("/admin/ordertransport");
};
const viewtransport = async (req, res) => {
  const id = req.params.id;
  const order = await OrdersModel.findById(id);
  const orderdetails = await OrderdetailsModel.find({idorder:order.idorder});

 
  
  res.render("admin/order/ordertransportdetail",{
    order,
    orderdetails,
   
  });
};
const deletransport = async (req, res) => {
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
  res.redirect("/admin/ordertransport");
};


module.exports = {
  index: index,
  edit: edit,
  dele: dele,
  update:update,
  shipping:shipping,
  indextransport:indextransport,
  shippinguser:shippinguser,
  viewtransport:viewtransport,
  deletransport:deletransport,
};