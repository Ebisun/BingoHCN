window.onload = function(){
    fillLocations();
    gameController.start();
    document.querySelector("#newGame").addEventListener("click", function(){gameController.newBoard();})
}
const gameController = {
    coins : [],
    tableCoins : [],
    tableSet : [],
    start : function(){
        this.randomizer();
        this.getList();
        this.makeTable();
        this.confirmTable();
        this.htmlTable();
    },
    randomizer : function(){
        let arr = this.coins.length-1, randArr = 0;
        while (arr > 0){
            randArr = Math.floor(Math.random() * arr);
            [this.coins[arr], this.coins[randArr]] = [[this.coins[randArr]], this.coins[arr]];
            arr--;
        }
    },
    getList : function(){
        this.tableCoins = [];
        for(let i = 0; i < 25; i++)
            this.tableCoins.push(this.coins[i])
    },
    makeTable : function(){
        this.tableSet = [];
        for (let i=0; i<this.tableCoins.length; i+=5){
            let temp = [];
            for(let j = 0; j<5; j++)
                temp.push(this.tableCoins[j+i])
            this.tableSet.push(temp)
        }
    },
    confirmTable : function(){
        let count = 0;
        for(let i=0; i<5; i++){
            for (let j = 0; i < 5; i++){
                let testSpot = this.tableSet[i][j];
                if (testSpot[1] != "Coin_Arcade" && testSpot[1]!= "Dog_Arcade"){
                    for(let p = 0; p < 5; p++){
                        for(let q = 0; q < 5; q++){
                            if((p != i && q != j) && ((p == i && j != q) || (p != i && j == q))){
                                if(this.testcase[1] === this.tableSet[p][q][1])
                                count++;
                            }
                        }
                    }
                }

            }
        }
        if(count > 3){
            this.randomizer();
            this.getList();
            this.makeTable();
            this.confirmTable();
        }
    },
    htmlTable : function(){
        let doc = document.querySelector("#content")
        let htmlString = "<table>";
        for (let i = 0; i < this.tableSet.length; i++){
            htmlString += "<tr>";
            for(let j = 0; j < this.tableSet[i].length; j++){
                if (i === 0 && j === 0){
                    htmlString += "<td>" + this.tableSet[i][j] + "</td>"
                }
                else{
                htmlString += "<td>" + this.tableSet[i][j] + "</td>"
                }
            }
            htmlString += "</tr>"
        }
        htmlString += "</table>"
        doc.innerHTML = htmlString
        document.querySelector("table").addEventListener("click", el => {
            if (el.target.tagName === "TD"){
                if (el.target.classList.contains("selected"))
                    el.target.classList.remove("selected")
                else
                    el.target.classList.add("selected")
            }
        })
    },
    newBoard : function(){
        this.start()
    }
}

const common = ["Dog_Arcade", "Coin_Arcade", "Mai", "Mitch", "Fisher", "Blessley"]
const hairballCoins = [{location : "Hairball", coins : ["Gamer_Kid", "Louist", "Moomy", "Nina", "Dustan", "Gabi", "Tristan"]},
    {location : "Turbine", coins : ["Gabi", "Dustan", "Louist", "Trixie"]},
    {location : "Salmon", coins : ["Gamer_Kid", "Louist", "Moomy", "Nina", "Dustan", "Gabi", "Trixie"]},
    {location : "Pool", coins : ["Gabi", "Trixie"]},
    {location : "Bathhouse", coins : ["Gamer_Kid", "Louist", "Moomy", "Nina", "Dustan", "Gabi", "Tristan"]}]

function fillLocations(){
    for(let i = 0; i<hairballCoins.length; i++){
        for(let j =0; j < common.length; j++)
        hairballCoins[i].coins.push(common[j])
    }
    for(let i = 0; i<hairballCoins.length; i++){
        for(let j=0; j < hairballCoins[i].coins.length; j++)
            hairballCoins[i].coins[j] = hairballCoins[i].coins[j] + " " + hairballCoins[i].location;
    }
    for (let i = 0; i<hairballCoins.length; i++)
        for(let j = 0; j < hairballCoins[i].coins.length; j++){
            let temp = hairballCoins[i].coins[j]
            gameController.coins.push(temp)
    }
}


