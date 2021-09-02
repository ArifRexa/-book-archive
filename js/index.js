/*===============================================
       Spinner & Cards Value Show Function 
===============================================*/
const spinnerAdd = (displayStyle) =>{
    document.getElementById("spinnerId").style.display = displayStyle
}

const cardValue = (displayStyle) =>{
    document.getElementById("cards-section-id").style.display = displayStyle
}

/*===============================================
                Click Function
===============================================*/
const searchValue = () =>{
    spinnerAdd("block")
    cardValue("none")
    const inputBoxText = document.getElementById("input-box")  /* Get Value from Search Box */
    const inputBox = inputBoxText.value
    fetch(`https://openlibrary.org/search.json?q=${inputBox}`) /* Get Data from API Link */
    .then(res => res.json())
    .then(data => displayValue(data.docs))
    inputBoxText.value = ""                                    /* Clear Input Field */
}

/*===============================================
                Display Function
===============================================*/
const displayValue = (data) =>{    
    const totalResult = document.getElementById("total-number")
    if (data.length === 0) {
        totalResult.innerHTML = `<h4>No Results Found</h4>
        <div  class="d-flex justify-content-center">
        <img src='image/nai.gif'>
        </div> `
    } 
    else {
        totalResult.innerText = `${data.length} Results found`
    }

    const cardID = document.getElementById("card-id")
    cardID.textContent = ""                                /* Clear Results Field when searching */
    
    const dataSlicing = data.slice(0,9)     /* slicing total search result Display some results from total */
    dataSlicing.forEach(element => {
        
        const div = document.createElement("div")
        div.classList.add("col")
        div.innerHTML = `
        <div class="card h-100 shadow-lg">           
            <div class="card-body">
                <img src= "${`https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`}" class="card-img-top img-height"> 
                
                <h3 class="card-title ">${element.title}</h3>
                <h6 class="card-title"><span class="fw-bold">Author: </span> ${element.author_alternative_name? element.author_alternative_name : element.author_name}</h6>
                <h6 class="card-title"><span class="fw-bold">First Published Year: </span> ${element.first_publish_year? element.first_publish_year : "NA"}</h6>
                <h6 class="card-title"><span class="fw-bold">Publisher: </span> ${element.publisher}</h6>
                
            </div>
        </div>
        `
        cardID.appendChild(div)
    });
    spinnerAdd("none")
    cardValue("block")
}