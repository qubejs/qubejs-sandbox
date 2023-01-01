var new_contact = {
  'First name': 'John', //Replace with first name of the user
  'Last name': 'Doe', //Replace with last name of the user
  Email: 'john.doe@example.com', //Replace with email of the user
  'Alternate contact number': '98765432', //Replace with a custom field
  company: {
    Name: 'Example.com', //Replace with company name
    Website: 'www.example.com' //Replace with website of company
  }
};
var identifier = 'john.doe@example.com';
var core = {
  handleSubmit: function () {
    var new_data;
    try {
      var identifier = document.getElementById('identifier').value;
      new_data = JSON.parse(document.getElementById('textarea').value);
      fwcrm.identify(identifier, new_data);
    } catch (ex) {
      alert('invalid json');
    }
  },
  init: function () {
    document.getElementById('identifier').value = identifier;
    document.getElementById('textarea').value = JSON.stringify(new_contact);
    document.getElementById('action').addEventListener('click', this.handleSubmit);
  }
};

core.init();