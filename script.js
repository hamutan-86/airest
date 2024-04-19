let model = "airest-2.5-turbo";
document.addEventListener("DOMContentLoaded", function () {
  const mes_input = document.getElementById("mes_input");
  mes_input.addEventListener("input", onInputChange);
})

function onInputChange(event) {
  sendbtn = document.getElementById("send")
  if (event.target.value != "") {
    sendbtn.style.backgroundColor = "white";
  }else if (event.target.value === "") {
    sendbtn.style.backgroundColor = "gray";
  }
}

function showDropdown () {
  document.getElementById("model-dropdown").style.display = "block";
}

function closeDropdown () {
  document.getElementById("model-dropdown").style.display = "none";
} 

function changeModel (selectedmodel) {
  model = selectedmodel;
  var mocjson = {"airest-2.5-turbo": "1", "airest-2.5": "2", "airest-2": "3", "airest-1": "4"}
  var modelcheck = document.getElementById(`selectmodel${mocjson[selectedmodel]}`)
  var smdls = document.getElementsByClassName("selectmodel")
  for( var i = 0; i < smdls.length; i++  ){
    smdls[i].style.display = "none";
  }
  modelcheck.style.display = "inline-block";
  document.getElementById("modeltext").innerText = {"airest-2.5-turbo": "Airest 2.5-turbo", "airest-2.5": "Airest 2.5", "airest-2": "Airest 2", "airest-1": "Airest 1"}[selectedmodel]
  newChat();
  closeDropdown();
}

function sendMes () {
  if ( mes_input.value === "" ){
    return
  }
  var msgContainer = document.getElementById("msgContainer")
  if ( document.getElementById("container").style.display != "none" ){
    document.getElementById("container").style.display = "none";
    msgContainer.style.display = "block";
  }
  var message = mes_input.value;
  mes_input.value = "";
  sendbtn.style.backgroundColor = "gray";
  var msgDiv = document.createElement('div');
  msgDiv.className = "message";
  msgDiv.innerHTML = `<p class='user'><img src='usericon.webp' class='icon'> You</p><p class="mesContent">${message}</p>`;
  msgContainer.appendChild(msgDiv);
  var msgDiv = document.createElement('div');
  msgDiv.className = "message";
  msgDiv.innerHTML = `<p class='user'><img src='airest.png' class='icon'> Airest</p><p class="mesContent">...</p>`;
  msgContainer.appendChild(msgDiv);
  fetch("https://api-airest.onrender.com/chat", {method: "POST", headers: {"Content-Type": "Application/json"}, body: JSON.stringify({"model": model, "message": message})}).then(response => response.json()).then((data) => {
    msgDiv.innerHTML = `<p class='user'><img src='airest.png' class='icon'> Airest</p><p class="mesContent">${data["message"]["content"]}</p>`
  })
}

function newChat () {
  document.getElementById("container").style.display = "block";
    document.getElementById("msgContainer").style.display = "block";
  document.getElementById("msgContainer").innerHTML = "";
  
  mes_input.value = "";
  sendbtn.style.backgroundColor = "gray";
}