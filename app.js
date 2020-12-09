const mapbox_token="pk.eyJ1Ijoic2JlZGkiLCJhIjoiY2tpaHN1M3p2MGdmdjJ4cGVjNXk3YXNyZyJ9.HAs0wdU-Co6dANKNQuRPeA"
const footer = document.getElementById('footer')


//FETCH COVID API
const getData = async() => {
  try{
    const res = await fetch(`https://www.trackcorona.live/api/provinces`);
    let response = await res.json();
    const {data} = response;
    //Filter through the API Response and get US States
    data.filter(country => {
      if (country.country_code == "us") {
        return country
      }
    })
    .forEach(country => {
      const {longitude,latitude,location,confirmed,dead} = country;
      var marker = new mapboxgl.Marker({
        color:"red",
        draggable:false
      })
      .setLngLat([longitude, latitude])
      .setPopup(new mapboxgl.Popup({
        className:"popup"
      }).setHTML(
        `<ul>
        <li class="location">${location}</li>
        <li>Confirmed Cases: ${confirmed}</li>
        <li>Deaths: ${dead}</li>
        </ul>`
      ))
      .addTo(map);
    })

  } catch (err) {
    console.log(err);
  }
}
const getTotal = async ()=>{
  const res = await fetch(" https://api.covidtracking.com/v1/us/current.json")
  let response = await res.json();
  console.log(response);
  const [data] = response;
  setStats(data);
}

getData();
getTotal();

const setStats = (stat) => {
  const html = 
  `<div class="deaths">
  <h1>Deaths</h1>
  <p>${stat.death}</p>
  <p class="increase">+${stat.deathIncrease}</p>
  </div>
  <div class="positive">
  <h1>Positive</h1>
  <p>${stat.positive}</p>
  <p class="increase">+${stat.positiveIncrease}</p>
  </div>
  <div class="recovered">
  <h1>Recovered</h1>
  <p class="recover">${stat.recovered}</p>
  </div>`
  footer.innerHTML = html
}

//Mapbox Map
mapboxgl.accessToken = mapbox_token;
var map = new mapboxgl.Map({
customAttribution:'Data by TrackCorona',
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
center:[-97,39] ,
zoom:2
});
map.addControl(new mapboxgl.NavigationControl());













 