
// Read files
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

it('reads a file!', function(){
    expect(Promise.resolve(readFile('file1'))).toBe(undefined)
})
