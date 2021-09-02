/*===============================================
                    font 
===============================================*/

const searchValue =() =>{
    const spinnerid = document.getElementById("spinnerId")
    spinnerid.style.display = "block"
    const cardSectionId = document.getElementById("cards-section-id")
    cardSectionId.style.display = "none"
    const inputBoxText = document.getElementById("input-box")
    const inputBox = inputBoxText.value
    // console.log(inputBox);
    fetch(`https://openlibrary.org/search.json?q=${inputBox}`)
    .then(res => res.json())
    .then(data => displayValue(data.docs))
    inputBoxText.value = ""
}

const displayValue = (data) =>{
    
    const totalResult = document.getElementById("total-number")
    // totalResult.innerText = `${data.length} Results found`
    if (data.length === 0) {
        totalResult.innerHTML = `<h4>No Results Found</h4>
        <div  class="d-flex justify-content-center">
        <img src='image/nai.gif'>
        </div>
         `
 
    } 
    else {
        
        totalResult.innerText = `${data.length} Results found`
    }
    const cardID = document.getElementById("card-id")
    cardID.textContent = ""
    // console.log(data.title);
    const dataSlicing = data.slice(0,9)
    dataSlicing.forEach(element => {
        // console.log(element.title);
        const div = document.createElement("div")
        div.classList.add("col")
        // let imgee = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`
        div.innerHTML = `
        <div class="card h-100 shadow-lg">           
            <div class="card-body">
            <img src= "${`https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`}" class="card-img-top"> 
                <h5 class="card-title">${element.title}</h5>
                <h6 class="card-title">Author: ${element.author_name? element.author_name : "NA"}</h6>
                <h6 class="card-title">First Published Year: ${element.first_publish_year}</h6>
                <h6 class="card-title">First Published Year: ${element.publisher}</h6>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `
        cardID.appendChild(div)
    });
    // console.log(data.length);
    const spinnerid = document.getElementById("spinnerId")
    spinnerid.style.display = "none"
    const cardSectionId = document.getElementById("cards-section-id")
    cardSectionId.style.display = "block"

}