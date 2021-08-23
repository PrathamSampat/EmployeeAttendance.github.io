const nm = document.getElementById("name")
const md = document.getElementById("month_days")
const afd = document.getElementById("availale_for_days")
const bs = document.getElementById("band_score")

const myform = document.getElementById("employeeForm")
const mytable = document.querySelector('#emptable')

const ctx = document.getElementById('myChart').getContext('2d')
const empNameHeader = document.getElementById('empname')

let xLabels = []
let availableDays = []
let totalDays = []

let data = []


function sortByName(){
    data.sort(function(a, b){
        if(a.name > b.name) return 1
        if(a.name < b.name) return -1
        return 0        
    })
    // console.log('sorted')
}

function delRows(tableLocator){
    allRows = tableLocator.rows
    let i =allRows.length
    while(--i){
        tableLocator.deleteRow(i)
    }
}

function createTableEntries(){
    delRows(mytable)
    
    data.forEach((singleData) => {
        
        let tableRow = document.createElement('tr') //creating table row
        tableRow.className = 'tRow' //giving table row a class name
        
        let nameData = document.createElement('td') 
        nameData.innerText = singleData.name
        
        let monthData = document.createElement('td') 
        monthData.innerText = singleData.month_days
        
        let availableData = document.createElement('td') 
        availableData.innerText = singleData.available_for_days
        
        let bandData = document.createElement('td') 
        bandData.innerText = singleData.band
        
        tableRow.append(nameData,monthData,availableData,bandData)
        mytable.append(tableRow)
        
    })
}

myform.addEventListener('submit',(e)=>{
    const myname=nm.value
    const monthdays=md.value
    const availabledays=afd.value
    let band=''
    
    // console.table(myname,monthdays,availabledays,band)
    
    let percentage = ((availabledays/monthdays)*100).toFixed(0)
    if( percentage >= 75){
        bs.setAttribute('value','A')
        band='A'
    }
    else if(percentage < 75 && percentage >= 50){
        bs.setAttribute('value','B')
        band='B'
    }
    else if(percentage < 50 && percentage >= 25){
        bs.setAttribute('value','C')
        band='C'
    }
    else{
        bs.setAttribute('value','D')
        band='D'
    }
    console.log(percentage)
    data.push({
        "name":myname,
        "month_days":monthdays,
        "available_for_days":availabledays,
        "band":band
    })
    if(data.length !== 0){
        mytable.hidden= false
        document.querySelector('.mycanvas').hidden = false
    }
    let lastIndex=(data.length - 1) * 1
    // console.log('lastindex',lastIndex)
    

    xLabels.push(data[lastIndex].name)
    availableDays.push(data[lastIndex].available_for_days)
    totalDays.push(data[lastIndex].month_days)
    myChart.update()

    console.log(xLabels)
    console.log(availableDays)

    // chartIt()
    
    
    // console.log(data)
    createTableEntries()
    e.preventDefault()
})

empNameHeader.addEventListener('click', () => {
    sortByName()
    createTableEntries()
})


const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: xLabels,
        datasets: [{
            label: 'Available Days',
            data: availableDays,
            backgroundColor: "#FF7F50",
            borderColor: "black",
            borderWidth: 1
        },
        {
            label: 'Total Days',
            data: totalDays,
            backgroundColor: "#5460f3",
            borderColor: "black",
            borderWidth: 1   
        }]
    },
    options: {
        responsive: false
    }   
    })