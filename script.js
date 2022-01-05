//global variables
var tempClassList = [];

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
    category:""
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

//-------------------------------------click the selected student for more info----------------------------------------

function loadSubject(tempStudList){
    var studList = document.getElementById("studsOfClass");
    /* var firstNameOfStud = "";
    var lastNameOfStud = "";
    var actualStudent = {}; */
    for(var i = 0; i< tempStudList.length-1; i++){
        studList.children[i].addEventListener("click", function(){
            console.log(i)
        })
    }
    

}

//-------------------------------------ready---------------------------------------------------------------------------
$(document).ready(function(){
    loadClasses(listOfStudents);
    clickClass(tempClassList);
    loadSubject(listOfStudents);
})


