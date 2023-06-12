let cardDivArray=Array();   // div class="card"
let cardAbilitiesArray=Array();  // ability 모음
let filterList=Array(); // filter 모음

let container=document.querySelector(".container");
let filter=document.querySelector(".filter");
let filterElements=document.querySelector(".elements");
let clear=document.querySelector(".clear");

fetch('data.json').then(res=>res.json()).then(data=>addInfo(data));
function addInfo(data){
  data.forEach(function(info){
    makeCard(info);
  });
}

clear.addEventListener("click", clearFilter);

function filtering(){
  if(filterList.length==0){
    for(let i=0; i<cardDivArray.length; i++){
      cardDivArray[i].style.display="grid";
    }
    return;
  }
  for(let i=0; i<cardDivArray.length; i++){
    let filtered=true;
    for(let j=0; j<filterList.length; j++){
      let check=false;
      for(let k=0; k<cardAbilitiesArray[i].length; k++){
        if(cardAbilitiesArray[i][k]==filterList[j]) check=true;
      }
      if(check==false) filtered=false;
    }
    if(filtered==false){
      cardDivArray[i].style.display="none";
    }
    else{
      cardDivArray[i].style.display="grid";
    }
  }
}

function clearFilter(){
  let containerAttr=container.getAttributeNode("class");
  containerAttr.value="container no-filter";
  filter.style.display="none";
  filterList=Array();
  filterElements.replaceChildren();
  filtering();
}

function removeFilter(text, elementDiv){
  filterList.splice(filterList.indexOf(text), 1);
  let parent=elementDiv.parentNode;
  parent.removeChild(elementDiv);
  filtering();
  if(filterList.length==0){
    let containerAttr=container.getAttributeNode("class");
    containerAttr.value="container no-filter";
    filter.style.display="none";
  }
}

function addFilter(text){
  if(filterList.indexOf(text)!=-1) return;
  if(filterList.length==0){
    let containerAttr=container.getAttributeNode("class");
    containerAttr.value="container with-filter";
    filter.style.display="grid";
  }
  let elementDiv=document.createElement("div");
  elementDiv.setAttribute("class", "element");
  let contentDiv=document.createElement("div");
  contentDiv.setAttribute("class", "content");
  contentDiv.innerHTML=text;
  elementDiv.appendChild(contentDiv);
  let closeDiv=document.createElement("div");
  closeDiv.setAttribute("class", "close");
  elementDiv.appendChild(closeDiv);
  filterElements.appendChild(elementDiv);
  filterList.push(text);
  closeDiv.addEventListener("click", function(event){
    removeFilter(text, elementDiv);
  });
  filtering();
}

function makeCard(info){
  let cardDiv=document.createElement("div");
  cardDiv.setAttribute("class", "card");
  //logo Div
  let logoDiv=document.createElement("div");
  logoDiv.setAttribute("class", "logo");
  let logoImg=document.createElement("img");
  logoImg.setAttribute("src", info.logo);
  logoDiv.appendChild(logoImg);
  cardDiv.appendChild(logoDiv);
  //info Div
  let infoDiv=document.createElement("div");
  infoDiv.setAttribute("class", "info");
  //titleDiv
  let titleDiv=document.createElement("div");
  titleDiv.setAttribute("class", "title");
  let infoNameDiv=document.createElement("div");
  infoNameDiv.setAttribute("class", "name");
  infoNameDiv.innerHTML=info.company;
  titleDiv.appendChild(infoNameDiv);
  if(info.new==true){
    let infoNewDiv=document.createElement("div");
    infoNewDiv.setAttribute("class", "new");
    infoNewDiv.innerHTML="NEW!";
    titleDiv.appendChild(infoNewDiv);
  }
  if(info.featured==true){
    let infoFeaturedDiv=document.createElement("div");
    infoFeaturedDiv.setAttribute("class", "featured");
    infoFeaturedDiv.innerHTML="FEATURED";
    titleDiv.appendChild(infoFeaturedDiv);
    cardDiv.style.boxShadow="-5px 0px hsl(180, 29%, 50%)";
  }
  infoDiv.appendChild(titleDiv);
  //positionDiv
  let positionDiv=document.createElement("div");
  positionDiv.setAttribute("class", "position");
  positionDiv.innerHTML=info.position;
  infoDiv.appendChild(positionDiv);
  //dateDiv
  let dateDiv=document.createElement("div");
  dateDiv.setAttribute("class", "date");
  dateDiv.innerHTML=info.postedAt+" ㆍ "+info.contract+" ㆍ "+info.location;
  infoDiv.appendChild(dateDiv);
  cardDiv.appendChild(infoDiv);
  //abilitiesDiv
  let abilitiesDiv=document.createElement("div");
  abilitiesDiv.setAttribute("class", "abilities");
  let abilitiesArray=Array();
  let roleDiv=document.createElement("div");
  roleDiv.setAttribute("class", "ability");
  roleDiv.innerHTML=info.role;
  roleDiv.addEventListener("click", function(event){
    addFilter(this.innerHTML);
  });
  abilitiesArray.push(info.role);
  abilitiesDiv.appendChild(roleDiv);
  let levelDiv=document.createElement("div");
  levelDiv.setAttribute("class", "ability");
  levelDiv.innerHTML=info.level;
  levelDiv.addEventListener("click", function(event){
    addFilter(this.innerHTML);
  });
  abilitiesArray.push(info.level);
  abilitiesDiv.appendChild(levelDiv);
  for(let i=0; i<info.languages.length; i++){
    let langDiv=document.createElement("div");
    langDiv.setAttribute("class", "ability");
    langDiv.innerHTML=info.languages[i];
    abilitiesDiv.appendChild(langDiv);
    langDiv.addEventListener("click", function(event){
      addFilter(this.innerHTML);
    });
    abilitiesArray.push(info.languages[i]);
  }
  for(let i=0; i<info.tools.length; i++){
    let toolDiv=document.createElement("div");
    toolDiv.setAttribute("class", "ability");
    toolDiv.innerHTML=info.tools[i];
    toolDiv.addEventListener("click", function(event){
      addFilter(this.innerHTML);
    });
    abilitiesDiv.appendChild(toolDiv);
    abilitiesArray.push(info.tools[i]);
  }
  cardDiv.appendChild(abilitiesDiv);
  container.appendChild(cardDiv);
  cardDivArray.push(cardDiv);
  cardAbilitiesArray.push(abilitiesArray);
}