var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');
var sizeSel = document.getElementById('size');
var stufSel = document.getElementById('stuffing');
var toppSel = document.getElementById('topping');
var createHamb = document.getElementById('create');
var item = document.getElementById('iten');

var hamburgerMenu = {
   size: {
      little: {name: 'Малый', price: 50, calories: 20}, 
      normal: {name: 'Средний', price: 75, calories: 30}, 
      big: {name: 'Большой', price: 100, calories: 40}
   },
   stuffing: {
      cheese: {name: 'с сыром', price: 10, calories: 20},
      salad: {name: 'с салатом', price: 20, calories: 5},
      potato: {name: 'с картошкой', price: 15, calories: 10}

   },
   topping: {
      none: {name: 'по желанию', price: 0, calories: 0},
      standard: {name: 'с приправой', price: 15, calories: 0},
      mayonez: {name: 'с майонезом', price: 20, calories: 5}

   }

}

class CreateHamburger {
   constructor () {
      this.size = '';
      this.stuffing = '';
      this.topping = '';
   }
   totalPrice(){
      return hamburgerMenu.size[this.size].price + hamburgerMenu.stuffing[this.stuffing].price + hamburgerMenu.topping[this.topping].price;
   }
   totalCalories(){
      return hamburgerMenu.size[this.size].calories + hamburgerMenu.stuffing[this.stuffing].calories + hamburgerMenu.topping[this.topping].calories;

   }
   initForm() {
      for ( var key in hamburgerMenu.size) {
         // Create new option element
         var op = document.createElement('option');
         // Add class
         op.className = 'uk-option sizeOpt';
         op.value = key
         // Add text node with option value         
         op.appendChild(document.createTextNode(hamburgerMenu.size[key].name));
         sizeSel.appendChild(op);

      };
      for (var key in hamburgerMenu.stuffing) {
         // Create new option element
         var op = document.createElement('option');
         // Add class
         op.className = 'uk-option stufOpt';
         // Add text node with input value
         op.appendChild(document.createTextNode(hamburgerMenu.stuffing[key].name));
         stufSel.appendChild(op);

      };
      for (var key in hamburgerMenu.topping) {
         // Create new option element
         var op = document.createElement('option');
         // Add class
         op.className = 'uk-option toppOpt';
         // Add text node with input value
         op.appendChild(document.createTextNode(hamburgerMenu.topping[key].name));
         toppSel.appendChild(op);

      }
   }
   createOne (e) {      
      e.preventDefault();       
      // Get input value
      var selectedSize = sizeSel.value;
      var selectedStaf = stafSel.value;
      var selectedTopp = toppSel.value;
               
      // Create new li element
      var li = document.createElement('li');

      const gamb = new CreateHamburger (selectedSize, selectedStaf, (selectedTopp == 'по желанию') ? '' : selectedTopp);

      // Add class
      li.className = 'uk-margin list-item';
      // Add text node with input value
      li.appendChild(document.createTextNode(
         `Гамбургер  ${gamb.size} ${gamb.stuffing} (${gamb.topping} -- Цена ${gamb.totalPrice()}, калорий ${gamb.totalCalories()}` ));
      
      // Create del button element
      var deleteBtn = document.createElement('button');
      
      // Add classes to del button
      deleteBtn.className = '.uk-button .uk-button-danger uk-button-small uk-align-right delete';
      
      // Append text node
      deleteBtn.appendChild(document.createTextNode('<span uk-icon="close"></span>'));
      
      // Append button to li
      li.appendChild(deleteBtn);
      
      // Append li to list
      item.appendChild(li);
   }
   removeItem(e){
      if(e.target.classList.contains('delete')){
        if(confirm('Are You Sure?')){
          var li = e.target.parentElement;
          itemList.removeChild(li);
        }
      }
    }
}


const gamb = new CreateHamburger;
gamb.initForm();
gamb.createOne();

console.log ( gamb, gamb.totalPrice(), gamb.totalCalories() );

// Form submit event
form.addEventListener('submit', gamb.createOne);
item.addEventListener('click', gamb.removeItem);
// Delete event

// Remove item

