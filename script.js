//global variables
var tempClassList = [];
var tempStudList = [];
var selectedStudent = student;
var locationOfSpace = 0;
var selectedClass;
//Array of students and declaration for the objects
var student = {
    first:"",
    last:"",
    classData: {
        id:"",
        subject: {
            math: [],
            grammar: [],
            literature: [],
            history: []
        }
    }
}
var gradeForStudent = {
    topic: "",
    grade: "",
    category:"",
    /* subject:"" */
}

var listOfStudents = [
    {
        first: "Arend",
        last: "Vang",
        classData: {
            id:"5a",
            subject: {
                literature: [{
                    topic: "Petofi Sandor",
                    grade: "5",
                    category:"speak"
                }],
                history: [{
                    topic: "WWII",
                    grade: "4",
                    category:"Major test"
                }],
                math: [{
                    topic: "",
                    grade: "",
                    category:""
                }]
                
            }
        }
    },
    {
        first: "Evande",
        last: "Payne",
        classData: {
            id: "6b",
            subject: {}
        }
    },
    {
        first: "Shenandoah",
        last: "Martinsson",
        classData: {
            id: "6b",
            subject: {}
        }
    },
    {
        first: "Selwyn",
        last: "Gold",
        classData: {
            id: "5a",
            subject: {}
        }
    },
    {
        first: "Simona",
        last: "Bell",
        classData: {
            id: "6b",
            subject: {}
        }
    }
]

//Template for new stud

/* {
    first: "",
    last: "",
    classData: {
        id: "",
        subject: {}
    }
} */
//count studs in classes and write classes to the list.
function loadClasses(arr){
    var obj = {};
    
    arr.filter(function(val, i, array){
        val = array[i].classData.id;
        if (val in obj) {
            obj[val] ++;
        }else{
            obj[val] = 1;
            tempClassList.push(val);
        }
        
        return tempClassList;
    });
    console.log("number of students in each classes", obj);
    tempClassList.forEach(function(value, i, array) {
        value = array[i];
        $("#classList").append("<li>" + value.toUpperCase() + "</li>");
        
        
    });
    
}

//-----------------------click the selected class & list the studs-----------------------------
function clickClass(tempClassList){
    var list = document.getElementById("classList");
    
    for( var i = 0; i < tempClassList.length; i++){
        list.children[i].addEventListener("click", function(){
            clearList();
            console.log("actual clicked class: " + this.innerHTML)
           selectedClass = this.innerHTML;
            listStuds(selectedClass, listOfStudents);
        })
    }
    console.log("selectedClass: ", selectedClass);
}

function clearList(){
    $("#studsOfClass").children().remove(); 
    tempStudList  = [];   
    console.log("tempStudList is empty");
}

function listStuds(val, arr){    
    arr.filter(function(value, i, array){
        value = array[i];
        if (value.classData.id === val.toLowerCase()) {
            $("#studsOfClass").append("<li>" + value.first + " " + value.last + "</li>");
            tempStudList.push(value.first + " " + value.last);
            return tempStudList;
        }
    });
    console.log("tempStudlist: ", tempStudList);//log for testing
}
/* ------------------------add grade to student----------------------------------------------*/
var tempSubjectList = [];
var oralCheck = document.getElementById("oralGrade");
var smallTestCheck = document.getElementById("smallTestGrade");
var testCheck = document.getElementById("testGrade");
var majorTestCheck = document.getElementById("majorTestGrade");
var selectedGrade = document.getElementById("selectGrade");
var selectedSubject = document.getElementById("subjectList");

function selectSubjectsForGrade(arr){
    arr.filter(function(value){
        if (value in tempSubjectList) {
            
        }
    })
}

