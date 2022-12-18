const Order = require("./assignment1Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  SIZE: Symbol("size"),
  FRIES: Symbol("fries"),
  DRINKS: Symbol("drinks"),
  ITEMS: Symbol("items"),
  AMOUNT: Symbol("amount"),
  TAX: Symbol("tax"),
});

module.exports = class ShwarmaOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sSize = "";
    this.sFries = "";
    this.sDrinks = 0;
    this.sItem = "";
    this.sAmount = 0;
    this.sTax = 0.2;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.ITEMS;
        aReturn.push(
          "Welcome to Hashi's Burgers. Please select your favorite Burger and reply"
        );
        aReturn.push(
          "1. Veg Burger ($ 10) \n 2. Chicken Burger ($ 12) \n 3. Beef Burger ($ 15)"
        );
        break;

      //select Type of Burger
      case OrderState.ITEMS:
        this.sItem = sInput;
        if (this.sItem == "1") {
          this.sItem = "Veg Burger";
          this.sAmount += 10;
        } else if (this.sItem == "2") {
          this.sItem = "Chicken Burger";
          this.sAmount += 12;
        } else if (this.sItem == "3") {
          this.sItem = "Beef Burger";
          this.sAmount += 15;
        }
        this.stateCur = OrderState.SIZE;
        aReturn.push(
          "Please Select size for your Burger \n 1. Small \n 2. Medium \n 3. Large"
        );
        break;

      //select Size of Burger
      case OrderState.SIZE:
        this.sSize = sInput;
        if (this.sSize == "1") {
          this.sSize = "Small";
        } else if (this.sSize == "2") {
          this.sSize = "Medium";
          this.sAmount += 2;
        } else if (this.sSize == "3") {
          this.sSize = "Large";
          this.sAmount += 5;
        }
        // Add Fries to the order
        this.stateCur = OrderState.FRIES;
        this.sFries = sInput;
        aReturn.push(
          "Would you like to add fries in your Burger. \n Reply with yes or no."
        );
        break;
      case OrderState.FRIES:
        if (sInput.toLowerCase() != "no") {
          this.sFries = "with fries";
        } else {
          this.sFries = "";
        }

        // To Order Drinks
        this.stateCur = OrderState.DRINKS;
        aReturn.push(
          "Would you like to add drink to make it a combo? if yes, \n 1. Sprite \n 2. Diet Coke \n 3. Fanta \n 4. Dasani \n 5. Nestea"
        );
        break;
      case OrderState.DRINKS:
        this.isDone(true);
        this.sDrinks = sInput;
        if (this.sDrinks.toLowerCase() != "no") {
          if (this.sDrinks == "1") {
            this.sDrinks = "Sprite";
          } else if (this.sDrinks == "2") {
            this.sDrinks = "Diet Coke";
          } else if (this.sDrinks == "3") {
            this.sDrinks = "Fanta";
          } else if (this.sDrinks == "4") {
            this.sDrinks = "Dasani";
          } else if (this.sDrinks == "5") {
            this.sDrinks = "Nestea";
          }
        }

        aReturn.push("Thank-you!!! Your Order is shown below");
        aReturn.push(`${this.sSize} ${this.sItem} ${this.sFries}`);
        if (this.sDrinks) {
          aReturn.push(`Drink : ${this.sDrinks}`);
        }
        aReturn.push(`Subtotal = ${this.sAmount}`);
        this.sAmount += this.sAmount * this.sTax;
        aReturn.push(`Grand Total = ${this.sAmount}`);
        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Please pick it up at ${d.toTimeString()}`);
        break;
    }
    return aReturn;
  }
};
