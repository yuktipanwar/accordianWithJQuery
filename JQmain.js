let URL = "https://dog.ceo/api/breeds/";
var countBreeds =0;


/**main**/
function main(){
    
        fetchBreeds("list/all");

}


/**fetching API**/
function fetchBreeds(link){

    try{
        alert("fetching...");
        fetch(URL+link)
       .then(response => {
        return response.json();
       })
       .then(data =>{
        try{
            var obj = data.message;
            console.log(obj);
            renderBreedAccordian(obj);
        }catch(error){
            alert("Error #001!");
            console.error('Error:', error);
    }
    })
    }catch(error){
        alert("Error #002!");
        console.error('Error:', error);
    }
    
}

/**rendering data**/
function renderBreedAccordian(obj){

    try{
        var objArr= Object.keys(obj);   //fetching keys
        var objVal= Object.values(obj);

        const accordian = document.getElementById("accordian");
        accordian.innerHTML = "";  //clear the accordian


        
        //MAIN LOOP 
        for(let i=0; i < objArr.length; i++){
            
            /*display only if array length is greater than 0*/
            if(objVal[i].length>0){
                countBreeds++;

                const item = document.createElement("li");
                item.innerHTML = `
                <div class ="accordian-item">
                    <h2 class="accordian-header">
                        <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapse-${i}" aria-expanded="true" aria-controls="collapse-${i}">
                        ${objArr[i]} (${objVal[i].length})
                        </button>
                    </h2>
                    <div id="collapse-${i}" class="collapse" aria-labelledby="heading-${i}" data-parent="#accordian">
                        <ul class="subBreeds list-group">
                        ${objVal[i].map((subBreeds) =>`<li class="list-group-item">${subBreeds}</li>`).join("")}
                        </ul>
                    </div>
                </div>
                `;

                accordian.appendChild(item);
                

            }
            
        }


        //add event listner to accordian items
        $(".accordian-item button").on("click", function(event){
            $(this).toggleClass("active");
            $(this).next("collapse").toggleClass("show");
        });

        var listCount = document.getElementById("listCount");
        listCount.innerHTML=`(the list contains ${countBreeds} items)`;
         
    }catch(error){
        alert("Error #003!");
        console.error('Error:', error);
    }
}



main();