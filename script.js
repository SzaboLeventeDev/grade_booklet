//global variables
var tempClassList = [];
var selectedStudent = student;

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
            subject: {}
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

//click the selected class & list the studs
function clickClass(tempClassList){
    var list = document.getElementById("classList");
    var selectedClass;
    for( var i = 0; i < tempClassList.length; i++){
        list.children[i].addEventListener("click", function(){
            clearList();
            console.log("actual clicked class: " + this.innerHTML)
            selectedClass = this.innerHTML;
            listStuds(selectedClass, listOfStudents);
        })
    }
    console.log(selectedClass);
}

function clearList(){
    $("#studsOfClass").children().remove();    

}

function listStuds(val, arr){    
    arr.filter(function(value, i, array){
        value = array[i];
        if (value.classData.id === val.toLowerCase()) {
            $("#studsOfClass").append("<li>" + value.first + " " + value.last + "</li>");
        }
    });
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
    var newGrade =  new gradeForStudent;
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



$(document).ready(function(){
    loadClasses(listOfStudents);
    clickClass(tempClassList);
    saveGrade();
})
