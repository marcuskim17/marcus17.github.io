fetch ("testdata.json")
.then((mydata) => mydata.json())
.then((mydata) => {
    console.log(mydata);
    console.log(mydata.phone);

    document.getElementById("puppy").innerHTML = mydata.name;

    let sample = document.createElement("h1");
    sample.textContent = mydata.name;
    document.getElementById("puppy").appendChild(sample);
}); // end of .then