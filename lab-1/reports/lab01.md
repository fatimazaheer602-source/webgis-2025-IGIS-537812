**Submitted To: Shahid Nawaz Submitted By: Fatimah Zaheer**   
**Reg No: 537812 Subject: WebGIS** 


# **Part 1 - Environment Setup** 

Git was verified and configured on the lab machine, and the project folder C:\webgis was created as the working directory for the semester, as shown in the PowerShell session below. 

#### **SETUP** 

## **Git version check, global configuration, and project folder creation** 



<!-- Start of picture text -->
![alt text](images/image-1.png)
git --version confirmed Git was installed; core.autocrlf was set to false; user.name and user.email were configured; C:\webgis was created with mkdir. 



# **Part 2 - First Web Page** 

index.html was created and typed by hand inside VS Code. The Live Server extension was used to serve the page rather than opening it directly, so the address bar reads http://127.0.0.1:5500 instead of a file:// path. 

#### **CHECKPOINT** 

## **index.html typed in VS Code, Live Server started at port 5500** 


![alt text](images/image-2.png)



#### **RESULT** 

## **Page viewed through Live Server - heading and paragraph rendered** 

![alt text](images/image-3.png)
Address bar reads 127.0.0.1:5500/index.html, confirming the page is being served by Live Server rather than opened from disk. 



# **Part 3 - Checkpoint 2: Developer Tools** 

Developer Tools were opened with F12. The Elements tab shows the page's HTML exactly as the browser parsed it, and the Network tab was used to confirm that the page made a single request (index.html) before the map and its libraries were added. 

**CHECKPOINT 2** 

## **Elements tab open, showing the parsed HTML and applied body styles** 

![alt text](images/image-4.png)



#### **NETWORK TAB** 

## **Network tab ready to record requests, disable cache enabled** 

![alt text](images/image-4a.png)


# **Part 4 - Checkpoint 3: Styling with CSS** 
A `<style>` block was added inside `<head>`, defining rules for the body, the h1 heading, the. subtitle class, and the #map id - including the height rule that a Leaflet map container needs. The empty #map div was added just before the closing `</body>` tag. 

#### **CHECKPOINT 3** 

## **CSS style block added, including the #map height rule and the empty map div** 

![alt text](images/image-5.png)

#### **INSPECTING CSS** 

## **Elements panel with the h1 element selected, showing its applied and inherited styles** 

![alt text](images/image-6.png)

The Styles panel confirms which CSS rules the browser applied and in what order - the same inspection used to check the #map rule. 


# **Part 5 - Checkpoint 4: Adding the Map** 

The Leaflet library was loaded from unpkg.com, and the map script was added at the end of <body>: it creates the map centred on Islamabad at zoom level 12, adds an OpenStreetMap tile layer, and places a marker with a popup on the NUST H-12 campus. The Network tab was then reopened to see the tile requests that a real map generates. 

**LIVE MAP** 

## **Working, pannable Leaflet map of Islamabad with a marker and popup on NUST H-12** 

![alt text](images/image-7.png)

#### **CHECKPOINT 4** 

## **Network tab reloaded - 47 requests and 9.6 MB transferred, mostly map tiles** 

![alt text](images/image-8.png)

Compare this with the single request recorded in Part 2 - every visible square of the map is a separate .png tile request. 

#### **NETWORK DETAIL** 

## **Initial requests: index.html, leaflet.css and leaflet.js loading before the tiles** 

![alt text](images/image-9.png)


#### **TILE REQUESTS** 

## **Marker icon and successive .png tile requests, each initiated by TileLayer.js** 
![alt text](images/image-10.png)


#### **CHECKPOINT 4** 

## **A single tile request selected, with its Preview tab showing the 256×256 pixel square** 

![alt text](images/image-11.png)
This confirms the map is built from many small image tiles rather than one picture - each one fetched from the OpenStreetMap tile server. 


# **Part 6 - Checkpoint 5: Publishing to GitHub Pages** 

A public repository, webgis-2025-IGIS-537812, was created on GitHub. The local project was pushed to it with git init, git add -A, git commit and git push, and GitHub Pages was then enabled from the main branch's root folder. 

#### **REPOSITORY** 

## **New public GitHub repository created and ready to receive the first push** 

![alt text](images/image-12.png)

#### **PUBLISH** 

## **git init run in the VS Code terminal, initialising the local repository** 

![alt text](images/image-13.png)



#### **PUBLISH** 

## **git add -A and git commit completed - first snapshot saved locally** 
![alt text](images/image-14.png)


#### **GITHUB PAGES** 

## **Pages settings before enabling - source set to Deploy from a branch (main, /root)** 

![alt text](images/image-15.png)


#### **GITHUB PAGES** 

## **GitHub Actions confirms the pages-build-and-deployment workflow completed successfully** 

![alt text](images/image-16.png)


#### **CHECKPOINT 5** 

## **GitHub Pages settings showing the site is live, with its public URL** 

![alt text](images/image-17.png)


#### **CHECKPOINT 5** 

## **The published map, open at the live github.io URL - visible to anyone on the internet** 

![alt text](images/image-18.png)



# **Answers to Lab Questions** 

### **Q1. In Part 2 your page made one network request. After Part 4 it made dozens. Explain in two or three sentences what changed and why.** 

In Part 2 the page contained only html text, so the browser had nothing to fetch besides index.html itself. Once leaflet, the stylesheet, and a real tile-based basemap were added, the browser had to separately request leaflet.js, leaflet.css, the marker icon, and one .png image for every visible map tile. A map is not a single picture, it is assembled from many small tile requests, and panning or zooming triggers new ones, which is why the Network tab jumped from one request to dozens. 

### **Q2. What is the difference between what HTML does and what CSS does? Give one example of each from your own file.** 

HTML defines what exists on the page - the structure and content, such as the heading `<h1>Islamabad</h1>` and the empty container `<div id="map"></div>` that the map is later drawn into. CSS defines how those elements look, such as the #map rule that gives the map container a height of 480px, a width of 100%, and rounded corners with border-radius: 8px. HTML says a thing is there, CSS beautifies and makes it presentable. 

### **Q3. Why does the #map rule need a height, when the h1 rule does not?** 

An h1 element contains text, and text gives a block element its own natural height because the browser sizes the box around the content. A div like #map starts empty, Leaflet draws the map into it only after the page loads, so with no content and no explicit height, the browser collapses it to zero pixels tall. Without the height: 480px rule, the map would be rendered into an invisible, zero-height box and never appear, even though no error is reported. 

### **Q4. You opened your page through Live Server at 127.0.0.1 instead of double-clicking the file. Give one reason this matters.** 

Opening the file directly uses file://, which can block some map requests. Live Server uses http://127.0.0.1:5500, so the map works more like it will on a real website. 

### **Q5. A classmate's marker appears in the sea near Africa instead of in Islamabad. What is almost certainly wrong, and how would you fix it?** 

This is the classic latitude/longitude swap: Leaflet's functions expect coordinates as [latitude, longitude], while GeoJSON writes them the opposite way, as [longitude, latitude]. A marker placed near (0, 0) off the coast of Africa almost always means the two values were passed in the wrong order. The fix is to swap the two numbers in the “L.marker([...])” call so that latitude comes first, which for Islamabad should place the marker back around [33.64, 72.99]. 

# **Submission Links** 

### **Repository URL: https://github.com/fatimazaheer602-source/webgis-2025-IGIS-537812** 

**Live GitHub Pages URL: https://fatimazaheer602-source.github.io/webgis-2025-IGIS-537812/** 

