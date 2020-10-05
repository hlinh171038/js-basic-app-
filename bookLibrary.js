var fs = require('fs');
var moment = require('moment');
/**
 * Thiết kế database cho 1 hệ thống quản lý thư viện sách,
 *  cho biết thư viện này có hàng trăm giá sách khác nhau,
 *  sách được để ở bất kì giá nào không theo danh mục nào.
 * Mỗi cuốn sách có 1 mã khác nhau.
 * Hệ thống cho phép đăng ký người dùng mới,
 *  một người có thể mượn nhiều sách khác nhau trong một khoảng thời gian hữu hạn.
 * Hệ thống có thể lưu lịch sử ai đã mượn sách nào, bắt đầu mượn từ bao lâu, trả lúc nào.
 * Hệ thống có lưu lại số ngày quá hạn tổng cộng của 1 người dùng, ví dụ sách A quá 2 ngày, 
 * sách B quá 3 ngày -> tổng 5 ngày
 */
var readline = require('readline-sync');
var book =[
    {id:0,name:'Doremon',price:25,itemId:0},
    {id:1,name:'Connan',price:35,itemId:0},
    {id:2,name:'faritail',price:34,itemId:0},
    {id:4,name:'The Wailing',price:54,itemId:1},
    {id:5,name:'The tail of tow sister',price:65,itemId:1},
    {id:6,name:'The witcher',price:43,itemId:1}
]
var users =[];
var borrow = [];
function readFileUser(){
    var contentData = fs.readFileSync('./data.json');
    users = JSON.parse(contentData);
    for ( ele of users)
    {
        console.log(ele.name,ele.age)
    }
}
function readFileBorrow(){
    var contentData = fs.readFileSync('./borrow.json');
    borrow = JSON.parse(contentData);
    for ( ele of borrow)
    {
        console.log(`number book: ${ele.id.id}, name:${ele.id.name}, price: ${ele.id.price} `)
    }
}
function createUser(arr){
    var id = readline.question('What id ? :');
    var name = readline.question('What is your name ? :');
    var age = readline.question('How old are you ? :');
    var matchId = arr.find(function(x){
        return x.id === id;
    });
    if(matchId){
        console.log('id is exist');
        return;
    }
    var user ={
        id:id,
        name:name,
        age:age,
    }
    arr.push(user);
    var data = JSON.stringify(arr);
    fs.writeFileSync('./data.json',data);
    console.log(`create cuccess with id ${id}`);
}
function seeHistory(arr){
    var id = readline.question('What id:');
    var matchId = arr.filter(function(x){
        return x.idUser === id;
    });
    //console.log(matchId);
    for( var i of matchId){
        console.log(`name:${i.id.name}, time from: ${i.timeBegin} to: ${i.timeEnd}`);
    }
    //var readHistory= fs.readFileSync('./borrow.json',{encoding:'utf-8'});
    
}
function giveBackBook(arr,arrBook){
   
    var idUser = readline.question('id :>>');
    var matchUserId = arr.find(function(user){
        return user.id === idUser;
    });
    console.log(matchUserId);
    // show book which this id borrow
    var listBorrowId = arrBook.filter(function(borrow){
        return borrow.idUser === matchUserId.id;
    })
    for(var ele of listBorrowId){
        console.log(`id product: ${ele.id.id}, name: ${ele.id.name}`)
    }
    if(matchUserId){
        var idBook =parseInt(readline.question('id remove:>>')) ;
        var matchId = arrBook.find(function(x){
            return x.id.id ===idBook && x.idUser ===idUser;
        });
        console.log(matchId);
        // check use have to borrow
        if(!matchId){
            console.log('you not borrow');
            return;
        }
        // index 
        var index = arrBook.indexOf(matchId.idUser);
        //console.log('index'+index);
        arrBook.splice(index,1);
        console.log(arrBook)
        fs.writeFileSync('./borrow.json',JSON.stringify(arrBook));
    }
    fs.writeFile('')
    return result;
}
function checkBorrowBook(arr){
    var checkId = readline.question('What is your id ? :');
    var matchUserId = arr.find(function(x){
        return x.id ===checkId;
    });
    if(matchUserId){
        console.log(`Webcome ${matchUserId.name}`);
        borrowBook(borrow,book,checkId);
        return;
    } 
    var name = readline.question('What is your name ? :');
    var age = readline.question('How old are you ?:');
    var user ={
        id:checkId,
        name:name,
        age:age,
    }
    arr.push(user);
    var data = JSON.stringify(arr);
    fs.writeFileSync('./data.json',data);
    borrowBook(borrow,book,checkId);

};
function borrowBook(arr,arrbook,idUser){
    for(var book of arrbook){
        console.log(`number: ${book.id},name: ${book.name}, price: ${book.price}`);
    }
    var idBorrow = readline.question('what number book are you want to borrow ?:')
    var findId = arrbook.find(function(x){
        return x.id === parseInt(idBorrow);
    });
    console.log(`number: ${findId.id},name: ${findId.name}, price: ${findId.price}`);
    if(findId){
        console.log('1. 24 gio'),
        console.log('2. 2 ngay'),
        console.log('3. 4 ngay'),
        console.log('4. 1 tuan'),
        console.log('5. 1 thang');
        var idBorrow = readline.question('how many time do you want to borrow ? :');
        var timeEnd = moment();
        var timeBegin = moment().format('MM/DD/YYYY');
        switch(idBorrow){
            case '1':
                timeEnd = moment().add(1,'days').calendar();
                console.log(`You will give back thw book on ${timeEnd}`);
                break;
            case '2':
                timeEnd = moment().add(2,'days').calendar();
                console.log(`You will give back thw book on ${timeEnd}`);
                break;
            case '3':
                timeEnd = moment().add(4,'days').calendar();
                console.log(`You will give back thw book on ${timeEnd}`);
                break; 
            case '4':
                timeEnd = moment().add(7,'days').calendar();
                console.log(`You will give back thw book on ${timeEnd}`);
                 break;  
            case '5':
                timeEnd = moment().add(30,'days').calendar();
                console.log(`You will give back thw book on ${timeEnd}`);
                break;     
            default:
                console.log('book not exist');
                break; 
        }
        var userBorrow = {
            idUser:idUser,
            id:findId,
            timeBegin:timeBegin,
            timeEnd:timeEnd
        }
        arr.push(userBorrow);
        fs.writeFileSync('./borrow.json',JSON.stringify(arr));
       
    }else{
        console.log('number book not exist');
        return
    }
}
readFileUser();
readFileBorrow();
function show(){
    console.log('1.Create new use');
    console.log('2.Brrow the book');
    console.log('3.Look at the history');
    console.log('4. give back the book')
var chooseOption = readline.question('what option you choose ? :>');
switch(chooseOption){
    case '1':
        console.log('Create new user')
        createUser(users);
        show()
        break;
    case '2':
        console.log('borrow the book');
        checkBorrowBook(users);
        show()
        break;
    case '3':
        console.log('Look at the history borrow book');
        seeHistory(borrow);
        show()
        break;
    case '4':
        console.log('give back the book');
        giveBackBook(users,borrow);
        show()
        break;
    default:
        console.log('wrong option');
        show()
        break;
}
}
show()
