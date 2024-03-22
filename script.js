const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-02/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg")

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
   select.addEventListener("change",function(evt){
    updateFlag(evt.target)

   })
}



const updateFlag = function (element) {
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};


btn.addEventListener("click", async function(evt){
    evt.preventDefault();
    let amount=document.querySelector(".amount input")
    let amtVal=amount.value;
    console.log(amtVal);
    if(amtVal==="" || amtVal < 1){
        amtVal=1
        amount.value="1";
    }
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let responce= await fetch(URL);
    let data= await responce.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    console.log(rate);
    let finalAmount=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

})
