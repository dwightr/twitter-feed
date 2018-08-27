'use strict';

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
        
        for (let i = 0; i < usersArray.length; i++){
            console.log(usersArray[i].name);
            // console.log(i)
            var test = usersArray[i].tweets;
            for(let z = 0; z < test.length; z++){
                // console.log(usersArray[i][z]);
                console.log(test[z]);
            }
            // console.log(usersArray[i].tweets);
        }
    })
}

document.getElementById('generate').addEventListener('click', showTweetsByUser, false);