function valueChanged(){
    if (oralCheck.checked == true) {
        smallTestCheck.checked == false;
        testCheck.checked == false;
        majorTestCheck.checked == false
    }
    else if (smallTestCheck.checked == true) {
        oralCheck.checked == false;
        testCheck.checked == false;
        majorTestCheck.checked == false;
    }
    else if(testCheck.checked == true){
        oralCheck.checked == false;
        smallTestCheck.checked == false;
        majorTestCheck.checked == false
    }
    else if (majorTestCheck.checked == true) {
        oralCheck.checked == false;
        smallTestCheck.checked == false;
        testCheck.checked == false;
    }
    return;
}

function saveGrade(arr){
    var topicInput = document.getElementById("topicText");
    var newGrade =  Object.create(gradeForStudent);
    newGrade.topic = topicInput.value;
    newGrade.category = valueChanged();
    newGrade.grade = selectedGrade.value;
    /* newGrade.subject = selectedSubject; */

    //save button addEventListener
    var saveButton = document.getElementById("saveBtn");
    var getSelectedRadioBtn = document.querySelector('input[name = "gradeTypes"]:checked');
    var actualGrade = selectedGrade.options[selectedGrade.selectedIndex].value;
    var actualSubject = selectedSubject.options[selectedSubject.selectedIndex].value;
    saveButton.addEventListener("click", function (){
        //check if newGrade has not empty value
        if (actualSubject == "Select a subject!" || topicInput.value == "" || getSelectedRadioBtn == null || actualGrade == "Select a grade!") {
            alert("Please add all the required parameters for the saving!");
            //write the missing data/param to the user. - not finished
            console.log("error");
        }
        else{
            //newGrade pushing
            for (let i = 0; i < listOfStudents.length-1; i++) {
                var tempSubject = listOfStudents[i].classData.subject;
                if (listOfStudents[i].first === selectedStudent.first && listOfStudents[i].last === selectedStudent.last) {
                    tempSubject.some(function(actualSubject, index){
                        if (actualSubject === tempSubject[index]) {
                            tempSubject[index].push(newGrade);
                        }
                    })
                }
            }
        }
    })
}

function cancel(){
    var cancel = document.getElementById("cancelBtn");
    cancel.addEventListener("click", function(){
        console.log("click");
        document.getElementById("subjectList").selectedIndex = 0;
        document.getElementById("selectGrade").selectedIndex = 0;
        document.getElementById("topicText").value = "";
    });
   

}

//-------------------------------------click the selected student for more info----------------------------------------

function loadActualStudent(tempStudList){
    console.log("loadActualStudent() is invoking");//line for test
    var studList = document.getElementById("studsOfClass");
    var firstNameOfStud = "";
    var lastNameOfStud = "";
    var actualStudent = {};
    for(var i = 0; i < tempStudList.length-1; i++){
        studList.children[i].addEventListener("click", function(){
            console.log("this.innerHTML");
            /* findSpace(this.innerHTML) */;// instead of tempsutdlist -> studist.children[i].innerhtml/innertext?
            /* firstNameOfStud == tempStudList[i].substr(0, locationOfSpace);
            lastNameOfStud == tempStudList[i].substr(locationOfSpace); */
        })
    }
    for (let index = 0; index < listOfStudents.length-1; index++) {
        if (listOfStudents[i].first === firstNameOfStud && listOfStudents[i].last === lastNameOfStud) {
            actualStudent == listOfStudents[i].slice();
            break;
        }
          
    }
    return actualStudent;

}

function findSpace(val){
    //Yu's solution
    /* var text = ("Levi Ackermann");
    var spacePosition = text.search(" "); 
    console.log(spacePosition); */
    //My solution - not works
    /* var space = " ";
    
    return val.split('').forEach(function(char, idx){
        if (char === space) {
            locationOfSpace == idx;
            console.log(locationOfSpace);
            return locationOfSpace;
        }
    }); */

    //my new solution using Yu's 
    var spacePosition = val.search(" ");
    return spacePosition;
}
//-------------------------------------ready---------------------------------------------------------------------------
$(document).ready(function(){
    loadClasses(listOfStudents);
    clickClass(tempClassList);
    if (tempStudList !== []) {
        loadActualStudent(tempStudList);
    }
    
    saveGrade();
    cancel();
})


