'use strict';

// function readFiles(file1, file2) {
// 	document.getElementById('file').onchange = function(){

//     let file = this.files[0];
    
//     let reader = new FileReader();
    
//     reader.onload = function(progressEvent){
//         // Entire file
//         console.log(this.result);
    
//         // By lines
//         let lines = this.result.split('\n');
//         for(let line = 0; line < lines.length; line++){
//         console.log(lines[line]);
//         }
//     };
    
//     reader.readAsText(file);
    
//     };   
// }






/*function test(usersFile, tweetsFile){
    usersFile = document.getElementById('file1').files[0];
    tweetsFile = document.getElementById('file2').files[0];

    let reader = new FileReader(),
        reader2 = new FileReader()



    reader2.onload = function(){
        // Entire file
        // console.log(this.result);

        // By lines
        let lines = this.result.split('\n');
        for(let line = 0; line < lines.length; line++){
            console.log(lines[line]);
        }
    }

    reader.onload = function(){
        let lines2 = reader.result.split(' ').map(function(line){
            return line.split(/\n/g)
        })

        let newArr = []

        // console.log(lines2)

        for(let i = 0; i < lines2.length; i++) {
            newArr = newArr.concat(lines2[i]);
        }

        // Remove empty strings
        newArr = newArr.filter(v=>v!='follows').sort();
        console.log(newArr)

        // for (let i = 0; i <= newArr.length; i++) {
        //     console.log(newArr[i]);
        // }
    }



    reader.readAsText(usersFile)

    reader2.readAsText(tweetsFile)

    // console.log(usersFile)
    // return usersFile
}*/


/*function readFile(selector) {

    let file = document.getElementById(selector).files[0];

    let reader = new FileReader();

    reader.onload = function(){
        // Entire file
        console.log(this.result);
    };

    return reader.readAsText(file)
}



function test2(usersString,tweetsString) {
    let usersString = readFile('file1');
    let tweetsString = readFile('file2');

    let tweetsArray = tweetsString.split('\n');

    let usersArray = usersString.split(/,|follows|\n/).reduce((collection, user) => {
        let trimmed = user.trim();
        !~collection.indexOf(trimmed) && collection.push(trimmed);
        return collection;
    }, []).map((user) => {
        let tweetsForUser = tweetsArray.filter((t) => t.includes(user)).map((t) => `@${user}: ${t.split('>')[1].trim()}`);
        return {
            name: user,
            tweets: tweetsForUser
        }
    });

    return usersArray;

}

document.getElementById('generate').addEventListener('click', test2, false);*/



function readFile(selector) {
    return new Promise(function (resolve, reject) {
        try {
            let file = document.getElementById(selector).files[0],
                reader = new FileReader();

            reader.onload = function () {
                resolve(this.result);
            };

            reader.readAsText(file)
        } catch (e) {
            reject(e)
        }
    })
}
 
 
function showTweetsByUser() {
    return Promise.all([readFile('file1'),readFile('file2')]).then(function ([usersString, tweetsString]) {
        let tweetsArray = tweetsString.split('\n');
        let usersArray = usersString.split(/,|follows|\n/).reduce((collection, user) => {
            let trimmed = user.trim();
            !~collection.indexOf(trimmed) && trimmed !=='' && collection.push(trimmed);
            return collection;
        }, []).sort().map((user) => {
            let tweetsForUser = tweetsArray.filter((t) => t.includes(user)).map((t) => {
            let split = t.split('>');
                    split = split.length == 2 ? split[1] : '';	
            return `@${user}: ${split.trim()}`
        });
            return {
                name: user,
                tweets: tweetsForUser
            }
        });
        // usersArray.forEach(function (arrayItem) {
        //     let x = arrayItem.prop1;
        //     console.log(x);
        //     console.log(usersArray[arrayItem]);
        // });
        for (let i = 0; i < usersArray.length; i++){
            console.log(usersArray[i].name + '\n' + usersArray[i].tweets + '\n');
        }
        // return usersArray;
    })
}

document.getElementById('generate').addEventListener('click', showTweetsByUser, false);



// function readFile(selector) {
//     return new Promise(function (resolve, reject) {
//         try {
//             let file = document.getElementById(selector).files[0],
//                 reader = new FileReader();
 
//             reader.onload = function () {
//                 resolve(this.result);
//             };
 
//             reader.readAsText(file)
//         } catch (e) {
//             reject(e)
//         }
//     })
 
//  }
 
 
//  function showTweetsByUser() {
 
//    return Promise.all([readFile('file1'),readFile('file2')]).then(function ([usersString, tweetsString]) {
//         let tweetsArray = tweetsString.split('\n');
//         let usersArray = usersString.split(/,|follows|\n/).reduce(function(collection, user) {
//             let trimmed = user.trim();
//             !~collection.indexOf(trimmed) && trimmed !=='' && collection.push(trimmed);
//             return collection;
//         }, []).map(function(user) {
//             let tweetsForUser = tweetsArray.filter(function(t) {
//                 t.includes(user)
//             }).map(function(t) {
//             let split = t.split('>');
//                  split = split.length == 2 ? split[1] : '';	
//             return `@${user}: ${split.trim()}`});
//             return {
//                 name: user,
//                 tweets: tweetsForUser
//             }
//         });
//         console.log(usersArray);
//         return usersArray;
//     })
 
 
//  }
//  document.getElementById('generate').addEventListener('click', showTweetsByUser, false);