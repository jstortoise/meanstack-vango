module.exports = function(){
  var self = (function(){
    //User Email
    var email; 
    var setEmail= function(tmp){
      email = tmp;
    }
    var getEmail = function(){
      return email;
    }

    //The stage of Dialog
    var stage; 
    var setStage = function(tmp){
      stage = tmp;
    }
    var getStage = function(){
      return stage;
    }

    //User Name
    var profile = {
      firstName: '',
      lastName: ''
    }; 
    var setProfile = function(tmp){
      profile.firstName = tmp.firstName;
      profile.lastName = tmp.lastName;
    };
    var getProfile = function(){
      return profile;
    };

    //Mariteral Status
    var mariteral;
    var setMariteral = function(tmp){
      mariteral = tmp;
    };
    var getMariteral = function(){
      return mariteral;
    };

    //Coverage - Me & Spouse
    var coverage;
    var setCoverage = function(tmp){
      coverage = tmp;
    };
    var getCoverage = function(){
      return coverage;
    };

    //Car Model
    var carModel;
    var setCarModel = function(tmp){
      carModel = tmp;
    };
    var getCarModel = function(){
      return carModel;
    }

    // Miles per day
    var miles;
    var setMiles = function(tmp){
      miles = tmp;
    };
    var getMiles = function(){
      return miles;
    }

    //Highest Education
    var education;
    var setEducation = function(tmp){
      education = tmp;
    };
    var getEducation = function(){
      return education;
    }

    //Birthday
    var birthday = {
      mm:'',
      dd:'',
      yyyy: ''
    };
    var setBirthday = function(tmp){
      birthday.mm = tmp.mm;
      birthday.dd = tmp.dd;
      birthday.yyyy = tmp.yyyy;
    }
    var getBirthday = function(){
      return birthday;
    }

    //Incident
    var incident;
    var setIncident = function(tmp){
      incident = tmp;
    }
    var getIncident = function(){
      return incident;
    }

    //Spouse Data
    var spouse = {
      name: '',
      education: '',
      birthday:{
        dd: '',
        mm: '',
        yyyy: ''
      },
      incident:''
    };
    var setSpouseName = function(tmp){
      spouse.name = tmp;
    }
    var getSpouseName = function(){
      return spouse.name;
    }
    var setSpouseEducation = function(tmp){
      spouse.education = tmp;
    }
    var getSpouseEducation = function(){
      return spouse.education;
    }
    var setSpouseBirthday = function(tmp){
      spouse.birthday.dd = tmp.dd;
      spouse.birthday.mm = tmp.mm;
      spouse.birthday.yyyy = tmp.yyyy;
    }
    var getSpouseBirthday = function(){
      return spouse.birthday;
    }
    var setSpouseIncident = function(tmp){
      spouse.incident = tmp;
    }
    var getSpouseIncident = function(){
      return spouse.incident;
    }

    //Zip Code
    var zip = '';
    var setZipCode = function(tmp){
      zip = tmp;
    };
    var getZipCode = function(){
      return zip;
    };

    return{
      setEmail: setEmail,
      getEmail: getEmail,
      setStage: setStage,
      getStage: getStage,
      setProfile: setProfile,
      getProfile: getProfile,
      setMariteral: setMariteral,
      getMariteral: getMariteral,
      setCoverage: setCoverage,
      getCoverage: getCoverage,
      setCarModel: setCarModel,
      getCarModel: getCarModel,
      setMiles: setMiles,
      getMiles: getMiles,
      setEducation: setEducation,
      getEducation: getEducation,
      getBirthday: getBirthday,
      setBirthday:setBirthday,
      getIncident: getIncident,
      setIncident: setIncident,
      setSpouseName: setSpouseName,
      getSpouseName: getSpouseName,
      setSpouseEducation: setSpouseEducation,
      getSpouseEducation: getSpouseEducation,
      setSpouseBirthday: setSpouseBirthday,
      getSpouseBirthday: getSpouseBirthday,
      setSpouseIncident: setSpouseIncident,
      getSpouseIncident: getSpouseIncident,
      setZipCode: setZipCode,
      getZipCode: getZipCode
    }
  })();
  return self;
}