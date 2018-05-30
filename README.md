## webapp_phase5
# Where to live NYU Stern School of Business

> Keywords: ranking safety, affordability, distance

**Descripción datasets:**

 - [Neighborhood Names GIS][https://catalog.data.gov/dataset/neighborhood-names-gis][Json] This dataset contains information about the NY neighborhoods. We use the columns ***borough*** the ***the_geom*** and the ***name***.
 - [NY Districts geoshapes][http s://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson][GeoJson] This dataset provides information about the shape of the distrcts and boroughs. We use the columns ***BoroCD***  and the ***geometry***.
 - [Crimes in NY][https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i/data][Json] This database has information of crime reports in New York between 2006 and 2016. We use the columns ***boro_nm***, ***ofns_desc*** , ***lat_lon***  and ***cmplnt_fr_dt***.
 - [NY_housing][https://catalog.data.gov/dataset/housing-new-york-units-by-building][Json] From this dataset we take the the fields ***borough***, ***latitude, longitude*** and ***extremely_low_Income_units*** to determine the amount of units per district.
 - [New York City Museums][https://catalog.data.gov/dataset/new-york-city-museums][Json] It has information about museums in NY. we use ***the_geom***, and ***name***.
  - [Y_art_galleries][https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD][Json] It has information about Location of New York City Art Galleries.  we use ***the_geom***, and ***name***.

**Brief description:**
The application is a mashup that integrates, analyses and interactively displays open data in order to support new students to evaluate and rank the 59 habitable districts in New York City .

The last view allows users to explore the data, and download in *csv format.

**Descripción:**
 * Map View:
	1. [Y] The map starts centered at NYU.
	2. [Y] [Heatmap] The user can enable a heatmap showing the crimes in the city.
	3. [Y] The user can see the shape of the district.
	4. [Y][Markers] There are a variety of markers to chose and visualize in the map. The markers have custom icons to distinguish them from each other.

 * Data Visualization:
	1. [Y] [Bar Chart] In the map view is a bar chart graph that shows the information of the crimes.
	2. [N]

 * Interaction Form:
	1. [N] 
	2. [Y] [Buttons] In the map view the user can select which markers to see.
	3. [N] 
	4. [Y] [Buttons] The user can visualize a small part of the tables before downloadig them. The user can download the table that is currently enabled.
	5. [N] 

6. Test Case
I tested the app in Firefox and Chrome

7. Additional information You Want to Share with Us
	-	The page requires at least a second after loading the data to update the ranking table for the first time.
undefined
