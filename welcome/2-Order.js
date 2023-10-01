const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    DISH: Symbol("dish"),
    SANDSIZE: Symbol('sand size'),
    BURGERSIZE: Symbol('burger size'),
    STOP: Symbol('sandwich additions'),
    BTOP: Symbol('burgers additions'),
    TOPPINGS: Symbol('TOPPINGS'),
    DRINKS: Symbol('Drinks')

});

let orders = [];

module.exports = class Order {
    constructor() {
        this.stateCur = OrderState.WELCOMING;
        this.bSize = "";
        this.sSize = "";
        this.badditions = "";
        this.sadditions = "";
        this.drinks = "";
        this.orderItems = [];
    }
    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.DISH;
                aReturn.push("Welcome   to J's Cafe");
                aReturn.push("What would you like to have, Please select a dish ?");
                aReturn.push('1. Burger (3$, 6$)');
                aReturn.push('2. Sandwich (10$, 20$)');
                aReturn.push("msg ordersdetails if you want to know about the orders");

                break;
            case OrderState.DISH:
                console.log(orders);
                if (sInput.toLowerCase() == 'ordersdetails') {
                    if (orders.length == 0) {
                        aReturn.push("no items to display");

                    } else{
                        orders.forEach((item, idx) => {

                            aReturn.push(`Order Number: ${idx + 1}`);

                            aReturn.push(`Item: ${item.item}`);

                            aReturn.push(`Price: ${item.price}`);

                            aReturn.push(`Size: ${item.size}`);

                            aReturn.push(`Toppings: ${item.toppings}`);

                            aReturn.push(`soft drinks: ${item.fries}`);
                        })
                        
                    }
                    this.stateCur = OrderState.WELCOMING;

                }
               else  if (sInput.toLowerCase() == "sandwich" || sInput.toLowerCase() == "s" || sInput.toLowerCase() == "2") {
                    this.orderItems.push('Sandwich');
                    this.stateCur = OrderState.SIZEDECIDE;
                    aReturn.push('What Size of Sandwich you would Like (small or medium)?');
                }
               else  if (sInput.toLowerCase() == "burger" || sInput.toLowerCase() == "b" || sInput.toLowerCase() == "1") {
                    this.orderItems.push('Burger')
                    this.stateCur = OrderState.SIZEDECIDE;
                    aReturn.push('What Size of Burger you would Like (small or medium) ?');
                } else {
                    aReturn.push('Please input a valid input');
                }
                break;
            case OrderState.SIZEDECIDE:
                if (sInput.toLowerCase() == 'small' || sInput.toLowerCase() == 'medium' || sInput.toLowerCase() == 's' || sInput.toLowerCase() == 'm') {
                    this.orderItems.push(sInput);
                    this.sSize = sInput.toLowerCase();
                    this.stateCur = OrderState.TOPPINGS;
                    aReturn.push('What toppings you would like to have in your dish ?');
                    break;
                } else {
                    aReturn.push('Invalid input 2');

                }
            case OrderState.TOPPINGS:
                this.orderItems.push(sInput.toLowerCase());
                aReturn.push('Would you like to have soft drink with that (2$)');
                this.stateCur = OrderState.DRINKS;
                break;
            case OrderState.DRINKS:
                console.log('headnadopad')
                if (sInput.toLowerCase() == 'yes' || sInput.toLowerCase() == 'y') {
                    this.drinks = 'yes';
                    this.orderItems.push('soft drinks')
                    aReturn.push(`Thank-you for your order of ${this.orderItems[0]} of ${this.orderItems[1]} size with ${this.orderItems[2]} and ${this.orderItems[3]}`);
                    aReturn.push(`The total of the order is ${this.calculatePrice()}`);
                    let d = new Date();
                    d.setMinutes(d.getMinutes() + 20);
                    aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                    orders.push({ item: this.orderItems[0], price: this.calculatePrice(), size: this.orderItems[1], toppings: this.orderItems[2], fries: 'yes' })
                    this.stateCur = OrderState.WELCOMING;
                    break;
                } else {
                    aReturn.push(`Thank-you for your order of ${this.orderItems[0]} of ${this.orderItems[1]} size with ${this.orderItems[2]} and ${this.orderItems[3]}`);
                    aReturn.push(`The total of the order is ${this.calculatePrice()}`);
                    let d = new Date();
                    d.setMinutes(d.getMinutes() + 20);
                    aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                    orders.push({ item: this.orderItems[0], price: this.calculatePrice(), size: this.orderItems[1], toppings: this.orderItems[2], fries: 'no' });
                    this.stateCur = OrderState.WELCOMING
                    break;
                }

        }

        return aReturn;
    }

    calculatePrice() {
        let price, basePrice = 0;

        switch (this.orderItems[0]) {
            case "Burger":
                switch (this.orderItems[1]) {
                    case "small":
                        basePrice = 3;
                        break;
                    case "medium":
                        basePrice = 6;
                        break;
                }
                break;
            case "Sandwich":
                switch (this.orderItems[1]) {
                    case "small":
                        basePrice = 10;
                        break;
                    case "medium":
                        basePrice = 20;
                        break;

                }
                break;
            default:
                break;
        }
        if (this.drinks == 'yes') {
            basePrice += 2;
        }
        price = basePrice;
        return price;
    }

}

