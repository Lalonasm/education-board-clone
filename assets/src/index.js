const resultSearchForm = document.getElementById("result-search-form");
const eduPzlLabel = document.getElementById("edu-pzl");
const eduBody = document.querySelector(".edu-body");






//Result search form manage

const getRandomNumber = () => {
    return Math.floor(Math.random() * 9) + 1;
};



let plz1 = getRandomNumber();
let plz2 = getRandomNumber();

console.log(plz1, plz2)

localStorage.setItem('edu_pzl', JSON.stringify({ a: plz1, b: plz2 }));
eduPzlLabel.innerHTML = `${plz1} + ${plz2}`

resultSearchForm.onsubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());


    console.log(data);

    //get pzl data
    const pzlData = JSON.parse(localStorage.getItem('edu_pzl'));
    const stuData = JSON.parse(localStorage.getItem('students'));

    // checked pauzz
    if (pzlData.a + pzlData.b !== parseInt(data.pzl)) {
        alert('pzl not match')
    }
    else {
        const searchData = stuData.find(
            (item) =>
                item.roll == data.roll &&
                item.reg == data.reg &&
                item.exam == data.examination &&
                item.year == data.year &&
                item.board == data.board
        );

        if (searchData) {
            localStorage.setItem("searchData", JSON.stringify(searchData));

            eduBody.innerHTML = `
<img src="https://www.galvanizeaction.org/wp-content/uploads/2022/06/Wow-gif.gif"/>
`

            setInterval(() => {
                window.location.href = "result.html"


            }, 3000);

        }
        else {
            alert('No result found')
        }


        console.log(searchData);

    }

}