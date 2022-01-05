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
//count classes
function loadClasses(arr){
    var classList = {};
    arr.filter(function(val, i, array){
        val = array[i].classData.id;
        if (val in classList) {
            classList[val] ++;
        }else{
            classList[val] = 1;
        }

    });
    console.log(classList);
    /* arr.forEach(function(value, i, array) {
        var className = array[i].classData.id;
        $("#classList").append("<li>" + className.toUpperCase() + "</li>");
        console.log("sikeres kör " + className);
        
    });
    return className; */
}
$(document).ready(function(){
    loadClasses(listOfStudents);
})
