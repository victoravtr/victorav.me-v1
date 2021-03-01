var elementClicked, contentHeight, changeList, state;
var cards = ["card-1", "card-2", "card-3", "card-4", "card-5"];
const cardValues = {
    "card-1": {
        "bottom": "0%",
        "right": "0%",
        "z-index": 5
    },
    "card-2": {
        "bottom": "5%",
        "right": "5%",
        "z-index": 4
    },
    "card-3": {
        "bottom": "10%",
        "right": "10%",
        "z-index": 3
    },
    "card-4": {
        "bottom": "15%",
        "right": "15%",
        "z-index": 2
    },
    "card-5": {
        "bottom": "20%",
        "right": "20%",
        "z-index": 1
    }
};

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
var general, email, github, linkedin, portfolio;

window.onload = function() {
    Particles.init({
        selector: '.background',
        color: '#DA0463'
    });

    var check =  window.mobileAndTabletCheck();
    var checkWidth = window.checkWidth();
 	if (check || checkWidth) {
 		window.location.href='/mobile.html';
    }
     
    document.getElementById("logo-index").addEventListener("click", reorder);
    document.getElementById("logo-email").addEventListener("click", reorder);
    document.getElementById("logo-github").addEventListener("click", reorder);
    document.getElementById("logo-linkedin").addEventListener("click", reorder);
    document.getElementById("logo-portfolio").addEventListener("click", reorder);
    
    general = document.getElementsByClassName("general")[0];
    email = document.getElementsByClassName("email")[0];
    github = document.getElementsByClassName("github")[0];
    linkedin = document.getElementsByClassName("linkedin")[0];
    portfolio = document.getElementsByClassName("portfolio")[0];
};

async function reorder(elementClicked) {

    currentState = checkState();
    if (currentState == "running") {
        return;
    }

    state = "running";

    cardId = elementClicked['path'][3]['id'];
    if (cardId === "card-1") {
        state = "finish";
        return;
    }
    contentHeight = parseInt(window.getComputedStyle(document.getElementById("content"))["height"]);
    elementId = elementClicked.srcElement['id'];

    document.getElementById(cardId).style.transition = "1s";
    document.getElementById(cardId).style.bottom = "45%";
    
    cards.splice(cards.indexOf(cardId), 1);
    cards.forEach(element => {
        elementBottom = parseInt(window.getComputedStyle(document.getElementById(element))["bottom"]);
        percentage = Math.round(100 / (contentHeight / elementBottom)) - 30;
        document.getElementById(element).style.transition = "1s";
        document.getElementById(element).style.bottom = percentage + "%";
    });
    cards.push(cardId);
    await sleepNow(1000);
    document.getElementById(cardId).style.right = "0%";
    await sleepNow(2000);

    changeList = [];
    for (let index = 1; index < cardId.substring(cardId.length - 1, cardId.length); index++) {
        changeList.push(index);
    }
    changeList.reverse();
    document.getElementById(cardId).style.zIndex = "10";

    changeList.forEach(element => {
        card = "card-" + element;
        nextCard = "card-" + (element + 1);
        document.getElementById(card).style.right = cardValues[nextCard]["right"];
    });

    console.log(changeList);
    
    for (let index = 1; index <= 5; index++) {
        if (changeList.indexOf(index) != -1) {
            document.getElementById("card-" + index).style.bottom = cardValues["card-" + (index + 1)]["bottom"];
        } else {
            document.getElementById("card-" + index).style.bottom = cardValues["card-" + index]["bottom"];
        }
    }
    
    document.getElementById(cardId).style.bottom = "0%";
    document.getElementById(cardId).style.zIndex = "5";

    content = document.getElementById("content");
    nodes = content.childNodes;
    nodes.forEach(element => {
        if (element.tagName == "DIV") {
            switch (element.style.bottom) {
                case "0%":
                    element.id = "card-1";
                    element.style.zIndex = 5;  
                    break;
                case "5%":
                    element.id = "card-2";
                    element.style.zIndex = 4;
                    break;
                case "10%":
                    element.id = "card-3";
                    element.style.zIndex = 3;
                    break;
                case "15%":
                    element.id = "card-4";
                    element.style.zIndex = 2;
                    break;
                case "20%":
                    element.id = "card-5";
                    element.style.zIndex = 1;
                    break;
                default:
                    break;
            }
        }
    });
    state = "finish";
}

function checkState() {
    return state;
}

function mobileAndTabletCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

function checkWidth() {
    let check = false;
    let windowWidth =  parseInt(window.getComputedStyle(document.querySelector('body')).width.substr(0, window.getComputedStyle(document.querySelector('body')).width.indexOf("px")));
    if (windowWidth < 650) {
        check = true;
    }
    return check;
}