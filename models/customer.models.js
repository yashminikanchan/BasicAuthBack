module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            customerName:String,
            customerAddress: String,
            customerId:String,
            product: String,
            quantity:String,
          
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Customer = mongoose.model("customer", schema);
    return Customer;
};