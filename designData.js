// database design
var classes = [
    {
        id:0,
        name:'1A',
        teacher:0,
       
     },
    {
        id:1,
        name:'2A',
        teacher:1
    },
    {
        id:2,
        name:'3A',
        teacher:2
    },
    {
        id:3,
        name:'4A',
        teacher:3
    },
    {
        id:4,
        name:'5A',
        teacher:4
    },
];
var teacher = [
    {
        id:0,
        name:'Van',
        age:30
    },
    {
        id:1,
        name:'Su',
        age:26
    },
    {
        id:2,
        name:'Thanh',
        age:35
    },
    {
        id:3,
        name:'Dep',
        age:40
    },
    {
        id:4,
        name:'Thuan',
        age:30
    }
]
 var students = [
    {name:'Thu', age:'6',gender:'female', classId:0},
    {name:'Duy', age:'6',gender:'male',classId:0},
    {name:'Huong', age:'6',gender:'female',classId:0},
    {name:'Linh', age:'6',gender:'male',classId:0},
    {name:'Nam', age:'7',gender:'male',classId:1},
    {name:'Duong', age:'8',gender:'male',classId:2},
    {name:'Mem', age:'8',gender:'male',classId:2},

]
 
// var classes1A = classes.find(function(x){
//     return x.name === '1A';
// })
// console.log(classes1A.student.length)

function StudentInClasses(nameClasses){
    //find id of classes
    var objectClass = classes.find(function(x){
        return x.name ===nameClasses;
    })
    var idClass = objectClass.id;
    // filter student have classId === id
    var studentInClass = students.filter(function(stu){
        return stu.classId === idClass;
    })
    return studentInClass;
};
console.log(StudentInClasses('1A'));