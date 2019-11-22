  /*
   * Functions for loading data into Firebase from DevHub
   * 
   * Will need to be plugged into a React Component before they will work. 
   * 
   */
  
  var APP = {
    locations_url: "https://api.devhub.virginia.edu/v1/facilities/categories/housing"
  }

  //Hook The fires on onmount and gets data 
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        APP.locations_url
      );
      let parseObject = await response.json();
      let parseObjectFilter = assignIDs(parseObject)
      writeToDormLocations(parseObjectFilter)
      setLocations(parseObjectFilter)
    }
    fetchData()
  }, []);

  function writeToDormLocations(locations) {
    locations.map((location) => {
      dormLocationsRef.doc(location.Name.split('/')[0]).set({
        'Latitude': location.Latitude,
        'Longitude': location.Longitude
      },
      {
        'merge': true
      })
    })
   }

  function assignIDs(locations){
    // ONly keeps locationsn with valid locations
    return locations.map((location, index)=>{
      location.id = index
      return location
    }).filter(location => location.Latitude && location.Longitude)
  }