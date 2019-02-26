/* ----------------------------

	CustomValidation prototype

	- Keeps track of the list of invalidity messages for this input
	- Keeps track of what validity checks need to be performed for this input
	- Performs the validity checks and sends feedback to the front end

---------------------------- */

function CustomValidation(input) {
	this.invalidities = [];
	this.validityChecks = [];

	//add reference to the input node
	this.inputNode = input;

	//trigger method to attach the listener
    this.registerListener();
    this.ValidateForm();
}

CustomValidation.prototype = {
	addInvalidity: function(message) {
		this.invalidities.push(message);
	},
	getInvalidities: function() {
		return this.invalidities.join('. \n');
	},
	checkValidity: function(input) {
        
		for ( var i = 0; i < this.validityChecks.length; i++ ) {

           
			var isInvalid = this.validityChecks[i].isInvalid(input);
			if (isInvalid) {
				this.addInvalidity(this.validityChecks[i].invalidityMessage);
			}

			var requirementElement = this.validityChecks[i].element;
			if (requirementElement) {
				if (isInvalid) {
					requirementElement.classList.add('invalid');
					requirementElement.classList.remove('valid');
				} else {
					requirementElement.classList.remove('invalid');
					requirementElement.classList.add('valid');
				}

			} // end if requirementElement
		} // end for
	},
	checkInput: function() { // checkInput now encapsulated

		this.inputNode.CustomValidation.invalidities = [];
		this.checkValidity(this.inputNode);

		if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
			this.inputNode.setCustomValidity('');
		} else {
			var message = this.inputNode.CustomValidation.getInvalidities();
			this.inputNode.setCustomValidity(message);
		}
	},
	registerListener: function() { //register the listener here

		var CustomValidation = this;

		this.inputNode.addEventListener('keyup', function() {
			CustomValidation.checkInput();
        });
        
        this.inputNode.addEventListener('mouseout', function() {
            CustomValidation.checkInput();
        });
        
        this.inputNode.addEventListener('mouseover', function() {
            CustomValidation.checkInput();
		});

        this.inputNode.addEventListener('click', function() {
			CustomValidation.checkInput();
		});

    },

    ValidateForm: function (){
        var gender = document.querySelectorAll('.gender');
            if ( ( gender[0].checked == false ) && ( gender[1].checked == false ) ) 
            {
                var select = document.querySelector('.select-gender');
                select.classList.add('invalid');
                select.classList.remove('valid');
                return false;
            }else {
                select.classList.add('valid');
            }

        },
    
};



/* ----------------------------

	Validity Checks

	The arrays of validity checks for each input
	Comprised of three things
		1. isInvalid() - the function to determine if the input fulfills a particular requirement
		2. invalidityMessage - the error message to display if the field is invalid
		3. element - The element that states the requirement

---------------------------- */

var usernameValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 3;
		},
		invalidityMessage: 'This input needs to be at least 3 characters',
		element: document.querySelector('label[for="first-name"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			var illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Only letters and numbers are allowed',
		element: document.querySelector('label[for="first-name"] .input-requirements li:nth-child(2)')
	}
];

var LastNameValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 3;
		},
		invalidityMessage: 'This input needs to be at least 3 characters',
		element: document.querySelector('label[for="last-name"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			var illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Only letters and numbers are allowed',
		element: document.querySelector('label[for="last-name"] .input-requirements li:nth-child(2)')
	}
];

var adressValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 3;
		},
		invalidityMessage: 'You need to input your adress',
		element: document.querySelector('label[for="adress"] .input-requirements li:nth-child(1)')
	}
];

var BirthdayValidityChecks = [
	{
        
		isInvalid: function(input) {
            return input.value.length < 3;
		},
		invalidityMessage: 'Please select your date',
        element: document.querySelector('label[for="datepicker"] .input-requirements li:nth-child(1)'),
        
	}
];

var GenderValidityChecks = [
	{
        
		isInvalid: function(input) {
            return !input.checked;
		},
		invalidityMessage: 'Please select your gender',
        element: document.querySelector('label[for="radio-1"] .input-requirements li:nth-child(1)'),
        
	}
];

var passwordValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 8 | input.value.length > 100;
		},
		invalidityMessage: 'This input needs to be between 8 and 100 characters',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[0-9]/g);
		},
		invalidityMessage: 'At least 1 number is required',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(2)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[a-z]/g);
		},
		invalidityMessage: 'At least 1 lowercase letter is required',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(3)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[A-Z]/g);
		},
		invalidityMessage: 'At least 1 uppercase letter is required',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(4)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
		},
		invalidityMessage: 'You need one of the required special characters',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(5)')
	}
];


/* ----------------------------

	Setup CustomValidation

	Setup the CustomValidation prototype for each input
	Also sets which array of validity checks to use for that input

---------------------------- */

var usernameInput = document.getElementById('first-name');

usernameInput.CustomValidation = new CustomValidation(usernameInput);
usernameInput.CustomValidation.validityChecks = usernameValidityChecks;

var lastNameInput = document.getElementById('last-name');

lastNameInput.CustomValidation = new CustomValidation(lastNameInput);
lastNameInput.CustomValidation.validityChecks = LastNameValidityChecks;

var Birthday = document.getElementById('datepicker');

Birthday.CustomValidation = new CustomValidation(Birthday);
Birthday.CustomValidation.validityChecks = BirthdayValidityChecks;

var passwordInput = document.getElementById('password');

passwordInput.CustomValidation = new CustomValidation(passwordInput);
passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

var adress = document.getElementById('adress');

adress.CustomValidation = new CustomValidation(adress);
adress.CustomValidation.validityChecks = adressValidityChecks;



/* ----------------------------

	Event Listeners

---------------------------- */

var inputs = document.querySelectorAll('.input');
var submit = document.querySelector('input[type="submit"');
var form = document.getElementById('registration');

function validate() {
	for (var i = 0; i < inputs.length; i++) {
        inputs[i].CustomValidation.checkInput();
    }
    if(!submit){
        console.log('asd')
    }
}

var radio = document.querySelectorAll('.radio-inline');

for (var i = 0; i < radio.length; i++) {
    radio[i].onclick = function () {
        var select = document.querySelector('.select-gender');
        select.classList.remove('invalid');
        select.classList.add('valid');
    };
}

var country = document.getElementById('country');

country.addEventListener('click', function(){
    var co = document.getElementById('country');
    var select = document.querySelector('.country');
    if (!co.value) {
        
        select.classList.add('invalid');
        select.classList.remove('valid');
        
    return false;
    }else {
        select.classList.remove('invalid');
        select.classList.add('valid');
    }
});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var email = document.getElementById('email');
email.onmouseleave = function () {
    var select = document.querySelector('.email-li');
    if (email.value.indexOf('.', 0) == -1 || email.value.indexOf('@', 0) == -1) {
    
        
        select.classList.add('invalid');
        select.classList.remove('valid');
        
    }else {
        select.classList.remove('invalid');
        select.classList.add('valid');
    }
}
      

submit.addEventListener('click', validate );
form.addEventListener('submit', validate);

