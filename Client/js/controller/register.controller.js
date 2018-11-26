m.controller('registercontroller', function ($scope,$location,Api) {

  $scope.isvalidating = false;
  $scope.error_patien = "";
  $scope.error_doctor= "";

  $scope.occurrenceOptions = [];

  $scope.occurrenceOptions.push('Pria');
  $scope.occurrenceOptions.push('Wanita');

  $scope.model = {};
  $scope.model.patient_gender = 'current';

  $scope.Spesialist = {
    model: null,
    availableOptions: [
      {id: '1', name: 'Dokter Umum'},
      {id: '2', name: 'Dokter Mata'},
      {id: '3', name: 'Dokter Jantung'}
    ]
   };
  

  $scope.tab = 1;

  $scope.setTab = function (newTab) {
    $scope.tab = newTab;
  };

  $scope.isSet = function (tabNum) {
    return $scope.tab === tabNum;
  };

  $scope.Register = function () {

    $scope.error_patien="";
    $scope.error_doctor="";

   
    if ($scope.tab == 1 && $scope.accept_patien) {

      var DATA={};
      DATA.name=$scope.name_patien;
      DATA.email=$scope.email_patien;
      DATA.password=$scope.password_patien;
      DATA.gender=$scope.model.patient_gender;
      var promise=Api.register('patien',DATA);
      promise.then(function(greeting) {
        $location.path('/login');
      }, function(response) {

        $scope.error_patien=response;
        $scope.isvalidating=false;

      }, function(update) {
          $scope.isvalidating=true;
      });
      
    } else if ($scope.tab == 2 && $scope.accept_dokter) {
      
      if($scope.Spesialist.model !== null){
        var DATA={};
        DATA.name=$scope.name_dokter;
        DATA.email=$scope.email_dokter;
        DATA.password=$scope.password_dokter;
        DATA.specialist=$scope.Spesialist.model;
      console.log(DATA);
      var promise=Api.register('doctor',DATA);
      promise.then(function(greeting) {
        $location.path('/login');
      }, function(response) {
        $scope.error_doctor=response.data;
        $scope.isvalidating=false;
      }, function(update) {
          $scope.isvalidating=true;
      });
      }

    }else{
      alert('Must accept condition');
    }




  }




      // // These are the constraints used to validate the form
      // var constraints = {
      //   email: {
      //     // Email is required
      //     presence: true,
      //     // and must be an email (duh)
      //     email: true
      //   },
      //   password: {
      //     // Password is also required
      //     presence: true,
      //     // And must be at least 5 characters long
      //     length: {
      //       minimum: 5
      //     }
      //   }
      // };

      // // Hook up the form so we can prevent it from being posted
      // var form = document.querySelector("form#formpasien");
      // form.addEventListener("submit", function(ev) {
      //   ev.preventDefault();
      //   handleFormSubmit(form);
      // });

      // // Hook up the inputs to validate on the fly
      // var inputs = document.querySelectorAll("input, textarea, select")
      // for (var i = 0; i < inputs.length; ++i) {
      //   inputs.item(i).addEventListener("change", function(ev) {
      //     var errors = validate(form, constraints) || {};
      //     showErrorsForInput(this, errors[this.name])
      //   });
      // }

      // function handleFormSubmit(form, input) {
      //   // validate the form aainst the constraints
      //   var errors = validate(form, constraints);
      //   // then we update the form to reflect the results
      //   showErrors(form, errors || {});
      //   if (!errors) {
      //     showSuccess();
      //   }
      // }

      // // Updates the inputs with the validation errors
      // function showErrors(form, errors) {
      //   // We loop through all the inputs and show the errors for that input
      //   _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
      //     // Since the errors can be null if no errors were found we need to handle
      //     // that
      //     showErrorsForInput(input, errors && errors[input.name]);
      //   });
      // }

      // // Shows the errors for a specific input
      // function showErrorsForInput(input, errors) {
      //   // This is the root of the input
      //   var formGroup = closestParent(input.parentNode, "form-group")
      //     // Find where the error messages will be insert into
      //     , messages = formGroup.querySelector(".messages");
      //   // First we remove any old messages and resets the classes
      //   resetFormGroup(formGroup);
      //   // If we have errors
      //   if (errors) {
      //     // we first mark the group has having errors
      //     formGroup.classList.add("has-error");
      //     // then we append all the errors
      //     _.each(errors, function(error) {
      //       addError(messages, error);
      //     });
      //   } else {
      //     // otherwise we simply mark it as success
      //     formGroup.classList.add("has-success");
      //   }
      // }

      // // Recusively finds the closest parent that has the specified class
      // function closestParent(child, className) {
      //   if (!child || child == document) {
      //     return null;
      //   }
      //   if (child.classList.contains(className)) {
      //     return child;
      //   } else {
      //     return closestParent(child.parentNode, className);
      //   }
      // }

      // function resetFormGroup(formGroup) {
      //   // Remove the success and error classes
      //   formGroup.classList.remove("has-error");
      //   formGroup.classList.remove("has-success");
      //   // and remove any old messages
      //   _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
      //     el.parentNode.removeChild(el);
      //   });
      // }

      // // Adds the specified error with the following markup
      // // <p class="help-block error">[message]</p>
      // function addError(messages, error) {
      //   var block = document.createElement("p");
      //   block.classList.add("help-block");
      //   block.classList.add("error");
      //   block.innerText = error;
      //   messages.appendChild(block);
      // }






























});