const main=document.getElementById('main');
const adduser=document.getElementById('add-user');
const doublemoney= document.getElementById('double-money');
const filter = document.getElementById('filter');
const sum =document.getElementById('sum-wealth');
const sortdata =document.getElementById('sort');

let data=[];
async function getrandomdata()
{
    const res=await fetch('https://randomuser.me/api/');
    const data = await res.json();
    console.log(data);
    const user= data.results[0];
    const newuser ={
      name: `${user.name.title} ${user.name.first} ${user.name.last}`,
      balance: Math.floor(Math.random()*1000)
    }
    adddata(newuser);
    console.log(user.name.first);
}
function adddata(newuser)
{
    data.push(newuser);
    updatedom();
}
function updatedom(userdata=data)
{
    main.innerHTML=' <h2><strong>User</strong>Wealth</h2>';
    userdata.forEach(user => {
        const userdiv= document.createElement('div');
        userdiv.classList.add('user');
        userdiv.innerHTML=  `<strong>${user.name}</strong>${(user.balance)}`
        main.appendChild(userdiv);
    })

}
function doublevalue()
{
    data=data.map(user =>{
        return{...user, balance:user.balance*2}
    });
    updatedom();
}
function filtermillionere()
{
    data=data.filter(user => user.balance>=1000000);
    updatedom();
}

function datasort()
{
    data = data.sort((a,b) => b.balance - a.balance)
    updatedom();
}
function sumwealth()
{
    updatedom();
    const total=data.reduce((acc, user)=> (acc+=user.balance),0);
    const totalelement= document.createElement('div');
    totalelement.innerHTML=`<h2>Total wealth :${(total)}</h2>`;
    main.appendChild(totalelement);

}

// Events listeners
adduser.addEventListener('click' ,getrandomdata);
doublemoney.addEventListener('click', doublevalue);
filter.addEventListener('click', filtermillionere);
sum.addEventListener('click', sumwealth);
sortdata.addEventListener('click', datasort);


getrandomdata();
getrandomdata();